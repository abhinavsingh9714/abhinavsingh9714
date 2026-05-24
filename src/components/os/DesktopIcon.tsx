'use client'

import { desktopItems, type DesktopItem } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'

function ItemIcon({ kind }: { kind: DesktopItem['kind'] }) {
  if (kind === 'folder') {
    return (
      <span className="desktop-folder-art" aria-hidden>
        <span />
      </span>
    )
  }
  if (kind === 'terminal') {
    return (
      <span className="desktop-terminal-art" aria-hidden>
        <span>&gt;_</span>
      </span>
    )
  }
  return (
    <span className="desktop-file-art" aria-hidden>
      <span />
    </span>
  )
}

export function DesktopIcons() {
  const { openWindow } = useWindowManager()

  return (
    <div className="desktop-icons" aria-label="Desktop items">
      {desktopItems.map((item) => (
        <button
          type="button"
          className={[
            'desktop-icon',
            `desktop-icon--${item.id}`,
            `desktop-icon--${item.kind}`,
          ].join(' ')}
          key={item.id}
          onClick={() => openWindow(item.windowId)}
        >
          <span className="desktop-icon__glyph">
            <ItemIcon kind={item.kind} />
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
