'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/store'
import type { ResumeCard as ResumeCardType } from '@/lib/types'

interface Props {
  card: ResumeCardType
}

export const ResumeCard = memo(function ResumeCard({ card }: Props) {
  const highlightedCardId = useAppStore((s) => s.highlightedCardId)
  const setHighlightedCardId = useAppStore((s) => s.setHighlightedCardId)
  const isHighlighted = highlightedCardId === card.id
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Auto-scroll into view and clear highlight after animation
  useEffect(() => {
    if (!isHighlighted) return
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    const t = setTimeout(() => setHighlightedCardId(null), 1400)
    return () => clearTimeout(t)
  }, [isHighlighted, setHighlightedCardId])

  const visibleBullets = expanded ? card.bullets : card.bullets.slice(0, 2)

  return (
    <div
      ref={ref}
      className={`resume-card${isHighlighted ? ' resume-card--highlight' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-snug truncate" style={{ color: 'var(--text)' }}>
            {card.title}
          </p>
          <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
            {card.org}
            {card.dates && (
              <span style={{ color: 'var(--text-subtle)' }}> · {card.dates}</span>
            )}
          </p>
        </div>
      </div>

      <ul className="mt-1.5 space-y-0.5 pl-3" style={{ listStyleType: 'disc' }}>
        {visibleBullets.map((bullet, i) => (
          <li key={i} className="text-xs leading-relaxed" style={{ color: 'var(--text-subtle)' }}>
            {bullet}
          </li>
        ))}
      </ul>

      {card.bullets.length > 2 && (
        <button
          className="mt-1.5 text-xs transition-default"
          style={{ color: 'var(--primary)' }}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? '− Less' : `+ ${card.bullets.length - 2} more`}
        </button>
      )}

      {card.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {card.tags.map((tag) => (
            <span key={tag} className="resume-card-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
})
