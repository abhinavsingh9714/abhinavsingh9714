'use client'

import { useEffect, useMemo, useRef } from 'react'
import { ExternalLink, MessageSquareText } from 'lucide-react'
import { osProjects, type OsProject } from '@/data/os'
import { useWindowManager } from '@/context/WindowManagerContext'
import { usePortfolioStore } from '@/store/portfolioStore'

export function ProjectsWindow() {
  const grouped = useMemo(() => {
    return osProjects.reduce<Record<string, OsProject[]>>((acc, project) => {
      acc[project.category] = [...(acc[project.category] ?? []), project]
      return acc
    }, {})
  }, [])

  return (
    <div className="projects-window">
      <div className="window-toolbar">
        <div>
          <p className="window-eyebrow">Featured Systems</p>
          <h2>Metric-first project evidence</h2>
        </div>
        <span className="toolbar-badge">Ask Terminal on any card</span>
      </div>

      <div className="projects-scroll">
        {Object.entries(grouped).map(([category, projects]) => (
          <section className="project-category" key={category}>
            <h3>{category}</h3>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: OsProject }) {
  const { openWindow } = useWindowManager()
  const setChatInputDraft = usePortfolioStore((state) => state.setChatInputDraft)
  const pulseElementId = usePortfolioStore((state) => state.pulseElementId)
  const setPulseElementId = usePortfolioStore((state) => state.setPulseElementId)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (pulseElementId !== project.id) return
    const element = ref.current
    if (!element) return
    element.classList.remove('project-card--pulse')
    void element.offsetWidth
    element.classList.add('project-card--pulse')
    setPulseElementId(null)
    const timer = window.setTimeout(() => element.classList.remove('project-card--pulse'), 2000)
    return () => window.clearTimeout(timer)
  }, [pulseElementId, project.id, setPulseElementId])

  const askTerminal = () => {
    setChatInputDraft(project.prompt)
    openWindow('terminal')
  }

  return (
    <article className="project-card" id={project.id} ref={ref}>
      <p className="project-card__metric">{project.metric}</p>
      <h4>{project.name}</h4>
      <p>{project.summary}</p>
      <div className="project-card__tags">
        {project.stack.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="project-card__actions">
        <button type="button" className="text-action" onClick={askTerminal}>
          <MessageSquareText size={14} />
          Ask Terminal
        </button>
        {project.href && (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-action">
            <ExternalLink size={14} />
            Link
          </a>
        )}
      </div>
    </article>
  )
}
