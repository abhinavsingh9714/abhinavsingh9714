const MAX_WORDS_PREVIEW = 140

/**
 * Clamp text to ~120–160 words for recruiter scanning; prefer keeping bullet boundaries.
 */
export function clampToPreview(text: string, maxWords: number = MAX_WORDS_PREVIEW): string {
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text.trim()
  const bulletSplits = text.split(/(?=^[-•]\s)/m).filter(Boolean)
  let count = 0
  const taken: string[] = []
  for (const seg of bulletSplits) {
    const segWords = seg.trim().split(/\s+/).length
    if (count + segWords > maxWords) break
    count += segWords
    taken.push(seg.trim())
  }
  const out = taken.join('\n').trim()
  return out ? `${out}\n…` : text.trim().split(/\s+/).slice(0, maxWords).join(' ') + ' …'
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}
