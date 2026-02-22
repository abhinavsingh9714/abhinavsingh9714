'use client'

import { useState } from 'react'
import { suggestedQuestionsPrimary, suggestedQuestionsMore } from '@/data/suggestedQuestions'

interface Props {
  onSelect: (question: string) => void
}

export function SuggestedPills({ onSelect }: Props) {
  const [showMore, setShowMore] = useState(false)
  const all = showMore
    ? [...suggestedQuestionsPrimary, ...suggestedQuestionsMore]
    : suggestedQuestionsPrimary

  return (
    <div className="px-4 pt-4 pb-2">
      <p className="text-xs mb-2" style={{ color: 'var(--text-subtle)' }}>
        Try asking:
      </p>
      <div className="flex flex-wrap gap-2">
        {all.map((q) => (
          <button
            key={q.label}
            className="suggestion-chip text-xs"
            onClick={() => onSelect(q.label)}
          >
            {q.label}
          </button>
        ))}
        <button
          className="suggestion-chip text-xs"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setShowMore((s) => !s)}
        >
          {showMore ? '− Less' : '+ More'}
        </button>
      </div>
    </div>
  )
}
