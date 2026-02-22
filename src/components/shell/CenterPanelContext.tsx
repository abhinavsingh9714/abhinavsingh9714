'use client'

import { createContext, useContext, useRef, useCallback, type RefObject } from 'react'

export type NavSection = 'projects' | 'story' | 'writing' | 'chat'

/** Map from NavSection to the element id used in CenterPanel */
const SECTION_IDS: Record<NavSection, string> = {
  projects: 'projects',
  story:    'story',
  writing:  'writing',
  chat:     'chat-anchor',
}

interface CenterPanelContextValue {
  /** Ref attached to the <main> scroll container in AppShell */
  scrollRef: RefObject<HTMLElement | null>
  /**
   * Scrolls the center panel container to the named section.
   * Respects prefers-reduced-motion: passes behavior: 'instant' when reduced.
   */
  scrollToSection: (section: NavSection, reducedMotion?: boolean) => void
}

const CenterPanelContext = createContext<CenterPanelContextValue | null>(null)

export function CenterPanelProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null)

  const scrollToSection = useCallback(
    (section: NavSection, reducedMotion = false) => {
      const container = scrollRef.current
      if (!container) return

      const targetId = SECTION_IDS[section]
      const target = container.querySelector<HTMLElement>(`#${targetId}`)
      if (!target) return

      /*
       * We scroll the *container* (the panel-scroll <main>), not window.
       * scrollIntoView would scroll the nearest scrollable ancestor which
       * could be the window; instead compute the offset relative to the
       * container and use container.scrollTo.
       */
      const containerTop  = container.getBoundingClientRect().top
      const targetTop     = target.getBoundingClientRect().top
      const currentScroll = container.scrollTop
      const offset        = targetTop - containerTop + currentScroll

      container.scrollTo({
        top:      offset,
        behavior: reducedMotion ? 'instant' : 'smooth',
      })
    },
    []
  )

  return (
    <CenterPanelContext.Provider value={{ scrollRef, scrollToSection }}>
      {children}
    </CenterPanelContext.Provider>
  )
}

/** Consume inside Header and any other component that needs to trigger a scroll. */
export function useCenterPanel(): CenterPanelContextValue {
  const ctx = useContext(CenterPanelContext)
  if (!ctx) throw new Error('useCenterPanel must be used inside <CenterPanelProvider>')
  return ctx
}
