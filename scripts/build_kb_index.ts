/**
 * build_kb_index.ts — Build-time KB chunk + embed script.
 *
 * Usage:
 *   npm run kb:build
 *   (requires OPENAI_API_KEY in env)
 *
 * Steps:
 *   1. Reads all kb/**\/*.md files
 *   2. Parses --- frontmatter block
 *   3. Chunks body text (~350 words, ~60-word overlap)
 *   4. Embeds each chunk via OpenAI text-embedding-3-small
 *   5. Writes public/kb_index.json
 */

import * as fs   from 'fs'
import * as path from 'path'
import OpenAI    from 'openai'

// ── Types ─────────────────────────────────────────────────────────────────────

interface KBChunk {
  chunkId:    string
  docId:      string
  title:      string
  type:       'resume' | 'project' | 'story' | 'other'
  projectId?: string
  tags:       string[]
  text:       string
  embedding:  number[]
}

interface KBIndex {
  version:        string
  embeddingModel: string
  createdAt:      string
  chunks:         KBChunk[]
}

interface FrontMatter {
  docId:      string
  title:      string
  type:       'resume' | 'project' | 'story' | 'other'
  projectId?: string
  tags:       string[]
}

// ── Frontmatter parser ────────────────────────────────────────────────────────

function parseFrontmatter(raw: string): { meta: FrontMatter; body: string } {
  const delimiter = '---'
  const firstIdx  = raw.indexOf(delimiter)
  const secondIdx = raw.indexOf(delimiter, firstIdx + delimiter.length)

  if (firstIdx === -1 || secondIdx === -1) {
    throw new Error('No frontmatter block found (expected --- ... ---)')
  }

  const fmBlock = raw.slice(firstIdx + delimiter.length, secondIdx).trim()
  const body    = raw.slice(secondIdx + delimiter.length).trim()

  const meta: Partial<FrontMatter> = {}
  for (const line of fmBlock.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key   = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()
    if (key === 'docId')     meta.docId     = value
    if (key === 'title')     meta.title     = value
    if (key === 'type')      meta.type      = value as FrontMatter['type']
    if (key === 'projectId') meta.projectId = value
    if (key === 'tags')      meta.tags      = value.split(',').map((t) => t.trim()).filter(Boolean)
  }

  if (!meta.docId)  throw new Error(`Missing 'docId' in frontmatter`)
  if (!meta.title)  throw new Error(`Missing 'title' in frontmatter`)
  if (!meta.type)   meta.type = 'other'
  if (!meta.tags)   meta.tags = []

  return { meta: meta as FrontMatter, body }
}

// ── Chunker ───────────────────────────────────────────────────────────────────

const CHUNK_WORDS   = 350
const OVERLAP_WORDS = 60

function chunkText(text: string): string[] {
  const words  = text.split(/\s+/).filter(Boolean)
  const chunks: string[] = []
  let   start  = 0

  while (start < words.length) {
    const end   = Math.min(start + CHUNK_WORDS, words.length)
    const chunk = words.slice(start, end).join(' ').trim()
    if (chunk) chunks.push(chunk)
    if (end >= words.length) break
    start = end - OVERLAP_WORDS
  }

  return chunks
}

// ── File discovery ────────────────────────────────────────────────────────────

function findMdFiles(dir: string): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findMdFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath)
    }
  }
  return results
}

// ── Embedding with retry ──────────────────────────────────────────────────────

async function embedWithRetry(
  client: OpenAI,
  text:   string,
  retries = 3,
): Promise<number[]> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await client.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      })
      return res.data[0].embedding
    } catch (err) {
      if (attempt === retries) throw err
      const waitMs = attempt * 1000
      console.warn(`  Embedding attempt ${attempt} failed, retrying in ${waitMs}ms…`)
      await new Promise((r) => setTimeout(r, waitMs))
    }
  }
  throw new Error('Unreachable')
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is not set.')
    process.exit(1)
  }

  const client    = new OpenAI({ apiKey })
  const repoRoot  = path.resolve(process.cwd())
  const kbDir     = path.join(repoRoot, 'kb')
  const outputPath = path.join(repoRoot, 'public', 'kb_index.json')

  if (!fs.existsSync(kbDir)) {
    console.error(`Error: kb/ directory not found at ${kbDir}`)
    process.exit(1)
  }

  const mdFiles = findMdFiles(kbDir)
  console.log(`Found ${mdFiles.length} KB files in ${kbDir}`)

  const allChunks: KBChunk[] = []

  for (const filePath of mdFiles) {
    const relPath = path.relative(repoRoot, filePath)
    console.log(`\nProcessing: ${relPath}`)

    const raw = fs.readFileSync(filePath, 'utf-8')
    let meta: FrontMatter
    let body: string
    try {
      ;({ meta, body } = parseFrontmatter(raw))
    } catch (err) {
      console.error(`  Skipping (${(err as Error).message})`)
      continue
    }

    const textChunks = chunkText(body)
    console.log(`  ${textChunks.length} chunk(s) from "${meta.title}"`)

    for (let i = 0; i < textChunks.length; i++) {
      // Prepend title + tags so each chunk embedding captures the concept label,
      // even if the title words don't appear in the body text.
      const tagLine   = meta.tags.length > 0 ? `Tags: ${meta.tags.join(', ')}\n` : ''
      const chunkText = `${meta.title}\n${tagLine}\n${textChunks[i]}`
      const chunkId   = `${meta.docId}#${i}`

      process.stdout.write(`  Embedding chunk ${i + 1}/${textChunks.length} (${chunkText.split(' ').length} words)… `)

      const embedding = await embedWithRetry(client, chunkText)
      console.log(`done (${embedding.length}d)`)

      allChunks.push({
        chunkId,
        docId:     meta.docId,
        title:     meta.title,
        type:      meta.type,
        projectId: meta.projectId,
        tags:      meta.tags,
        text:      chunkText,
        embedding,
      })

      // Small delay to avoid rate-limit bursts
      if (i < textChunks.length - 1) {
        await new Promise((r) => setTimeout(r, 100))
      }
    }
  }

  const index: KBIndex = {
    version:        '1',
    embeddingModel: 'text-embedding-3-small',
    createdAt:      new Date().toISOString(),
    chunks:         allChunks,
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf-8')

  console.log(`\n✓ Wrote ${allChunks.length} chunks to ${path.relative(repoRoot, outputPath)}`)
  console.log(`  Embedding model: ${index.embeddingModel}`)
  console.log(`  Created at:      ${index.createdAt}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
