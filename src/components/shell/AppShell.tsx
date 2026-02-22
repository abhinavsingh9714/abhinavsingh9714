'use client'

import { Header }                           from './Header'
import { CenterPanelProvider, useCenterPanel } from './CenterPanelContext'
import { useBreakpoint, BP_COLLAPSE }       from '@/lib/useBreakpoint'

export interface AppShellProps {
  /** Rendered in the left 20% sidebar column at ≥900 px */
  left:        React.ReactNode
  /**
   * Rendered as a horizontal bar above <main> at <900 px.
   * If omitted, the left panel simply hides below the breakpoint.
   */
  leftTopbar?: React.ReactNode
  center:      React.ReactNode
  /** Rendered in the right 25% column at ≥900 px */
  right:       React.ReactNode
}

/**
 * Mission Control shell.
 *
 * Responsive layout
 * ─────────────────
 * ≥900 px  (desktop)  : fixed header | left 20% | center 55% | right 25%
 * <900 px  (narrow)   : fixed header | leftTopbar bar (full-width, below header)
 *                       then center + right in a flex row below the bar.
 *                       The left <aside> column is hidden.
 *
 * The 900 px threshold matches --breakpoint-collapse in globals.css so a
 * CSS media query and the JS value stay in sync.
 */

// COLLAPSE_BP is imported as BP_COLLAPSE from useBreakpoint — single source of truth

export function AppShell(props: AppShellProps) {
  return (
    <CenterPanelProvider>
      <AppShellInner {...props} />
    </CenterPanelProvider>
  )
}

function AppShellInner({ left, leftTopbar, center, right }: AppShellProps) {
  const { scrollRef }         = useCenterPanel()
  const { isNarrow: isNarrowBP } = useBreakpoint()
  // Use the imported BP_COLLAPSE so the threshold is a single constant
  const isNarrow = isNarrowBP   // width < BP_COLLAPSE (900 px)
  void BP_COLLAPSE              // referenced for documentation, value used in hook

  return (
    <div
      style={{
        height:          '100dvh',
        overflow:        'hidden',
        display:         'flex',
        flexDirection:   'column',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Fixed nav — position:fixed removes it from flex flow */}
      <Header />

      {/*
       * Body wrapper: starts below the fixed header via padding-top.
       * flex-col so the optional topbar stacks above the column row.
       */}
      <div
        style={{
          paddingTop:    'var(--header-h)',
          flex:          '1 1 0',
          minHeight:     0,
          display:       'flex',
          flexDirection: 'column',
          overflow:      'hidden',
        }}
      >
        {/* ── Narrow topbar (< 900 px) ─────────────────────────────────────
            Rendered as a horizontal bar at the very top of the content area,
            underneath the fixed <nav>. Hides at ≥900 px.                   */}
        {isNarrow && leftTopbar && (
          <div style={{ flexShrink: 0 }}>
            {leftTopbar}
          </div>
        )}

        {/* ── Column row ───────────────────────────────────────────────────
            At <900 px the left <aside> is removed from the DOM so center +
            right simply fill the available width.                           */}
        <div
          style={{
            flex:     '1 1 0',
            minHeight: 0,
            display:  'flex',
            overflow: 'hidden',
          }}
        >
          {/* Left sidebar — hidden at <900 px */}
          {!isNarrow && (
            <aside
              aria-label="Profile sidebar"
              style={{
                width:           'var(--col-left)',
                minWidth:        'var(--col-left-min)',
                flexShrink:      0,
                display:         'flex',
                flexDirection:   'column',
                overflow:        'hidden',
                borderRight:     '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
              }}
            >
              {left}
            </aside>
          )}

          {/* Center — main scroll container */}
          <main
            ref={scrollRef as React.RefObject<HTMLElement>}
            aria-label="Main content"
            className="panel-scroll"
            style={{
              flex:            '1 1 0',
              minWidth:        0,
              display:         'flex',
              flexDirection:   'column',
              backgroundColor: 'var(--bg)',
              borderRight:     '1px solid var(--border)',
            }}
          >
            {center}
          </main>

          {/* Right chat panel — hidden at <900 px */}
          {!isNarrow && (
            <aside
              aria-label="Chat panel"
              style={{
                width:           'var(--col-right)',
                minWidth:        'var(--col-right-min)',
                flexShrink:      0,
                display:         'flex',
                flexDirection:   'column',
                /* overflow:hidden so ChatUI's sticky composer works correctly */
                overflow:        'hidden',
                backgroundColor: 'var(--surface)',
              }}
            >
              {right}
            </aside>
          )}
        </div>
      </div>

    </div>
  )
}

