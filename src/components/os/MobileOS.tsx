'use client'

import { FileText, FolderKanban, Mail, Terminal, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { Dock } from './Dock'
import { WindowContent } from './WindowContent'
import { profile } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'
import type { WindowId } from '@/lib/os/windowDefaults'

const mobileApps: Array<{ id: WindowId; label: string; icon: ReactNode }> = [
  { id: 'about', label: 'About', icon: <UserRound size={20} /> },
  { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
  { id: 'terminal', label: 'Terminal', icon: <Terminal size={20} /> },
  { id: 'resume', label: 'Resume', icon: <FileText size={20} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
]

export function MobileOS() {
  const { activeWindowId, windows, openWindow } = useWindowManager()
  const activeId = mobileApps.some((app) => app.id === activeWindowId) ? activeWindowId : 'terminal'
  const activeWindow = windows[activeId]

  return (
    <main className="mobile-os">
      <section className="mobile-hero">
        <p>Abhinav OS</p>
        <h1>{profile.name}</h1>
        <span>ML Engineer / AI Systems</span>
        <div className="mobile-quick-actions">
          <button type="button" onClick={() => openWindow('terminal')}>Ask Terminal</button>
          <button type="button" onClick={() => openWindow('projects')}>Projects</button>
          <button type="button" onClick={() => openWindow('resume')}>Resume</button>
        </div>
      </section>

      <nav className="mobile-tabs" aria-label="Mobile apps">
        {mobileApps.map((app) => (
          <button
            type="button"
            key={app.id}
            className={activeId === app.id ? 'is-active' : ''}
            onClick={() => openWindow(app.id)}
          >
            {app.icon}
            {app.label}
          </button>
        ))}
      </nav>

      <section className="mobile-panel" aria-label={activeWindow.title}>
        <div className="mobile-panel__title">{activeWindow.title}</div>
        <WindowContent id={activeId} />
      </section>

      <Dock />
    </main>
  )
}
