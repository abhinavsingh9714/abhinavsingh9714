'use client'

import { Download, ExternalLink } from 'lucide-react'

export function ResumeWindow() {
  return (
    <div className="resume-window">
      <div className="window-toolbar">
        <div>
          <p className="window-eyebrow">Preview</p>
          <h2>resume.pdf</h2>
        </div>
        <div className="toolbar-actions">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="os-button">
            <ExternalLink size={15} />
            Open
          </a>
          <a href="/resume.pdf" download="Abhinav_Singh_Resume.pdf" className="os-button os-button--primary">
            <Download size={15} />
            Download
          </a>
        </div>
      </div>
      <div className="resume-preview">
        <iframe src="/resume.pdf#view=FitH" title="Abhinav Singh resume preview" />
        <div className="resume-fallback">
          <p>PDF preview unavailable in this browser.</p>
          <a href="/resume.pdf" download="Abhinav_Singh_Resume.pdf">Download resume</a>
        </div>
      </div>
    </div>
  )
}
