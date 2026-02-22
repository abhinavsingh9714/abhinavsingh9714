'use client'

import { useCallback }  from 'react'
import { ChatUI }       from './ChatUI'
import { useAppStore }  from '@/store'
import type { Msg }     from '@/lib/chatReducer'

/**
 * RightPanel — the desktop (≥900 px) chat column.
 *
 * AppShell's <aside> provides width:25%, overflow:hidden.
 * ChatUI manages its own internal scroll pane; this div fills 100% height
 * and lets ChatUI's flex layout do the rest.
 */
export function RightPanel() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CitationTestBar />
      <ChatUI />
    </div>
  )
}

// ── REQ-CPI-1 dev/test helper ─────────────────────────────────────────────────
// Injects a mock completed assistant message that cites project-jira-agent.
// ChatUI's citation-watcher effect picks it up and fires scroll + pulse.

const MOCK_PROJECTS = [
  { id: 'project-jira-agent', label: 'Jira Agent' },
  { id: 'project-neuron',     label: 'Neuron'      },
  { id: 'project-slomo',      label: 'Slo-Mo'      },
] as const

function CitationTestBar() {
  const setMessages = useAppStore((s) => s.setMessages)

  const fireTestCitation = useCallback((projectId: string, label: string) => {
    const msg: Msg = {
      id:        `mock-${Date.now()}`,
      role:      'assistant',
      content:   `[test] Citing **${label}** — scroll and pulse should trigger on the project card.`,
      stage:     'complete',
      citations: [{ cardId: projectId, score: 0.97 }],
      metrics:   { embedMs: 12, retrieveMs: 34, generateMs: 210 },
    }
    setMessages((prev) => [...prev, msg])
  }, [setMessages])

  return (
    <div
      style={{
        flexShrink:      0,
        display:         'flex',
        flexWrap:        'wrap',
        alignItems:      'center',
        gap:             '6px',
        padding:         '6px 10px',
        borderBottom:    '1px solid var(--border)',
        backgroundColor: 'color-mix(in srgb, var(--accent) 6%, var(--surface))',
      }}
    >
      <span
        className="font-mono"
        style={{ fontSize: '10px', color: 'var(--text-subtle)', flexShrink: 0 }}
      >
        ⚗ test citation →
      </span>
      {MOCK_PROJECTS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => fireTestCitation(id, label)}
          className="font-body"
          style={{
            fontSize:        '10px',
            fontWeight:      500,
            padding:         '2px 8px',
            borderRadius:    'var(--radius-pill)',
            border:          '1px solid color-mix(in srgb, var(--accent) 35%, transparent)',
            backgroundColor: 'var(--accent-weak)',
            color:           'var(--accent)',
            cursor:          'pointer',
            transition:      'background-color var(--motion-enter) var(--ease)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent) 20%, transparent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-weak)'
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
