import { useState } from 'react'
import { suggestedQuestionsPrimary, suggestedQuestionsMore } from '@/data/suggestedQuestions'

interface SuggestedPillsProps {
  onSelect: (question: string) => void
}

const categoryOrder = ['experience', 'projects', 'skills', 'education'] as const

export function SuggestedPills({ onSelect }: SuggestedPillsProps) {
  const [showMore, setShowMore] = useState(false)
  const primaryByCategory = categoryOrder.map((cat) => ({
    category: cat,
    questions: suggestedQuestionsPrimary.filter((q) => q.category === cat),
  }))

  return (
    <div className="space-y-3">
      <p className="text-small text-[var(--color-muted)]">
        Ask about my experience, projects, or skills—or type your own question below.
      </p>
      <p className="text-micro font-medium text-[var(--color-muted)]">Suggested questions</p>
      <div className="flex max-h-[5rem] flex-wrap gap-2 overflow-hidden sm:max-h-none sm:overflow-visible">
        {primaryByCategory.map(({ category, questions }) =>
          questions.length > 0 ? (
            <div key={category} className="flex flex-wrap gap-2">
              {questions.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => onSelect(q.label)}
                  className="suggestion-chip"
                  aria-label={`Ask: ${q.label}`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          ) : null
        )}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="suggestion-chip"
            aria-expanded={showMore}
            aria-haspopup="true"
            aria-label={showMore ? 'Close more questions' : 'More suggested questions'}
          >
            More
          </button>
          {showMore && (
            <div
              className="absolute left-0 top-full z-10 mt-1 max-h-48 w-72 overflow-auto rounded border border-[var(--border)] bg-[var(--surface)] py-1 shadow"
              role="menu"
            >
              {suggestedQuestionsMore.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onSelect(q.label)
                    setShowMore(false)
                  }}
                  className="transition-default w-full px-3 py-2 text-left text-small text-[var(--text)] hover:bg-[var(--primary-weak)] focus:bg-[var(--primary-weak)] focus-ring"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
