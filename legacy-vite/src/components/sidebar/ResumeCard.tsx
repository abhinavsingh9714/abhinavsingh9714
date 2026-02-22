import { useEffect, useRef, useState, memo } from 'react'
import type { ResumeCard as ResumeCardType } from '@/lib/types'

const DEFAULT_BULLETS = 2
const MAX_VISIBLE_TAGS = 5

interface ResumeCardProps {
  card: ResumeCardType
  highlight: boolean
  onHighlightClear?: () => void
}

export const ResumeCard = memo(function ResumeCard({ card, highlight, onHighlightClear }: ResumeCardProps) {
  const ref = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!highlight || !ref.current) return
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ref.current.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' })
    const t = setTimeout(() => {
      onHighlightClear?.()
    }, 2000)
    return () => clearTimeout(t)
  }, [highlight, onHighlightClear])

  const bulletCount = card.bullets.length
  const visibleBullets = expanded ? card.bullets : card.bullets.slice(0, DEFAULT_BULLETS)
  const remainingCount = bulletCount - DEFAULT_BULLETS
  const showExpand = !expanded && remainingCount > 0

  const visibleTags = card.tags.slice(0, MAX_VISIBLE_TAGS)
  const remainingTags = card.tags.length - MAX_VISIBLE_TAGS

  return (
    <article
      ref={ref}
      className={`resume-card ${highlight ? 'resume-card--highlight' : ''}`}
      data-card-id={card.id}
      aria-labelledby={`resume-card-title-${card.id}`}
    >
      <h3 id={`resume-card-title-${card.id}`} className="text-title font-bold text-[var(--text)]">{card.title}</h3>
      <p className="mt-0.5 text-micro text-[var(--text-muted)]">
        {card.org}{card.dates ? ` · ${card.dates}` : ''}
      </p>
      <ul className="mt-2 list-inside list-disc space-y-0.5 text-small text-[var(--text-subtle)] leading-relaxed">
        {visibleBullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {showExpand && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="resume-card-more mt-0.5 text-left text-micro font-medium text-[var(--primary)] hover:underline focus-ring rounded"
          aria-expanded={false}
          aria-label={`Show ${remainingCount} more bullets`}
        >
          +{remainingCount} more
        </button>
      )}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <span key={tag} className="resume-card-tag">
            {tag}
          </span>
        ))}
        {remainingTags > 0 && (
          <span className="resume-card-tag" aria-hidden>+{remainingTags}</span>
        )}
      </div>
    </article>
  )
})
