import { getCardById } from '@/data/resume_kb'
import type { Citation } from '@/lib/types'

interface CitationChipsProps {
  citations: Citation[]
  onCitationClick?: (cardId: string, messageId?: string) => void
  messageId?: string
}

export function CitationChips({ citations, onCitationClick, messageId }: CitationChipsProps) {
  if (citations.length === 0) {
    return (
      <div className="mt-3 pt-3 border-t border-[var(--border)] text-micro text-[var(--text-muted)]">
        Cited from: <span className="italic">Source unavailable</span>
      </div>
    )
  }

  return (
    <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
      <span className="text-micro text-[var(--text-muted)] shrink-0">Cited from:</span>
      <span className="flex flex-wrap gap-1.5">
        {citations.map((c) => {
          const card = getCardById(c.cardId)
          const label = card ? `${card.title} · ${card.org}` : c.cardId
          return (
            <button
              key={c.cardId}
              type="button"
              onClick={() => onCitationClick?.(c.cardId, messageId)}
              className="citation-chip"
              aria-label={`View citation: ${label}`}
            >
              {label}
            </button>
          )
        })}
      </span>
    </div>
  )
}
