import { forwardRef, useRef, useEffect } from 'react'
import { MessageBubble } from './MessageBubble'
import type { ChatMessage } from '@/lib/types'

interface MessageListProps {
  messages: ChatMessage[]
  isStreaming?: boolean
  engineerView?: boolean
  scrollToMessageId?: string | null
  onCitationClick?: (cardId: string, messageId?: string) => void
  /** When false, list flows naturally (no internal scroll) */
  scrollInternal?: boolean
}

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  function MessageList({ messages, isStreaming, engineerView, scrollToMessageId, onCitationClick, scrollInternal = true }, ref) {
    const messageRefs = useRef<Record<string, HTMLDivElement | null>>({})
    useEffect(() => {
      if (!scrollToMessageId) return
      const el = messageRefs.current[scrollToMessageId]
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, [scrollToMessageId])

    return (
      <div
      ref={ref}
      className={
        scrollInternal
          ? 'scroll-pane min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden p-4 scroll-smooth md:p-5'
          : 'space-y-3 p-4 md:p-5'
      }
    >
        {messages.length === 0 && !isStreaming && (
          <p className="text-small text-[var(--color-muted)]">No messages yet. Use a suggested question or type below.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            ref={(el) => {
              messageRefs.current[msg.id] = el
            }}
          >
            <MessageBubble
              message={msg}
              engineerView={engineerView}
              onCitationClick={onCitationClick}
            />
          </div>
        ))}
        {isStreaming && (
          <div className="flex justify-start min-h-[2.5rem]">
            <div className="flex gap-1 rounded-2xl bg-[var(--surface-2)] px-4 py-2.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-muted)]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-muted)] [animation-delay:0.2s]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-muted)] [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>
    )
  }
)
