'use client'

import { useEffect, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Traps keyboard focus inside `containerRef` while `active` is true.
 *
 * • Tab   cycles forward through focusable elements within the container.
 * • Shift+Tab cycles backward.
 * • Focus is moved to the first focusable element when the trap activates.
 * • All focus returns to `returnRef` when the trap deactivates (ESC or close).
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  returnRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    if (!container) return

    // Move focus into the trap on activation
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE)
    )
    focusable[0]?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const els = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      )
      if (els.length === 0) return

      const first = els[0]
      const last  = els[els.length - 1]

      if (e.shiftKey) {
        // Backward — if focus is on first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        // Forward — if focus is on last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Return focus to trigger element when trap deactivates
      returnRef?.current?.focus()
    }
  }, [active, containerRef, returnRef])
}
