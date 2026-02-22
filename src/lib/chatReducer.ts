/**
 * chatReducer — self-contained streaming chat logic.
 *
 * No legacy imports, no SSE client, no external data files.
 * The mock generator produces realistic jittered token streaming
 * with pipeline stages, citations, and timing metrics.
 *
 * Public surface
 * ──────────────
 * Msg              — discriminated union for user / assistant messages
 * streamAssistant  — async generator: yields ChatEvent objects
 * CHAT_RESPONSES   — deterministic response table (keyword → content + citations)
 */

// ── Message types ─────────────────────────────────────────────────────────────

export type PipelineStage = 'embedding' | 'retrieving' | 'generating' | 'complete' | 'error'

export interface Citation {
  /** Matches a project / section DOM id for scroll + pulse */
  cardId: string
  score:  number
}

export interface PipelineMetrics {
  embedMs:    number
  retrieveMs: number
  generateMs: number
}

export interface Msg {
  id:         string
  role:       'user' | 'assistant'
  content:    string
  stage?:     PipelineStage
  citations?: Citation[]
  metrics?:   PipelineMetrics
  error?:     boolean
}

// ── Generator event types ─────────────────────────────────────────────────────

export type ChatEvent =
  | { type: 'stage';   stage:   PipelineStage }
  | { type: 'token';   token:   string         }
  | { type: 'done';    citations: Citation[]; metrics: PipelineMetrics }
  | { type: 'error';   message: string         }

// ── Deterministic mock response table ────────────────────────────────────────
// Each entry: keyword triggers → { content, citations[] }
// cardId values match the project `id` attributes in data/portfolio.ts

interface MockEntry {
  match:     (q: string) => boolean
  content:   string
  citations: Citation[]
}

const MOCK_TABLE: MockEntry[] = [
  {
    match: (q) => /neuron|taai|genai|rag|multi.?tenant/i.test(q),
    content:
      'At TAAI Labs I built Neuron — a multi-tenant GenAI platform on AWS. ' +
      'The RAG pipeline chunks, embeds, and indexes 1 000+ internal documents using ' +
      'DynamoDB + Pinecone. A fine-tuned Qwen model handles NIST-compliant Q&A with ' +
      'zero hallucination policy, grounding every answer in retrieved context.',
    citations: [
      { cardId: 'project-neuron',     score: 0.97 },
    ],
  },
  {
    match: (q) => /jira|ticket|langchain|pydantic|planning/i.test(q),
    content:
      'The Intelligent Jira Ticket Agent uses a LangChain planning loop to convert ' +
      'product descriptions into schema-enforced Pydantic tickets, then creates and ' +
      'links them directly in Jira Cloud. This eliminated ~70% of sprint-planning ' +
      'overhead by removing manual ticket writing entirely.',
    citations: [
      { cardId: 'project-jira-agent', score: 0.95 },
    ],
  },
  {
    match: (q) => /video|slo.?mo|frame|interpolat|fps|unet/i.test(q),
    content:
      'The Slo-Mo Video Generation project trains a U-Net to insert 2–8 synthetic ' +
      'intermediate frames between real ones, achieving an 8× frame-rate uplift ' +
      '(60 → 480 fps). Evaluated with SSIM and LPIPS — outperforms bilinear ' +
      'baseline by 14% SSIM on sports and nature clips.',
    citations: [
      { cardId: 'project-slomo',      score: 0.93 },
    ],
  },
  {
    match: (q) => /project|portfolio|work|built/i.test(q),
    content:
      'Three stand-out projects: ' +
      '(1) Neuron — multi-tenant RAG platform at TAAI Labs. ' +
      '(2) Jira Ticket Agent — LangChain agent that cut sprint planning by 70%. ' +
      '(3) Slo-Mo Video Generation — U-Net frame interpolation for 8× frame uplift. ' +
      'Each card in the Projects section has full detail — click one to learn more.',
    citations: [
      { cardId: 'project-neuron',     score: 0.91 },
      { cardId: 'project-jira-agent', score: 0.88 },
      { cardId: 'project-slomo',      score: 0.85 },
    ],
  },
  {
    match: (q) => /skill|stack|tool|framework|cloud|python|pytorch/i.test(q),
    content:
      'Core stack: Python, PyTorch, Hugging Face Transformers, LangChain / LangGraph. ' +
      'Cloud: AWS (EC2, Lambda, Step Functions, S3, Bedrock), Pinecone, DynamoDB. ' +
      'MLOps: Docker, FastAPI, CI/CD, structured logging. ' +
      'Research areas: RAG, multi-agent systems, computer vision, time-series.',
    citations: [],
  },
  {
    match: (q) => /education|degree|gpa|umd|iisc|thapar|study/i.test(q),
    content:
      'Education: M.S. Data Science at UMD (GPA 3.89, graduating May 2026) — ' +
      'Advanced ML, Big Data Systems, NLP, Algorithms. ' +
      'PG Cert. Computational Data Science at IISc Bangalore (Grade A). ' +
      'B.E. Electronics & Computer Engineering at Thapar University (GPA 8.13).',
    citations: [],
  },
  {
    match: (q) => /experience|career|work history|timeline/i.test(q),
    content:
      'Career path: started as a freelance ML engineer (2023), then founding ML engineer ' +
      'at KradleJoy (real-time multimodal baby monitoring). ML Intern at EdTech Tulna · ' +
      'IIT Delhi (LangGraph multi-agent video evaluation). Currently founding ML engineer ' +
      'at TAAI Labs and finishing M.S. at UMD.',
    citations: [],
  },
]

const DEFAULT_RESPONSE: Omit<MockEntry, 'match'> = {
  content:
    "I'm Abhinav's portfolio assistant. Ask me about experience, projects, skills, " +
    'or education — I can pull up specific details and highlight relevant cards.',
  citations: [],
}

function getMockEntry(question: string): Omit<MockEntry, 'match'> {
  return MOCK_TABLE.find((e) => e.match(question)) ?? DEFAULT_RESPONSE
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

/** Split text into word+whitespace tokens (preserves spaces for natural rendering) */
function tokenize(text: string): string[] {
  return text.split(/(\s+)/)
}

// ── Async generator ───────────────────────────────────────────────────────────

/**
 * Yields ChatEvents in order:
 *   stage(embedding) → stage(retrieving) → stage(generating)
 *   → token × N (jittered 10–35 ms each)
 *   → done(citations, metrics)
 *
 * Accepts an AbortSignal so the caller can cancel mid-stream.
 */
export async function* streamAssistant(
  question: string,
  signal:   AbortSignal,
): AsyncGenerator<ChatEvent> {
  const { content, citations } = getMockEntry(question)
  const tokens = tokenize(content)

  const t0 = Date.now()

  // Stage: embedding
  yield { type: 'stage', stage: 'embedding' }
  await delay(60 + Math.random() * 40)
  if (signal.aborted) return

  // Stage: retrieving
  yield { type: 'stage', stage: 'retrieving' }
  await delay(90 + Math.random() * 60)
  if (signal.aborted) return

  // Stage: generating
  yield { type: 'stage', stage: 'generating' }
  await delay(40 + Math.random() * 30)
  if (signal.aborted) return

  const embedMs    = Date.now() - t0
  const retrieveMs = embedMs + Math.round(20 + Math.random() * 30)
  const genStart   = Date.now()

  // Stream tokens with jitter
  for (const token of tokens) {
    if (signal.aborted) return
    yield { type: 'token', token }
    await delay(10 + Math.random() * 25)
  }

  if (signal.aborted) return

  const metrics: PipelineMetrics = {
    embedMs,
    retrieveMs,
    generateMs: Date.now() - genStart,
  }

  yield { type: 'done', citations, metrics }
}

// Re-export uid so the hook can create message ids without a separate import
export { uid }
