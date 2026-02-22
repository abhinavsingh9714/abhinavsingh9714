'use client'

import { useTimeGreeting } from '@/lib/useTimeGreeting'
import { hero }            from '@/data/portfolio'

export function HeroSection() {
  const greeting = useTimeGreeting()   // null on server, filled on client

  return (
    /*
     * No SectionShell here — hero has its own, more spacious treatment
     * and no eyebrow label. The section id="story" is kept so the nav pill
     * "Story" scrolls to the top of the content area.
     */
    <section
      id="story"
      aria-label="Introduction"
      style={{
        padding:      '4rem 2rem 3rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Time-based greeting — fades in once hydrated */}
      {greeting && (
        <p
          className="font-body"
          style={{
            fontSize:      '13px',
            fontWeight:    500,
            color:         'var(--accent)',
            letterSpacing: '0.04em',
            marginBottom:  '0.75rem',
            opacity:       greeting ? 1 : 0,
            transition:    'opacity var(--motion-enter) var(--ease)',
          }}
        >
          {greeting} —
        </p>
      )}

      {/* Name */}
      <h1 style={{ margin: 0, marginBottom: '0.5rem' }}>{hero.name}</h1>

      {/* Tagline */}
      <p
        className="font-heading"
        style={{
          fontSize:    'clamp(1.05rem, 2vw, 1.3rem)',
          color:       'var(--text-muted)',
          fontStyle:   'italic',
          marginBottom: '1.25rem',
          lineHeight:  1.45,
        }}
      >
        {hero.tagline}
      </p>

      {/* Intro paragraph */}
      <p
        className="font-body"
        style={{
          fontSize:   '15px',
          lineHeight: 1.7,
          color:      'var(--text-subtle)',
          maxWidth:   '58ch',
          marginBottom: '1.75rem',
        }}
      >
        {hero.intro}
      </p>

      {/* Location + status chips */}
      <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
        <Chip icon="📍">{hero.location}</Chip>
        <Chip icon="🟢" accent>{hero.status}</Chip>
      </div>
    </section>
  )
}

function Chip({
  children,
  icon,
  accent = false,
}: {
  children: React.ReactNode
  icon:     string
  accent?:  boolean
}) {
  return (
    <span
      className="font-body"
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             '5px',
        padding:         '4px 10px',
        fontSize:        '12px',
        fontWeight:      500,
        borderRadius:    'var(--radius-pill)',
        backgroundColor: accent ? 'var(--accent-weak)' : 'var(--surface-2)',
        color:           accent ? 'var(--accent)'      : 'var(--text-muted)',
        border:          `1px solid ${accent ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : 'var(--border)'}`,
      }}
    >
      <span aria-hidden style={{ fontSize: '11px' }}>{icon}</span>
      {children}
    </span>
  )
}
