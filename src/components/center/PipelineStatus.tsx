'use client'

/**
 * PipelineStatus — engineer-view panel rendered under the latest assistant bubble.
 *
 * Shows:
 *  • Stage track (Embed → Retrieve → Generate) with live progress dots
 *  • Timing metrics (ms per stage) when complete and engineerView is on
 *  • Citations list (cardId + score) when present and engineerView is on
 */

import { useAppStore } from '@/store'
import type { Msg }    from '@/lib/chatReducer'

const STAGES = ['embedding', 'retrieving', 'generating'] as const
type Stage   = (typeof STAGES)[number]

const STAGE_LABEL: Record<Stage, string> = {
  embedding:  'Embed',
  retrieving: 'Retrieve',
  generating: 'Generate',
}

function stageIdx(s: string) {
  return STAGES.indexOf(s as Stage)
}

interface Props {
  message: Msg
}

export function PipelineStatus({ message }: Props) {
  const engineerView = useAppStore((s) => s.engineerView)

  const { stage, metrics, citations } = message
  if (!stage || stage === 'error') return null

  const isComplete = stage === 'complete'
  const activeIdx  = isComplete ? STAGES.length : stageIdx(stage)

  return (
    <div
      className="font-mono"
      style={{
        fontSize:        '11px',
        padding:         '0.5rem 0.75rem',
        marginBottom:    '0.375rem',
        backgroundColor: 'color-mix(in srgb, var(--surface-2) 80%, var(--bg))',
        border:          '1px solid var(--border)',
        borderRadius:    'var(--radius-md)',
        display:         'flex',
        flexDirection:   'column',
        gap:             '0.5rem',
      }}
    >
      {/* ── Stage track ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {STAGES.map((s, i) => {
          const done   = isComplete || i < activeIdx
          const active = !isComplete && i === activeIdx

          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {/* Connector line */}
              {i > 0 && (
                <div
                  style={{
                    width:           '16px',
                    height:          '1px',
                    backgroundColor: done ? 'var(--success)' : 'var(--border)',
                    transition:      'background-color 0.2s',
                  }}
                />
              )}

              {/* Stage label + dot */}
              <span
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '3px',
                  color:      done
                    ? 'var(--success)'
                    : active
                    ? 'var(--accent)'
                    : 'var(--text-subtle)',
                  transition: 'color 0.2s',
                }}
              >
                {/* Status indicator */}
                {done ? (
                  <span style={{ fontSize: '10px', lineHeight: 1 }}>✓</span>
                ) : active ? (
                  <span
                    style={{
                      display:         'inline-block',
                      width:           '6px',
                      height:          '6px',
                      borderRadius:    '50%',
                      backgroundColor: 'var(--accent)',
                      animation:       'thinking-pulse 1.2s ease-in-out infinite',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      display:         'inline-block',
                      width:           '6px',
                      height:          '6px',
                      borderRadius:    '50%',
                      backgroundColor: 'var(--border)',
                    }}
                  />
                )}

                {STAGE_LABEL[s]}

                {/* Per-stage timing (engineer view + complete) */}
                {engineerView && isComplete && metrics && (
                  <span style={{ color: 'var(--text-subtle)', fontSize: '10px' }}>
                    {s === 'embedding'  && `${metrics.embedMs}ms`}
                    {s === 'retrieving' && `${metrics.retrieveMs}ms`}
                    {s === 'generating' && `${metrics.generateMs}ms`}
                  </span>
                )}
              </span>
            </div>
          )
        })}

        {/* Overall latency badge */}
        {engineerView && isComplete && metrics && (
          <span
            style={{
              marginLeft:      'auto',
              color:           'var(--text-subtle)',
              fontSize:        '10px',
              whiteSpace:      'nowrap',
            }}
          >
            {metrics.embedMs + metrics.retrieveMs + metrics.generateMs}ms total
          </span>
        )}
      </div>

      {/* ── Citations (engineer view only) ─────────────────────────────── */}
      {engineerView && isComplete && citations && citations.length > 0 && (
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '3px',
            paddingTop:    '0.375rem',
            borderTop:     '1px solid var(--border)',
          }}
        >
          <span
            style={{
              fontSize:      '10px',
              fontWeight:    600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color:         'var(--text-subtle)',
              marginBottom:  '2px',
            }}
          >
            Citations
          </span>
          {citations.map((c) => (
            <div
              key={c.cardId}
              style={{
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'center',
                gap:            '0.5rem',
              }}
            >
              <span style={{ color: 'var(--accent)', fontWeight: 500 }}>
                {c.cardId}
              </span>
              <span
                style={{
                  color:           'var(--text-subtle)',
                  backgroundColor: 'var(--surface)',
                  border:          '1px solid var(--border)',
                  borderRadius:    'var(--radius-sm)',
                  padding:         '1px 5px',
                  fontSize:        '10px',
                }}
              >
                {(c.score * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
