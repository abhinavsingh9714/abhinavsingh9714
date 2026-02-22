'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/store'
import { useChatStream } from '@/lib/useChatStream'
import { MessageBubble } from './MessageBubble'
import { SuggestedPills } from './SuggestedPills'

export function ChatPanel() {
  const messages = useAppStore((s) => s.messages)
  const isStreaming = useAppStore((s) => s.isStreaming)
  const streamError = useAppStore((s) => s.streamError)
  const { sendQuestion, retry } = useChatStream()

  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (question: string) => {
    const q = question.trim()
    if (!q || isStreaming) return
    sendQuestion(q)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(input)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-full">
      {/* Message list */}
      <div className="scroll-pane flex-1 px-4 py-4 space-y-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: 'var(--primary-weak)', color: 'var(--primary)' }}
            >
              ✦
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                Ask anything about Abhinav
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>
                Experience · Projects · Skills · Education
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested pills (only when no messages yet) */}
      {isEmpty && (
        <div className="flex-none border-t" style={{ borderColor: 'var(--border)' }}>
          <SuggestedPills onSelect={handleSubmit} />
        </div>
      )}

      {/* Error bar */}
      {streamError && (
        <div
          className="flex-none flex items-center justify-between px-4 py-2 text-xs border-t"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface-2)',
            color: 'var(--error)',
          }}
        >
          <span>{streamError.message}</span>
          <button
            onClick={retry}
            className="underline ml-2"
            style={{ color: 'var(--primary)' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Input area */}
      <div
        className="flex-none border-t px-4 py-3"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
      >
        <div
          className="flex items-end gap-2 rounded-xl border px-3 py-2 transition-default"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface-2)',
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about experience, projects, skills…"
            disabled={isStreaming}
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed min-h-[1.5rem] max-h-32"
            style={{ color: 'var(--text)', caretColor: 'var(--primary)' }}
          />
          <button
            onClick={() => handleSubmit(input)}
            disabled={!input.trim() || isStreaming}
            className="flex-none flex items-center justify-center w-7 h-7 rounded-lg transition-default"
            style={{
              backgroundColor:
                !input.trim() || isStreaming ? 'var(--border)' : 'var(--primary)',
              color: !input.trim() || isStreaming ? 'var(--text-subtle)' : 'white',
            }}
            aria-label="Send message"
          >
            ↑
          </button>
        </div>
        <p className="text-xs mt-1.5 text-center" style={{ color: 'var(--text-subtle)' }}>
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
