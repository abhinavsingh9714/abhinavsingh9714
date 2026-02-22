'use client'

/**
 * AskButton — shared "Ask about this" CTA used across Projects, Writing, and Skills sections.
 * Matches the style of the Timeline section's button exactly.
 */

interface Props {
  onClick: () => void
  label?:  string
}

export function AskButton({ onClick, label = 'Ask about this' }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onClick()
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
        whiteSpace:      'nowrap',
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
      {/* Chat bubble icon */}
      <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M18 2H2a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm0 10H4.83L2 14.83V4h16v8z"/>
      </svg>
      {label}
    </button>
  )
}
