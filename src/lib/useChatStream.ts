'use client'

/**
 * useChatStream — streams assistant responses into the Zustand AppStore.
 *
 * Mode switch
 * ───────────
 * NEXT_PUBLIC_CHAT_MODE=api  → fetch POST /api/chat, read SSE response
 * (anything else / unset)   → local mock generator (chatReducer)
 *
 * Both modes emit the same ChatEvent union and share identical reducer logic,
 * so the UI is completely unaware of which transport is active.
 *
 * Public API
 * ──────────
 *   sendQuestion(text)  appends user msg, streams assistant response
 *   retry()             re-sends the last user message
 */

import { useCallback, useRef } from 'react'
import { useAppStore }          from '@/store'
import { streamAssistant, uid } from '@/lib/chatReducer'
import { decodeSSELine }        from '@/lib/chatProtocol'
import type { Msg, ChatEvent }  from '@/lib/chatReducer'
import type { ChatRequestBody } from '@/lib/chatProtocol'

export type { Msg as ChatMessage }

const USE_API = process.env.NEXT_PUBLIC_CHAT_MODE === 'api'

// ── API-mode SSE reader ───────────────────────────────────────────────────────

/**
 * Reads a `text/event-stream` response body and yields ChatEvents.
 * Handles partial chunks: buffers text until a full `data:` line is found.
 */
async function* readSSEStream(
  response: Response,
  signal:   AbortSignal,
): AsyncGenerator<ChatEvent> {
  const reader = response.body?.getReader()
  if (!reader) throw new Error('Response body is not readable')

  const dec = new TextDecoder()
  let buf   = ''

  try {
    while (!signal.aborted) {
      const { done, value } = await reader.read()
      if (done) break

      buf += dec.decode(value, { stream: true })

      // Process all complete lines in the buffer
      const lines = buf.split('\n')
      // Keep the last (possibly incomplete) line in the buffer
      buf = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed === ':' ) continue   // SSE keep-alive or comment
        const event = decodeSSELine(trimmed)
        if (event) yield event
      }
    }

    // Flush any remaining buffer content
    if (buf.trim()) {
      const event = decodeSSELine(buf.trim())
      if (event) yield event
    }
  } finally {
    reader.releaseLock()
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useChatStream() {
  const setMessages        = useAppStore((s) => s.setMessages)
  const setIsStreaming     = useAppStore((s) => s.setIsStreaming)
  const setStreamError     = useAppStore((s) => s.setStreamError)
  const setActiveCitations = useAppStore((s) => s.setActiveCitations)
  const messages           = useAppStore((s) => s.messages)

  const abortRef = useRef<AbortController | null>(null)

  const sendQuestion = useCallback(
    async (question: string) => {
      // Cancel any in-flight stream
      abortRef.current?.abort()
      const ac = new AbortController()
      abortRef.current = ac

      setStreamError(null)

      const userMsg: Msg = { id: uid(), role: 'user', content: question }
      const assistantId  = uid()
      const placeholder: Msg = {
        id:      assistantId,
        role:    'assistant',
        content: '',
        stage:   'embedding',
      }

      setMessages((prev) => [...prev, userMsg, placeholder])
      setIsStreaming(true)

      // ── Choose event source ─────────────────────────────────────────────
      async function* eventSource(): AsyncGenerator<ChatEvent> {
        if (USE_API) {
          const body: ChatRequestBody = { query: question }
          const res = await fetch('/api/chat', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(body),
            signal:  ac.signal,
          })
          if (!res.ok) {
            throw new Error(`API error ${res.status}: ${await res.text()}`)
          }
          yield* readSSEStream(res, ac.signal)
        } else {
          yield* streamAssistant(question, ac.signal)
        }
      }

      // ── Dispatch events into store ──────────────────────────────────────
      try {
        for await (const event of eventSource()) {
          if (ac.signal.aborted) break

          switch (event.type) {
            case 'stage':
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, stage: event.stage } : m
                )
              )
              break

            case 'token':
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + event.token }
                    : m
                )
              )
              break

            case 'retrieval_results':
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, retrievalChunks: event.chunks }
                    : m
                )
              )
              break

            case 'citations':
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, citations: event.citations }
                    : m
                )
              )
              setActiveCitations(event.citations.map((c) => c.cardId))
              break

            case 'done':
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? {
                        ...m,
                        stage:     'complete',
                        citations: m.citations?.length ? m.citations : event.citations,
                        metrics:   event.metrics,
                      }
                    : m
                )
              )
              // Ensure activeCitations is set if citations event wasn't sent
              if (event.citations.length > 0) {
                setActiveCitations(event.citations.map((c) => c.cardId))
              }
              setIsStreaming(false)
              abortRef.current = null
              break

            case 'error':
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, error: true } : m
                )
              )
              setIsStreaming(false)
              setStreamError(new Error(event.message))
              abortRef.current = null
              break
          }
        }
      } catch (err) {
        if (!ac.signal.aborted) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, error: true } : m
            )
          )
          setIsStreaming(false)
          setStreamError(err instanceof Error ? err : new Error(String(err)))
        }
      }
    },
    [setMessages, setIsStreaming, setStreamError, setActiveCitations]
  )

  const retry = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return
    setMessages((prev) => prev.filter((m) => !m.error))
    sendQuestion(lastUser.content)
  }, [messages, sendQuestion, setMessages])

  return { sendQuestion, retry }
}
