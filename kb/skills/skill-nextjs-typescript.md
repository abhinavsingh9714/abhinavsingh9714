---
docId: skill-nextjs-typescript
title: Next.js and TypeScript — Usage and Experience
type: other
tags: Next.js, TypeScript, React, fullstack, portfolio, Route Handler, SSE
---

# Next.js and TypeScript

Abhinav built this portfolio website entirely with Next.js 16 (App Router) and TypeScript.

## Next.js

**What was built:**
- Full-stack portfolio site — no separate backend server needed.
- **`/api/chat` Route Handler** — implements the complete Mini-RAG pipeline server-side: embeds the user query with OpenAI `text-embedding-3-small`, runs cosine similarity search over precomputed chunk vectors loaded from `public/kb_index.json`, builds a focused GPT-4o-mini prompt with only the top-K retrieved chunks, and streams the response back to the browser via Server-Sent Events (SSE).
- **App Router** — used for layout, page routing, and server vs. client component split.
- **Turbopack** — used for fast incremental dev builds (~400ms cold start).
- **Static asset serving** — `public/kb_index.json` holds all precomputed 1536-dim chunk embeddings; loaded into memory by the Route Handler on cold start.

## TypeScript

**Where used:**
- All React components (frontend UI, layout, panels, chat)
- Zustand store definitions (`useAppStore`, `usePortfolioStore`) with full type safety
- `src/lib/types.ts` — shared discriminated union types for SSE events (`ChatEvent`), retrieval chunks, citations, and pipeline metrics
- `scripts/build_kb_index.ts` — TypeScript build script run with `tsx` at build time to chunk KB markdown files and call the OpenAI Embeddings API
- `/api/chat/route.ts` — typed Route Handler with Pydantic-equivalent interface definitions

TypeScript is used full-stack: frontend UI, server-side API routes, and build-time tooling.
