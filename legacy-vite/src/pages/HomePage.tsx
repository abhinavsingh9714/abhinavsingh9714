import { useState, useEffect, useRef } from 'react'
import { ResumeSidebar } from '@/components/sidebar/ResumeSidebar'
import { ChatPanel } from '@/components/chat/ChatPanel'
import { useChatStream } from '@/lib/useChatStream'
import { useBreakpoint } from '@/lib/useBreakpoint'

const DEMO_PLAYED_KEY = 'portfolio_demo_played'
const AUTOPLAY_QUESTION = "Summarize Abhinav's ML and GenAI experience in 3 bullets"

type MobileTab = 'resume' | 'chat'

interface HomePageProps {
  engineerView: boolean
}

function SidebarContent({
  highlightCardId,
  onHighlightClear,
}: {
  highlightCardId: string | null
  onHighlightClear: () => void
}) {
  return (
    <ResumeSidebar
      highlightCardId={highlightCardId}
      onHighlightClear={onHighlightClear}
    />
  )
}

export function HomePage({ engineerView }: HomePageProps) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const [mobileTab, setMobileTab] = useState<MobileTab>('chat')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [highlightCardId, setHighlightCardId] = useState<string | null>(null)
  const { messages, isStreaming, sendQuestion, error, retry } = useChatStream({ mock: true })
  const autoplayDone = useRef(false)

  useEffect(() => {
    if (autoplayDone.current) return
    if (typeof localStorage === 'undefined') return
    if (localStorage.getItem(DEMO_PLAYED_KEY)) return
    autoplayDone.current = true
    const t = setTimeout(() => {
      sendQuestion(AUTOPLAY_QUESTION)
      try {
        localStorage.setItem(DEMO_PLAYED_KEY, '1')
      } catch {
        // ignore
      }
    }, 1500)
    return () => clearTimeout(t)
  }, [sendQuestion])

  useEffect(() => {
    if (!isTablet) return
    const onHashChange = () => {
      if (window.location.hash === '#resume') setDrawerOpen(true)
    }
    if (window.location.hash === '#resume') setDrawerOpen(true)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [isTablet])

  const openDrawer = () => {
    setDrawerOpen(true)
    if (typeof window !== 'undefined') window.location.hash = 'resume'
  }
  const closeDrawer = () => {
    setDrawerOpen(false)
    if (typeof window !== 'undefined' && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }

  const showSidebarAsPanel = isMobile && mobileTab === 'resume'
  const showSidebarAsDrawer = isTablet && drawerOpen
  const showSidebarInFlow = isDesktop

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setMobileTab('resume')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setMobileTab('chat')
    }
  }

  return (
    <div className="flex min-h-full min-w-0 flex-col py-4 lg:flex-row lg:pl-0">
      {/* Desktop: fixed sidebar flush left, no padding */}
      {showSidebarInFlow && (
        <aside
          id="resume"
          className="fixed left-0 top-0 bottom-0 z-10 hidden w-64 flex-col border-r border-[var(--border)] bg-[var(--surface-2)] lg:flex"
          aria-label="Resume"
          style={{ paddingTop: '5rem' }}
        >
          <div className="scroll-pane flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <SidebarContent
              highlightCardId={highlightCardId}
              onHighlightClear={() => setHighlightCardId(null)}
            />
          </div>
        </aside>
      )}
      <div className="workspace flex min-h-full min-w-0 flex-1 flex-col flex-nowrap px-4 lg:ml-64 lg:max-w-none lg:pl-0 lg:pr-6">
        <div className="flex min-h-full flex-col lg:min-h-full lg:flex-row lg:items-start">
        <div
          role="tablist"
          aria-label="Resume and Chat"
          className="flex border-b border-[var(--border)] bg-[var(--surface)] sm:hidden -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          <button
            type="button"
            role="tab"
            id="resume-tab"
            aria-selected={mobileTab === 'resume'}
            aria-controls="resume"
            tabIndex={mobileTab === 'resume' ? 0 : -1}
            onClick={() => setMobileTab('resume')}
            onKeyDown={handleTabKeyDown}
            className={`transition-default flex-1 py-3 text-small font-medium focus-ring ${mobileTab === 'resume' ? 'border-b-2 border-[var(--primary)] text-[var(--color-text)]' : 'text-[var(--color-muted)] hover:text-[var(--color-text-secondary)]'}`}
          >
            Resume
          </button>
          <button
            type="button"
            role="tab"
            id="chat-tab"
            aria-selected={mobileTab === 'chat'}
            aria-controls="chat"
            tabIndex={mobileTab === 'chat' ? 0 : -1}
            onClick={() => setMobileTab('chat')}
            onKeyDown={handleTabKeyDown}
            className={`transition-default flex-1 py-3 text-small font-medium focus-ring ${mobileTab === 'chat' ? 'border-b-2 border-[var(--primary)] text-[var(--color-text)]' : 'text-[var(--color-muted)] hover:text-[var(--color-text-secondary)]'}`}
          >
            Chat
          </button>
        </div>

        {isTablet && (
          <div className="shrink-0 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2 lg:hidden">
            <button
              type="button"
              onClick={openDrawer}
              className="transition-default rounded text-small font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] focus-ring"
              aria-label="Open Resume"
            >
              Resume
            </button>
          </div>
        )}

        {showSidebarAsPanel && (
          <aside
            id="resume"
            role="tabpanel"
            aria-labelledby="resume-tab"
            tabIndex={0}
            className="flex h-[calc(100vh-8rem)] min-h-0 flex-none flex-col border-b border-[var(--border)] bg-[var(--surface-2)] overflow-hidden sm:hidden"
            aria-label="Resume"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-pane">
              <SidebarContent
                highlightCardId={highlightCardId}
                onHighlightClear={() => setHighlightCardId(null)}
              />
            </div>
          </aside>
        )}

        {showSidebarAsDrawer && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/30 sm:block lg:hidden"
              aria-hidden
              onClick={closeDrawer}
            />
            <aside
              id="resume"
              className="fixed left-0 top-0 z-40 flex h-full w-[min(320px,85vw)] flex-col border-r border-[var(--border)] bg-[var(--surface-2)] shadow-lg sm:block lg:hidden"
              aria-label="Resume"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-2">
                <span className="text-small font-medium text-[var(--text)]">Resume</span>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="transition-default rounded p-1 text-[var(--color-muted)] hover:text-[var(--color-text)] focus-ring"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="scroll-pane min-h-0 flex-1 overflow-auto">
                <SidebarContent
                  highlightCardId={highlightCardId}
                  onHighlightClear={() => setHighlightCardId(null)}
                />
              </div>
            </aside>
          </>
        )}

        <section
          id="chat"
          role={isMobile ? 'tabpanel' : undefined}
          aria-labelledby={isMobile ? 'chat-tab' : undefined}
          tabIndex={isMobile ? 0 : undefined}
          className={`flex min-h-0 flex-1 flex-col min-w-0 border-[var(--border)] bg-[var(--surface)] lg:border-l lg:min-h-full ${isMobile ? (mobileTab === 'chat' ? 'flex' : 'hidden') : 'flex'} ${isMobile ? 'overflow-hidden' : ''}`}
          aria-label="Chat"
        >
          <ChatPanel
            engineerView={engineerView}
            messages={messages}
            isStreaming={isStreaming}
            error={error}
            onRetry={retry}
            onSendQuestion={sendQuestion}
            onCitationClick={(cardId, _messageId) => {
              setHighlightCardId(cardId)
              if (isMobile) setMobileTab('resume')
              if (isTablet) openDrawer()
            }}
            scrollInternal={!isDesktop}
          />
        </section>
        </div>
      </div>
    </div>
  )
}
