import { ResumeCard } from './ResumeCard'
import type { ResumeCard as ResumeCardType, ResumeSection as SectionKey } from '@/lib/types'

interface ResumeSectionProps {
  sectionKey: SectionKey
  title: string
  cards: ResumeCardType[]
  highlightCardId: string | null
  onHighlightClear: () => void
}

const sectionOrder: SectionKey[] = ['experience', 'projects', 'skills', 'education']

export function ResumeSection({
  sectionKey,
  title,
  cards,
  highlightCardId,
  onHighlightClear,
}: ResumeSectionProps) {
  if (cards.length === 0) return null
  return (
    <section className="resume-section" data-section={sectionKey} aria-labelledby={`section-heading-${sectionKey}`}>
      <h2 id={`section-heading-${sectionKey}`} className="rounded px-1 py-2 text-small font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        {title}
      </h2>
      <div className="space-y-3 pt-1">
        {cards.map((card) => (
          <ResumeCard
            key={card.id}
            card={card}
            highlight={highlightCardId === card.id}
            onHighlightClear={onHighlightClear}
          />
        ))}
      </div>
    </section>
  )
}

export { sectionOrder }
