/**
 * Shared layout wrapper for every CenterPanel section.
 * Provides consistent padding, bottom border, and the eyebrow/title/subtitle
 * header pattern used across Hero, Timeline, Projects, and Skills.
 */
export function SectionShell({
  id,
  label,
  title,
  subtitle,
  last = false,
  children,
}: {
  id:        string
  label:     string
  title:     string
  subtitle?: string
  /** Omit the bottom border on the final section */
  last?:     boolean
  children:  React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-label={label}
      style={{
        padding:      'var(--section-pad, 3rem) var(--section-x, 2rem) var(--section-pad-b, 2.5rem)',
        borderBottom: last ? 'none' : '1px solid var(--border)',
      }}
    >
      {/* Eyebrow + title */}
      <div style={{ marginBottom: '2rem' }}>
        <p
          className="font-body"
          style={{
            fontSize:      '11px',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--accent)',
            marginBottom:  '0.4rem',
          }}
        >
          {label}
        </p>
        <h2 style={{ margin: 0, lineHeight: 1.15 }}>{title}</h2>
        {subtitle && (
          <p
            className="font-body"
            style={{ fontSize: '14px', color: 'var(--text-subtle)', marginTop: '0.4rem' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  )
}
