'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Send, SlidersHorizontal } from 'lucide-react'
import { recruiterPrompt, starterPrompts } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'
import { useAppStore } from '@/store'
import { usePortfolioStore } from '@/store/portfolioStore'
import { useChatStream } from '@/lib/useChatStream'
import type { Citation, Msg, RetrievalChunk } from '@/lib/chatReducer'

const stageText: Record<string, string> = {
  embedding: 'embedding query...',
  retrieving: 'searching portfolio index...',
  generating: 'answering from grounded context...',
}

function citationTarget(citation: Citation) {
  const text = `${citation.cardId} ${citation.docId ?? ''} ${citation.title ?? ''}`.toLowerCase()
  if (text.includes('taai') || text.includes('neuron')) return 'project-neuron'
  if (text.includes('jira')) return 'project-jira-agent'
  if (text.includes('slomo') || text.includes('slo-mo')) return 'project-slomo'
  if (text.includes('multistock') || text.includes('stock')) return 'project-multistock'
  if (text.includes('freelance') || text.includes('visual')) return 'project-visual-search'
  return citation.projectId ?? citation.cardId
}

export function TerminalWindow() {
  const messages = useAppStore((state) => state.messages)
  const isStreaming = useAppStore((state) => state.isStreaming)
  const streamError = useAppStore((state) => state.streamError)
  const engineerView = useAppStore((state) => state.engineerView)
  const toggleEngineerView = useAppStore((state) => state.toggleEngineerView)

  const chatInputDraft = usePortfolioStore((state) => state.chatInputDraft)
  const setChatInputDraft = usePortfolioStore((state) => state.setChatInputDraft)
  const pendingAutoSubmit = usePortfolioStore((state) => state.pendingAutoSubmit)
  const setPendingAutoSubmit = usePortfolioStore((state) => state.setPendingAutoSubmit)

  const { activeWindowId, openWindow } = useWindowManager()
  const { sendQuestion, retry } = useChatStream()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const pendingSubmitRef = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  useEffect(() => {
    if (!chatInputDraft) return
    setInput(chatInputDraft)
    setChatInputDraft('')
    inputRef.current?.focus()
  }, [chatInputDraft, setChatInputDraft])

  useEffect(() => {
    if (!pendingAutoSubmit) return
    pendingSubmitRef.current = true
    setPendingAutoSubmit(false)
  }, [pendingAutoSubmit, setPendingAutoSubmit])

  useEffect(() => {
    if (!pendingSubmitRef.current) return
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return
    pendingSubmitRef.current = false
    submit(trimmed)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, isStreaming])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeWindowId !== 'terminal') return
      if (!event.shiftKey || event.key.toLowerCase() !== 'e') return
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'TEXTAREA' || target?.tagName === 'INPUT') return
      event.preventDefault()
      toggleEngineerView()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeWindowId, toggleEngineerView])

  const submit = (question: string) => {
    const trimmed = question.trim()
    if (!trimmed || isStreaming) return
    openWindow('terminal')
    sendQuestion(trimmed)
    setInput('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit(input)
    }
  }

  return (
    <div className="terminal-window">
      <div className="terminal-tabbar">
        <span className="terminal-tab terminal-tab--active">portfolio-rag - zsh</span>
        <button
          type="button"
          className="terminal-chip terminal-chip--quiet"
          aria-pressed={engineerView}
          onClick={toggleEngineerView}
        >
          <SlidersHorizontal size={13} />
          Engineer View
        </button>
      </div>

      <div className="terminal-scroll">
        {messages.length === 0 && (
          <div className="terminal-welcome">
            <p>Portfolio index mounted.</p>
            <p>Sources: resume.md, projects/, systems-notes/, writing/</p>
            <p>
              Mode: grounded answers with citations
              <span className="terminal-grounded"> grounded</span>
            </p>
            <p className="terminal-muted-line">Try a command:</p>
            <div className="terminal-suggestions">
              <button
                type="button"
                className="terminal-chip terminal-chip--primary"
                onClick={() => submit(recruiterPrompt)}
              >
                /recruiter
              </button>
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="terminal-chip"
                  onClick={() => submit(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="terminal-feed">
          {messages.map((message, index) => (
            <TerminalMessage
              key={message.id}
              message={message}
              engineerView={engineerView}
              isLatest={index === messages.length - 1}
            />
          ))}
        </div>

        {streamError && (
          <div className="terminal-error">
            <span>
              connection refused: portfolio-rag could not answer right now. Try Projects or Resume from the dock.
            </span>
            <button type="button" onClick={retry}>retry</button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        className="terminal-composer"
        onSubmit={(event) => {
          event.preventDefault()
          submit(input)
        }}
      >
        <span className="terminal-prompt">abhinav@portfolio ~ %</span>
        <textarea
          ref={inputRef}
          value={input}
          rows={1}
          aria-label="Ask Abhinav OS"
          placeholder="Ask about RAG, projects, resume, or fit..."
          disabled={isStreaming}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" aria-label="Send" disabled={!input.trim() || isStreaming}>
          <Send size={14} />
        </button>
      </form>
    </div>
  )
}

function TerminalMessage({
  message,
  engineerView,
  isLatest,
}: {
  message: Msg
  engineerView: boolean
  isLatest: boolean
}) {
  const openWindow = useWindowManager().openWindow
  const setPulseElementId = usePortfolioStore((state) => state.setPulseElementId)

  if (message.role === 'user') {
    return (
      <div className="terminal-message terminal-message--user">
        <span className="terminal-prompt">abhinav@portfolio ~ %</span>
        <span>{message.content}</span>
      </div>
    )
  }

  const isLive = !!message.stage && message.stage !== 'complete' && message.stage !== 'error'

  return (
    <div className="terminal-message terminal-message--assistant">
      {isLive && isLatest && (
        <div className="terminal-stage-lines">
          <span>{stageText[message.stage ?? 'generating'] ?? 'answering...'}</span>
        </div>
      )}

      {message.content ? (
        <div className="terminal-answer">{message.content}</div>
      ) : isLive ? (
        <span className="terminal-cursor-line">_</span>
      ) : null}

      {message.citations && message.citations.length > 0 && !isLive && (
        <div className="terminal-source-row">
          <span>Sources:</span>
          {message.citations.map((citation) => {
            const target = citationTarget(citation)
            return (
              <button
                type="button"
                key={`${citation.cardId}-${citation.chunkId ?? ''}`}
                className="terminal-source-chip"
                onClick={() => {
                  if (target.startsWith('project')) {
                    openWindow('projects')
                    setPulseElementId(target)
                  } else {
                    openWindow('resume')
                  }
                }}
              >
                {(citation.title ?? citation.docId ?? citation.cardId).replace(/^Project - /, '')}
                <span>{citation.score.toFixed(2)}</span>
              </button>
            )
          })}
        </div>
      )}

      {engineerView && (message.retrievalChunks?.length || message.metrics) && (
        <RetrievalTrace chunks={message.retrievalChunks ?? []} metrics={message.metrics} />
      )}

      {message.error && (
        <p className="terminal-error-inline">error: answer stream stopped before completion.</p>
      )}
    </div>
  )
}

function RetrievalTrace({
  chunks,
  metrics,
}: {
  chunks: RetrievalChunk[]
  metrics: Msg['metrics']
}) {
  return (
    <details className="retrieval-trace" open>
      <summary>retrieval.trace</summary>
      <div className="retrieval-trace__body">
        {chunks.map((chunk, index) => (
          <div className="retrieval-row" key={chunk.chunkId}>
            <span>{index + 1}. {chunk.title}</span>
            <span>score {chunk.score.toFixed(2)}</span>
            <p>{chunk.snippet}</p>
          </div>
        ))}
        {metrics && (
          <div className="retrieval-metrics">
            embed {metrics.embedMs}ms / retrieve {metrics.retrieveMs}ms / generate {metrics.generateMs}ms
          </div>
        )}
      </div>
    </details>
  )
}
