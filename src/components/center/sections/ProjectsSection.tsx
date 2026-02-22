'use client'

import { useEffect, useRef }  from 'react'
import { SectionShell }       from './SectionShell'
import { featuredProjects }   from '@/data/portfolio'
import type { ProjectCard }   from '@/data/portfolio'
import { Tag }                from '@/components/common/Tag'
import { usePortfolioStore }  from '@/store/portfolioStore'
import { useBreakpoint }      from '@/lib/useBreakpoint'
import { AskButton }          from './AskButton'

export function ProjectsSection() {
  const setChatInputDraft    = usePortfolioStore((s) => s.setChatInputDraft)
  const setPendingAutoSubmit = usePortfolioStore((s) => s.setPendingAutoSubmit)
  const setChatOpenMobile    = usePortfolioStore((s) => s.setChatOpenMobile)
  const { isNarrow }         = useBreakpoint()

  const handleAsk = (prompt: string) => {
    setChatInputDraft(prompt)
    setPendingAutoSubmit(true)
    if (isNarrow) setChatOpenMobile(true)
  }

  return (
    <SectionShell
      id="projects"
      label="Projects"
      title="Featured Work"
      subtitle="Outcome-first — what moved the needle, and how"
    >
      <div
        style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           '1.25rem',
        }}
      >
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onAsk={handleAsk}
          />
        ))}
      </div>
    </SectionShell>
  )
}

// ── Single project card ───────────────────────────────────────────────────────

function ProjectCard({ project, onAsk }: { project: ProjectCard; onAsk: (prompt: string) => void }) {
  const articleRef         = useRef<HTMLElement>(null)
  const pulseElementId     = usePortfolioStore((s) => s.pulseElementId)
  const setPulseElementId  = usePortfolioStore((s) => s.setPulseElementId)

  // REQ-CPI-1: apply glow animation when this card is cited
  useEffect(() => {
    if (pulseElementId !== project.id) return
    const el = articleRef.current
    if (!el) return

    // Remove then re-add the class to retrigger the animation if cited twice
    el.classList.remove('project-card-pulse')
    // Force a reflow so removing + adding the class triggers the animation fresh
    void el.offsetWidth
    el.classList.add('project-card-pulse')

    // Clear the store signal so other cards don't react
    setPulseElementId(null)

    // Remove the CSS class after the animation completes (2 s)
    const timer = setTimeout(() => {
      el.classList.remove('project-card-pulse')
    }, 2000)

    return () => clearTimeout(timer)
  }, [pulseElementId, project.id, setPulseElementId])

  return (
    /*
     * id="${project.id}" is the stable deep-link target.
     * REQ-CPI-1: the `project-card-pulse` CSS class adds the 2 s glow animation.
     */
    <article
      ref={articleRef}
      id={project.id}
      aria-label={project.title}
      style={{
        padding:         '1.25rem 1.5rem',
        backgroundColor: 'var(--surface)',
        border:          '1px solid var(--border)',
        borderRadius:    'var(--radius-lg)',
        boxShadow:       '0 1px 4px rgb(0 0 0 / 0.06)',
        transition:      'box-shadow var(--motion-enter) var(--ease)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgb(0 0 0 / 0.1)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgb(0 0 0 / 0.06)'
      }}
    >
      {/* Header row: title + period */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          gap:            '0.75rem',
          marginBottom:   '0.6rem',
          flexWrap:       'wrap',
        }}
      >
        <div>
          <h3
            className="font-heading"
            style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.2 }}
          >
            {project.title}
          </h3>
          <p
            className="font-body"
            style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '2px' }}
          >
            {project.org} · {project.period}
          </p>
        </div>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href === '#' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="font-body"
                style={{
                  fontSize:        '11px',
                  fontWeight:      500,
                  padding:         '3px 9px',
                  borderRadius:    'var(--radius-pill)',
                  backgroundColor: 'var(--surface-2)',
                  color:           'var(--text-muted)',
                  border:          '1px solid var(--border)',
                  textDecoration:  'none',
                  transition:      'color var(--motion-enter) var(--ease), background-color var(--motion-enter) var(--ease)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.color           = 'var(--accent)'
                  el.style.backgroundColor = 'var(--accent-weak)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.color           = 'var(--text-muted)'
                  el.style.backgroundColor = 'var(--surface-2)'
                }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Outcome headline — bold metric spans rendered from **…** syntax */}
      <p
        className="font-body"
        style={{
          fontSize:     '14px',
          lineHeight:   1.6,
          color:        'var(--text)',
          marginBottom: '0.875rem',
          fontWeight:   500,
        }}
      >
        <BoldMetrics text={project.outcome} />
      </p>

      {/* Detail bullets */}
      <ul
        style={{
          paddingLeft:   '1.1rem',
          margin:        0,
          display:       'flex',
          flexDirection: 'column',
          gap:           '0.3rem',
          marginBottom:  '1rem',
        }}
      >
        {project.bullets.map((b, i) => (
          <li
            key={i}
            className="font-body"
            style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--text-subtle)', listStyleType: 'disc' }}
          >
            {b}
          </li>
        ))}
      </ul>

      {/* Tags + Ask button row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem' }}>
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} variant="project" />
        ))}
        {project.prompt && (
          <div style={{ marginLeft: 'auto', paddingLeft: '0.5rem', flexShrink: 0 }}>
            <AskButton onClick={() => onAsk(project.prompt!)} />
          </div>
        )}
      </div>
    </article>
  )
}

// ── Tiny **bold** renderer ────────────────────────────────────────────────────
// Converts "**text**" segments to <strong> without a markdown dependency.

function BoldMetrics({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} style={{ color: 'var(--accent)', fontWeight: 700 }}>
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
