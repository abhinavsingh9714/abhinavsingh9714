import { useState, useCallback, useRef } from 'react'
import { streamChat } from './sseClient'
import { getCardById } from '@/data/resume_kb'
import type { ChatMessage } from './types'

function nextId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useChatStream(options: { mock?: boolean } = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortRef = useRef<(() => void) | null>(null)

  const sendQuestion = useCallback(
    (question: string) => {
      setError(null)
      const userMsg: ChatMessage = { id: nextId(), role: 'user', content: question }
      const assistantId = nextId()
      const assistantPlaceholder: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        citations: [],
        pipeline: { stage: 'embedding' },
      }
      setMessages((prev) => [...prev, userMsg, assistantPlaceholder])
      setIsStreaming(true)

      abortRef.current = streamChat(
        question,
        { mock: options.mock !== false },
        {
          onStage: (stage) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, pipeline: { ...m.pipeline!, stage } }
                  : m
              )
            )
          },
          onToken: (token) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + token } : m
              )
            )
          },
          onCitations: (citations) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, citations } : m
              )
            )
          },
          onDone: (metrics) => {
            setMessages((prev) =>
              prev.map((m) => {
                if (m.id !== assistantId) return m
                const retrieved = (m.citations ?? []).map((c) => {
                  const card = getCardById(c.cardId)
                  return {
                    title: card ? `${card.title} · ${card.org}` : c.cardId,
                    score: c.score ?? 0.9,
                    cardId: c.cardId,
                  }
                })
                return {
                  ...m,
                  pipeline: {
                    ...m.pipeline!,
                    stage: 'complete',
                    metrics,
                    retrieved,
                  },
                }
              })
            )
            setIsStreaming(false)
            abortRef.current = null
          },
          onError: (err) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, error: true } : m
              )
            )
            setIsStreaming(false)
            setError(err)
            abortRef.current = null
          },
        }
      )
    },
    [options.mock]
  )

  const retry = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return
    setMessages((prev) => prev.filter((m) => m.role === 'user' || !m.error))
    sendQuestion(lastUser.content)
  }, [messages, sendQuestion])

  return { messages, isStreaming, sendQuestion, error, retry }
}
