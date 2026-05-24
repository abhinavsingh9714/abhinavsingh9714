'use client'

import { useWindowManager } from '@/context/WindowManagerContext'
import { usePortfolioStore } from '@/store/portfolioStore'

export function StickyNote() {
  const { openWindow } = useWindowManager()
  const setChatInputDraft = usePortfolioStore((state) => state.setChatInputDraft)

  return (
    <button
      type="button"
      className="sticky-note"
      onClick={() => {
        setChatInputDraft('Why should I interview Abhinav?')
        openWindow('terminal')
      }}
    >
      <span>To do:</span>
      <strong>Ask Terminal why Abhinav fits.</strong>
      <em>Ship grounded RAG</em>
      <em>Keep answers cited</em>
      <small>Click for recruiter shortcut</small>
    </button>
  )
}
