'use client'

import { Window } from '@/components/windows/Window'
import { WindowContent } from './WindowContent'
import { useWindowManager } from '@/context/WindowManagerContext'
import type { WindowId } from '@/lib/os/windowDefaults'

const renderOrder: WindowId[] = [
  'finder',
  'about',
  'projects',
  'terminal',
  'notes',
  'skills',
  'resume',
  'contact',
  'readme',
  'links',
  'trash',
]

export function WindowLayer({ compact = false }: { compact?: boolean }) {
  const { windows, activeWindowId } = useWindowManager()

  if (compact) {
    const active = windows[activeWindowId]
    return (
      <div className="window-layer window-layer--compact">
        {active?.isOpen && !active.isMinimized && (
          <Window
            window={active}
            compact
            variant={active.id === 'terminal' ? 'terminal' : 'light'}
          >
            <WindowContent id={active.id} />
          </Window>
        )}
      </div>
    )
  }

  return (
    <div className="window-layer">
      {renderOrder.map((id) => {
        const state = windows[id]
        return (
          <Window
            key={id}
            window={state}
            variant={id === 'terminal' ? 'terminal' : 'light'}
          >
            <WindowContent id={id} />
          </Window>
        )
      })}
    </div>
  )
}
