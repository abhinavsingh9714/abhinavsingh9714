import { getMockResponse } from './mockResponse'
import type { Citation, PipelineMetrics } from './types'

export type SSEStage = 'embedding' | 'retrieving' | 'generating'

export interface SSECallbacks {
  onStage?: (stage: SSEStage) => void
  onToken?: (token: string) => void
  onCitations?: (citations: Citation[]) => void
  onDone?: (metrics?: PipelineMetrics) => void
  onError?: (err: Error) => void
}

/** Real SSE: connect to endpoint and emit events. For now only mock is implemented. */
export function streamChat(
  question: string,
  options: { mock?: boolean; url?: string },
  callbacks: SSECallbacks
): () => void {
  if (options.mock !== false) {
    return mockStreamResponse(question, callbacks)
  }
  // Real SSE would use EventSource or fetch + ReadableStream
  callbacks.onError?.(new Error('Real SSE not implemented'))
  return () => {}
}

/** Mock: simulate stage progression and token streaming, then citations and done. */
function mockStreamResponse(question: string, callbacks: SSECallbacks): () => void {
  const { content, citations } = getMockResponse(question)
  const words = content.split(/(\s+)/)
  let cancelled = false

  const run = async () => {
    try {
      callbacks.onStage?.('embedding')
      await delay(80)
      if (cancelled) return
      callbacks.onStage?.('retrieving')
      await delay(120)
      if (cancelled) return
      callbacks.onStage?.('generating')
      await delay(60)
      if (cancelled) return

      for (let i = 0; i < words.length; i++) {
        if (cancelled) return
        callbacks.onToken?.(words[i] ?? '')
        await delay(15 + Math.random() * 20)
      }
      if (cancelled) return
      callbacks.onCitations?.(citations)
      callbacks.onDone?.({
        embedMs: 40 + Math.round(Math.random() * 20),
        retrieveMs: 70 + Math.round(Math.random() * 30),
        generateMs: 150 + Math.round(Math.random() * 80),
      })
    } catch (e) {
      callbacks.onError?.(e instanceof Error ? e : new Error(String(e)))
    }
  }
  run()

  return () => {
    cancelled = true
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
