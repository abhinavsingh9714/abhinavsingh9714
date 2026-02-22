import { type ReactNode, useState, useEffect } from 'react'

interface LayoutProps {
  children: ReactNode
  engineerView: boolean
  onEngineerViewChange: (value: boolean) => void
  theme: 'light' | 'dark'
  onThemeToggle: () => void
}

const ENGINEER_VIEW_TOOLTIP = 'Shows pipeline metrics and citation scores in chat responses.'

export function Layout({ children, engineerView, onEngineerViewChange, theme, onThemeToggle }: LayoutProps) {
  const [showEngineerTooltip, setShowEngineerTooltip] = useState(false)

  useEffect(() => {
    if (!showEngineerTooltip) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowEngineerTooltip(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showEngineerTooltip])

  const handleSwitchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault()
      onEngineerViewChange(!engineerView)
    }
    if (e.key === 'Escape' && showEngineerTooltip) {
      setShowEngineerTooltip(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="relative z-20 shrink-0 border-b-2 border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition-default md:px-6 md:py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[length:var(--fs-h1)] font-bold tracking-tight text-[var(--text)]">Abhinav Singh Chauhan</h1>
            <p className="mt-0.5 text-[length:var(--fs-sm)] text-[var(--text-muted)]">Machine Learning Engineer</p>
          </div>
          <nav className="flex items-center gap-4" aria-label="Main">
            <a href="#resume" className="transition-default rounded px-2 py-1 text-small text-[var(--color-muted)] hover:text-[var(--color-text)] focus-ring">
              Resume
            </a>
            <a href="#chat" className="transition-default rounded px-2 py-1 text-small text-[var(--color-muted)] hover:text-[var(--color-text)] focus-ring">
              Chat
            </a>
            <button
              type="button"
              onClick={onThemeToggle}
              className="transition-default rounded p-1.5 text-small text-[var(--color-muted)] hover:text-[var(--color-text)] focus-ring"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364 2.636l-1.591 1.591M21 12h-2.25m-2.636 2.636L17.364 17.364M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
            <div
              className="engineer-view-switch-wrapper relative flex items-center gap-2"
              onMouseEnter={() => setShowEngineerTooltip(true)}
              onMouseLeave={() => setShowEngineerTooltip(false)}
            >
              <span id="engineer-view-label" className="text-small text-[var(--color-muted)] select-none">
                Engineer View
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={engineerView}
                aria-labelledby="engineer-view-label"
                aria-describedby={showEngineerTooltip ? 'engineer-view-tooltip' : undefined}
                className="engineer-view-switch focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] relative h-6 w-10 shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface-2)] transition-default aria-checked:bg-[var(--primary)]"
                onClick={() => onEngineerViewChange(!engineerView)}
                onKeyDown={handleSwitchKeyDown}
                onFocus={() => setShowEngineerTooltip(true)}
                onBlur={() => setShowEngineerTooltip(false)}
              >
                <span
                  className={`transition-motion absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow ${engineerView ? 'translate-x-4' : 'translate-x-0'}`}
                  aria-hidden
                />
              </button>
              {showEngineerTooltip && (
                <span
                  id="engineer-view-tooltip"
                  role="tooltip"
                  className="absolute left-0 bottom-full z-50 mb-1.5 max-w-[220px] rounded border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-micro text-[var(--text-subtle)] shadow-md"
                >
                  {ENGINEER_VIEW_TOOLTIP}
                </span>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="scroll-pane min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-[var(--bg)]">{children}</main>
      <footer className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] py-3">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center text-small text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Abhinav Singh Chauhan. Portfolio.</p>
        </div>
      </footer>
    </div>
  )
}
