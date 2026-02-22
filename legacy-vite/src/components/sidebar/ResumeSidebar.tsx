import { useState, useMemo } from 'react'
import { ResumeSection, sectionOrder } from './ResumeSection'
import { SidebarSearch } from './SidebarSearch'
import { TopHighlights } from './TopHighlights'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { resumeSections } from '@/data/resume_kb'
import { useDebouncedValue } from '@/lib/useDebouncedValue'
import type { ResumeSection as SectionKey, ResumeCard } from '@/lib/types'

const sectionTitles: Record<SectionKey, string> = {
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  education: 'Education',
}

function filterCard(card: ResumeCard, query: string): boolean {
  if (!query.trim()) return true
  const q = query.toLowerCase()
  const searchable = [
    card.title,
    card.org,
    ...card.bullets,
    ...card.tags,
  ].join(' ').toLowerCase()
  return searchable.includes(q)
}

interface ResumeSidebarProps {
  highlightCardId: string | null
  onHighlightClear: () => void
}

export function ResumeSidebar({ highlightCardId, onHighlightClear }: ResumeSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebouncedValue(searchQuery, 250)
  const filteredSections = useMemo(() => {
    const out: Partial<Record<SectionKey, ResumeCard[]>> = {}
    for (const key of sectionOrder) {
      const cards = (resumeSections[key] ?? []).filter((c) => filterCard(c, debouncedQuery))
      if (cards.length > 0) out[key] = cards
    }
    return out
  }, [debouncedQuery])

  const hasData = Object.keys(resumeSections).length > 0 && Object.values(resumeSections).some((arr) => arr.length > 0)
  const hasFilteredResults = Object.keys(filteredSections).length > 0

  return (
    <div className="flex flex-col">
      <div className="space-y-6 p-3 md:p-4">
        <SidebarSearch value={searchQuery} onChange={setSearchQuery} />
        {hasData ? (
          <>
            <TopHighlights highlightCardId={highlightCardId} onHighlightClear={onHighlightClear} />
            {hasFilteredResults && (
              <div className="border-t border-[var(--border)] pt-6">
                <div className="space-y-8">
                  {sectionOrder.map((key) => {
                    const cards = filteredSections[key] ?? []
                    if (cards.length === 0) return null
                    return (
                      <ResumeSection
                        key={key}
                        sectionKey={key}
                        title={sectionTitles[key]}
                        cards={cards}
                        highlightCardId={highlightCardId}
                        onHighlightClear={onHighlightClear}
                      />
                    )
                  })}
                </div>
              </div>
            )}
            {!hasFilteredResults && (
              <p className="text-small text-[var(--color-muted)]">No cards match your search.</p>
            )}
          </>
        ) : (
          <>
            <div className="space-y-2">
              <div className="h-9 rounded bg-[var(--surface-2)]" />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
