'use client'

import { useRef, type PointerEvent } from 'react'
import { DesktopIcons } from './DesktopIcon'
import { Dock } from './Dock'
import { MenuBar } from './MenuBar'
import { MobileOS } from './MobileOS'
import { StickyNote } from './StickyNote'
import { WindowLayer } from './WindowLayer'
import { WindowManagerProvider } from '@/context/WindowManagerContext'
import { useViewportMode } from '@/hooks/useViewportMode'

export function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopInner />
    </WindowManagerProvider>
  )
}

function DesktopInner() {
  const { mode } = useViewportMode()
  const desktopRef = useRef<HTMLElement>(null)

  if (mode === 'mobile') {
    return <MobileOS />
  }

  const compact = mode === 'tablet'
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const element = desktopRef.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--cursor-x', `${event.clientX - rect.left}px`)
    element.style.setProperty('--cursor-y', `${event.clientY - rect.top}px`)
  }

  return (
    <main
      ref={desktopRef}
      className={['desktop', compact ? 'desktop--compact' : ''].filter(Boolean).join(' ')}
      onPointerMove={handlePointerMove}
    >
      <div className="desktop-wallpaper" aria-hidden />
      <div className="wallpaper-title" aria-hidden>
        <span className="wallpaper-title__small">welcome to my</span>
        <span className="wallpaper-title__script">portfolio.</span>
      </div>
      <MenuBar />
      {!compact && (
        <>
          <DesktopIcons />
          <StickyNote />
        </>
      )}
      <WindowLayer compact={compact} />
      <Dock />
    </main>
  )
}
