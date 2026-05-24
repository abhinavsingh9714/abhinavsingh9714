'use client'

import { AboutWindow } from '@/components/windows/AboutWindow'
import { ContactWindow } from '@/components/windows/ContactWindow'
import { FinderWindow } from '@/components/windows/FinderWindow'
import { NotesWindow } from '@/components/windows/NotesWindow'
import { ProjectsWindow } from '@/components/windows/ProjectsWindow'
import { ReadmeWindow } from '@/components/windows/ReadmeWindow'
import { ResumeWindow } from '@/components/windows/ResumeWindow'
import { SkillsWindow } from '@/components/windows/SkillsWindow'
import { TerminalWindow } from '@/components/windows/TerminalWindow'
import { TrashWindow } from '@/components/windows/TrashWindow'
import type { WindowId } from '@/lib/os/windowDefaults'

export function WindowContent({ id }: { id: WindowId }) {
  switch (id) {
    case 'about':
      return <AboutWindow />
    case 'terminal':
      return <TerminalWindow />
    case 'projects':
      return <ProjectsWindow />
    case 'resume':
      return <ResumeWindow />
    case 'contact':
      return <ContactWindow />
    case 'finder':
      return <FinderWindow />
    case 'notes':
      return <NotesWindow />
    case 'skills':
      return <SkillsWindow />
    case 'readme':
      return <ReadmeWindow />
    case 'trash':
      return <TrashWindow />
    case 'links':
    default:
      return <ReadmeWindow />
  }
}
