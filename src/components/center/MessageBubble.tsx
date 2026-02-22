'use client'

import { useState }        from 'react'
import { useAppStore }     from '@/store'
import { PipelineStatus }  from './PipelineStatus'
import type { Msg }        from '@/lib/chatReducer'

interface Props {
  message: Msg
}

export function MessageBubble({ message }: Props) {
  const setHighlightedCardId = useAppStore((s) => s.setHighlightedCardId)
  const setActiveCitations   = useAppStore((s) => s.setActiveCitations)
  const [expanded, setExpanded] = useState(false)

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="chat-bubble chat-bubble--user">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    )
  }

  // Assistant bubble
  const content    = message.content
  const isStreaming = !!message.stage && message.stage !== 'complete' && message.stage !== 'error'

  const handleCitationClick = (cardId: string) => {
    setHighlightedCardId(cardId)
    if (message.citations) {
      setActiveCitations(message.citations.map((c) => c.cardId))
    }
  }

  return (
    <div className="flex justify-start">
      <div className="chat-bubble chat-bubble--assistant w-full">
        <PipelineStatus message={message} />

        {content && (
          <div className="chat-bubble__content mt-2">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
            {content.length > 600 && !isStreaming && (
              <button
                className="mt-1 text-xs transition-default"
                style={{ color: 'var(--primary)' }}
                onClick={() => setExpanded((e) => !e)}
              >
                {expanded ? '− Show less' : '+ Show more'}
              </button>
            )}
          </div>
        )}

        {message.error && (
          <p className="mt-2 text-xs" style={{ color: 'var(--error)' }}>
            Something went wrong. Please try again.
          </p>
        )}

        {/* Citation chips */}
        {message.citations && message.citations.length > 0 && !isStreaming && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>Sources:</span>
            {message.citations.map((c) => (
              <button
                key={c.cardId}
                className="citation-chip"
                onClick={() => handleCitationClick(c.cardId)}
                title="Click to highlight in sidebar"
              >
                {c.cardId}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
