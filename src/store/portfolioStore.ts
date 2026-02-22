/**
 * portfolioStore — cross-panel interaction state (PRD shape).
 *
 * Deliberately separate from store/index.ts (theme + chat) so each slice
 * can evolve independently and callers only subscribe to what they need.
 *
 * Slice overview
 * ──────────────
 * activeHighlightTag   → tag label hovered/focused anywhere → all Tag instances react
 * targetScrollElementId → id of a DOM element to scroll into view in the center panel
 * chatInputDraft       → persisted composer draft so modal ↔ panel share the same text
 * isChatOpenMobile     → whether the FAB chat modal is open on narrow viewports
 * pulseElementId       → id of the element that should glow for ~2 s then clear
 * lastAutoScrollId     → remembers the last id auto-scrolled to; prevents loops
 */

import { create } from 'zustand'

interface PortfolioState {
  // ── REQ-CPI-3: cross-panel tag highlight ─────────────────────────────────
  activeHighlightTag:    string | null
  setActiveHighlightTag: (tag: string | null) => void

  // ── Center-panel deep-link scroll ────────────────────────────────────────
  targetScrollElementId:    string | null
  setTargetScrollElementId: (id: string | null) => void

  // ── Chat composer draft ───────────────────────────────────────────────────
  chatInputDraft:    string
  setChatInputDraft: (draft: string) => void

  // ── Mobile chat modal open state ─────────────────────────────────────────
  isChatOpenMobile:    boolean
  toggleChatMobile:    () => void
  setChatOpenMobile:   (open: boolean) => void

  // ── Pulse glow on a specific DOM element (~2 s) ───────────────────────────
  pulseElementId:    string | null
  setPulseElementId: (id: string | null) => void

  // ── Last auto-scroll id (prevents repeated loops) ────────────────────────
  lastAutoScrollId:    string | null
  setLastAutoScrollId: (id: string | null) => void

  /**
   * REQ-CPI-2: when true, ChatUI should fire sendQuestion with the current
   * chatInputDraft immediately on the next render and then clear this flag.
   * Both the desktop RightPanel and the mobile modal ChatUI watch this field.
   */
  pendingAutoSubmit:    boolean
  setPendingAutoSubmit: (v: boolean) => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  // Tag highlight
  activeHighlightTag:    null,
  setActiveHighlightTag: (tag) => set({ activeHighlightTag: tag }),

  // Scroll target
  targetScrollElementId:    null,
  setTargetScrollElementId: (id) => set({ targetScrollElementId: id }),

  // Chat draft
  chatInputDraft:    '',
  setChatInputDraft: (draft) => set({ chatInputDraft: draft }),

  // Mobile chat
  isChatOpenMobile:  false,
  toggleChatMobile:  () => set((s) => ({ isChatOpenMobile: !s.isChatOpenMobile })),
  setChatOpenMobile: (open) => set({ isChatOpenMobile: open }),

  // Pulse element
  pulseElementId:    null,
  setPulseElementId: (id) => set({ pulseElementId: id }),

  // Last auto-scroll
  lastAutoScrollId:    null,
  setLastAutoScrollId: (id) => set({ lastAutoScrollId: id }),

  // Pending auto-submit
  pendingAutoSubmit:    false,
  setPendingAutoSubmit: (v) => set({ pendingAutoSubmit: v }),
}))
