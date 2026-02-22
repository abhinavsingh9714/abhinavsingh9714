'use client'

import { useCountUp }              from '@/lib/useCountUp'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// ── Data ──────────────────────────────────────────────────────────────────────

const PROFILE = {
  initials:  'AS',
  name:      'Abhinav Singh Chauhan',
  role:      'ML Engineer',
  education: 'M.S. Data Science · UMD',
  tagline:   'Building production ML systems that think, retrieve, execute, and explain.',
}

/** Metrics animate from 0 → target on mount */
const METRICS = [
  { label: 'Years Experience',   value: 5,  suffix: '+' },
  { label: 'AI Systems Built',   value: 8,  suffix: '+' },
  { label: 'LLM Pipelines Shipped', value: 6, suffix: '' },
]

export type SignalStripLayout = 'sidebar' | 'topbar'

// ── Component ─────────────────────────────────────────────────────────────────

export function SignalStrip({ layout }: { layout: SignalStripLayout }) {
  const reducedMotion = usePrefersReducedMotion()
  const isSidebar     = layout === 'sidebar'

  return isSidebar
    ? <SidebarLayout reducedMotion={reducedMotion} />
    : <TopbarLayout  reducedMotion={reducedMotion} />
}

// ── Sidebar layout (vertical card) ───────────────────────────────────────────

function SidebarLayout({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      style={{
        display:         'flex',
        flexDirection:   'column',
        gap:             '1.25rem',
        padding:         '1.5rem 1.25rem',
        height:          '100%',
        backgroundColor: 'var(--surface)',
      }}
    >
      {/* Avatar + identity */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textAlign: 'center' }}>
        <Avatar size={64} />
        <div>
          <p className="font-heading" style={{ fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.2 }}>
            {PROFILE.name}
          </p>
          <p className="font-body" style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 500, marginTop: '3px' }}>
            {PROFILE.role}
          </p>
          <p className="font-body" style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '4px' }}>
            {PROFILE.education}
          </p>
        </div>
      </div>

      {/* Divider */}
      <Divider />

      {/* Metric counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        {METRICS.map((m) => (
          <MetricCell key={m.label} {...m} reducedMotion={reducedMotion} />
        ))}
      </div>

      {/* Divider */}
      <Divider />

      {/* Tagline */}
      <p
        className="font-body"
        style={{
          fontSize:   '12px',
          lineHeight: 1.6,
          color:      'var(--text-subtle)',
          fontStyle:  'italic',
          textAlign:  'center',
        }}
      >
        &ldquo;{PROFILE.tagline}&rdquo;
      </p>

      {/* CTA — pushed to bottom via flex-grow spacer */}
      <div style={{ flexGrow: 1 }} />

      {/* Social links row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        <SocialLink href="https://medium.com/@abhinavsingh9714" label="Medium profile" icon={<MediumIcon />} />
      </div>

      <DownloadCTA />
    </div>
  )
}

// ── Top-bar layout (horizontal card, <900 px) ─────────────────────────────────

function TopbarLayout({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="signal-strip-topbar"
      style={{
        display:         'flex',
        alignItems:      'center',
        gap:             '1rem',
        padding:         '0.625rem 1.25rem',
        backgroundColor: 'var(--surface)',
        borderBottom:    '1px solid var(--border)',
        flexWrap:        'wrap',          /* gracefully wraps on very small screens */
      }}
    >
      {/* Avatar + identity (compact) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
        <Avatar size={36} />
        <div>
          <p className="font-heading" style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.15 }}>
            {PROFILE.name}
          </p>
          <p className="font-body" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500 }}>
            {PROFILE.role} · {PROFILE.education}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--border)', flexShrink: 0 }} />

      {/* Metrics inline */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {METRICS.map((m) => (
          <MetricInline key={m.label} {...m} reducedMotion={reducedMotion} />
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flexGrow: 1 }} />

      {/* Medium link */}
      <SocialLink href="https://medium.com/@abhinavsingh9714" label="Medium profile" icon={<MediumIcon />} compact />

      {/* CTA compact */}
      <DownloadCTA compact />
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ size }: { size: number }) {
  const r = size * 0.22
  return (
    <div
      aria-hidden
      style={{
        width:           `${size}px`,
        height:          `${size}px`,
        borderRadius:    `${r}px`,
        backgroundColor: 'var(--accent)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
        border:          '2px solid color-mix(in srgb, var(--accent) 35%, transparent)',
      }}
    >
      <span
        className="font-heading"
        style={{
          fontSize:   `${size * 0.34}px`,
          color:      'var(--bg)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {PROFILE.initials}
      </span>
    </div>
  )
}

function Divider() {
  return (
    <div style={{ height: '1px', backgroundColor: 'var(--border)', flexShrink: 0 }} />
  )
}

interface MetricProps {
  label: string
  value: number
  suffix: string
  reducedMotion: boolean
}

function MetricCell({ label, value, suffix, reducedMotion }: MetricProps) {
  const current = useCountUp(value, 1100, reducedMotion)
  return (
    <div style={{ textAlign: 'center' }}>
      <p
        className="font-mono"
        style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text)', lineHeight: 1 }}
      >
        {current}
        <span style={{ fontSize: '13px', color: 'var(--accent)' }}>{suffix}</span>
      </p>
      <p
        className="font-body"
        style={{ fontSize: '10px', color: 'var(--text-subtle)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.06em' }}
      >
        {label}
      </p>
    </div>
  )
}

function MetricInline({ label, value, suffix, reducedMotion }: MetricProps) {
  const current = useCountUp(value, 1100, reducedMotion)
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
      <span className="font-mono" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)' }}>
        {current}<span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </span>
      <span className="font-body" style={{ fontSize: '10px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
    </div>
  )
}

function MediumIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.007 4.236-2.256 4.236-1.248 0-2.255-1.897-2.255-4.236 0-2.34 1.007-4.236 2.255-4.236C12.968 3.764 13.975 5.66 13.975 8zm1.8 0c0 2.096-.316 3.795-.706 3.795-.39 0-.707-1.7-.707-3.795 0-2.096.317-3.795.707-3.795.39 0 .706 1.699.706 3.795z"/>
    </svg>
  )
}

interface SocialLinkProps {
  href:    string
  label:   string
  icon:    React.ReactNode
  compact?: boolean
}

function SocialLink({ href, label, icon, compact = false }: SocialLinkProps) {
  const size = compact ? '28px' : '32px'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           size,
        height:          size,
        borderRadius:    'var(--radius-md)',
        border:          '1px solid transparent',
        backgroundColor: 'transparent',
        color:           'var(--text-muted)',
        cursor:          'pointer',
        transition:      'color var(--motion-enter) var(--ease), background-color var(--motion-enter) var(--ease), border-color var(--motion-enter) var(--ease)',
        textDecoration:  'none',
        flexShrink:      0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.color           = 'var(--text)'
        el.style.backgroundColor = 'var(--surface-2)'
        el.style.borderColor     = 'var(--border)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.color           = 'var(--text-muted)'
        el.style.backgroundColor = 'transparent'
        el.style.borderColor     = 'transparent'
      }}
    >
      {icon}
    </a>
  )
}

function DownloadCTA({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/resume.pdf"
      download="Abhinav_Singh_Resume.pdf"
      className="font-body"
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             '6px',
        padding:         compact ? '5px 12px' : '8px 16px',
        fontSize:        compact ? '12px' : '13px',
        fontWeight:      500,
        borderRadius:    'var(--radius-pill)',
        backgroundColor: 'var(--accent)',
        color:           'var(--bg)',
        border:          'none',
        textDecoration:  'none',
        cursor:          'pointer',
        whiteSpace:      'nowrap',
        transition:      `opacity var(--motion-enter) var(--ease),
                          transform var(--motion-press) var(--ease)`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
      onMouseDown={(e)  => { e.currentTarget.style.transform = 'translateY(1px)' }}
      onMouseUp={(e)    => { e.currentTarget.style.transform = 'none' }}
    >
      {/* Download arrow icon */}
      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
      </svg>
      {compact ? 'Resume' : 'Download Resume'}
    </a>
  )
}
