import type { WindowId } from '@/lib/os/windowDefaults'

export interface DockApp {
  id: string
  label: string
  windowId?: WindowId
  href?: string
  disabled?: boolean
}

export interface DesktopItem {
  id: string
  label: string
  kind: 'file' | 'folder' | 'terminal'
  windowId: WindowId
}

export interface OsProject {
  id: string
  category: string
  metric: string
  name: string
  summary: string
  stack: string[]
  prompt: string
  href?: string
}

export const profile = {
  name: 'Abhinav Singh',
  role: 'ML Engineer / AI Systems Builder',
  location: 'College Park, MD',
  status: 'Open to full-time ML/AI engineering roles',
  education: 'M.S. Data Science / University of Maryland / May 2026',
  positioning:
    'I build production-minded ML systems across RAG, agentic workflows, evaluation pipelines, and multimodal AI.',
  tagline: 'Systems over demos. Grounded over flashy. Useful over noisy.',
  email: 'abhinavschauhan14@gmail.com',
  github: 'https://github.com/abhinavsingh9714',
  linkedin: 'https://www.linkedin.com/in/abhinavsingh9714/',
  medium: 'https://medium.com/@abhinavsingh9714',
}

export const focusAreas = [
  'RAG Systems',
  'Multi-Agent Orchestration',
  'Evaluation Pipelines',
  'Multimodal ML',
]

export const proofMetrics = [
  { value: '1K+', label: 'docs indexed in production-style RAG' },
  { value: '90%', label: 'faster architecture review workflows' },
  { value: '95%', label: 'less manual video evaluation time' },
]

export const dockApps: DockApp[] = [
  { id: 'finder', label: 'Finder', windowId: 'finder' },
  { id: 'launchpad', label: 'Launchpad' },
  { id: 'safari', label: 'Safari', href: profile.github },
  { id: 'messages', label: 'Messages', windowId: 'contact' },
  { id: 'mail', label: 'Mail', windowId: 'contact' },
  { id: 'maps', label: 'Maps' },
  { id: 'photos', label: 'Photos' },
  { id: 'facetime', label: 'FaceTime' },
  { id: 'calendar', label: 'Calendar', windowId: 'finder' },
  { id: 'contacts', label: 'Contacts', windowId: 'about' },
  { id: 'reminders', label: 'Reminders', windowId: 'projects' },
  { id: 'notes', label: 'Notes', windowId: 'notes' },
  { id: 'tv', label: 'TV' },
  { id: 'music', label: 'Music' },
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'appstore', label: 'App Store', href: profile.github },
  { id: 'settings', label: 'System Settings', windowId: 'skills' },
  { id: 'separator-left', label: '' },
  { id: 'spotify', label: 'Spotify', href: profile.linkedin },
  { id: 'separator-right', label: '' },
  { id: 'downloads', label: 'Projects', windowId: 'projects' },
  { id: 'trash', label: 'Trash', windowId: 'trash' },
]

export const desktopItems: DesktopItem[] = [
  { id: 'about-folder', label: 'About Me', kind: 'folder', windowId: 'about' },
  { id: 'resume-file', label: 'Resume.pdf', kind: 'file', windowId: 'resume' },
  { id: 'projects-folder', label: 'Projects', kind: 'folder', windowId: 'projects' },
  { id: 'readme', label: 'README.md', kind: 'file', windowId: 'readme' },
  { id: 'ask-terminal', label: 'ask-me.terminal', kind: 'terminal', windowId: 'terminal' },
]

export const starterPrompts = [
  'Why should I interview Abhinav?',
  'What production GenAI systems has he built?',
  'Summarize his RAG and agent experience.',
  'Show me his strongest projects.',
  'What would make him useful on a small AI team?',
]

export const recruiterPrompt =
  'Summarize Abhinav for a hiring manager in 5 bullets. Focus on production AI systems, backend ownership, and measurable impact.'

export const osProjects: OsProject[] = [
  {
    id: 'project-neuron',
    category: 'Production GenAI Systems',
    metric: '90% faster architecture review',
    name: 'Neuron / AI platform',
    summary:
      'Multi-tenant GenAI platform with document ingestion, Terraform graphing, and grounded enterprise Q&A.',
    stack: ['RAG', 'AWS', 'Pinecone', 'DynamoDB', 'Qwen'],
    prompt:
      'Tell me about Neuron. Explain the RAG architecture, production constraints, impact, and technical decisions.',
  },
  {
    id: 'project-jira-agent',
    category: 'Agentic Workflow Systems',
    metric: '70% less planning overhead',
    name: 'Intelligent Jira Backlog Generator',
    summary:
      'LLM planning agent that turns product descriptions into schema-enforced Jira initiatives, epics, stories, and tasks.',
    stack: ['LangChain', 'GPT-4o', 'Gemini', 'Pydantic', 'Jira API'],
    href: 'https://github.com/abhinavsingh9714/JIRA-agent',
    prompt:
      'Walk me through the Intelligent Jira Backlog Generator. Explain the architecture, impact, and technical decisions.',
  },
  {
    id: 'project-edtech-video',
    category: 'Evaluation / Observability',
    metric: '95% faster manual review',
    name: 'EdTech video evaluator',
    summary:
      'LangGraph multi-agent evaluator for educational videos with evidence-backed document reports and timestamped visual proof.',
    stack: ['LangGraph', 'LLM', 'FFmpeg', 'Evaluation', 'Reports'],
    prompt:
      'How did the LangGraph multi-agent video evaluation system work? Focus on evaluation design, evidence, and reliability.',
  },
  {
    id: 'project-slomo',
    category: 'Multimodal / ML Research',
    metric: '8x frame-rate uplift',
    name: 'Slo-Mo Video Generation',
    summary:
      'U-Net-based frame interpolation system that synthesizes intermediate video frames for smooth slow-motion playback.',
    stack: ['PyTorch', 'U-Net', 'Video ML', 'SSIM', 'LPIPS'],
    href: 'https://github.com/abhinavsingh9714',
    prompt:
      'Explain the Slo-Mo Video Generation project. Cover the model, evaluation, and why learned interpolation mattered.',
  },
  {
    id: 'project-multistock',
    category: 'Forecasting / Time Series',
    metric: '$2.38 average deviation',
    name: 'Multi-Stock Price Prediction',
    summary:
      'Dual-input LSTM and stock-embedding model for forecasting 24 major stocks from technical indicators.',
    stack: ['LSTM', 'Embeddings', 'PyTorch', 'RSI', 'MACD'],
    href: 'https://github.com/abhinavsingh9714',
    prompt:
      'Explain the Multi-Stock Price Prediction system. Cover the architecture, features, and forecasting tradeoffs.',
  },
  {
    id: 'project-visual-search',
    category: 'Production GenAI Systems',
    metric: '<50ms visual retrieval',
    name: 'Visual similarity search',
    summary:
      'CLIP and FAISS search API over 60K images, delivered as a FastAPI-backed visual search workflow.',
    stack: ['CLIP', 'FAISS', 'FastAPI', 'Vector Search'],
    prompt:
      'Tell me about Abhinav\'s visual similarity engine. Explain the CLIP and FAISS architecture and latency choices.',
  },
]

export const timelineItems = [
  {
    period: 'Aug 2025 - Present',
    title: 'Founding ML Engineer',
    org: 'TAAI Labs',
    detail: 'Built Neuron, a multi-tenant GenAI platform with RAG, infrastructure graphing, and grounded Q&A.',
  },
  {
    period: 'Jun 2025 - Aug 2025',
    title: 'ML Intern',
    org: 'EdTech TULNA / IIT Delhi',
    detail: 'Built a LangGraph multi-agent system for evidence-backed educational video evaluation.',
  },
  {
    period: '2024 - 2026',
    title: 'M.S. Data Science',
    org: 'University of Maryland',
    detail: 'Focused on scalable inference, NLP, big data systems, and retrieval-augmented generation.',
  },
  {
    period: 'Jul 2023 - Dec 2023',
    title: 'ML Engineer',
    org: 'Freelance',
    detail: 'Shipped CLIP/FAISS visual search and BERT sentiment pipelines with FastAPI serving.',
  },
]

export const writingItems = [
  {
    title: 'Intricacies of Visual Search Systems',
    source: 'Medium',
    href: 'https://medium.com/@sabhinavofficial/intricacies-of-visual-search-systems-af337e42d68d',
    summary: 'CBIR, CLIP embeddings, ANN search, multimodal fusion, and the engineering behind visual search.',
  },
  {
    title: 'Production ML Is About Constraining Models',
    source: 'LinkedIn',
    href: 'https://www.linkedin.com/posts/abhinavsingh9714_mlplatform-productionml-genaireliability-activity-7424451682757107712-S-UM',
    summary: 'Why production ML succeeds by narrowing model outputs into reliable downstream contracts.',
  },
  {
    title: 'Most ML Failures Start With Data Definition',
    source: 'LinkedIn',
    href: 'https://www.linkedin.com/posts/abhinavsingh9714_mlplatform-productionml-datareliability-activity-7422685034144329728-19SM',
    summary: 'Schema meaning, lineage, and trust as the less glamorous center of reliable ML systems.',
  },
]

export const skillGroups = [
  {
    name: 'ML / AI',
    primary: ['PyTorch', 'Hugging Face', 'scikit-learn'],
    supporting: ['TensorFlow', 'XGBoost', 'Computer Vision'],
  },
  {
    name: 'RAG / Agents',
    primary: ['RAG', 'LangChain', 'LangGraph'],
    supporting: ['Pinecone', 'FAISS', 'Structured Outputs'],
  },
  {
    name: 'Backend / Cloud',
    primary: ['Python', 'FastAPI', 'AWS'],
    supporting: ['DynamoDB', 'Docker', 'PostgreSQL'],
  },
  {
    name: 'Evaluation / Observability',
    primary: ['Citations', 'Retrieval Trace', 'Evidence Reports'],
    supporting: ['SSIM', 'LPIPS', 'CI/CD'],
  },
]
