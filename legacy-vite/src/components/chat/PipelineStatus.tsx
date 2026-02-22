import { useState } from 'react'
import type { PipelineStage, PipelineMetrics, RetrievedSource } from '@/lib/types'

interface PipelineStatusProps {
  stage: PipelineStage
  metrics?: PipelineMetrics
  retrieved?: RetrievedSource[]
  engineerView?: boolean
}

const STAGES: { key: PipelineStage; label: string }[] = [
  { key: 'embedding', label: 'Embed' },
  { key: 'retrieving', label: 'Retrieve' },
  { key: 'generating', label: 'Generate' },
]

const STAGE_ORDER: PipelineStage[] = ['idle', 'embedding', 'retrieving', 'generating', 'complete', 'error']

function isStepDone(current: PipelineStage, step: PipelineStage): boolean {
  const ci = STAGE_ORDER.indexOf(current)
  const si = STAGE_ORDER.indexOf(step)
  if (current === 'complete' || current === 'error') return si < 3
  return ci > si
}

function isStepActive(current: PipelineStage, step: PipelineStage): boolean {
  return current === step && current !== 'idle' && current !== 'complete' && current !== 'error'
}

export function PipelineStatus({
  stage,
  metrics = {},
  retrieved = [],
  engineerView = false,
}: PipelineStatusProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const hasDetails = engineerView && (
    retrieved.length > 0 ||
    metrics.embedMs != null ||
    metrics.retrieveMs != null ||
    metrics.generateMs != null
  )

  return (
    <div className="pipeline-status mt-2">
      <div
        className="pipeline-capsule flex items-center gap-0 px-2 py-1.5"
        role="status"
        aria-label={`Pipeline: ${stage}`}
      >
        {STAGES.map(({ key, label }, i) => {
          const done = isStepDone(stage, key)
          const active = isStepActive(stage, key)
          return (
            <div key={key} className="flex items-center gap-0 min-w-0 flex-1">
              <div
                className={`pipeline-step transition-motion flex flex-1 items-center justify-center gap-1.5 py-0.5 ${
                  active
                    ? 'text-[var(--accent)]'
                    : done
                      ? 'text-[var(--text-muted)]'
                      : 'text-[var(--text-muted)] opacity-70'
                }`}
              >
                {done ? (
                  <span className="shrink-0 text-[0.65rem]" aria-hidden>
                    ✓
                  </span>
                ) : null}
                <span className="truncate text-micro font-medium">{label}</span>
              </div>
              {i < STAGES.length - 1 && (
                <span
                  className="transition-motion mx-0.5 w-3 shrink-0 text-center text-[var(--border)]"
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          )
        })}
      </div>

      {engineerView && (
        <div className="mt-1.5">
          <button
            type="button"
            onClick={() => setDetailsOpen((o) => !o)}
            className="text-micro font-medium text-[var(--text-muted)] hover:text-[var(--text)] focus-ring rounded py-0.5 transition-default"
            aria-expanded={detailsOpen}
            aria-controls="pipeline-details"
            aria-label={detailsOpen ? 'Hide pipeline details' : 'Show pipeline details'}
          >
            {detailsOpen ? 'Hide' : 'Show'} details
          </button>
          <div id="pipeline-details" role="region" aria-label="Pipeline details">
            {detailsOpen && hasDetails && (
              <div className="pipeline-capsule transition-motion mt-1.5 px-2.5 py-2 text-micro space-y-2 bg-[var(--surface)]">
                {(metrics.embedMs != null || metrics.retrieveMs != null || metrics.generateMs != null) && (
                  <div className="text-[var(--text-muted)]">
                    {metrics.embedMs != null && (
                      <>Embed: <span className="font-mono">{metrics.embedMs}ms</span></>
                    )}
                    {metrics.embedMs != null && (metrics.retrieveMs != null || metrics.generateMs != null) && ' · '}
                    {metrics.retrieveMs != null && (
                      <>Retrieve: <span className="font-mono">{metrics.retrieveMs}ms</span></>
                    )}
                    {metrics.retrieveMs != null && metrics.generateMs != null && ' · '}
                    {metrics.generateMs != null && (
                      <>Generate: <span className="font-mono">{metrics.generateMs}ms</span></>
                    )}
                  </div>
                )}
                {retrieved.length > 0 && (
                  <div>
                    <span className="font-medium text-[var(--text-subtle)]">Sources: </span>
                    <ul className="mt-0.5 space-y-0.5">
                      {retrieved.map((s, i) => (
                        <li key={i} className="text-[var(--text-muted)]">
                          {s.title} <span className="font-mono">{(s.score ?? 0).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
