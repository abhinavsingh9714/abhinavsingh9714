'use client'

/**
 * Shared Tag component — REQ-CPI-3
 *
 * Reads `activeHighlightTag` from the global portfolioStore. When any
 * component calls `setActiveHighlightTag(label)`, *every* Tag instance
 * with the same label reacts simultaneously — no prop drilling needed.
 *
 * Variant notes
 * ─────────────
 * • "skill" — pill with domain/tool accent; clickable (aria-pressed)
 * • "project" — subdued chip on project cards; non-interactive by default
 * • "timeline" — smallest, compact chip in timeline expand panels
 */

import { type CSSProperties, type MouseEvent, type FocusEvent } from 'react'
import { usePortfolioStore } from '@/store/portfolioStore'

export type TagVariant = 'skill' | 'project' | 'timeline'
export type TagKind    = 'domain' | 'tool' | 'neutral'

interface TagProps {
  label:     string
  variant?:  TagVariant
  kind?:     TagKind
  /** If true the tag behaves as a toggle button (aria-pressed). Default: false */
  interactive?: boolean
  /** Controlled pressed state — relevant only when interactive=true */
  pressed?:  boolean
  onClick?:  (label: string) => void
  style?:    CSSProperties
}

export function Tag({
  label,
  variant    = 'project',
  kind       = 'neutral',
  interactive = false,
  pressed    = false,
  onClick,
  style,
}: TagProps) {
  const activeHighlightTag    = usePortfolioStore((s) => s.activeHighlightTag)
  const setActiveHighlightTag = usePortfolioStore((s) => s.setActiveHighlightTag)

  const isHighlighted = activeHighlightTag === label

  // ── Visual config per variant ────────────────────────────────────────────
  const size: Record<TagVariant, { font: string; pad: string; radius: string }> = {
    skill:    { font: '12px', pad: '4px 12px', radius: 'var(--radius-pill)' },
    project:  { font: '11px', pad: '2px 8px',  radius: 'var(--radius-sm)'  },
    timeline: { font: '10px', pad: '2px 6px',  radius: 'var(--radius-sm)'  },
  }
  const { font, pad, radius } = size[variant]

  // Active (pressed) logic — only for skill variant with interactive=true
  const isActive = interactive && pressed

  // ── Color logic ──────────────────────────────────────────────────────────
  let bg:     string
  let color:  string
  let border: string

  if (isHighlighted) {
    // Highlight state — orange/accent ring regardless of kind
    bg     = 'var(--accent-weak)'
    color  = 'var(--accent)'
    border = '1px solid var(--accent)'
  } else if (isActive) {
    // Pressed/selected state (skill variant)
    if (kind === 'domain') {
      bg     = 'var(--accent-weak)'
      color  = 'var(--accent)'
      border = '1px solid var(--accent)'
    } else {
      bg     = 'var(--primary-weak)'
      color  = 'var(--primary)'
      border = '1px solid var(--primary)'
    }
  } else {
    // Default resting state
    bg     = 'var(--surface-2)'
    color  = 'var(--text-subtle)'
    border = '1px solid var(--border)'
  }

  const baseStyle: CSSProperties = {
    display:         'inline-block',
    fontSize:        font,
    fontWeight:      isHighlighted || isActive ? 600 : 500,
    padding:         pad,
    borderRadius:    radius,
    backgroundColor: bg,
    color,
    border,
    transition:      'background-color var(--motion-enter) var(--ease), color var(--motion-enter) var(--ease), border-color var(--motion-enter) var(--ease), box-shadow var(--motion-enter) var(--ease)',
    // Highlight glow ring (outline-based to avoid layout shift)
    boxShadow:       isHighlighted ? '0 0 0 2px var(--accent)' : 'none',
    ...style,
  }

  const handleMouseEnter = () => setActiveHighlightTag(label)
  const handleMouseLeave = () => setActiveHighlightTag(null)
  const handleFocus      = (_e: FocusEvent) => setActiveHighlightTag(label)
  const handleBlur       = (_e: FocusEvent) => setActiveHighlightTag(null)

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick?.(label)
  }

  if (interactive) {
    return (
      <button
        type="button"
        aria-pressed={isActive}
        className="font-body"
        style={{ ...baseStyle, cursor: 'pointer', lineHeight: 1 }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {label}
      </button>
    )
  }

  return (
    // Non-interactive tags are keyboard-focusable to trigger cross-panel highlight.
    // role="mark" signals "highlighted / tagged text" to AT; aria-label provides
    // a descriptive name when the visible text alone isn't self-explanatory.
    <span
      className="font-body"
      tabIndex={0}
      role="mark"
      aria-label={`skill tag: ${label}`}
      style={{ ...baseStyle, cursor: 'default', lineHeight: 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {label}
    </span>
  )
}
