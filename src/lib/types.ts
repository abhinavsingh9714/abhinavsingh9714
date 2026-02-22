export type ResumeSection = 'experience' | 'projects' | 'skills' | 'education'

export interface ResumeCard {
  id: string
  title: string
  org: string
  dates?: string
  bullets: string[]
  tags: string[]
  links?: { label: string; url: string }[]
}

export interface Citation {
  cardId: string
  chunkId?: string
  score?: number
}

export type ResumeCardsBySection = Record<ResumeSection, ResumeCard[]>

export type PipelineStage =
  | 'idle'
  | 'embedding'
  | 'retrieving'
  | 'generating'
  | 'complete'
  | 'error'

export interface PipelineMetrics {
  embedMs?: number
  retrieveMs?: number
  generateMs?: number
}

export interface RetrievedSource {
  title: string
  score: number
  cardId?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: Citation[]
  pipeline?: {
    stage: PipelineStage
    metrics?: PipelineMetrics
    retrieved?: RetrievedSource[]
  }
  error?: boolean
}
