'use client'

import { useState } from 'react'
import { Code2, Mail, Network, Send } from 'lucide-react'
import { profile } from '@/data/os'

export function ContactWindow() {
  const [subject, setSubject] = useState("Let's talk about AI systems")
  const [body, setBody] = useState(
    'Hi Abhinav,\n\nI came across your portfolio and would like to connect about...',
  )

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <div className="contact-window">
      <div className="mail-fields">
        <label>
          <span>To:</span>
          <input value={profile.email} readOnly />
        </label>
        <label>
          <span>Subject:</span>
          <input value={subject} onChange={(event) => setSubject(event.target.value)} />
        </label>
      </div>
      <textarea
        className="mail-body"
        aria-label="Email body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <div className="mail-actions">
        <a className="os-button os-button--primary" href={mailto}>
          <Send size={15} />
          Send
        </a>
        <a className="os-button" href={profile.github} target="_blank" rel="noopener noreferrer">
          <Code2 size={15} />
          GitHub
        </a>
        <a className="os-button" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <Network size={15} />
          LinkedIn
        </a>
        <a className="os-button" href={`mailto:${profile.email}`}>
          <Mail size={15} />
          Email
        </a>
      </div>
    </div>
  )
}
