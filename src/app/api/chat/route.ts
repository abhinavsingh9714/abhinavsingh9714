/**
 * POST /api/chat — Mini-RAG pipeline
 *
 * Real pipeline stages (no faking):
 *   1. Embed query   → text-embedding-3-small
 *   2. Cosine search → top-K chunks from kb_index.json
 *   3. LLM generate  → gpt-4o-mini streaming
 *
 * SSE event stream:
 *   stage:             { stage: 'embedding'|'retrieving'|'generating', ms: number }
 *   retrieval_results: { chunks: RetrievalChunk[] }
 *   token:             { token: string }
 *   citations:         { citations: Citation[] }
 *   done:              { citations: Citation[], metrics: PipelineMetrics }
 *   error:             { message: string }
 */

import { NextRequest } from 'next/server'
import OpenAI          from 'openai'
import * as fs         from 'fs'
import * as path       from 'path'
import { encodeSSE }   from '@/lib/chatProtocol'
import type { ChatEvent, Citation, PipelineMetrics, RetrievalChunk } from '@/lib/chatReducer'
import type { ChatRequestBody } from '@/lib/chatProtocol'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// ── KB index types ─────────────────────────────────────────────────────────────

interface KBChunk {
  chunkId:    string
  docId:      string
  title:      string
  type:       'resume' | 'project' | 'story' | 'other'
  projectId?: string
  tags:       string[]
  text:       string
  embedding:  number[]
}

interface KBIndex {
  version:        string
  embeddingModel: string
  createdAt:      string
  chunks:         KBChunk[]
}

// ── Module-level KB cache ──────────────────────────────────────────────────────

let _kbIndex: KBIndex | null = null

function loadKBIndex(): KBIndex {
  if (_kbIndex) return _kbIndex

  const indexPath = path.join(process.cwd(), 'public', 'kb_index.json')
  if (!fs.existsSync(indexPath)) {
    throw new Error(
      'kb_index.json not found. Run `npm run kb:build` to generate it.',
    )
  }

  const raw = fs.readFileSync(indexPath, 'utf-8')
  _kbIndex  = JSON.parse(raw) as KBIndex
  return _kbIndex
}

// ── Cosine similarity ──────────────────────────────────────────────────────────

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB)
  return denom === 0 ? 0 : dot / denom
}

function topKChunks(
  queryEmbedding: number[],
  chunks:         KBChunk[],
  k:              number,
): Array<KBChunk & { score: number }> {
  return chunks
    .map((chunk) => ({ ...chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
}

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildPrompt(retrieved: Array<KBChunk & { score: number }>): string {
  const contextBlocks = retrieved.map((c) => {
    const meta = c.projectId
      ? `chunkId: ${c.chunkId} | type: ${c.type} | project: ${c.title} | projectId: ${c.projectId}`
      : `chunkId: ${c.chunkId} | type: ${c.type} | doc: ${c.title}`
    return `[${meta}]\n${c.text}`
  }).join('\n\n---\n\n')

  return `You are Abhinav Singh’s portfolio AI assistant.

Your role is to clearly and confidently explain his experience, projects, and technical decisions to recruiters and hiring managers.

Core profile:
- ML Engineer focused on GenAI systems, RAG pipelines, structured LLM workflows, and production-grade AI architecture.
- M.S. in Data Science, University of Maryland (GPA 3.92, graduating May 2026).
- Open to full-time ML/AI engineering roles.

Behavioral constraints:
- Answer ONLY using the provided context.
- Do NOT invent facts, tools, metrics, or outcomes.
- If information is not in context, say:
  “That detail isn’t specified in the portfolio.”
- Be concise but structured.
- Prefer bullet points for clarity.
- Avoid hype language.
- Avoid vague claims (e.g., “cutting-edge”, “revolutionary”).
- Emphasize impact, architecture, and engineering decisions.
- When relevant, connect outcomes to design choices (e.g., why RAG was used, why a certain architecture was chosen).

Narrative framing rules:
- Lead with impact or outcome when describing a project.
- Highlight system design thinking over tool usage.
- Frame experience in terms of ownership, architectural reasoning, and production readiness.
- Maintain calm, confident, technical tone.
- Write as if explaining to a senior engineer or hiring manager.

Citation discipline:
- Base all statements strictly on retrieved context blocks.
- Do not claim experience outside the retrieved chunks.
- Do not fabricate metrics.

Formatting:
- Use short paragraphs or bullet points.
- Avoid long prose blocks.
- Maximum 6–8 sentences unless explicitly asked for deep detail.

[CONTEXT]
${contextBlocks}
[/CONTEXT]`
}

// ── Citation builder (deterministic — no LLM guessing) ───────────────────────

const CITATION_SCORE_THRESHOLD = 0.30
const CITATION_ALWAYS_TOP_N    = 2

function buildCitations(retrieved: Array<KBChunk & { score: number }>): Citation[] {
  const cited = new Map<string, Citation>()

  // Always include the top N
  for (const chunk of retrieved.slice(0, CITATION_ALWAYS_TOP_N)) {
    const cardId = chunk.projectId ?? chunk.docId
    if (!cited.has(cardId) || (cited.get(cardId)!.score ?? 0) < chunk.score) {
      cited.set(cardId, {
        cardId,
        chunkId:   chunk.chunkId,
        docId:     chunk.docId,
        title:     chunk.title,
        projectId: chunk.projectId,
        score:     chunk.score,
      })
    }
  }

  // Add others above threshold
  for (const chunk of retrieved.slice(CITATION_ALWAYS_TOP_N)) {
    if (chunk.score < CITATION_SCORE_THRESHOLD) continue
    const cardId = chunk.projectId ?? chunk.docId
    if (!cited.has(cardId) || (cited.get(cardId)!.score ?? 0) < chunk.score) {
      cited.set(cardId, {
        cardId,
        chunkId:   chunk.chunkId,
        docId:     chunk.docId,
        title:     chunk.title,
        projectId: chunk.projectId,
        score:     chunk.score,
      })
    }
  }

  // Sort: projectId citations first (those drive CPI-1 scroll), then by score desc
  return [...cited.values()].sort((a, b) => {
    if (a.projectId && !b.projectId) return -1
    if (!a.projectId && b.projectId) return  1
    return (b.score ?? 0) - (a.score ?? 0)
  })
}

// ── Route handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  let body: ChatRequestBody
  try {
    body = (await req.json()) as ChatRequestBody
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const query = body.query?.trim()
  if (!query) {
    return new Response(
      JSON.stringify({ error: '`query` is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // Load KB — fail fast if not built yet
  let kbIndex: KBIndex
  try {
    kbIndex = loadKBIndex()
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const client = new OpenAI({ apiKey })
  const ac     = new AbortController()

  const stream = new ReadableStream({
    async start(controller) {
      const enc = (e: ChatEvent) => controller.enqueue(encodeSSE(e))

      try {
        // ── Stage 1: Embed query ────────────────────────────────────────────
        const t0 = Date.now()
        enc({ type: 'stage', stage: 'embedding' })

        const embedRes = await client.embeddings.create(
          { model: 'text-embedding-3-small', input: query },
          { signal: ac.signal },
        )
        const queryEmbedding = embedRes.data[0].embedding
        const embedMs        = Date.now() - t0

        enc({ type: 'stage', stage: 'embedding', ms: embedMs } as ChatEvent)

        // ── Stage 2: Retrieve top-K chunks ──────────────────────────────────
        if (ac.signal.aborted) return
        const t1 = Date.now()
        enc({ type: 'stage', stage: 'retrieving' })

        const TOP_K    = 6
        const retrieved = topKChunks(queryEmbedding, kbIndex.chunks, TOP_K)
        const retrieveMs = Date.now() - t1

        // Build retrieval result events (for Engineer View)
        const retrievalChunks: RetrievalChunk[] = retrieved.map((c) => ({
          chunkId:   c.chunkId,
          docId:     c.docId,
          title:     c.title,
          projectId: c.projectId,
          score:     c.score,
          snippet:   c.text.slice(0, 160).replace(/\s+/g, ' ').trim(),
        }))

        enc({ type: 'retrieval_results', chunks: retrievalChunks })
        enc({ type: 'stage', stage: 'retrieving', ms: retrieveMs } as ChatEvent)

        // ── Stage 3: Generate ───────────────────────────────────────────────
        if (ac.signal.aborted) return
        const t2 = Date.now()
        enc({ type: 'stage', stage: 'generating' })

        const systemPrompt = buildPrompt(retrieved)

        const completion = await client.chat.completions.create(
          {
            model:      'gpt-4o-mini',
            stream:     true,
            max_tokens: 512,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user',   content: query },
            ],
          },
          { signal: ac.signal },
        )

        for await (const chunk of completion) {
          if (ac.signal.aborted) break
          const token = chunk.choices[0]?.delta?.content ?? ''
          if (token) enc({ type: 'token', token })
        }

        if (!ac.signal.aborted) {
          const generateMs = Date.now() - t2

          // Deterministic citations — no LLM guessing
          const citations = buildCitations(retrieved)

          enc({ type: 'citations', citations })

          const metrics: PipelineMetrics = { embedMs, retrieveMs, generateMs }
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
