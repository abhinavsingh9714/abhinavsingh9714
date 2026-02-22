'use client'

import { useState, useMemo } from 'react'
import { SectionShell }      from './SectionShell'
import { skills }            from '@/data/portfolio'
import type { SkillKind }   from '@/data/portfolio'
import { Tag }               from '@/components/common/Tag'
import { usePortfolioStore } from '@/store/portfolioStore'

// ── Filter tabs ───────────────────────────────────────────────────────────────
type Filter = 'all' | SkillKind

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',    label: 'All'     },
  { value: 'domain', label: 'Domains' },
  { value: 'tool',   label: 'Tools'   },
]

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [activeTag,    setActiveTag]    = useState<string | null>(null)

  // REQ-CPI-3: drive global highlight from the click-selected tag too
  const setActiveHighlightTag = usePortfolioStore((s) => s.setActiveHighlightTag)

  const grouped = useMemo(() => {
    const filtered = activeFilter === 'all'
      ? skills
      : skills.filter((s) => s.kind === activeFilter)

    const map = new Map<string, typeof skills>()
    for (const skill of filtered) {
      const arr = map.get(skill.group) ?? []
      arr.push(skill)
      map.set(skill.group, arr)
    }
    return map
  }, [activeFilter])

  const handleTagClick = (label: string) => {
    const next = activeTag === label ? null : label
    setActiveTag(next)
    // Keep the global highlight in sync with the locally-selected tag so
    // other panels reflect the selection even after the pointer leaves.
    setActiveHighlightTag(next)
  }

  return (
    <SectionShell
      id="skills"
      label="Skills"
      title="Domains & Tools"
      subtitle="Hover or click a tag to highlight it across all panels"
      last
    >
      {/* ── Filter bar ──────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Skill filter"
        style={{
          display:         'flex',
          gap:             '4px',
          marginBottom:    '1.5rem',
          padding:         '3px',
          width:           'fit-content',
          backgroundColor: 'var(--surface-2)',
          borderRadius:    'var(--radius-pill)',
          border:          '1px solid var(--border)',
        }}
      >
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={activeFilter === value}
            onClick={() => {
              setActiveFilter(value)
              setActiveTag(null)
              setActiveHighlightTag(null)
            }}
            className="font-body"
            style={{
              padding:         '5px 14px',
              fontSize:        '12px',
              fontWeight:      activeFilter === value ? 600 : 400,
              borderRadius:    'var(--radius-pill)',
              border:          'none',
              cursor:          'pointer',
              backgroundColor: activeFilter === value ? 'var(--accent)' : 'transparent',
              color:           activeFilter === value ? 'var(--bg)'     : 'var(--text-muted)',
              transition:      'background-color var(--motion-enter) var(--ease), color var(--motion-enter) var(--ease)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Grouped tag grid ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {Array.from(grouped.entries()).map(([group, groupSkills]) => (
          <div key={group}>
            <p
              className="font-body"
              style={{
                fontSize:      '10px',
                fontWeight:    600,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color:         'var(--text-subtle)',
                marginBottom:  '0.5rem',
              }}
            >
              {group}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {groupSkills.map((skill) => (
                <Tag
                  key={skill.label}
                  label={skill.label}
                  variant="skill"
                  kind={skill.kind}
                  interactive
                  pressed={activeTag === skill.label}
                  onClick={handleTagClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Active tag callout */}
      {activeTag && (
        <div
          className="font-body"
          style={{
            marginTop:       '1.5rem',
            padding:         '0.75rem 1rem',
            backgroundColor: 'var(--surface-2)',
            border:          '1px solid var(--border)',
            borderRadius:    'var(--radius-md)',
            fontSize:        '13px',
            color:           'var(--text-subtle)',
          }}
        >
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{activeTag}</span>
          {' '}— see the{' '}
          <span style={{ color: 'var(--text)' }}>Projects</span>
          {' '}and{' '}
          <span style={{ color: 'var(--text)' }}>Timeline</span>
          {' '}sections for work using this skill.
        </div>
      )}
    </SectionShell>
  )
}
