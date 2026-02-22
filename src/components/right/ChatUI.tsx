'use client'

import {
  useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { useAppStore }        from '@/store'
import { usePortfolioStore }  from '@/store/portfolioStore'
import { useChatStream }      from '@/lib/useChatStream'
import { PipelineStatus }     from '@/components/center/PipelineStatus'
import {
  suggestedQuestionsPrimary,
} from '@/data/suggestedQuestions'
import type { Msg as ChatMessage } from '@/lib/chatReducer'

// Pick the first 4 suggested questions for the 2×2 grid
const GRID_QUESTIONS = suggestedQuestionsPrimary.slice(0, 4)

// ── Public component ──────────────────────────────────────────────────────────

interface ChatUIProps {
  /** When true renders a close button at top-right (used inside the modal) */
  showClose?: boolean
  onClose?:   () => void
}

export function ChatUI({ showClose = false, onClose }: ChatUIProps) {
  const messages       = useAppStore((s) => s.messages)
  const isStreaming    = useAppStore((s) => s.isStreaming)
  const streamError    = useAppStore((s) => s.streamError)
  const engineerView   = useAppStore((s) => s.engineerView)
  const toggleEngineer = useAppStore((s) => s.toggleEngineerView)

  // REQ-CPI-2: cross-panel draft + auto-submit signal
  const chatInputDraft      = usePortfolioStore((s) => s.chatInputDraft)
  const setChatInputDraft   = usePortfolioStore((s) => s.setChatInputDraft)
  const pendingAutoSubmit   = usePortfolioStore((s) => s.pendingAutoSubmit)
  const setPendingAutoSubmit = usePortfolioStore((s) => s.setPendingAutoSubmit)

  const { sendQuestion, retry } = useChatStream()
  const [input, setInput]       = useState('')
  const bottomRef               = useRef<HTMLDivElement>(null)
  const textareaRef             = useRef<HTMLTextAreaElement>(null)
  const hasMessages             = messages.length > 0

  // Auto-scroll feed to bottom on new messages / tokens
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // REQ-CPI-2: when another panel sets chatInputDraft, pull it into local state
  useEffect(() => {
    if (!chatInputDraft) return
    setInput(chatInputDraft)
    // Clear the store draft so it doesn't re-apply on remount
    setChatInputDraft('')
    // Focus the textarea so the user can review/edit before sending
    textareaRef.current?.focus()
  }, [chatInputDraft, setChatInputDraft])

  // REQ-CPI-2: drain pendingAutoSubmit — fire once then clear
  useEffect(() => {
    if (!pendingAutoSubmit) return
    setPendingAutoSubmit(false)
    // Read current input from state via a small timeout so the draft
    // effect above has had a chance to populate `input` first.
    // We use a ref snapshot to avoid a stale-closure race.
    pendingSubmitRef.current = true
  }, [pendingAutoSubmit, setPendingAutoSubmit])

  // Ref-based deferred auto-submit: fires after the input state update
  const pendingSubmitRef = useRef(false)
  useEffect(() => {
    if (!pendingSubmitRef.current) return
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return
    pendingSubmitRef.current = false
    submit(trimmed)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  // REQ-CPI-1: when the latest assistant message completes with citations,
  // drive the CenterPanel scroll + pulse for the first cited project id.
  const setTargetScrollElementId  = usePortfolioStore((s) => s.setTargetScrollElementId)
  const setPulseElementId         = usePortfolioStore((s) => s.setPulseElementId)
  const citationProcessedRef      = useRef<string | null>(null)

  useEffect(() => {
    // Find the most recent assistant message that is complete and has citations
    const lastAssistant = [...messages].reverse().find(
      (m) => m.role === 'assistant' && m.stage === 'complete' && (m.citations?.length ?? 0) > 0
    )
    if (!lastAssistant) return

    // Avoid processing the same message twice
    if (citationProcessedRef.current === lastAssistant.id) return
    citationProcessedRef.current = lastAssistant.id

    // Use the first citation's cardId as the scroll + pulse target
    const firstCitation = lastAssistant.citations![0]
    const projectId = firstCitation.cardId
    if (!projectId) return

    setTargetScrollElementId(projectId)
    setPulseElementId(projectId)
  }, [messages, setTargetScrollElementId, setPulseElementId])

  const submit = (q: string) => {
    const trimmed = q.trim()
    if (!trimmed || isStreaming) return
    sendQuestion(trimmed)
    setInput('')
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit(input)
    }
  }

  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        height:        '100%',
        minHeight:     0,
        backgroundColor: 'var(--surface)',
      }}
    >
      {/* ── Visually-hidden live region — announces assistant status to AT ── */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width:    '1px',
          height:   '1px',
          padding:  0,
          margin:   '-1px',
          overflow: 'hidden',
          clip:     'rect(0,0,0,0)',
          border:   0,
        }}
      >
        {isStreaming ? 'Assistant is responding…' : ''}
      </div>

      {/* ── Header bar ─────────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink:      0,
          borderBottom:    '1px solid var(--border)',
          position:        'sticky',
          top:             0,
          backgroundColor: 'var(--surface)',
          zIndex:          2,
        }}
      >
        {/* RAG intro banner */}
        {!hasMessages && (
          <div
            style={{
              padding:         '0.75rem 1rem 0.625rem',
              borderBottom:    '1px solid var(--border)',
              background:      'linear-gradient(135deg, color-mix(in srgb, var(--accent) 6%, var(--surface)), var(--surface))',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
              <div
                style={{
                  flexShrink:      0,
                  width:           '28px',
                  height:          '28px',
                  borderRadius:    'var(--radius-md)',
                  backgroundColor: 'var(--accent-weak)',
                  border:          '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  fontSize:        '13px',
                }}
              >
                ✦
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <p
                  className="font-heading"
                  style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}
                >
                  Mini-RAG Portfolio Assistant
                </p>
                <p
                  className="font-body"
                  style={{ margin: '3px 0 0', fontSize: '11px', color: 'var(--text-subtle)', lineHeight: 1.5 }}
                >
                  Embeds your question → retrieves the most relevant chunks from the knowledge base → generates a grounded answer. Toggle{' '}
                  <button
                    onClick={toggleEngineer}
                    className="font-body"
                    style={{
                      display:         'inline',
                      background:      'none',
                      border:          'none',
                      padding:         0,
                      fontSize:        'inherit',
                      color:           'var(--accent)',
                      cursor:          'pointer',
                      textDecoration:  'underline',
                      textUnderlineOffset: '2px',
                    }}
                  >
                    ⚙ Eng
                  </button>{' '}
                  to see real retrieval scores and chunks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Controls row */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '0.5rem 1rem',
          }}
        >
          <span
            className="font-body"
            style={{
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color:         'var(--text-muted)',
            }}
          >
            Ask me anything
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Engineer view toggle */}
            <button
              onClick={toggleEngineer}
              aria-pressed={engineerView}
              title="Toggle engineer view — shows pipeline stages and retrieved chunks"
              className="font-body"
              style={{
                fontSize:        '11px',
                fontWeight:      500,
                padding:         '3px 9px',
                borderRadius:    'var(--radius-pill)',
                border:          `1px solid ${engineerView ? 'var(--accent)' : 'var(--border)'}`,
                backgroundColor: engineerView ? 'var(--accent-weak)' : 'transparent',
                color:           engineerView ? 'var(--accent)'      : 'var(--text-subtle)',
                cursor:          'pointer',
                transition:      'all var(--motion-enter) var(--ease)',
              }}
            >
              ⚙ Eng
            </button>

            {/* Close button (modal only) */}
            {showClose && (
              <button
                onClick={onClose}
                aria-label="Close chat"
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  width:           '28px',
                  height:          '28px',
                  borderRadius:    'var(--radius-md)',
                  border:          '1px solid var(--border)',
                  backgroundColor: 'transparent',
                  color:           'var(--text-muted)',
                  cursor:          'pointer',
                  fontSize:        '16px',
                  lineHeight:      1,
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Feed area ──────────────────────────────────────────────────── */}
      <div
        className="scroll-pane"
        style={{
          flex:    '1 1 0',
          minHeight: 0,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem',
        }}
      >
        {/* Suggested questions 2×2 grid (only when feed is empty) */}
        {!hasMessages && (
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '0.5rem',
              marginBottom:        '0.5rem',
            }}
          >
            {GRID_QUESTIONS.map((q) => (
              <SuggestedButton
                key={q.label}
                label={q.label}
                onClick={() => submit(q.label)}
              />
            ))}
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg, idx) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            engineerView={engineerView}
            isLatest={idx === messages.length - 1}
          />
        ))}

        {/* Error bar */}
        {streamError && (
          <div
            style={{
              padding:         '0.5rem 0.75rem',
              backgroundColor: 'color-mix(in srgb, var(--error) 12%, transparent)',
              border:          '1px solid color-mix(in srgb, var(--error) 30%, transparent)',
              borderRadius:    'var(--radius-md)',
              fontSize:        '12px',
              color:           'var(--error)',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'space-between',
              gap:             '0.5rem',
            }}
          >
            <span>{streamError.message}</span>
            <button
              onClick={retry}
              style={{
                fontSize:        '11px',
                fontWeight:      600,
                color:           'var(--error)',
                background:      'none',
                border:          'none',
                cursor:          'pointer',
                textDecoration:  'underline',
                padding:         0,
              }}
            >
              Retry
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Sticky composer ────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink:      0,
          borderTop:       '1px solid var(--border)',
          padding:         '0.625rem 0.75rem',
          backgroundColor: 'var(--surface)',
        }}
      >
        <div
          style={{
            display:         'flex',
            alignItems:      'flex-end',
            gap:             '0.5rem',
            backgroundColor: 'var(--surface-2)',
            border:          '1px solid var(--border)',
            borderRadius:    'var(--radius-lg)',
            padding:         '0.5rem 0.625rem',
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about experience, projects…"
            disabled={isStreaming}
            aria-label="Chat message"
            className="font-body"
            style={{
              flex:        '1 1 0',
              minWidth:    0,
              background:  'transparent',
              border:      'none',
              outline:     'none',
              resize:      'none',
              fontSize:    '13px',
              lineHeight:  1.55,
              color:       'var(--text)',
              caretColor:  'var(--accent)',
              minHeight:   '1.55rem',
              maxHeight:   '6rem',
              overflowY:   'auto',
            }}
          />
          <button
            onClick={() => submit(input)}
            disabled={!input.trim() || isStreaming}
            aria-label="Send message"
            style={{
              flexShrink:      0,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              width:           '28px',
              height:          '28px',
              borderRadius:    'var(--radius-md)',
              border:          'none',
              backgroundColor: !input.trim() || isStreaming
                ? 'var(--surface-3)'
                : 'var(--accent)',
              color:           !input.trim() || isStreaming
                ? 'var(--text-subtle)'
                : 'var(--bg)',
              cursor:          !input.trim() || isStreaming ? 'not-allowed' : 'pointer',
              transition:      'background-color var(--motion-enter) var(--ease)',
              fontSize:        '16px',
              lineHeight:      1,
            }}
          >
            ↑
          </button>
        </div>
        <p
          className="font-body"
          style={{
            fontSize:  '10px',
            color:     'var(--text-subtle)',
            textAlign: 'center',
            marginTop: '4px',
          }}
        >
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

// ── Suggested question button ─────────────────────────────────────────────────

function SuggestedButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-body"
      style={{
        padding:         '0.6rem 0.625rem',
        fontSize:        '11px',
        lineHeight:      1.45,
        textAlign:       'left',
        color:           'var(--text-muted)',
        backgroundColor: 'var(--surface-2)',
        border:          '1px solid var(--border)',
        borderRadius:    'var(--radius-md)',
        cursor:          'pointer',
        transition:      'all var(--motion-enter) var(--ease)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.backgroundColor = 'var(--accent-weak)'
        el.style.borderColor     = 'color-mix(in srgb, var(--accent) 35%, transparent)'
        el.style.color           = 'var(--text)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.backgroundColor = 'var(--surface-2)'
        el.style.borderColor     = 'var(--border)'
        el.style.color           = 'var(--text-muted)'
      }}
    >
      {label}
    </button>
  )
}

// ── Message bubble ─────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  engineerView,
  isLatest,
}: {
  message:      ChatMessage
  engineerView: boolean
  isLatest:     boolean
}) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div
          className="font-body"
          style={{
            maxWidth:        'min(78%, 28rem)',
            padding:         '0.6rem 0.875rem',
            borderRadius:    'var(--radius-lg)',
            backgroundColor: 'var(--accent)',
            color:           'var(--bg)',
            fontSize:        '13px',
            lineHeight:      1.6,
            wordBreak:       'break-word',
          }}
        >
          {message.content}
        </div>
      </div>
    )
  }

  // Assistant — stage is set on assistant messages from the reducer
  const isStreaming  = !!message.stage && message.stage !== 'complete' && message.stage !== 'error'
  const showPipeline = engineerView && !!message.stage

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div
        style={{
          maxWidth:        'min(100%, 65ch)',
          display:         'flex',
          flexDirection:   'column',
          gap:             '0.25rem',
        }}
      >
        {/* Pipeline status — shown when engineer view is on for the latest message */}
        {showPipeline && isLatest && (
          <PipelineStatus message={message} />
        )}

        {/* Bubble */}
        {(message.content || isStreaming) && (
          <div
            className="font-body"
            style={{
              padding:         '0.625rem 0.875rem',
              borderRadius:    'var(--radius-lg)',
              backgroundColor: 'var(--surface-2)',
              border:          '1px solid var(--border)',
              fontSize:        '13px',
              lineHeight:      1.65,
              color:           'var(--text-subtle)',
              wordBreak:       'break-word',
              whiteSpace:      'pre-wrap',
            }}
          >
            {message.content || (
              <span
                style={{ opacity: 0.5 }}
                aria-label="Thinking…"
              >
                <ThinkingDots />
              </span>
            )}
          </div>
        )}

        {/* Error state */}
        {message.error && (
          <p style={{ fontSize: '11px', color: 'var(--error)', marginTop: '2px' }}>
            Failed — use the retry button above.
          </p>
        )}
      </div>
    </div>
  )
}

// ── Animated thinking dots ────────────────────────────────────────────────────

function ThinkingDots() {
  return (
    <span aria-hidden style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display:         'inline-block',
            width:           '5px',
            height:          '5px',
            borderRadius:    '50%',
            backgroundColor: 'var(--text-subtle)',
            animation:       `thinking-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  )
}
