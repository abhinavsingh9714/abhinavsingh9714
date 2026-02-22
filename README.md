# Abhinav Singh — Portfolio

A production-grade portfolio built with **Next.js 15 App Router**, **Zustand**, and **Tailwind CSS v3**.
It features a fixed-header three-panel shell (Signal Strip / Center content / Chat), streaming RAG-style chat, and deep cross-panel interactions without prop drilling.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # edit as needed (see Environment variables)
npm run dev                  # http://localhost:3000
```

---

## Deploy to Vercel

### One-click (recommended)

1. Push this repo to GitHub / GitLab.
2. Import it in the [Vercel dashboard](https://vercel.com/new).
3. Vercel auto-detects Next.js — no framework override needed.
4. Add environment variables under **Settings → Environment Variables** (see table below).
5. Deploy.

### CLI

```bash
npm i -g vercel
vercel                     # follow prompts — picks up vercel.json automatically
vercel --prod              # promote to production
```

### Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_CHAT_MODE` | No | `mock` | `mock` = local generator (no API calls). `api` = POST `/api/chat` SSE route. |
| `OPENAI_API_KEY` | Only if `CHAT_MODE=api` | — | Server-side key for OpenAI. Never exposed to the browser. |
| `ANTHROPIC_API_KEY` | Only if `CHAT_MODE=api` | — | Server-side key for Claude. |
| `AWS_REGION` | Only if using Bedrock/Pinecone | — | e.g. `us-east-1` |
| `AWS_ACCESS_KEY_ID` | Only if using Bedrock | — | IAM key with Bedrock + S3 permissions. |
| `AWS_SECRET_ACCESS_KEY` | Only if using Bedrock | — | IAM secret. |
| `PINECONE_API_KEY` | Only if using Pinecone RAG | — | Vector DB key. |
| `PINECONE_INDEX` | Only if using Pinecone RAG | — | Index name, e.g. `portfolio-rag`. |

> **`NEXT_PUBLIC_*` variables** are inlined at build time and visible in the browser bundle. Only put non-secret config there.

### Switch from mock to real LLM

1. Set `NEXT_PUBLIC_CHAT_MODE=api` in the Vercel env vars.
2. Edit `src/app/api/chat/route.ts` — replace the `streamAssistant` generator call with your LLM provider's streaming SDK.
3. The SSE wire format (`ChatEvent`) is unchanged — the frontend consumes it identically.

---

## Architecture

```
┌─────────────────────────────── Fixed header (56 px) ─────────────────────────────────┐
│  AS  Abhinav Singh  [ML Engineer]      [Projects] [Story] [Chat]     GH  LI  ↓  ☀/☾  │
└───────────────────────────────────────────────────────────────────────────────────────┘
┌──────── 20% ────────┬──────────────────── 55% ────────────────────┬────── 25% ───────┐
│  Signal Strip        │  CenterPanel                               │  RightPanel       │
│  (left aside)        │  (main, scrolls independently)             │  (right aside)    │
│                      │                                            │                   │
│  • Avatar            │  #story    HeroSection                     │  ChatUI           │
│  • Name / role       │  #timeline TimelineSection                 │  • Suggested Qs   │
│  • Education         │  #projects ProjectsSection                 │  • Message feed   │
│  • Metric counters   │  #skills   SkillsSection                   │  • Sticky composer│
│  • Download PDF CTA  │  #chat-anchor (placeholder)                │  • Engineer View  │
│                      │                                            │                   │
│  < 900 px: collapses │  Scroll container is the <main> ref        │  < 900 px: hidden │
│  into horizontal     │  from CenterPanelContext                   │  → ChatFab FAB    │
│  top-bar             │                                            │  opens full modal │
└──────────────────────┴────────────────────────────────────────────┴───────────────────┘
```

### Key folders

```
src/
├── app/
│   ├── api/chat/route.ts   POST /api/chat — ReadableStream SSE (stub LLM, swap in real)
│   ├── globals.css         Design tokens (CSS custom properties) + global styles
│   ├── layout.tsx          Root layout: ThemeProvider, fonts (next/font)
│   └── page.tsx            Wires AppShell + all panel components
│
├── components/
│   ├── shell/
│   │   ├── AppShell.tsx         3-column 100vh layout; breakpoint-aware panel hiding
│   │   ├── Header.tsx           Fixed nav; active-section tracking via IntersectionObserver
│   │   ├── CenterPanelContext.tsx  scrollRef + scrollToSection shared across panels
│   │   └── ThemeProvider.tsx    Zustand theme ↔ CSS [data-theme] sync
│   │
│   ├── left/
│   │   └── SignalStrip.tsx      Avatar, metrics (rAF count-up), download CTA
│   │
│   ├── center/
│   │   ├── CenterPanel.tsx      Compositor + REQ-CPI-1 scroll watcher
│   │   └── sections/
│   │       ├── HeroSection.tsx     Time-based greeting
│   │       ├── TimelineSection.tsx REQ-CPI-2 "Ask about this" CTA per node
│   │       ├── ProjectsSection.tsx REQ-CPI-1 pulse target; REQ-CPI-3 tags
│   │       └── SkillsSection.tsx   REQ-CPI-3 hover → cross-panel highlight
│   │
│   ├── right/
│   │   ├── ChatUI.tsx       Full chat: suggested Qs, feed, composer, engineer view
│   │   ├── RightPanel.tsx   Desktop chat column + CitationTestBar dev helper
│   │   └── ChatFab.tsx      Mobile FAB + focus-trapped modal; reacts to isChatOpenMobile
│   │
│   └── common/
│       └── Tag.tsx          Shared skill tag; reads activeHighlightTag from global store
│
├── lib/
│   ├── chatReducer.ts    Pure async generator: stage→token→done events; deterministic mocks
│   ├── chatProtocol.ts   SSE wire format: encodeSSE / decodeSSELine; shared server+client
│   ├── useChatStream.ts  Hook: switches mock↔API on NEXT_PUBLIC_CHAT_MODE; feeds Zustand
│   ├── useFocusTrap.ts   Keyboard focus containment for the chat modal
│   ├── usePrefersReducedMotion.ts  SSR-safe matchMedia hook
│   ├── useBreakpoint.ts  Reactive viewport width; BP_COLLAPSE = 900 px
│   └── useCountUp.ts     rAF-based counter animation (0 → target)
│
├── store/
│   ├── index.ts           Theme, engineerView, messages, isStreaming, citations
│   └── portfolioStore.ts  Cross-panel: activeHighlightTag, targetScrollElementId,
│                          chatInputDraft, isChatOpenMobile, pulseElementId,
│                          pendingAutoSubmit, lastAutoScrollId
│
└── data/
    ├── portfolio.ts        All content: hero, timeline (with prompts), projects, skills
    └── suggestedQuestions.ts  Pre-written chat starter questions
```

---

## Cross-panel interactions (CPI)

### REQ-CPI-1 — Citation → scroll + pulse

**Trigger:** An assistant message completes with `citations: [{ cardId, score }]`.

**Flow:**
1. `ChatUI` citation-watcher effect finds the latest complete assistant message with citations.
2. Calls `setTargetScrollElementId(cardId)` and `setPulseElementId(cardId)` on `portfolioStore`.
3. **`CenterPanel`** watches `targetScrollElementId` → computes offset relative to the `<main>` scroll container → calls `container.scrollTo({ behavior: smooth|instant })`.
4. **`ProjectCard`** watches `pulseElementId` → adds `project-card-pulse` CSS class → 2 s accent glow animation → class removed.

**Test:** The "⚗ test citation →" bar at the top of the RightPanel fires mock messages with citations for Jira Agent, Neuron, and Slo-Mo.

---

### REQ-CPI-2 — Timeline node → pre-fill chat

**Trigger:** User expands a timeline node and clicks "Ask about this".

**Flow:**
1. `TimelineSection.handleAskAbout(node)` calls:
   - `setChatInputDraft(node.prompt)` — the `ChatUI` input field watches this and pulls the text in.
   - If `node.autoSubmit === true` → `setPendingAutoSubmit(true)` — `ChatUI` fires `sendQuestion` automatically after the draft lands.
   - If viewport is narrow (< 900 px) → `setChatOpenMobile(true)` — `ChatFab` opens the full-screen modal.
2. On desktop (right panel visible) and mobile modal (FAB open) — the same `ChatUI` reacts identically.

---

### REQ-CPI-3 — Skill tag → cross-panel highlight

**Trigger:** Hovering or focusing a skill `<Tag>` anywhere (Skills section, Project cards, Timeline expanded nodes).

**Flow:**
1. `Tag.onMouseEnter` / `onFocus` → `setActiveHighlightTag(label)`.
2. Every `<Tag>` instance in the tree subscribes to `activeHighlightTag` from `portfolioStore`.
3. Any tag whose `label === activeHighlightTag` immediately gets the accent glow ring + filled background — simultaneously, without prop drilling, regardless of which panel the tag is in.
4. `onMouseLeave` / `onBlur` → `setActiveHighlightTag(null)` → all tags return to resting state.

Clicking a skill tag in the Skills section also calls `setActiveHighlightTag(label)` persistently (until the filter changes or another tag is clicked).

---

## Design tokens

All visual constants live in `src/app/globals.css` under `:root` (warm-dark) and `[data-theme="light"]`. Never hardcode colors — always use CSS variables:

| Token | Warm-dark value | Purpose |
|---|---|---|
| `--bg` | `#171310` | Page background |
| `--surface` | `#1e1a16` | Panel / card background |
| `--surface-2` | `#252017` | Elevated surface |
| `--text` | `#ede6dc` | Primary text |
| `--accent` | `#d4845a` | Primary accent (orange) |
| `--primary` | `#7c9dbc` | Secondary accent (blue) |
| `--border` | `rgb(255 255 255 / 0.08)` | Subtle separator |
| `--motion-enter` | `180ms` | Default transition duration (→ 0ms in reduced-motion) |

---

## Reduced motion

Every animation is guarded:

- CSS transitions use `var(--motion-enter)` / `var(--motion-press)` — both set to `0ms` inside `@media (prefers-reduced-motion: reduce)`.
- `project-card-pulse` keyframe is replaced with a static outline in reduced-motion.
- `html, body { transition: none !important }` in reduced-motion.
- `ChatFab` scale-on-press JS skipped when `usePrefersReducedMotion()` returns true.
- Scroll behavior switches from `smooth` to `instant` via `usePrefersReducedMotion()`.
- Metric counter rAF animation resolves instantly (jumps to target) in reduced-motion.

---

## Accessibility notes

- All icon-only buttons have `aria-label` + `title`.
- Active nav pill has `aria-current="page"` via `IntersectionObserver`.
- Nav pills respond to keyboard focus with the same background highlight as hover.
- Chat modal: `role="dialog"`, `aria-modal`, `aria-label`; focus trapped by `useFocusTrap`; ESC closes.
- Skill tags: interactive buttons have `aria-pressed`; display-only tags have `role="mark"`, `tabIndex=0`.
- Chat live region: `role="status" aria-live="polite"` announces "Assistant is responding…" to screen readers.
- All section `<aside>` and `<main>` elements have `aria-label`.
- Hidden panels are removed from the DOM (not just `display:none`) at narrow breakpoints.
