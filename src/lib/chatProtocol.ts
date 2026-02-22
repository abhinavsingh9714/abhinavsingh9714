/**
 * chatProtocol — shared SSE wire format between the /api/chat route and
 * the frontend useChatStream hook.
 *
 * Wire format
 * ───────────
 * Each event is a single JSON line sent as an SSE data frame:
 *
 *   data: {"type":"stage","stage":"embedding"}\n\n
 *   data: {"type":"token","token":"Hello"}\n\n
 *   data: {"type":"done","citations":[...],"metrics":{...}}\n\n
 *   data: {"type":"error","message":"..."}\n\n
 *
 * The client reads each `data:` line, parses the JSON, and dispatches
 * the event to the chat reducer.
 *
 * POST body shape
 * ───────────────
 *   { query: string; ui_state?: Record<string, unknown> }
 */

import type { ChatEvent } from './chatReducer'

// ── Request body ──────────────────────────────────────────────────────────────

export interface ChatRequestBody {
  query:     string
  ui_state?: Record<string, unknown>
}

// ── SSE helpers ───────────────────────────────────────────────────────────────

const enc = new TextEncoder()

/** Encode a ChatEvent into a single SSE `data:` frame (UTF-8 bytes). */
export function encodeSSE(event: ChatEvent): Uint8Array {
  return enc.encode(`data: ${JSON.stringify(event)}\n\n`)
}

/** Parse a raw SSE `data:` line into a ChatEvent, or null if unparseable. */
export function decodeSSELine(line: string): ChatEvent | null {
  const raw = line.startsWith('data: ') ? line.slice(6) : line
  try {
    return JSON.parse(raw) as ChatEvent
  } catch {
    return null
  }
}
