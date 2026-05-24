'use client'

import { BatteryFull, Wifi } from 'lucide-react'
import { useClock } from '@/hooks/useClock'
import { useWindowManager } from '@/context/WindowManagerContext'

export function MenuBar() {
  const time = useClock()
  const { activeWindow, openWindow } = useWindowManager()

  return (
    <header className="menu-bar" aria-label="Desktop menu bar">
      <div className="menu-bar__left">
        <button type="button" className="menu-bar__brand" onClick={() => openWindow('about')}>
          Abhinav OS
        </button>
        <button type="button" onClick={() => openWindow('finder')}>Finder</button>
        <button type="button" onClick={() => openWindow('terminal')}>Terminal</button>
        <button type="button" onClick={() => openWindow('projects')}>Projects</button>
        <span className="menu-bar__active">{activeWindow.title}</span>
      </div>
      <div className="menu-bar__right" aria-label="System status">
        <span>RAG ready</span>
        <Wifi size={14} aria-hidden />
        <BatteryFull size={15} aria-hidden />
        <time>{time}</time>
      </div>
    </header>
  )
}
