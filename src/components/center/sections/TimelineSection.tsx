'use client'

import { useState }          from 'react'
import { SectionShell }      from './SectionShell'
import { timeline }          from '@/data/portfolio'
import type { TimelineNode } from '@/data/portfolio'
import { Tag }               from '@/components/common/Tag'
import { usePortfolioStore } from '@/store/portfolioStore'
import { useBreakpoint }    from '@/lib/useBreakpoint'

// Colour accent per node kind
const KIND_COLOR: Record<TimelineNode['kind'], string> = {
  work:      'var(--accent)',
  education: 'var(--primary)',
  project:   'var(--success)',
}
const KIND_LABEL: Record<TimelineNode['kind'], string> = {
  work:      'Work',
  education: 'Education',
  project:   'Project',
}

export function TimelineSection() {
  const [open, setOpen] = useState<Set<string>>(new Set())

  // REQ-CPI-2: store actions
  const setChatInputDraft   = usePortfolioStore((s) => s.setChatInputDraft)
  const setPendingAutoSubmit = usePortfolioStore((s) => s.setPendingAutoSubmit)
  const setChatOpenMobile   = usePortfolioStore((s) => s.setChatOpenMobile)
  const { isNarrow }        = useBreakpoint()

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  /**
   * REQ-CPI-2: populate the chat composer with the node's prompt.
   * On narrow viewports (no right panel visible) also opens the mobile modal.
   */
  const handleAskAbout = (node: TimelineNode) => {
    if (!node.prompt) return
    setChatInputDraft(node.prompt)
    if (node.autoSubmit) setPendingAutoSubmit(true)
    // On mobile the RightPanel is hidden — open the FAB modal instead
    if (isNarrow) setChatOpenMobile(true)
  }

  return (
    <SectionShell
      id="timeline"
      label="Timeline"
      title="Career & Education"
      subtitle="Tap a node to expand · click Ask to pre-fill the chat"
    >
      <div
        style={{
          position:    'relative',
          paddingLeft: '2rem',
        }}
      >
        {/* Vertical line */}
        <div
          aria-hidden
          style={{
            position:        'absolute',
            left:            '7px',
            top:             '8px',
            bottom:          '8px',
            width:           '2px',
            backgroundColor: 'var(--border)',
            borderRadius:    '1px',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {timeline.map((node, idx) => (
            <TimelineItem
              key={node.id}
              node={node}
              isOpen={open.has(node.id)}
              onToggle={() => toggle(node.id)}
              isLast={idx === timeline.length - 1}
              onAskAbout={() => handleAskAbout(node)}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

// ── Single timeline item ──────────────────────────────────────────────────────

function TimelineItem({
  node,
  isOpen,
  onToggle,
  isLast,
  onAskAbout,
}: {
  node:       TimelineNode
  isOpen:     boolean
  onToggle:   () => void
  isLast:     boolean
  onAskAbout: () => void
}) {
  const dotColor = KIND_COLOR[node.kind]

  return (
    <div
      style={{
        position:     'relative',
        paddingBottom: isLast ? 0 : '1.5rem',
      }}
    >
      {/* Node dot */}
      <div
        aria-hidden
        style={{
          position:        'absolute',
          left:            '-2rem',          /* cancel parent padding-left */
          top:             '3px',
          width:           '14px',
          height:          '14px',
          borderRadius:    '50%',
          backgroundColor: isOpen ? dotColor : 'var(--surface-3)',
          border:          `2px solid ${dotColor}`,
          transition:      'background-color var(--motion-enter) var(--ease)',
          zIndex:          1,
        }}
      />

      {/* Click target: year + title row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`tl-body-${node.id}`}
        className="font-body"
        style={{
          display:        'flex',
          alignItems:     'baseline',
          gap:            '0.6rem',
          width:          '100%',
          textAlign:      'left',
          background:     'none',
          border:         'none',
          padding:        0,
          cursor:         'pointer',
        }}
      >
        {/* Year badge */}
        <span
          className="font-mono"
          style={{
            fontSize:        '11px',
            color:           'var(--text-subtle)',
            whiteSpace:      'nowrap',
            flexShrink:      0,
            minWidth:        '80px',
          }}
        >
          {node.year}
        </span>

        {/* Title + org */}
        <span style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontSize:   '14px',
              fontWeight: 500,
              color:      isOpen ? 'var(--text)' : 'var(--text-muted)',
              transition: 'color var(--motion-enter) var(--ease)',
            }}
          >
            {node.title}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-subtle)', marginLeft: '0.4rem' }}>
            · {node.org}
          </span>
        </span>

        {/* Kind badge + chevron */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <span
            style={{
              fontSize:        '10px',
              fontWeight:      500,
              padding:         '2px 6px',
              borderRadius:    'var(--radius-sm)',
              backgroundColor: `color-mix(in srgb, ${dotColor} 15%, transparent)`,
              color:           dotColor,
            }}
          >
            {KIND_LABEL[node.kind]}
          </span>
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            aria-hidden
            style={{
              flexShrink:  0,
              color:       'var(--text-subtle)',
              transform:   isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition:  'transform var(--motion-enter) var(--ease)',
            }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Expandable card body
          CSS max-height transition: 0 → large value. This avoids JS height
          measurement while respecting prefers-reduced-motion via --motion-enter. */}
      <div
        id={`tl-body-${node.id}`}
        role="region"
        style={{
          maxHeight:   isOpen ? '400px' : '0',
          overflow:    'hidden',
          transition:  'max-height calc(var(--motion-enter) * 2) var(--ease-decel)',
        }}
      >
        <ul
          style={{
            marginTop:   '0.75rem',
            marginLeft:  '0',
            paddingLeft: '1rem',
            display:     'flex',
            flexDirection: 'column',
            gap:         '0.35rem',
          }}
        >
          {node.bullets.map((b, i) => (
            <li
              key={i}
              className="font-body"
              style={{
                fontSize:   '13px',
                lineHeight: 1.65,
                color:      'var(--text-subtle)',
                listStyleType: 'disc',
              }}
            >
              {b}
            </li>
          ))}
        </ul>

        {/* Skill tags — REQ-CPI-3: hover highlights same tag across all panels */}
        {node.tags && node.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem' }}>
            {node.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="timeline" />
            ))}
          </div>
        )}

        {/* REQ-CPI-2: Ask-about CTA — pre-fills the chat composer */}
        {node.prompt && (
          <div style={{ marginTop: '0.875rem' }}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAskAbout()
              }}
              className="font-body"
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             '0.35rem',
                fontSize:        '11px',
                fontWeight:      500,
                padding:         '4px 10px',
                borderRadius:    'var(--radius-pill)',
                border:          '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                backgroundColor: 'var(--accent-weak)',
                color:           'var(--accent)',
                cursor:          'pointer',
                transition:      'background-color var(--motion-enter) var(--ease), border-color var(--motion-enter) var(--ease)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent) 20%, transparent)'
                e.currentTarget.style.borderColor     = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-weak)'
                e.currentTarget.style.borderColor     = 'color-mix(in srgb, var(--accent) 40%, transparent)'
              }}
            >
              {/* Chat icon */}
              <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M18 2H2a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm0 10H4.83L2 14.83V4h16v8z"/>
              </svg>
              Ask about this
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
