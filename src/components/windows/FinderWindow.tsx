'use client'

import { MessageSquareText } from 'lucide-react'
import { timelineItems } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'
import { usePortfolioStore } from '@/store/portfolioStore'

export function FinderWindow() {
  const { openWindow } = useWindowManager()
  const setChatInputDraft = usePortfolioStore((state) => state.setChatInputDraft)

  return (
    <div className="finder-window">
      <aside className="finder-sidebar">
        {['Work', 'Education', 'AI Systems', 'Research', 'Writing'].map((item) => (
          <button type="button" key={item}>{item}</button>
        ))}
      </aside>
      <main className="finder-main">
        {timelineItems.map((item) => (
          <article key={`${item.period}-${item.title}`} className="timeline-card">
            <span>{item.period}</span>
            <h3>{item.title}</h3>
            <p className="timeline-org">{item.org}</p>
            <p>{item.detail}</p>
            <button
              type="button"
              className="text-action"
              onClick={() => {
                setChatInputDraft(`Tell me about Abhinav's ${item.title} experience at ${item.org}.`)
                openWindow('terminal')
              }}
            >
              <MessageSquareText size={14} />
              Ask Terminal
            </button>
          </article>
        ))}
      </main>
    </div>
  )
}
