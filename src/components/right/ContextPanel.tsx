'use client'

import { useAppStore } from '@/store'

export function ContextPanel() {
  const activeCitations    = useAppStore((s) => s.activeCitations)
  const messages           = useAppStore((s) => s.messages)
  const setHighlightedCardId = useAppStore((s) => s.setHighlightedCardId)

  // Find last complete assistant message for metrics + citations
  const lastAssistant = [...messages].reverse().find(
    (m) => m.role === 'assistant' && m.stage === 'complete'
  )
  const metrics   = lastAssistant?.metrics
  const citations = lastAssistant?.citations ?? []

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex-none px-4 py-3 border-b text-xs font-semibold uppercase tracking-wide"
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
      >
        Context
      </div>

      <div className="scroll-pane flex-1 px-4 py-4 space-y-5">
        {citations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
              Cited sources will appear here after a response.
            </p>
          </div>
        )}

        {citations.length > 0 && (
          <section>
            <h4
              className="text-xs font-semibold mb-2 uppercase tracking-wide"
              style={{ color: 'var(--text-muted)' }}
            >
              Cited Sources
            </h4>
            <div className="space-y-2">
              {citations.map((c) => (
                <button
                  key={c.cardId}
                  className="w-full text-left px-3 py-2.5 rounded-md border transition-default"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                  onClick={() => setHighlightedCardId(c.cardId)}
                  title="Click to highlight in sidebar"
                >
                  <p className="text-xs font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                    {c.cardId}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-subtle)' }}>
                    score: {(c.score * 100).toFixed(0)}%
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Pipeline metrics */}
        {metrics && (
          <section>
            <h4
              className="text-xs font-semibold mb-2 uppercase tracking-wide"
              style={{ color: 'var(--text-muted)' }}
            >
              Pipeline Timing
            </h4>
            <div className="pipeline-capsule px-3 py-2 space-y-1.5">
              {[
                { label: 'Embed', value: metrics.embedMs },
                { label: 'Retrieve', value: metrics.retrieveMs },
                { label: 'Generate', value: metrics.generateMs },
              ].map(({ label, value }) =>
                value != null ? (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>{label}</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {value}ms
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
