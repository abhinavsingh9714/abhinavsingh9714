'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal }              from 'react-dom'
import { useFocusTrap }              from '@/lib/useFocusTrap'
import { useAppStore }               from '@/store'
import { usePortfolioStore }         from '@/store/portfolioStore'
import { usePrefersReducedMotion }   from '@/lib/usePrefersReducedMotion'
import { ChatUI }                    from './ChatUI'

/**
 * ChatFab — floating action button + full-screen chat modal for narrow viewports.
 *
 * Accessibility contract
 * ──────────────────────
 * • FAB button: aria-label, aria-expanded, aria-controls
 * • Modal: role="dialog", aria-modal, aria-label
 * • ESC closes the modal (keydown on document)
 * • Focus is trapped inside the modal while open (useFocusTrap)
 * • Focus returns to the FAB when the modal closes
 * • Backdrop click closes the modal
 *
 * The modal is rendered in a React portal to <body> so it escapes any
 * overflow:hidden ancestors (the AppShell column wrapper).
 *
 * REQ-CPI-2: also watches `isChatOpenMobile` from portfolioStore so that
 * components in other panels (e.g. TimelineSection) can open the modal
 * programmatically without needing a direct ref or prop channel.
 */
export function ChatFab() {
  const [open,      setOpen]   = useState(false)
  const [mounted,   setMounted] = useState(false)
  const messages               = useAppStore((s) => s.messages)
  const unread                 = messages.filter((m) => m.role === 'assistant').length

  // REQ-CPI-2: external open signal
  const isChatOpenMobile  = usePortfolioStore((s) => s.isChatOpenMobile)
  const setChatOpenMobile = usePortfolioStore((s) => s.setChatOpenMobile)

  const reducedMotion = usePrefersReducedMotion()
  const fabRef   = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Portal target must be accessed client-side only
  useEffect(() => { setMounted(true) }, [])

  // REQ-CPI-2: sync local open state with the store signal
  useEffect(() => {
    if (isChatOpenMobile && !open) {
      setOpen(true)
      // Consume the signal so a re-render doesn't reopen after user closes
      setChatOpenMobile(false)
    }
  // open intentionally excluded — we only want to react to store changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatOpenMobile, setChatOpenMobile])

  // ESC closes the modal
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Trap focus inside the modal while it is open; return to FAB on close
  useFocusTrap(modalRef, open, fabRef)

  const close = useCallback(() => setOpen(false), [])

  if (!mounted) return null

  return createPortal(
    <>
      {/* ── FAB button ───────────────────────────────────────────────── */}
      <button
        ref={fabRef}
        id="chat-fab"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        aria-controls="chat-modal"
        onClick={() => setOpen((o) => !o)}
        style={{
          position:        'fixed',
          bottom:          '1.5rem',
          right:           '1.25rem',
          zIndex:          60,
          width:           '52px',
          height:          '52px',
          borderRadius:    '50%',
          backgroundColor: 'var(--accent)',
          color:           'var(--bg)',
          border:          'none',
          cursor:          'pointer',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          boxShadow:       '0 4px 16px rgb(0 0 0 / 0.25)',
          transition:      'transform var(--motion-press) var(--ease), box-shadow var(--motion-enter) var(--ease)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgb(0 0 0 / 0.35)' }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgb(0 0 0 / 0.25)' }}
        onMouseDown={(e)  => { if (!reducedMotion) e.currentTarget.style.transform = 'scale(0.93)' }}
        onMouseUp={(e)    => { if (!reducedMotion) e.currentTarget.style.transform = 'scale(1)' }}
      >
        {/* Icon: chat bubble or × */}
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
        )}

        {/* Unread badge */}
        {!open && unread > 0 && (
          <span
            aria-label={`${unread} messages`}
            style={{
              position:        'absolute',
              top:             '3px',
              right:           '3px',
              minWidth:        '18px',
              height:          '18px',
              padding:         '0 4px',
              borderRadius:    '9px',
              backgroundColor: 'var(--error)',
              color:           '#fff',
              fontSize:        '10px',
              fontWeight:      700,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              lineHeight:      1,
            }}
          >
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* ── Full-screen modal ────────────────────────────────────────── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden
            onClick={close}
            style={{
              position:        'fixed',
              inset:           0,
              zIndex:          61,
              backgroundColor: 'rgb(0 0 0 / 0.55)',
              backdropFilter:  'blur(4px)',
            }}
          />

          {/* Modal dialog */}
          <div
            ref={modalRef}
            id="chat-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Chat — Ask me anything"
            style={{
              position:        'fixed',
              inset:           0,
              zIndex:          62,
              /* Sit just inside header */
              top:             'var(--header-h)',
              display:         'flex',
              flexDirection:   'column',
              backgroundColor: 'var(--surface)',
              overflow:        'hidden',
            }}
          >
            <ChatUI showClose onClose={close} />
          </div>
        </>
      )}
    </>,
    document.body,
  )
}
