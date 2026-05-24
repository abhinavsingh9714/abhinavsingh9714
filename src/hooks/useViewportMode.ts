'use client'

import { useEffect, useState } from 'react'

export type ViewportMode = 'desktop' | 'tablet' | 'mobile'

function getMode(width: number): ViewportMode {
  if (width < 768) return 'mobile'
  if (width < 1280) return 'tablet'
  return 'desktop'
}

export function useViewportMode() {
  const [width, setWidth] = useState(1440)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return {
    width,
    mode: getMode(width),
    isDesktop: width >= 1280,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1280,
  }
}
