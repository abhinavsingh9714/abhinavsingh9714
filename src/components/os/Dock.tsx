'use client'

import { dockApps, type DockApp } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'

function DockIconGraphic({ id }: { id: string }) {
  return (
    <span className={['mac-dock-art', `mac-dock-art--${id}`].join(' ')} aria-hidden>
      <span />
    </span>
  )
}

export function Dock() {
  const { windows, openWindow, focusWindow, activeWindowId } = useWindowManager()

  const handleClick = (app: DockApp) => {
    if (app.disabled) return
    if (app.href) {
      window.open(app.href, '_blank', 'noopener,noreferrer')
      return
    }
    if (!app.windowId) return
    if (windows[app.windowId].isOpen) {
      focusWindow(app.windowId)
    } else {
      openWindow(app.windowId)
    }
  }

  return (
    <nav className="dock" aria-label="Application dock">
      {dockApps.map((app) => {
        if (app.id.startsWith('separator')) {
          return <span className="dock-separator" key={app.id} aria-hidden />
        }

        const isOpen = app.windowId ? windows[app.windowId]?.isOpen : false
        const isActive = app.windowId ? activeWindowId === app.windowId : false
        return (
          <button
            type="button"
            key={app.id}
            className={[
              'dock-icon',
              `dock-icon--${app.id}`,
              app.id === 'terminal' ? 'dock-icon--terminal' : '',
              isOpen ? 'dock-icon--open' : '',
              isActive ? 'dock-icon--active' : '',
            ].filter(Boolean).join(' ')}
            aria-label={app.label}
            disabled={app.disabled}
            onClick={() => handleClick(app)}
          >
            <span className="dock-label">{app.label}</span>
            <DockIconGraphic id={app.id} />
            {isOpen && <span className="dock-dot" aria-hidden />}
          </button>
        )
      })}
    </nav>
  )
}
