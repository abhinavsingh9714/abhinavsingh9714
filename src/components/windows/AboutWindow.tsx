'use client'

import { FileText, FolderKanban, Mail, Terminal } from 'lucide-react'
import { focusAreas, profile, proofMetrics } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'
import { usePortfolioStore } from '@/store/portfolioStore'

export function AboutWindow() {
  const { openWindow } = useWindowManager()
  const setChatInputDraft = usePortfolioStore((state) => state.setChatInputDraft)

  const askAbout = () => {
    setChatInputDraft('Why should I interview Abhinav? Focus on production AI systems, backend ownership, and measurable impact.')
    openWindow('terminal')
  }

  return (
    <article className="about-note-window">
      <div className="textedit-toolbar" aria-hidden>
        <span>summary.txt</span>
        <span>Plain Text</span>
      </div>

      <div className="about-note-content">
        <div className="about-note-photo">
          <img src="/avatar.jpg" alt={`${profile.name} portrait`} />
        </div>

        <div className="about-note-copy">
          <p className="window-eyebrow">About Me</p>
          <h1>{profile.name}</h1>
          <p className="about-role">{profile.role}</p>
          <p className="about-positioning">{profile.positioning}</p>

          <div className="profile-meta">
            <span>{profile.education}</span>
            <span>{profile.location}</span>
          </div>

          <ul className="about-note-list">
            <li>Builds RAG, agentic workflows, evaluation pipelines, and multimodal ML systems.</li>
            <li>Uses retrieval traces, typed outputs, and citations to keep AI behavior inspectable.</li>
            <li>{profile.status}</li>
          </ul>

          <div className="focus-chip-row" aria-label="Focus areas">
            {focusAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>

          <div className="proof-grid proof-grid--compact">
            {proofMetrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <p className="about-tagline">{profile.tagline}</p>

          <div className="about-actions">
            <button type="button" className="os-button os-button--primary" onClick={askAbout}>
              <Terminal size={15} />
              Ask Terminal
            </button>
            <button type="button" className="os-button" onClick={() => openWindow('projects')}>
              <FolderKanban size={15} />
              Projects
            </button>
            <button type="button" className="os-button" onClick={() => openWindow('resume')}>
              <FileText size={15} />
              Resume
            </button>
            <button type="button" className="os-button" onClick={() => openWindow('contact')}>
              <Mail size={15} />
              Contact
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
