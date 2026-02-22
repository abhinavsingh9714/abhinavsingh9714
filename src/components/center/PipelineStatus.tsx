'use client'

/**
 * PipelineStatus — engineer-view panel rendered under the latest assistant bubble.
 *
 * Shows:
 *  • Stage track (Embed → Retrieve → Generate) with live progress dots
 *  • Timing metrics (ms per stage) when complete and engineerView is on
 *  • Citations list (cardId + score) when present and engineerView is on
 */

import { useAppStore }       from '@/store'
import type { Msg }           from '@/lib/chatReducer'
import type { RetrievalChunk } from '@/lib/chatReducer'

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

  const { stage, metrics, citations, retrievalChunks } = message
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

      {/* ── Retrieved chunks (engineer view only) ──────────────────────── */}
      {engineerView && retrievalChunks && retrievalChunks.length > 0 && (
        <RetrievedChunksPanel chunks={retrievalChunks} />
      )}

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
                {c.chunkId ?? c.cardId}
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
                {((c.score ?? 0) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Retrieved Chunks sub-panel ────────────────────────────────────────────────

function RetrievedChunksPanel({ chunks }: { chunks: RetrievalChunk[] }) {
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           '4px',
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
        Retrieved Chunks
      </span>
      {chunks.map((c) => (
        <div
          key={c.chunkId}
          style={{
            display:         'flex',
            flexDirection:   'column',
            gap:             '2px',
            padding:         '4px 6px',
            backgroundColor: 'var(--surface)',
            border:          '1px solid var(--border)',
            borderRadius:    'var(--radius-sm)',
          }}
        >
          <div
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              gap:            '0.5rem',
            }}
          >
            <span
              style={{
                color:        'var(--accent)',
                fontWeight:   500,
                fontSize:     '10px',
                flex:         '1 1 0',
                overflow:     'hidden',
                textOverflow: 'ellipsis',
                whiteSpace:   'nowrap',
              }}
              title={c.chunkId}
            >
              {c.chunkId}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              {c.projectId && (
                <span
                  style={{
                    fontSize:        '9px',
                    padding:         '1px 4px',
                    borderRadius:    'var(--radius-sm)',
                    backgroundColor: 'var(--accent-weak)',
                    color:           'var(--accent)',
                    border:          '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                  }}
                >
                  project
                </span>
              )}
              <span
                style={{
                  color:           c.score >= 0.5 ? 'var(--success)' : 'var(--text-subtle)',
                  backgroundColor: 'var(--surface)',
                  border:          '1px solid var(--border)',
                  borderRadius:    'var(--radius-sm)',
                  padding:         '1px 5px',
                  fontSize:        '10px',
                  fontWeight:      600,
                }}
              >
                {(c.score * 100).toFixed(0)}%
              </span>
            </span>
          </div>
          <span
            style={{
              fontSize:    '10px',
              color:       'var(--text-muted)',
              lineHeight:  1.4,
              overflow:    'hidden',
              display:     '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            } as React.CSSProperties}
          >
            {c.snippet}
          </span>
        </div>
      ))}
    </div>
  )
}
