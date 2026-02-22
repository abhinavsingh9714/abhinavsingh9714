'use client'

/**
 * Visual validation page for fonts and colour tokens.
 * Checks: Instrument Serif headings · Inter body · JetBrains Mono code
 *         Warm Dark palette swatches · focus-visible ring on interactive elements
 */
export function FontColorValidator() {
  return (
    <div
      className="min-h-screen scroll-pane"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-subtle)', padding: '3rem 2rem' }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* ── Heading type scale ─────────────────────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <label className="font-body" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Instrument Serif — headings
          </label>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>
            Mission Control · h1
          </h1>
          <h2 style={{ marginBottom: '0.25rem' }}>
            Retrieval-Augmented Resume · h2
          </h2>
          <h3 style={{ marginBottom: '0.25rem' }}>
            ML Engineer · Data Scientist · h3
          </h3>
          <p className="font-heading" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            Italic variant — "fine-tuned and integrated a Qwen-based model"
          </p>
        </section>

        {/* ── Body type ──────────────────────────────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <label className="font-body" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Inter — body
          </label>
          <p className="font-body" style={{ marginTop: '0.5rem', lineHeight: '1.65', color: 'var(--text)' }}>
            Regular 16px — Spearheaded the development of Neuron, a multi-tenant ML/GenAI platform on AWS powering knowledge-base ingestion, infrastructure graphing, and enterprise Q&A across all company products.
          </p>
          <p className="font-body" style={{ marginTop: '0.75rem', lineHeight: '1.65', color: 'var(--text-muted)', fontSize: '14px' }}>
            Muted 14px — Designed and deployed a fault-tolerant multi-agent AI system with LangGraph to evaluate educational videos on 20+ learning indicators.
          </p>
          <p className="font-body" style={{ marginTop: '0.75rem', lineHeight: '1.65', color: 'var(--text-subtle)', fontSize: '13px' }}>
            Subtle 13px — GPA 3.89 · Advanced ML · Big Data Systems · Natural Language Processing
          </p>
        </section>

        {/* ── Mono ───────────────────────────────────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <label className="font-body" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            JetBrains Mono — code / metrics
          </label>
          <pre
            className="font-mono"
            style={{
              marginTop: '0.75rem',
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text)',
              fontSize: '13px',
              lineHeight: '1.65',
              overflowX: 'auto',
            }}
          >
{`embedMs:    42ms
retrieveMs: 88ms
generateMs: 203ms

const response = await streamChat(question, { mock: true }, callbacks)`}
          </pre>
          <p style={{ marginTop: '0.5rem', fontSize: '12px' }}>
            Inline code: <code style={{ color: 'var(--accent)' }}>useChatStream(&#123; mock: true &#125;)</code> streams tokens via the SSE client.
          </p>
        </section>

        {/* ── Colour swatches ────────────────────────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <label className="font-body" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Warm Dark palette
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
            {[
              { name: '--bg',          label: 'bg',           var: 'var(--bg)' },
              { name: '--surface',     label: 'surface',      var: 'var(--surface)' },
              { name: '--surface-2',   label: 'surface-2',    var: 'var(--surface-2)' },
              { name: '--surface-3',   label: 'surface-3',    var: 'var(--surface-3)' },
              { name: '--border',      label: 'border',       var: 'var(--border)' },
              { name: '--text',        label: 'text',         var: 'var(--text)' },
              { name: '--text-muted',  label: 'text-muted',   var: 'var(--text-muted)' },
              { name: '--text-subtle', label: 'text-subtle',  var: 'var(--text-subtle)' },
              { name: '--primary',     label: 'primary',      var: 'var(--primary)' },
              { name: '--primary-weak',label: 'primary-weak', var: 'var(--primary-weak)' },
              { name: '--accent',      label: 'accent',       var: 'var(--accent)' },
              { name: '--accent-weak', label: 'accent-weak',  var: 'var(--accent-weak)' },
              { name: '--success',     label: 'success',      var: 'var(--success)' },
              { name: '--error',       label: 'error',        var: 'var(--error)' },
            ].map(({ label, var: v }) => (
              <div
                key={label}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: '48px', backgroundColor: v }} />
                <div style={{ padding: '0.4rem 0.6rem', backgroundColor: 'var(--surface)' }}>
                  <p className="font-mono" style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    --{label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Focus-visible ring demo ─────────────────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <label className="font-body" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Focus-visible rings — tab through these
          </label>
          <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <button
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: 'var(--primary)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Primary action
            </button>

            <button
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Secondary action
            </button>

            <a
              href="#top"
              style={{ color: 'var(--accent)', fontSize: '14px', fontFamily: 'var(--font-sans)' }}
            >
              Inline link
            </a>

            <input
              type="text"
              placeholder="Search resume…"
              style={{
                padding: '0.4rem 0.75rem',
                backgroundColor: 'var(--surface-2)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--accent)'
                e.currentTarget.style.outlineOffset = '3px'
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none'
              }}
            />
          </div>
          <p className="font-body" style={{ marginTop: '0.75rem', fontSize: '13px', color: 'var(--text-subtle)' }}>
            The accent ring (#d4845a in dark / #c0724a in light) appears on keyboard focus only.
          </p>
        </section>

        {/* ── Component previews ─────────────────────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <label className="font-body" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Component classes (resume-card, citation-chip, pipeline-capsule)
          </label>
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Resume card */}
            <div className="resume-card">
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Founding ML Engineer · TAAI Labs</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Aug 2025 – Present</p>
              <p style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '6px', lineHeight: 1.6 }}>
                Spearheaded Neuron, a multi-tenant GenAI platform — RAG pipeline over 1000+ docs, NIST Q&A.
              </p>
              <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {['GenAI', 'RAG', 'AWS', 'Pinecone'].map(t => <span key={t} className="resume-card-tag">{t}</span>)}
              </div>
            </div>

            {/* Citation chips + pipeline capsule */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>Sources:</span>
              {['Founding ML Eng · TAAI', 'ML Intern · EdTech Tulna'].map(l => (
                <button key={l} className="citation-chip">{l}</button>
              ))}
            </div>

            <div className="pipeline-capsule" style={{ padding: '0.5rem 0.75rem', display: 'flex', gap: '1.5rem', fontSize: '12px' }}>
              {[
                { label: 'Embed', ms: '42ms', done: true },
                { label: 'Retrieve', ms: '88ms', done: true },
                { label: 'Generate', ms: '203ms', done: true },
              ].map(s => (
                <span key={s.label} className="font-mono" style={{ color: s.done ? 'var(--success)' : 'var(--text-subtle)' }}>
                  ✓ {s.label} <span style={{ color: 'var(--text-subtle)' }}>{s.ms}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
