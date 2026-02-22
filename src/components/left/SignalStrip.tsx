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
        height:          '100%',
        padding:         '1.25rem 1rem',
        backgroundColor: 'var(--surface)',
      }}
    >
      {/* ── Identity widget box ─────────────────────────────────────────────── */}
      <div
        style={{
          borderRadius:    'var(--radius-lg, 12px)',
          border:          '1px solid color-mix(in srgb, var(--border) 70%, transparent)',
          backgroundColor: 'color-mix(in srgb, var(--surface-2) 60%, transparent)',
          padding:         '1.25rem 1rem',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          gap:             '0.875rem',
          textAlign:       'center',
        }}
      >
        {/* Avatar */}
        <Avatar size={160} />

        {/* Role + education */}
        <div>
          <p className="font-body" style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, lineHeight: 1 }}>
            {PROFILE.role}
          </p>
          <p className="font-body" style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '4px' }}>
            {PROFILE.education}
          </p>
        </div>

        {/* Divider */}
        <Divider />

        {/* Metric counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', width: '100%' }}>
          {METRICS.map((m) => (
            <MetricCell key={m.label} {...m} reducedMotion={reducedMotion} />
          ))}
        </div>

        {/* Divider */}
        <Divider />

        {/* Social icons row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.375rem' }}>
          <SocialLink href="https://github.com/abhinavsingh9714"           label="GitHub"   icon={<GitHubIcon />} />
          <SocialLink href="https://www.linkedin.com/in/abhinavsingh9714/" label="LinkedIn" icon={<LinkedInIcon />} />
          <SocialLink href="https://medium.com/@abhinavsingh9714"          label="Medium"   icon={<MediumIcon />} />
          <SocialLink href="mailto:abhinavschauhan14@gmail.com"             label="Email"    icon={<EmailIcon />} />
        </div>
      </div>

      {/* ── Breathing room ──────────────────────────────────────────────────── */}
      <div style={{ flexGrow: 1 }} />

      {/* ── Sign-off + CTA pinned to bottom ─────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <div style={{ textAlign: 'center' }}>
          <p
            className="font-body"
            style={{ fontSize: '11px', fontStyle: 'italic', color: 'var(--text-subtle)', lineHeight: 1.65, letterSpacing: '0.01em' }}
          >
            Systems over demos.<br />Deterministic over hype.
          </p>
        </div>
        <DownloadCTA />
      </div>
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/avatar.jpg"
      alt="Abhinav Singh"
      aria-hidden
      style={{
        width:        `${size}px`,
        height:       `${size}px`,
        borderRadius: `${r}px`,
        objectFit:    'cover',
        objectPosition: 'center top',
        flexShrink:   0,
        border:       '2px solid color-mix(in srgb, var(--accent) 35%, transparent)',
        display:      'block',
      }}
    />
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
        style={{ fontSize: '9px', color: 'var(--text-subtle)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}
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

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
    </svg>
  )
}

function MediumIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.007 4.236-2.256 4.236-1.248 0-2.255-1.897-2.255-4.236 0-2.34 1.007-4.236 2.255-4.236C12.968 3.764 13.975 5.66 13.975 8zm1.8 0c0 2.096-.316 3.795-.706 3.795-.39 0-.707-1.7-.707-3.795 0-2.096.317-3.795.707-3.795.39 0 .706 1.699.706 3.795z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
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
