'use client'

import { useState, useEffect } from 'react'

/** Breakpoint thresholds — keep in sync with globals.css --breakpoint-* vars */
export const BP_SM       = 640    // mobile  < 640
export const BP_COLLAPSE = 900    // shell left panel collapses < 900
export const BP_LG       = 1024   // "desktop" ≥ 1024

export function useBreakpoint() {
  // SSR-safe default: assume widest viewport so columns render on server.
  const [width, setWidth] = useState<number>(BP_LG)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    handler()   // read immediately after mount
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    width,
    isMobile:   width < BP_SM,
    isTablet:   width >= BP_SM  && width < BP_COLLAPSE,
    isNarrow:   width < BP_COLLAPSE,   // left panel collapses
    isDesktop:  width >= BP_LG,
  }
}
