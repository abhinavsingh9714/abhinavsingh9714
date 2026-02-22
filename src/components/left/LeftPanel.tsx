'use client'

import { SignalStrip, type SignalStripLayout } from './SignalStrip'

interface LeftPanelProps {
  /** Controls vertical sidebar vs horizontal top-bar visual layout */
  layout?: SignalStripLayout
}

/**
 * LeftPanel — renders the SignalStrip profile card.
 *
 * In sidebar mode (default, ≥900 px) it fills the full height of the
 * left <aside> column.
 *
 * In topbar mode (<900 px) AppShell renders this above <main> and hides
 * the <aside>; SignalStrip switches to a horizontal compact arrangement.
 */
export function LeftPanel({ layout = 'sidebar' }: LeftPanelProps) {
  return (
    <div style={{ height: '100%' }}>
      <SignalStrip layout={layout} />
    </div>
  )
}
