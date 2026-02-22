'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/store'
import { useCenterPanel, type NavSection } from './CenterPanelContext'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// ── Nav pill data ────────────────────────────────────────────────────────────
const NAV_PILLS: { label: string; section: NavSection }[] = [
  { label: 'Projects', section: 'projects' },
  { label: 'Story',    section: 'story'    },
  { label: 'Writing',  section: 'writing'  },
  { label: 'Skills',     section: 'chat'     },
]

// Map NavSection → the DOM id used in CenterPanel
const SECTION_DOM_IDS: Record<NavSection, string> = {
  projects: 'projects',
  story:    'story',
  writing:  'writing',
  chat:     'chat-anchor',
}

/**
 * Returns the NavSection whose DOM element is most visible in the scroll pane.
 * Uses IntersectionObserver on the panel-scroll container.
 * Reads from a ref so the effect doesn't need the container as a dep.
 */
function useActiveSection(
  scrollRef: React.RefObject<HTMLElement | null>
): NavSection | null {
  const [active, setActive] = useState<NavSection | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Defer so the <main> has time to mount and assign the ref
    const tid = window.setTimeout(() => {
      const container = scrollRef.current
      if (!container) return

      observerRef.current?.disconnect()

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          if (visible.length === 0) return
          const id = visible[0].target.id
          const match = Object.entries(SECTION_DOM_IDS).find(([, v]) => v === id)
          if (match) setActive(match[0] as NavSection)
        },
        { root: container, threshold: 0.2 },
      )

      for (const domId of Object.values(SECTION_DOM_IDS)) {
        const el = container.querySelector<HTMLElement>(`#${domId}`)
        if (el) observerRef.current.observe(el)
      }
    }, 150)

    return () => {
      window.clearTimeout(tid)
      observerRef.current?.disconnect()
    }
  // scrollRef is stable (useRef), so empty deps is safe here
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return active
}

// ── Icon button definitions ──────────────────────────────────────────────────
// SVG paths kept minimal; full icons follow the 16×16 viewBox convention.
const ICON_BUTTONS = [
  {
    id:    'github',
    label: 'GitHub profile',
    href:  'https://github.com/abhinavsingh9714',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                 -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                 .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                 -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
                 .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
                 .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    ),
  },
  {
    id:    'linkedin',
    label: 'LinkedIn profile',
    href:  'https://www.linkedin.com/in/abhinavsingh9714/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708
                 c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943
                 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248
                 -.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521
                 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586
                 .173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25
                 c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016
                 a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
    ),
  },
  {
    id:    'resume',
    label: 'Download resume (PDF)',
    href:  '/resume.pdf',   // place PDF in /public/resume.pdf
    download: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5
                 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5
                 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
      </svg>
    ),
  },
] as const

// ── Component ────────────────────────────────────────────────────────────────
export function Header() {
  const theme          = useAppStore((s) => s.theme)
  const toggleTheme    = useAppStore((s) => s.toggleTheme)
  const { scrollToSection, scrollRef } = useCenterPanel()
  const reducedMotion  = usePrefersReducedMotion()
  const activeSection  = useActiveSection(scrollRef)

  const handleNavClick = (section: NavSection) => {
    scrollToSection(section, reducedMotion)
  }

  return (
    <nav
      aria-label="Site header"
      style={{
        position:             'fixed',
        inset:                '0 0 auto 0',
        height:               'var(--header-h)',
        zIndex:               50,
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'space-between',
        padding:              '0 1.25rem',
        gap:                  '1rem',
        backgroundColor:      'color-mix(in srgb, var(--surface) 78%, transparent)',
        backdropFilter:       'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderBottom:         '1px solid var(--border)',
      }}
    >
      {/* ── Left: monogram + name ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 min-w-0 flex-none">
        {/* Monogram badge */}
        <div
          aria-hidden
          style={{
            width:           '32px',
            height:          '32px',
            borderRadius:    'var(--radius-md)',
            backgroundColor: 'var(--accent)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
          }}
        >
          <span
            className="font-heading"
            style={{ fontSize: '14px', color: 'var(--bg)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            AS
          </span>
        </div>

        {/* Name */}
        <span
          className="font-heading hidden sm:block"
          style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1, whiteSpace: 'nowrap' }}
        >
          Abhinav Singh
        </span>

        {/* Role badge */}
        <span
          className="hidden lg:inline-flex items-center font-body"
          style={{
            padding:         '2px 8px',
            fontSize:        '11px',
            fontWeight:      500,
            letterSpacing:   '0.03em',
            backgroundColor: 'var(--accent-weak)',
            color:           'var(--accent)',
            borderRadius:    'var(--radius-sm)',
            border:          '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
            whiteSpace:      'nowrap',
          }}
        >
          ML Engineer
        </span>
      </div>

      {/* ── Center: glassmorphic nav pills ───────────────────────────────── */}
      <div
        role="navigation"
        aria-label="Content sections"
        style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '2px',
          padding:         '3px',
          borderRadius:    'var(--radius-pill)',
          backgroundColor: 'color-mix(in srgb, var(--surface-2) 70%, transparent)',
          backdropFilter:  'blur(8px)',
          border:          '1px solid var(--border)',
        }}
      >
        {NAV_PILLS.map(({ label, section }) => (
          <NavPill
            key={section}
            label={label}
            isActive={activeSection === section}
            onClick={() => handleNavClick(section)}
          />
        ))}
      </div>

      {/* ── Right: icon buttons ───────────────────────────────────────────── */}
      <div className="flex items-center gap-1 flex-none">
        {ICON_BUTTONS.map((btn) => (
          <IconButton
            key={btn.id}
            href={btn.href}
            label={btn.label}
            download={'download' in btn ? (btn.download as boolean) : false}
          >
            {btn.icon}
          </IconButton>
        ))}

        {/* Divider */}
        <div
          aria-hidden
          style={{
            width:           '1px',
            height:          '18px',
            backgroundColor: 'var(--border)',
            margin:          '0 4px',
          }}
        />

        {/* Theme toggle */}
        <IconButton
          onClick={toggleTheme}
          label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            /* Sun */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1
                       0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0
                       1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5
                       0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0
                       .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707
                       0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414
                       -1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5
                       0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707
                       0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
          ) : (
            /* Moon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278
                       7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733
                       0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266
                       2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
            </svg>
          )}
        </IconButton>
      </div>
    </nav>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface NavPillProps {
  label:    string
  isActive: boolean
  onClick:  () => void
}

function NavPill({ label, isActive, onClick }: NavPillProps) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className="font-body transition-default"
      style={{
        padding:         '5px 14px',
        fontSize:        '13px',
        fontWeight:      isActive ? 600 : 500,
        borderRadius:    'var(--radius-pill)',
        border:          'none',
        // Active pill gets a filled accent background; others are transparent
        backgroundColor: isActive
          ? 'var(--accent)'
          : 'transparent',
        color:           isActive ? 'var(--bg)' : 'var(--text-muted)',
        cursor:          'pointer',
        whiteSpace:      'nowrap',
        lineHeight:      1,
      }}
      onMouseEnter={(e) => {
        if (isActive) return   // already styled — don't override
        const el = e.currentTarget
        el.style.backgroundColor = 'color-mix(in srgb, var(--accent) 12%, transparent)'
        el.style.color           = 'var(--text)'
      }}
      onMouseLeave={(e) => {
        if (isActive) return
        const el = e.currentTarget
        el.style.backgroundColor = 'transparent'
        el.style.color           = 'var(--text-muted)'
      }}
      // Keep hover appearance when keyboard-focused so the ring + bg both show
      onFocus={(e) => {
        if (isActive) return
        const el = e.currentTarget
        el.style.backgroundColor = 'color-mix(in srgb, var(--accent) 12%, transparent)'
        el.style.color           = 'var(--text)'
      }}
      onBlur={(e) => {
        if (isActive) return
        const el = e.currentTarget
        el.style.backgroundColor = 'transparent'
        el.style.color           = 'var(--text-muted)'
      }}
    >
      {label}
    </button>
  )
}

interface IconButtonProps {
  children: React.ReactNode
  label:    string
  href?:    string
  download?: boolean
  onClick?: () => void
}

function IconButton({ children, label, href, download = false, onClick }: IconButtonProps) {
  const sharedStyle: React.CSSProperties = {
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    width:           '32px',
    height:          '32px',
    borderRadius:    'var(--radius-md)',
    border:          '1px solid transparent',
    backgroundColor: 'transparent',
    color:           'var(--text-muted)',
    cursor:          'pointer',
    transition:      `color var(--motion-enter) var(--ease),
                      background-color var(--motion-enter) var(--ease),
                      border-color var(--motion-enter) var(--ease)`,
  }

  const hoverIn  = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    el.style.color           = 'var(--text)'
    el.style.backgroundColor = 'var(--surface-2)'
    el.style.borderColor     = 'var(--border)'
  }
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    el.style.color           = 'var(--text-muted)'
    el.style.backgroundColor = 'transparent'
    el.style.borderColor     = 'transparent'
  }

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        title={label}
        target={download ? '_self' : '_blank'}
        rel={download ? undefined : 'noopener noreferrer'}
        download={download || undefined}
        style={sharedStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      style={sharedStyle}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {children}
    </button>
  )
}
