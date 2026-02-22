import { useState } from 'react'
import { CitationChips } from './CitationChips'
import { PipelineStatus } from './PipelineStatus'
import { getCardById } from '@/data/resume_kb'
import { clampToPreview, wordCount } from '@/lib/formatter'
import type { ChatMessage } from '@/lib/types'

interface MessageBubbleProps {
  message: ChatMessage
  engineerView?: boolean
  onCitationClick?: (cardId: string) => void
}

function formatContent(text: string, wrapInContentClass = false) {
  const lines = text.split('\n').filter(Boolean)
  const content = lines.length <= 1 ? (
    <p className="whitespace-pre-wrap">{text}</p>
  ) : (
    <ul className="list-inside list-disc">
      {lines.map((line, i) => (
        <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
      ))}
    </ul>
  )
  if (wrapInContentClass) {
    return <div className="chat-bubble__content">{content}</div>
  }
  return content
}

const PREVIEW_WORDS = 140

export function MessageBubble({ message, engineerView = false, onCitationClick }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const [expanded, setExpanded] = useState(false)
  const needsExpand = !isUser && wordCount(message.content) > PREVIEW_WORDS
  const displayContent = needsExpand && !expanded
    ? clampToPreview(message.content, PREVIEW_WORDS)
    : message.content

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`chat-bubble text-base ${isUser ? 'chat-bubble--user' : 'chat-bubble--assistant'}`}
      >
        {isUser ? (
          <div>{formatContent(displayContent, false)}</div>
        ) : (
          formatContent(displayContent, true)
        )}
        {needsExpand && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="transition-default mt-2 rounded text-micro font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] focus-ring"
            aria-label="Expand full answer"
          >
            Expand
          </button>
        )}
        {!isUser && message.citations && message.citations.length >= 0 && (
          <CitationChips
            citations={message.citations}
            messageId={message.id}
            onCitationClick={onCitationClick}
          />
        )}
        {!isUser && (() => {
          const pipeline = message.pipeline ?? (message.citations?.length
            ? {
                stage: 'complete' as const,
                metrics: { embedMs: 45, retrieveMs: 72, generateMs: 180 },
                retrieved: message.citations.map((c) => {
                  const card = getCardById(c.cardId)
                  return { title: card ? `${card.title} · ${card.org}` : c.cardId, score: c.score ?? 0.9 };
                }),
              }
            : null);
          return pipeline ? (
            <PipelineStatus
              stage={pipeline.stage}
              metrics={pipeline.metrics}
              retrieved={pipeline.retrieved}
              engineerView={engineerView}
            />
          ) : null;
        })()}
      </div>
    </div>
  )
}
