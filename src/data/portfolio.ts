/**
 * Portfolio data — single source of truth for the CenterPanel sections.
 * All content is typed; no magic strings live in JSX.
 */

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroData {
  name:     string
  tagline:  string
  /** Short sentence shown beneath the time-based greeting */
  intro:    string
  location: string
  status:   string
}

export const hero: HeroData = {
  name:     'Abhinav Singh',
  tagline:  'I build ML systems that think, retrieve, and explain.',
  intro:    'ML Engineer focused on production GenAI, RAG pipelines, and multimodal inference. Currently: M.S. Data Science at UMD.',
  location: 'College Park, MD',
  status:   'Open to full-time ML roles · May 2026',
}

// ─── Timeline ────────────────────────────────────────────────────────────────

export interface TimelineNode {
  id:      string
  year:    string
  title:   string
  org:     string
  kind:    'work' | 'education' | 'project'
  bullets: string[]
  /** Skill tags shown in the expanded body — participate in cross-panel highlight */
  tags?:   string[]
  /**
   * REQ-CPI-2: pre-filled chat prompt surfaced when the node is expanded.
   * Clicking "Ask about this" sets chatInputDraft (and optionally autoSubmits).
   */
  prompt?:     string
  /** When true the prompt is sent immediately without user confirmation */
  autoSubmit?: boolean
}

export const timeline: TimelineNode[] = [
  {
    id:    'tl-taai',
    year:  '2025 – now',
    title: 'Founding ML Engineer',
    org:   'TAAI Labs',
    kind:  'work',
    bullets: [
      'Built Neuron — multi-tenant GenAI platform on AWS with RAG over 1 000+ docs.',
      'Infrastructure graphing from Terraform cut architecture review time by 90%.',
      'Fine-tuned Qwen for NIST-compliant Q&A; fully grounded, audit-ready responses.',
    ],
    tags: ['GenAI', 'RAG', 'AWS', 'Pinecone', 'Qwen', 'LangChain'],
    prompt: 'Tell me more about the Neuron platform you built at TAAI Labs — the RAG architecture and how you handled multi-tenancy.',
  },
  {
    id:    'tl-edtech',
    year:  'Jun – Aug 2025',
    title: 'ML Intern',
    org:   'EdTech Tulna · IIT Delhi',
    kind:  'work',
    bullets: [
      'LangGraph multi-agent system evaluated videos on 20+ learning indicators.',
      '95% reduction in manual review time with evidence-backed structured reports.',
      '90%+ alignment with expert human evaluations via LLM critics + conflict-resolution agent.',
    ],
    tags: ['LangGraph', 'LLM', 'Multi-Agent', 'LangChain'],
    prompt: 'How did the LangGraph multi-agent system at EdTech Tulna work? What was the conflict-resolution strategy between agents?',
  },
  {
    id:    'tl-umd',
    year:  '2024 – 2026',
    title: 'M.S. Data Science',
    org:   'University of Maryland, College Park',
    kind:  'education',
    bullets: [
      'GPA 3.89 — Advanced ML, Big Data Systems, NLP, Algorithms for Data Science.',
      'Research focus: retrieval-augmented generation and scalable inference.',
    ],
    tags: ['Machine Learning', 'NLP', 'RAG', 'Big Data'],
    prompt: "What research are you doing at UMD? How does your M.S. work connect to your industry experience in RAG and GenAI?",
  },
  {
    id:    'tl-kradlejoy',
    year:  'Jan – Aug 2024',
    title: 'Founding ML Engineer',
    org:   'KradleJoy Pvt Ltd',
    kind:  'work',
    bullets: [
      'Real-time multimodal baby monitoring: YOLOv8 + YAMNet on AWS EC2, sub-2 s latency.',
      'Sequential pose analysis for sleep tracking under 80–90% occlusion.',
    ],
    tags: ['Computer Vision', 'YOLOv8', 'PyTorch', 'AWS', 'Deep Learning'],
    prompt: 'How did you achieve sub-2 s latency for real-time baby monitoring at KradleJoy? What were the biggest challenges with YOLOv8 under heavy occlusion?',
  },
  {
    id:    'tl-iisc',
    year:  '2023 – 2024',
    title: 'PG Cert. Computational Data Science',
    org:   'Indian Institute of Science, Bangalore',
    kind:  'education',
    bullets: [
      'Grade A — Deep Learning, MLOps, Data Engineering, Big Data Analytics.',
    ],
    tags: ['Deep Learning', 'MLOps', 'Data Engineering'],
    prompt: 'What did the IISc certification cover in terms of MLOps and data engineering? How has it shaped your production ML approach?',
  },
  {
    id:    'tl-freelance',
    year:  'Jul – Dec 2023',
    title: 'ML Engineer (Freelance)',
    org:   'Self-employed',
    kind:  'work',
    bullets: [
      'Visual similarity engine: CLIP + FAISS over 60 K images in <50 ms.',
      'Sentiment pipeline: PySpark + fine-tuned BERT, 85%+ accuracy at sub-second latency.',
    ],
    tags: ['CLIP', 'FAISS', 'Vector Search', 'PySpark', 'NLP', 'PyTorch'],
    prompt: 'Walk me through the visual similarity engine you built as a freelancer — the CLIP + FAISS pipeline and how you got it under 50 ms.',
  },
  {
    id:    'tl-thapar',
    year:  '2015 – 2019',
    title: 'B.E. Electronics & Computer Engineering',
    org:   'Thapar University, Patiala',
    kind:  'education',
    bullets: ['GPA 8.13 — Embedded systems, signal processing, algorithms.'],
    prompt: "How did your electronics and computer engineering background at Thapar influence your approach to ML systems and signal processing?",
  },
]

// ─── Hero Projects ────────────────────────────────────────────────────────────

export interface ProjectCard {
  /** Stable hyphenated id used for `id` attribute and deep-link scrolling */
  id:       string
  title:    string
  org:      string
  period:   string
  /** Outcome-first headline; bold metrics should be wrapped in ** syntax */
  outcome:  string
  /** Array of 2–3 detail bullets */
  bullets:  string[]
  tags:     string[]
  links?:   { label: string; href: string }[]
}

export const featuredProjects: ProjectCard[] = [
  {
    id:      'project-neuron',
    title:   'Neuron — GenAI Platform',
    org:     'TAAI Labs',
    period:  '2025 – present',
    outcome: '**90% faster** architecture reviews; **1 000+ docs** indexed for enterprise RAG Q&A.',
    bullets: [
      'Multi-tenant AWS platform: DynamoDB · Textract · Lambda · Step Functions · Pinecone.',
      'Terraform → dependency graph service surfaces security risks before code review.',
      'Qwen-based NIST-compliant Q&A model fully grounded via RAG — zero hallucination policy.',
    ],
    tags:  ['GenAI', 'RAG', 'AWS', 'Pinecone', 'Qwen'],
    links: [{ label: 'Private', href: '#' }],
  },
  {
    id:      'project-jira-agent',
    title:   'Intelligent Jira Ticket Agent',
    org:     'Personal',
    period:  'Jun – Jul 2025',
    outcome: '**70% reduction** in sprint-planning overhead via LLM-driven ticket generation.',
    bullets: [
      'LangChain planning agent converts product descriptions into schema-enforced Pydantic Jira tickets.',
      'Real-time Jira Cloud integration — tickets created, linked, and labelled autonomously.',
      'Structured output validation prevents malformed payloads reaching the API.',
    ],
    tags:  ['LLM', 'LangChain', 'Pydantic', 'Jira API'],
    links: [{ label: 'GitHub', href: 'https://github.com/abhinavsingh9714' }],
  },
  {
    id:      'project-slomo',
    title:   'Slo-Mo Video Generation',
    org:     'Academic · UMD',
    period:  'Apr – Jun 2025',
    outcome: '**8× frame-rate uplift** (60 → 480 fps) via learned intermediate-frame synthesis.',
    bullets: [
      'U-Net frame interpolation inserts 2–8 synthetic frames per 0.9 s clip.',
      'Trained on sports and nature video; handles unpredictable fast motion events.',
      'Evaluated with SSIM and LPIPS; outperforms bilinear baseline by 14% SSIM.',
    ],
    tags:  ['U-Net', 'GAN', 'PyTorch', 'Video ML'],
    links: [{ label: 'GitHub', href: 'https://github.com/abhinavsingh9714' }],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillKind = 'domain' | 'tool'

export interface SkillTag {
  label:  string
  kind:   SkillKind
  /** Loose grouping within Domains or Tools for visual clustering */
  group:  string
}

export const skills: SkillTag[] = [
  // ── Domains ──────────────────────────────────────────────────────────────
  { label: 'Machine Learning',          kind: 'domain', group: 'Core ML'    },
  { label: 'Deep Learning',             kind: 'domain', group: 'Core ML'    },
  { label: 'Generative AI',             kind: 'domain', group: 'GenAI'      },
  { label: 'RAG',                       kind: 'domain', group: 'GenAI'      },
  { label: 'LLM Fine-tuning',           kind: 'domain', group: 'GenAI'      },
  { label: 'Multi-agent Systems',       kind: 'domain', group: 'GenAI'      },
  { label: 'NLP',                       kind: 'domain', group: 'Perception' },
  { label: 'Computer Vision',           kind: 'domain', group: 'Perception' },
  { label: 'Multimodal Learning',       kind: 'domain', group: 'Perception' },
  { label: 'Time Series Forecasting',   kind: 'domain', group: 'Forecasting'},
  { label: 'MLOps',                     kind: 'domain', group: 'Infra'      },
  { label: 'System Design',             kind: 'domain', group: 'Infra'      },

  // ── Tools ────────────────────────────────────────────────────────────────
  { label: 'PyTorch',         kind: 'tool', group: 'ML Frameworks' },
  { label: 'TensorFlow',      kind: 'tool', group: 'ML Frameworks' },
  { label: 'Hugging Face',    kind: 'tool', group: 'ML Frameworks' },
  { label: 'LangChain',       kind: 'tool', group: 'ML Frameworks' },
  { label: 'LangGraph',       kind: 'tool', group: 'ML Frameworks' },
  { label: 'scikit-learn',    kind: 'tool', group: 'ML Frameworks' },
  { label: 'XGBoost',         kind: 'tool', group: 'ML Frameworks' },
  { label: 'FAISS',           kind: 'tool', group: 'ML Frameworks' },
  { label: 'AWS',             kind: 'tool', group: 'Cloud & Data'  },
  { label: 'Pinecone',        kind: 'tool', group: 'Cloud & Data'  },
  { label: 'DynamoDB',        kind: 'tool', group: 'Cloud & Data'  },
  { label: 'Apache Spark',    kind: 'tool', group: 'Cloud & Data'  },
  { label: 'PostgreSQL',      kind: 'tool', group: 'Cloud & Data'  },
  { label: 'Python',          kind: 'tool', group: 'Languages'     },
  { label: 'TypeScript',      kind: 'tool', group: 'Languages'     },
  { label: 'Java',            kind: 'tool', group: 'Languages'     },
  { label: 'FastAPI',         kind: 'tool', group: 'Backend'       },
  { label: 'Spring Boot',     kind: 'tool', group: 'Backend'       },
  { label: 'Docker',          kind: 'tool', group: 'DevOps'        },
  { label: 'CI/CD',           kind: 'tool', group: 'DevOps'        },
  { label: 'Next.js',         kind: 'tool', group: 'DevOps'        },
]
