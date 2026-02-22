import { useRef, useState, useCallback } from 'react'
import { SuggestedPills } from './SuggestedPills'
import { MessageList } from './MessageList'
import type { ChatMessage } from '@/lib/types'

interface ChatPanelProps {
  engineerView: boolean
  messages: ChatMessage[]
  isStreaming?: boolean
  error?: Error | null
  onRetry?: () => void
  onSendQuestion: (question: string) => void
  onCitationClick?: (cardId: string, messageId?: string) => void
  /** When false (desktop), chat flows naturally and workspace scrolls; when true, message list scrolls internally */
  scrollInternal?: boolean
}

export function ChatPanel({
  engineerView,
  messages,
  isStreaming = false,
  error,
  onRetry,
  onSendQuestion,
  onCitationClick,
  scrollInternal = true,
}: ChatPanelProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [scrollToMessageId, setScrollToMessageId] = useState<string | null>(null)
  const handleCitationClick = useCallback(
    (cardId: string, messageId?: string) => {
      onCitationClick?.(cardId, messageId)
      if (messageId) setScrollToMessageId(messageId)
    },
    [onCitationClick]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = input.trim()
    if (q) {
      onSendQuestion(q)
      setInput('')
    }
  }

  return (
    <div className={scrollInternal ? 'flex min-h-0 flex-1 flex-col overflow-hidden' : 'flex flex-col'}>
      <div className={scrollInternal ? 'flex min-h-0 flex-1 flex-col overflow-hidden' : 'flex flex-1 flex-col'}>
        <div className="shrink-0 border-b border-[var(--border)] bg-[var(--surface)] p-4 md:p-5">
          <SuggestedPills onSelect={onSendQuestion} />
        </div>
        <MessageList
          ref={listRef}
          messages={messages}
          isStreaming={isStreaming}
          engineerView={engineerView}
          scrollToMessageId={scrollToMessageId}
          onCitationClick={handleCitationClick}
          scrollInternal={scrollInternal}
        />
        {error && onRetry && (
          <div className="px-4 pb-2 flex items-center gap-2">
            <span className="text-small text-amber-800 dark:text-amber-200">Demo mode: stream failed.</span>
            <button
              type="button"
              onClick={onRetry}
              className="transition-default rounded border border-amber-300 bg-amber-50 px-3 py-1.5 text-small text-amber-800 hover:bg-amber-100 focus-ring dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-900/40"
              aria-label="Retry last question"
            >
              Retry last question
            </button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question..."
            className="transition-default flex-1 rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-small focus-ring"
            aria-label="Chat input"
          />
          <button
            type="submit"
            className="transition-default rounded border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-small font-medium text-[var(--text)] hover:bg-[var(--surface)] focus-ring"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
