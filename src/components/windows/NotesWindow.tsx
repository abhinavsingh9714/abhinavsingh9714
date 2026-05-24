'use client'

import { ExternalLink } from 'lucide-react'
import { writingItems } from '@/data/os'

export function NotesWindow() {
  return (
    <div className="notes-window">
      <aside className="notes-list">
        {writingItems.map((item) => (
          <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer">
            <strong>{item.title}</strong>
            <span>{item.source}</span>
          </a>
        ))}
      </aside>
      <main className="notes-reader">
        <p className="window-eyebrow">Selected Writing</p>
        <h2>Production ML notes</h2>
        {writingItems.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-action">
              <ExternalLink size={14} />
              Read
            </a>
          </article>
        ))}
      </main>
    </div>
  )
}
