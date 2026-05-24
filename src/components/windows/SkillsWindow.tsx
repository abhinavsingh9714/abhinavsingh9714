'use client'

import { MessageSquareText } from 'lucide-react'
import { skillGroups } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'
import { usePortfolioStore } from '@/store/portfolioStore'

export function SkillsWindow() {
  const { openWindow } = useWindowManager()
  const setChatInputDraft = usePortfolioStore((state) => state.setChatInputDraft)

  const askSkill = (skill: string) => {
    setChatInputDraft(`Tell me about Abhinav's experience with ${skill}. Use grounded portfolio context.`)
    openWindow('terminal')
  }

  return (
    <div className="skills-window">
      <div className="window-toolbar">
        <div>
          <p className="window-eyebrow">System Preferences</p>
          <h2>Skill depth</h2>
        </div>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <section key={group.name} className="skill-panel">
            <h3>{group.name}</h3>
            <p>Primary</p>
            <div className="skill-chip-row">
              {group.primary.map((skill) => (
                <button type="button" key={skill} onClick={() => askSkill(skill)}>
                  {skill}
                </button>
              ))}
            </div>
            <p>Supporting</p>
            <div className="skill-chip-row skill-chip-row--muted">
              {group.supporting.map((skill) => (
                <button type="button" key={skill} onClick={() => askSkill(skill)}>
                  {skill}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="skills-hint">
        <MessageSquareText size={14} />
        Click a skill to ask Terminal for grounded examples.
      </div>
    </div>
  )
}
