import { ResumeCard } from './ResumeCard'
import { getCardById, topHighlightCardIds } from '@/data/resume_kb'
import type { ResumeCard as ResumeCardType } from '@/lib/types'

interface TopHighlightsProps {
  highlightCardId: string | null
  onHighlightClear: () => void
}

export function TopHighlights({ highlightCardId, onHighlightClear }: TopHighlightsProps) {
  const cards = topHighlightCardIds
    .map((id) => getCardById(id))
    .filter((c): c is ResumeCardType => c != null)
  if (cards.length === 0) return null
  return (
    <div>
      <h2 className="text-title-lg mb-3 font-semibold tracking-tight text-[var(--text)]">
        Top Highlights
      </h2>
      <div className="space-y-2">
        {cards.map((card) => (
          <ResumeCard
            key={card.id}
            card={card}
            highlight={highlightCardId === card.id}
            onHighlightClear={onHighlightClear}
          />
        ))}
      </div>
    </div>
  )
}
