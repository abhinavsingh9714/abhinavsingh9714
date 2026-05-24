'use client'

import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion'
import { TrafficLights } from './TrafficLights'
import { useWindowManager } from '@/context/WindowManagerContext'
import type { WindowState } from '@/lib/os/windowDefaults'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
  compact?: boolean
  variant?: 'light' | 'terminal'
}

export function Window({ window, children, compact = false, variant = 'light' }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useWindowManager()

  if (!window.isOpen || window.isMinimized) return null

  const isActive = activeWindowId === window.id
  const frame = (
    <motion.section
      aria-label={window.title}
      className={[
        'window-frame',
        variant === 'terminal' ? 'window-frame--terminal' : '',
        isActive ? 'window-frame--active' : '',
      ].filter(Boolean).join(' ')}
      initial={{ opacity: 0, scale: 0.985, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
      onMouseDown={() => focusWindow(window.id)}
    >
      <header
        className={[
          'window-titlebar',
          variant === 'terminal' ? 'window-titlebar--terminal' : '',
          'window-drag-handle',
        ].filter(Boolean).join(' ')}
        onDoubleClick={() => maximizeWindow(window.id)}
      >
        <TrafficLights
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
        />
        <div className="window-title">{window.title}</div>
      </header>
      <div className="window-body">{children}</div>
    </motion.section>
  )

  if (compact) {
    return (
      <div
        className="window-compact-shell"
        style={{ zIndex: window.zIndex }}
        onMouseDown={() => focusWindow(window.id)}
      >
        {frame}
      </div>
    )
  }

  return (
    <Rnd
      className="window-rnd"
      size={window.size}
      position={window.position}
      minWidth={window.minSize.width}
      minHeight={window.minSize.height}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: window.zIndex }}
      onMouseDown={() => focusWindow(window.id)}
      onDragStop={(_, data) => {
        updateWindowPosition(window.id, { x: data.x, y: data.y })
      }}
      onResizeStop={(_, __, ref, ___, position) => {
        updateWindowSize(
          window.id,
          {
            width: Number.parseInt(ref.style.width, 10),
            height: Number.parseInt(ref.style.height, 10),
          },
          position,
        )
      }}
    >
      {frame}
    </Rnd>
  )
}
