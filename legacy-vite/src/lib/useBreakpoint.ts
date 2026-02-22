import { useState, useEffect } from 'react'

const SM = 640
const LG = 1024

function getInitialWidth(): number {
  if (typeof window === 'undefined') return LG
  return window.innerWidth
}

export function useBreakpoint() {
  const [width, setWidth] = useState(getInitialWidth)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    isMobile: width < SM,
    isTablet: width >= SM && width < LG,
    isDesktop: width >= LG,
  }
}
