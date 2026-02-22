'use client'

import { SectionShell }    from './SectionShell'
import { featuredPosts }   from '@/data/portfolio'
import type { WritingPost } from '@/data/portfolio'

export function WritingSection() {
  return (
    <SectionShell
      id="writing"
      label="Writing"
      title="Technical Writing"
      subtitle="Essays and insights on ML systems, GenAI architecture, and production lessons"
    >
      <div
        style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           '1.25rem',
        }}
      >
        {featuredPosts.map((post) => (
          <WritingCard key={post.id} post={post} />
        ))}
      </div>
    </SectionShell>
  )
}

// ── Platform badge config ─────────────────────────────────────────────────────

const PLATFORM_CONFIG = {
  medium: {
    label:     'Read on Medium ↗',
    ariaLabel: (title: string) => `Read "${title}" on Medium`,
  },
  linkedin: {
    label:     'View on LinkedIn ↗',
    ariaLabel: (title: string) => `View "${title}" on LinkedIn`,
  },
} as const

// ── Single writing card ───────────────────────────────────────────────────────

function WritingCard({ post }: { post: WritingPost }) {
  const platform = PLATFORM_CONFIG[post.kind]

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform.ariaLabel(post.title)}
      style={{
        display:         'block',
        padding:         '1.25rem 1.5rem',
        backgroundColor: 'var(--surface)',
        border:          '1px solid var(--border)',
        borderRadius:    'var(--radius-lg)',
        boxShadow:       '0 1px 4px rgb(0 0 0 / 0.06)',
        textDecoration:  'none',
        cursor:          'pointer',
        transition:      'box-shadow var(--motion-enter) var(--ease), border-color var(--motion-enter) var(--ease)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.boxShadow   = '0 4px 16px rgb(0 0 0 / 0.1)'
        el.style.borderColor = 'color-mix(in srgb, var(--accent) 35%, var(--border))'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.boxShadow   = '0 1px 4px rgb(0 0 0 / 0.06)'
        el.style.borderColor = 'var(--border)'
      }}
    >
      {/* Header row: title + platform badge */}
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
        <h3
          className="font-heading"
          style={{
            margin:     0,
            fontSize:   '1.05rem',
            color:      'var(--text)',
            lineHeight: 1.2,
            flex:       '1 1 0',
          }}
        >
          {post.title}
        </h3>

        <span
          className="font-body"
          style={{
            fontSize:        '11px',
            fontWeight:      500,
            padding:         '3px 9px',
            borderRadius:    'var(--radius-pill)',
            backgroundColor: 'var(--accent-weak)',
            color:           'var(--accent)',
            border:          '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
            whiteSpace:      'nowrap',
            flexShrink:      0,
          }}
        >
          {platform.label}
        </span>
      </div>

      {/* Hook — clamped to 2 lines */}
      <p
        className="font-body"
        style={{
          fontSize:        '13px',
          lineHeight:      1.65,
          color:           'var(--text-subtle)',
          marginBottom:    '0.75rem',
          display:         '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
          overflow:        'hidden',
        }}
      >
        {post.hook}
      </p>

      {/* Meta row: platform source + date + read time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlatformIcon kind={post.kind} />
        <span className="font-body" style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
          {post.date}
        </span>
        <span aria-hidden style={{ fontSize: '10px', color: 'var(--text-subtle)', opacity: 0.5 }}>·</span>
        <span className="font-body" style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
          {post.readTime}
        </span>
      </div>
    </a>
  )
}

// ── Platform icon ─────────────────────────────────────────────────────────────

function PlatformIcon({ kind }: { kind: WritingPost['kind'] }) {
  if (kind === 'linkedin') {
    return (
      <svg
        width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden
        style={{ color: 'var(--text-subtle)', flexShrink: 0 }}
      >
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
    )
  }
  return (
    <svg
      width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden
      style={{ color: 'var(--text-subtle)', flexShrink: 0 }}
    >
      <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.007 4.236-2.256 4.236-1.248 0-2.255-1.897-2.255-4.236 0-2.34 1.007-4.236 2.255-4.236C12.968 3.764 13.975 5.66 13.975 8zm1.8 0c0 2.096-.316 3.795-.706 3.795-.39 0-.707-1.7-.707-3.795 0-2.096.317-3.795.707-3.795.39 0 .706 1.699.706 3.795z"/>
    </svg>
  )
}
