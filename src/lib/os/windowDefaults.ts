export type WindowId =
  | 'about'
  | 'terminal'
  | 'projects'
  | 'resume'
  | 'contact'
  | 'finder'
  | 'notes'
  | 'skills'
  | 'readme'
  | 'links'
  | 'trash'

export interface WindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  previousPosition?: { x: number; y: number }
  previousSize?: { width: number; height: number }
  minSize: { width: number; height: number }
  zIndex: number
}

type WindowDefaults = Record<WindowId, WindowState>

const base = {
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
}

export const initialWindows: WindowDefaults = {
  about: {
    ...base,
    id: 'about',
    title: 'summary.txt - TextEdit',
    isOpen: false,
    position: { x: 118, y: 96 },
    size: { width: 560, height: 470 },
    minSize: { width: 420, height: 320 },
    zIndex: 21,
  },
  terminal: {
    ...base,
    id: 'terminal',
    title: 'Ask Abhinav OS - portfolio-rag',
    isOpen: true,
    position: { x: 900, y: 520 },
    size: { width: 470, height: 270 },
    minSize: { width: 420, height: 260 },
    zIndex: 22,
  },
  projects: {
    ...base,
    id: 'projects',
    title: 'Projects',
    position: { x: 150, y: 110 },
    size: { width: 760, height: 560 },
    minSize: { width: 520, height: 390 },
    zIndex: 10,
  },
  resume: {
    ...base,
    id: 'resume',
    title: 'Preview - resume.pdf',
    position: { x: 250, y: 92 },
    size: { width: 700, height: 620 },
    minSize: { width: 480, height: 420 },
    zIndex: 10,
  },
  contact: {
    ...base,
    id: 'contact',
    title: 'Mail - Contact',
    position: { x: 330, y: 150 },
    size: { width: 620, height: 480 },
    minSize: { width: 460, height: 360 },
    zIndex: 10,
  },
  finder: {
    ...base,
    id: 'finder',
    title: 'Finder - Timeline',
    position: { x: 120, y: 130 },
    size: { width: 720, height: 500 },
    minSize: { width: 500, height: 360 },
    zIndex: 10,
  },
  notes: {
    ...base,
    id: 'notes',
    title: 'Notes - Writing',
    position: { x: 210, y: 140 },
    size: { width: 680, height: 480 },
    minSize: { width: 460, height: 340 },
    zIndex: 10,
  },
  skills: {
    ...base,
    id: 'skills',
    title: 'Preferences - Skills',
    position: { x: 270, y: 116 },
    size: { width: 660, height: 500 },
    minSize: { width: 480, height: 360 },
    zIndex: 10,
  },
  readme: {
    ...base,
    id: 'readme',
    title: 'README.md',
    position: { x: 400, y: 150 },
    size: { width: 520, height: 360 },
    minSize: { width: 360, height: 260 },
    zIndex: 10,
  },
  links: {
    ...base,
    id: 'links',
    title: 'Links',
    position: { x: 470, y: 170 },
    size: { width: 420, height: 320 },
    minSize: { width: 320, height: 240 },
    zIndex: 10,
  },
  trash: {
    ...base,
    id: 'trash',
    title: 'Trash',
    position: { x: 520, y: 210 },
    size: { width: 460, height: 320 },
    minSize: { width: 360, height: 260 },
    zIndex: 10,
  },
}

export const defaultOpenWindows: WindowId[] = ['terminal']

export function cloneInitialWindows(): WindowDefaults {
  return Object.fromEntries(
    Object.entries(initialWindows).map(([id, state]) => [
      id,
      {
        ...state,
        position: { ...state.position },
        size: { ...state.size },
        minSize: { ...state.minSize },
      },
    ]),
  ) as WindowDefaults
}
