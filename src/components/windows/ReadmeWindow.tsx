'use client'

import { Terminal } from 'lucide-react'
import { useWindowManager } from '@/context/WindowManagerContext'

export function ReadmeWindow() {
  const { openWindow } = useWindowManager()

  return (
    <div className="readme-window">
      <pre>{`# Abhinav OS
A portfolio you can query.

Start with Terminal if you want the fastest overview.
Open Projects if you want system details.
Open Resume if you need the formal version.`}</pre>
      <button type="button" className="os-button os-button--primary" onClick={() => openWindow('terminal')}>
        <Terminal size={15} />
        Open Terminal
      </button>
    </div>
  )
}
