'use client'

import { useMemo } from 'react'
import { useAppStore } from '@/store'
import { useDebouncedValue } from '@/lib/useDebouncedValue'
import { resumeSections, topHighlightCardIds } from '@/data/resume_kb'
import { ResumeCard } from './ResumeCard'
import type { ResumeSection } from '@/lib/types'

const SECTION_LABELS: Record<ResumeSection, string> = {
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  education: 'Education',
}

export function ResumeSidebar() {
  const sidebarSearch = useAppStore((s) => s.sidebarSearch)
  const setSidebarSearch = useAppStore((s) => s.setSidebarSearch)
  const debouncedQuery = useDebouncedValue(sidebarSearch, 200)

  const filteredSections = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim()
    if (!q) return resumeSections
    const result: Partial<typeof resumeSections> = {}
    for (const [section, cards] of Object.entries(resumeSections) as [ResumeSection, typeof resumeSections[ResumeSection]][]) {
      const matched = cards.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.org.toLowerCase().includes(q) ||
          c.bullets.some((b) => b.toLowerCase().includes(q)) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      )
      if (matched.length > 0) result[section] = matched
    }
    return result as typeof resumeSections
  }, [debouncedQuery])

  const topCards = useMemo(
    () =>
      topHighlightCardIds
        .map((id) =>
          Object.values(resumeSections)
            .flat()
            .find((c) => c.id === id)
        )
        .filter(Boolean),
    []
  )

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="flex-none px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <input
          type="search"
          placeholder="Search resume…"
          value={sidebarSearch}
          onChange={(e) => setSidebarSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-xs rounded-md border bg-transparent outline-none transition-default"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text)',
            backgroundColor: 'var(--surface-2)',
          }}
        />
      </div>

      {/* Scrollable content */}
      <div className="scroll-pane flex-1 px-3 py-3 space-y-4">
        {/* Top Highlights (only when not searching) */}
        {!debouncedQuery && (
          <section>
            <h3
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Top Highlights
            </h3>
            <div className="space-y-2">
              {topCards.map((card) => card && <ResumeCard key={card.id} card={card} />)}
            </div>
          </section>
        )}

        {/* Sections */}
        {(Object.keys(filteredSections) as ResumeSection[]).map((section) => (
          <section key={section}>
            <h3
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              {SECTION_LABELS[section]}
            </h3>
            <div className="space-y-2">
              {filteredSections[section]?.map((card) => (
                <ResumeCard key={card.id} card={card} />
              ))}
            </div>
          </section>
        ))}

        {Object.keys(filteredSections).length === 0 && (
          <p className="text-xs text-center py-8" style={{ color: 'var(--text-subtle)' }}>
            No results for &ldquo;{debouncedQuery}&rdquo;
          </p>
        )}
      </div>
    </div>
  )
}
