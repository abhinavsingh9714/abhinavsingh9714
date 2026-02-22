import { create } from 'zustand'
import type { Msg } from '@/lib/chatReducer'

type Theme = 'light' | 'dark'

interface AppState {
  // ── Theme ────────────────────────────────────────────────────────────────
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void

  // ── Engineer / debug view ────────────────────────────────────────────────
  engineerView: boolean
  toggleEngineerView: () => void

  // ── Chat messages ────────────────────────────────────────────────────────
  messages: Msg[]
  isStreaming: boolean
  streamError: Error | null
  setMessages: (msgs: Msg[] | ((prev: Msg[]) => Msg[])) => void
  setIsStreaming: (v: boolean) => void
  setStreamError: (e: Error | null) => void

  // ── Cross-panel: highlighted card (citation click → sidebar scroll) ──────
  highlightedCardId: string | null
  setHighlightedCardId: (id: string | null) => void

  // ── Cross-panel: active citations for right panel ────────────────────────
  activeCitations: string[]          // cardIds of the last assistant message
  setActiveCitations: (ids: string[]) => void

  // ── Sidebar search query ─────────────────────────────────────────────────
  sidebarSearch: string
  setSidebarSearch: (q: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Theme — default light; hydrated client-side in ThemeProvider
  theme: 'light',
  setTheme: (t) => set({ theme: t }),
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  // Engineer view
  engineerView: false,
  toggleEngineerView: () => set((s) => ({ engineerView: !s.engineerView })),

  // Chat
  messages: [],
  isStreaming: false,
  streamError: null,
  setMessages: (msgs) =>
    set((s) => ({
      messages: typeof msgs === 'function'
        ? (msgs as (prev: Msg[]) => Msg[])(s.messages)
        : msgs,
    })),
  setIsStreaming: (v) => set({ isStreaming: v }),
  setStreamError: (e) => set({ streamError: e }),

  // Cross-panel highlight
  highlightedCardId: null,
  setHighlightedCardId: (id) => set({ highlightedCardId: id }),

  // Active citations
  activeCitations: [],
  setActiveCitations: (ids) => set({ activeCitations: ids }),

  // Sidebar search
  sidebarSearch: '',
  setSidebarSearch: (q) => set({ sidebarSearch: q }),
}))
