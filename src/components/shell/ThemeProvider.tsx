'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store'

const STORAGE_KEY = 'portfolio-theme'
type Theme = 'light' | 'dark'

interface Props {
  children: React.ReactNode
  /** Theme used when nothing is stored and OS has no preference. Defaults to 'dark'. */
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: Props) {
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)

  // Hydrate store from localStorage on first mount.
  // Falls back to OS preference, then defaultTheme (Warm Dark).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme(defaultTheme)
    }
  }, [setTheme, defaultTheme])

  // Keep <html> class and localStorage in sync with store
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Respond to OS-level changes only if user has not explicitly set a preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (localStorage.getItem(STORAGE_KEY)) return
      setTheme(media.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [setTheme])

  return <>{children}</>
}
