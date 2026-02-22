'use client'

import { useState, useMemo } from 'react'
import { SectionShell }      from './SectionShell'
import { skills }            from '@/data/portfolio'
import type { SkillKind }   from '@/data/portfolio'
import { Tag }               from '@/components/common/Tag'
import { usePortfolioStore } from '@/store/portfolioStore'
import { useBreakpoint }     from '@/lib/useBreakpoint'

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
  const setChatInputDraft     = usePortfolioStore((s) => s.setChatInputDraft)
  const setPendingAutoSubmit  = usePortfolioStore((s) => s.setPendingAutoSubmit)
  const setChatOpenMobile     = usePortfolioStore((s) => s.setChatOpenMobile)
  const { isNarrow }          = useBreakpoint()

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
    setActiveHighlightTag(next)

    // Fire the chatbot automatically with a question about this skill
    if (next) {
      const prompt = `Tell me about Abhinav's experience with ${next} — where has he used it and what did he build?`
      setChatInputDraft(prompt)
      setPendingAutoSubmit(true)
      if (isNarrow) setChatOpenMobile(true)
    }
  }

  return (
    <SectionShell
      id="skills"
      label="Skills"
      title="Domains & Tools"
      subtitle="Click a skill to ask the chatbot about it · hover to highlight across panels"
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
            backgroundColor: 'color-mix(in srgb, var(--accent) 6%, var(--surface-2))',
            border:          '1px solid color-mix(in srgb, var(--accent) 25%, var(--border))',
            borderRadius:    'var(--radius-md)',
            fontSize:        '13px',
            color:           'var(--text-subtle)',
            display:         'flex',
            alignItems:      'center',
            gap:             '0.5rem',
            flexWrap:        'wrap',
          }}
        >
          <span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{activeTag}</span>
            {' '}— asking the chatbot about this skill now…
          </span>
        </div>
      )}
    </SectionShell>
  )
}
