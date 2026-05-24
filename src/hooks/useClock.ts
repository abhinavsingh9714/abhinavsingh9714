'use client'

import { useEffect, useState } from 'react'

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function useClock() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatTime(new Date())), 1000 * 30)
    return () => window.clearInterval(interval)
  }, [])

  return time
}
