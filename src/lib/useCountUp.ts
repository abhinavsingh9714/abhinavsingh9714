'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 → target using requestAnimationFrame.
 *
 * • Uses an ease-out-cubic curve for a natural deceleration feel.
 * • When `reducedMotion` is true the value jumps to `target` immediately
 *   (no rAF loop), respecting prefers-reduced-motion without any dependency
 *   on external animation libraries.
 * • The `duration` parameter controls the full animation length in ms.
 * • Returns the current interpolated integer value.
 */
export function useCountUp(
  target: number,
  duration = 1200,
  reducedMotion = false,
): number {
  const [value, setValue] = useState(0)
  const rafRef  = useRef<number | null>(null)
  const startTs = useRef<number | null>(null)

  useEffect(() => {
    // Reduced-motion: skip to final value on next tick (keeps hook API stable)
    if (reducedMotion) {
      setValue(target)
      return
    }

    // Reset before starting a new animation (handles target prop changes)
    setValue(0)
    startTs.current = null

    const tick = (timestamp: number) => {
      if (startTs.current === null) startTs.current = timestamp

      const elapsed  = timestamp - startTs.current
      const progress = Math.min(elapsed / duration, 1)

      // ease-out-cubic: fast start → smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)

      setValue(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, reducedMotion])

  return value
}
