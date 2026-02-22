'use client'

import { useState, useEffect } from 'react'

type Period = 'morning' | 'afternoon' | 'evening'

function getPeriod(hour: number): Period {
  if (hour >= 5  && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  return 'evening'
}

const GREETING: Record<Period, string> = {
  morning:   'Good morning',
  afternoon: 'Good afternoon',
  evening:   'Good evening',
}

/**
 * Returns a greeting string based on the visitor's local time.
 * Hydration-safe: returns null on the first server render, then fills in
 * on the client so there's no mismatch.
 */
export function useTimeGreeting(): string | null {
  const [greeting, setGreeting] = useState<string | null>(null)

  useEffect(() => {
    const hour   = new Date().getHours()
    const period = getPeriod(hour)
    setGreeting(GREETING[period])
  }, [])

  return greeting
}
