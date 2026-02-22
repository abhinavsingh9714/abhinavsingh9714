'use client'

import { useEffect }        from 'react'
import { HeroSection }      from './sections/HeroSection'
import { TimelineSection }  from './sections/TimelineSection'
import { ProjectsSection }  from './sections/ProjectsSection'
import { WritingSection }   from './sections/WritingSection'
import { SkillsSection }    from './sections/SkillsSection'
import { useCenterPanel }   from '@/components/shell/CenterPanelContext'
import { usePortfolioStore } from '@/store/portfolioStore'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * CenterPanel — compositor only.
 *
 * Section IDs
 * ───────────
 * #story        → HeroSection    (nav pill "Story")
 * #timeline     → TimelineSection
 * #projects     → ProjectsSection (nav pill "Projects")
 * #writing      → WritingSection  (nav pill "Writing")
 * #skills       → SkillsSection
 * #chat-anchor  → reserved for ChatPanel (nav pill "Chat")
 *
 * REQ-CPI-1: watches `targetScrollElementId` from portfolioStore.
 * When set, scrolls the panel container to the matching DOM element
 * (used when the chat cites a project card) then clears the id.
 */
export function CenterPanel() {
  const { scrollRef }           = useCenterPanel()
  const reducedMotion           = usePrefersReducedMotion()

  const targetScrollElementId   = usePortfolioStore((s) => s.targetScrollElementId)
  const setTargetScrollElementId = usePortfolioStore((s) => s.setTargetScrollElementId)
  const lastAutoScrollId         = usePortfolioStore((s) => s.lastAutoScrollId)
  const setLastAutoScrollId      = usePortfolioStore((s) => s.setLastAutoScrollId)

  useEffect(() => {
    if (!targetScrollElementId) return
    // Guard: don't repeat the same scroll (prevents loops)
    if (targetScrollElementId === lastAutoScrollId) {
      setTargetScrollElementId(null)
      return
    }

    const container = scrollRef.current
    if (!container) return

    const target = document.getElementById(targetScrollElementId)
    if (!target) {
      setTargetScrollElementId(null)
      return
    }

    // Scroll the panel container (not window) to keep the app-shell layout intact
    const containerTop  = container.getBoundingClientRect().top
    const targetTop     = target.getBoundingClientRect().top
    const currentScroll = container.scrollTop
    // Small top offset so the card isn't flush against the header
    const MARGIN = 24
    const offset = targetTop - containerTop + currentScroll - MARGIN

    container.scrollTo({
      top:      offset,
      behavior: reducedMotion ? 'instant' : 'smooth',
    })

    setLastAutoScrollId(targetScrollElementId)
    setTargetScrollElementId(null)
  }, [
    targetScrollElementId,
    lastAutoScrollId,
    scrollRef,
    reducedMotion,
    setTargetScrollElementId,
    setLastAutoScrollId,
  ])

  return (
    <div
      style={{
        '--section-pad':   '3rem',
        '--section-pad-b': '2.5rem',
        '--section-x':     '2rem',
      } as React.CSSProperties}
    >
      <HeroSection />
      <TimelineSection />
      <ProjectsSection />
      <WritingSection />
      <SkillsSection />

      {/* ── Chat anchor (kept for nav scroll target) ── */}
      <div id="chat-anchor" style={{ height: 0, overflow: 'hidden' }} aria-hidden />
    </div>
  )
}
