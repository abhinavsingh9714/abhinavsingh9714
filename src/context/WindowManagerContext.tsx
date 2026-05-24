'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  cloneInitialWindows,
  defaultOpenWindows,
  type WindowId,
  type WindowState,
} from '@/lib/os/windowDefaults'

type WindowMap = Record<WindowId, WindowState>

interface WindowManagerValue {
  windows: WindowMap
  activeWindowId: WindowId
  activeWindow: WindowState
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  maximizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  updateWindowPosition: (id: WindowId, position: WindowState['position']) => void
  updateWindowSize: (
    id: WindowId,
    size: WindowState['size'],
    position?: WindowState['position'],
  ) => void
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null)

function getTopWindowId(windows: WindowMap): WindowId {
  const open = Object.values(windows).filter((window) => window.isOpen && !window.isMinimized)
  return (open.sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? 'terminal') as WindowId
}

function getNextZIndex(windows: WindowMap) {
  return Math.max(...Object.values(windows).map((window) => window.zIndex), 20) + 1
}

function getMaximizedRect() {
  if (typeof window === 'undefined') {
    return {
      position: { x: 16, y: 48 },
      size: { width: 960, height: 620 },
    }
  }

  return {
    position: { x: 16, y: 48 },
    size: {
      width: Math.max(320, window.innerWidth - 32),
      height: Math.max(320, window.innerHeight - 134),
    },
  }
}

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowMap>(() => cloneInitialWindows())
  const [activeWindowId, setActiveWindowId] = useState<WindowId>('terminal')

  const focusWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const nextZ = getNextZIndex(prev)
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: false,
          zIndex: nextZ,
        },
      }
    })
    setActiveWindowId(id)
  }, [])

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const nextZ = getNextZIndex(prev)
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      }
    })
    setActiveWindowId(id)
  }, [])

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const next = {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      }
      const nextActive = getTopWindowId(next)
      setActiveWindowId(nextActive)
      return next
    })
  }, [])

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const next = {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      }
      setActiveWindowId(getTopWindowId(next))
      return next
    })
  }, [])

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const state = prev[id]
      const nextZ = getNextZIndex(prev)

      if (state.isMaximized) {
        return {
          ...prev,
          [id]: {
            ...state,
            isMaximized: false,
            position: state.previousPosition ?? state.position,
            size: state.previousSize ?? state.size,
            zIndex: nextZ,
          },
        }
      }

      const rect = getMaximizedRect()
      return {
        ...prev,
        [id]: {
          ...state,
          isOpen: true,
          isMinimized: false,
          isMaximized: true,
          previousPosition: state.position,
          previousSize: state.size,
          position: rect.position,
          size: rect.size,
          zIndex: nextZ,
        },
      }
    })
    setActiveWindowId(id)
  }, [])

  const updateWindowPosition = useCallback((id: WindowId, position: WindowState['position']) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
        isMaximized: false,
      },
    }))
  }, [])

  const updateWindowSize = useCallback(
    (id: WindowId, size: WindowState['size'], position?: WindowState['position']) => {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          size,
          position: position ?? prev[id].position,
          isMaximized: false,
        },
      }))
    },
    [],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const top = getTopWindowId(windows)
      if (defaultOpenWindows.includes(top)) return
      closeWindow(top)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [windows, closeWindow])

  const value = useMemo<WindowManagerValue>(() => {
    const activeWindow = windows[activeWindowId] ?? windows.terminal
    return {
      windows,
      activeWindowId,
      activeWindow,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    }
  }, [
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  ])

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext)
  if (!context) {
    throw new Error('useWindowManager must be used inside WindowManagerProvider')
  }
  return context
}
