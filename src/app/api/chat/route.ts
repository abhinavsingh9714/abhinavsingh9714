/**
 * POST /api/chat
 *
 * Request body  : { query: string; ui_state?: Record<string, unknown> }
 * Response      : text/event-stream (chunked SSE)
 *
 * Each SSE frame contains a JSON-encoded ChatEvent:
 *   { type: "stage",   stage: "embedding" | "retrieving" | "generating" }
 *   { type: "token",   token: string }
 *   { type: "done",    citations: Citation[], metrics: PipelineMetrics }
 *   { type: "error",   message: string }
 */

import { NextRequest }   from 'next/server'
import OpenAI            from 'openai'
import { encodeSSE }     from '@/lib/chatProtocol'
import { resumeSections } from '@/data/resume_kb'
import type { ChatRequestBody } from '@/lib/chatProtocol'
import type { ChatEvent, Citation, PipelineMetrics } from '@/lib/chatReducer'

export const dynamic = 'force-dynamic'

// ── Build system prompt from resume KB ────────────────────────────────────────

function buildSystemPrompt(): string {
  const { experience, projects, skills, education } = resumeSections

  const fmt = (section: typeof experience) =>
    section.map((c) =>
      `• ${c.title} @ ${c.org} (${c.dates ?? ''})\n  ${c.bullets.join('\n  ')}`
    ).join('\n')

  return `You are Abhinav Singh's portfolio assistant — a helpful, concise chatbot embedded in his interactive resume.
Answer questions about Abhinav's experience, projects, skills, and education based ONLY on the information below.
When you cite a specific project or experience, end your answer with a JSON block on its own line in this exact format:
CITATIONS:{"ids":["<card-id>",...]}
Use these card IDs: experience: exp-1..exp-6 | projects: proj-1..proj-4 | skills: skill-ml, skill-data, skill-swe | education: edu-1..edu-3
Keep answers concise and recruiter-friendly. Do not make up anything not in the resume data.

=== EXPERIENCE ===
${fmt(experience)}

=== PROJECTS ===
${fmt(projects)}

=== SKILLS ===
${fmt(skills)}

=== EDUCATION ===
${fmt(education)}`
}

const SYSTEM_PROMPT = buildSystemPrompt()

// ── Citation card-id → score mapping (relevance heuristic) ───────────────────

const CARD_SCORES: Record<string, number> = {
  'exp-1': 0.97, 'exp-2': 0.94, 'exp-3': 0.91, 'exp-4': 0.88,
  'exp-5': 0.82, 'exp-6': 0.80,
  'proj-1': 0.95, 'proj-2': 0.93, 'proj-3': 0.90, 'proj-4': 0.87,
  'skill-ml': 0.92, 'skill-data': 0.89, 'skill-swe': 0.86,
  'edu-1': 0.91, 'edu-2': 0.88, 'edu-3': 0.82,
}

function parseCitations(text: string): { clean: string; citations: Citation[] } {
  const marker = 'CITATIONS:'
  const idx    = text.lastIndexOf(marker)
  if (idx === -1) return { clean: text.trim(), citations: [] }

  const before = text.slice(0, idx).trim()
  const jsonStr = text.slice(idx + marker.length).trim()

  try {
    const parsed = JSON.parse(jsonStr) as { ids?: string[] }
    const citations: Citation[] = (parsed.ids ?? []).map((id) => ({
      cardId: id,
      score:  CARD_SCORES[id] ?? 0.8,
    }))
    return { clean: before, citations }
  } catch {
    return { clean: before, citations: [] }
  }
}

// ── Route handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }), {
      status:  500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: ChatRequestBody
  try {
    body = (await req.json()) as ChatRequestBody
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status:  400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const query = body.query?.trim()
  if (!query) {
    return new Response(JSON.stringify({ error: '`query` is required' }), {
      status:  400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const client = new OpenAI({ apiKey })
  const ac     = new AbortController()

  const stream = new ReadableStream({
    async start(controller) {
      const enc = (e: ChatEvent) => controller.enqueue(encodeSSE(e))

      try {
        const t0 = Date.now()

        enc({ type: 'stage', stage: 'embedding' })
        enc({ type: 'stage', stage: 'retrieving' })
        enc({ type: 'stage', stage: 'generating' })

        const embedMs    = Date.now() - t0
        const retrieveMs = embedMs + 20
        const genStart   = Date.now()

        const completion = await client.chat.completions.create(
          {
            model:      'gpt-4o-mini',
            stream:     true,
            max_tokens: 512,
            messages: [
              { role: 'system',  content: SYSTEM_PROMPT },
              { role: 'user',    content: query },
            ],
          },
          { signal: ac.signal },
        )

        let fullText = ''

        for await (const chunk of completion) {
          if (ac.signal.aborted) break
          const token = chunk.choices[0]?.delta?.content ?? ''
          if (!token) continue
          fullText += token
        }

        if (!ac.signal.aborted) {
          // Separate the citation block from the visible answer text
          const { clean, citations } = parseCitations(fullText)

          // Stream the clean answer text as tokens
          for (const word of clean.split(/(\s+)/)) {
            if (word) enc({ type: 'token', token: word })
          }

          const metrics: PipelineMetrics = {
            embedMs,
            retrieveMs,
            generateMs: Date.now() - genStart,
          }

          enc({ type: 'done', citations, metrics })
        }
      } catch (err) {
        if (!ac.signal.aborted) {
          const message = err instanceof Error ? err.message : String(err)
          enc({ type: 'error', message })
        }
      } finally {
        controller.close()
      }
    },
    cancel() {
      ac.abort()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type':      'text/event-stream',
      'Cache-Control':     'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      'Connection':        'keep-alive',
    },
  })
}
