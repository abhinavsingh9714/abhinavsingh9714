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
  name:     'Abhinav Singh Chauhan',
  tagline:  'I build ML systems that think, retrieve, execute, and explain.',
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
    year:  'Aug 2025 – now',
    title: 'Founding ML Engineer',
    org:   'TAAI Labs',
    kind:  'work',
    bullets: [
      'Built Neuron — multi-tenant GenAI platform on AWS with RAG over 1,000+ docs.',
      'Infrastructure graphing from Terraform cut architecture review time by 90%.',
      'Fine-tuned Qwen for NIST-compliant Q&A; fully grounded, audit-ready responses.',
    ],
    tags: ['GenAI', 'RAG', 'AWS', 'Pinecone', 'Qwen', 'LangChain'],
    prompt: 'Tell me more about the Neuron platform you built at TAAI Labs — the RAG architecture and how you handled multi-tenancy.',
  },
  {
    id:    'tl-ta-umd',
    year:  'Sep 2025 – now',
    title: 'Teaching Assistant',
    org:   'University of Maryland',
    kind:  'work',
    bullets: [
      'Supporting graduate-level "Principles of Data Science" course.',
      'Weekly office hours, grading assignments, and collaborating with faculty on course materials.',
    ],
    tags: ['Data Science', 'Machine Learning', 'Teaching'],
    prompt: 'What are your responsibilities as a Teaching Assistant at UMD? What topics does the Principles of Data Science course cover?',
  },
  {
    id:    'tl-doquantum',
    year:  'Mar 2025 – Aug 2025',
    title: 'Quantum ML Researcher',
    org:   'Do Quantum',
    kind:  'work',
    bullets: [
      'Redesigning classical ML algorithms for quantum hardware.',
      'Benchmarking quantum ML workflows to assess scalability and limitations.',
    ],
    tags: ['Quantum Computing', 'Machine Learning', 'Research'],
    prompt: 'What does your Quantum ML research at Do Quantum involve? How are you adapting classical ML algorithms for quantum hardware?',
  },
  {
    id:    'tl-edtech',
    year:  'Jun – Aug 2025',
    title: 'ML Intern',
    org:   'EdTech TULNA',
    kind:  'work',
    bullets: [
      'LangGraph multi-agent system evaluated educational videos on 20+ learning indicators.',
      '95% reduction in manual review time (4 hrs → <10 min) with evidence-backed docx/pdf reports.',
      'Evidence-planning agent with FFmpeg automated screenshot extraction for timestamp-linked visual proof; boosted evaluator trust by 25%.',
    ],
    tags: ['LangGraph', 'LLM', 'Multi-Agent', 'LangChain', 'FFmpeg'],
    prompt: 'How did the LangGraph multi-agent system at EdTech TULNA work? What was the conflict-resolution strategy between agents?',
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
    year:  'Apr – Aug 2024',
    title: 'ML Intern',
    org:   'KradleJoy Pvt Ltd',
    kind:  'work',
    bullets: [
      'Real-time multimodal baby monitoring: Detectron2 + YOLOv8 + YAMNet on AWS EC2.',
      'Sleep tracking via MediaPipe Pose Detection under 80% coverage; cry detection at sub-13 ms.',
      'FastAPI + Docker pipeline with RetinaFace-based face blurring for privacy.',
    ],
    tags: ['Computer Vision', 'YOLOv8', 'Detectron2', 'MediaPipe', 'PyTorch', 'AWS', 'Docker'],
    prompt: 'How did you build the real-time baby monitoring system at KradleJoy? What were the biggest challenges with occlusion and latency?',
  },
  {
    id:    'tl-mdi',
    year:  'Jan – Jul 2024',
    title: 'Research Associate',
    org:   'Management Development Institute, Gurgaon',
    kind:  'work',
    bullets: [
      'Co-authored a published book on AI-driven CRM covering marketing and sales automation.',
      'Built recommendation systems and churn prediction models for CRM optimization.',
      'Researched AI governance frameworks for India\'s National Security Council Secretariat (NSCS), analyzing 50+ cybersecurity threats.',
    ],
    tags: ['AI Research', 'Machine Learning', 'NLP', 'AI Governance'],
    prompt: 'What was the AI governance research you did for India\'s NSCS? How did you approach comparing frameworks across the EU, UK, USA, and Australia?',
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
      'Visual similarity engine: CLIP + FAISS over 60K images in <50 ms.',
      'Sentiment pipeline: PySpark + fine-tuned BERT, 85%+ accuracy at sub-second latency via FastAPI.',
    ],
    tags: ['CLIP', 'FAISS', 'Vector Search', 'PySpark', 'NLP', 'PyTorch'],
    prompt: 'Walk me through the visual similarity engine you built as a freelancer — the CLIP + FAISS pipeline and how you got it under 50 ms.',
  },
  {
    id:    'tl-rapidglobal',
    year:  'Oct 2019 – Jul 2021',
    title: 'Software Consultant',
    org:   'Rapid Global School',
    kind:  'work',
    bullets: [
      'Built Java Spring Boot REST API for student profile, academic records, and attendance management across 2,000+ students.',
      'Established CI/CD pipeline, reducing deployment time and improving system reliability.',
    ],
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'REST', 'CI/CD'],
    prompt: 'What did you build at Rapid Global School? How did the CI/CD pipeline improve the deployment workflow?',
  },
  {
    id:    'tl-exicom',
    year:  'Jan – Sep 2019',
    title: 'Graduate Engineering Trainee',
    org:   'Exicom',
    kind:  'work',
    bullets: [
      'Embedded OCPP system connecting EV chargers to a central server across 21,000+ users in India and South Asia.',
      'Implemented finite state machine for real-time charger state management and status updates.',
    ],
    tags: ['Embedded Systems', 'OCPP', 'EV', 'C/C++', 'CI/CD'],
    prompt: 'What was the embedded OCPP system you built at Exicom? How did you handle real-world challenges like internet interruptions?',
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
  /** Pre-filled chat prompt for the "Ask about this" CTA */
  prompt?:  string
}

export const featuredProjects: ProjectCard[] = [
  {
    id:      'project-jira-agent',
    title:   'Intelligent Jira Backlog Generator',
    org:     'University of Maryland',
    period:  'Jun – Jul 2025',
    outcome: '**70% reduction** in planning overhead — natural language ideas → full Jira backlogs (Initiatives → Epics → Stories → Tasks).',
    bullets: [
      'LLM planning agent (GPT-4o, Gemini 2.5) with LangChain converts product descriptions into structured, schema-enforced Pydantic output.',
      'Dynamic Jira Cloud integration via REST API v3 — tickets created, linked, and labelled autonomously.',
      'Human-in-the-loop editing via Streamlit; containerised with Docker for seamless team adoption.',
    ],
    tags:  ['LLM', 'GPT-4o', 'Gemini', 'LangChain', 'Pydantic', 'Jira API', 'Docker', 'Streamlit'],
    links: [{ label: 'GitHub', href: 'https://github.com/abhinavsingh9714/JIRA-agent' }],
    prompt: 'Walk me through the Intelligent Jira Backlog Generator — how does the LangChain planning agent decompose a product idea into Initiatives, Epics, Stories, and Tasks? How is schema enforcement via Pydantic used?',
  },
  {
    id:      'project-slomo',
    title:   'Slo-Mo Video Generation with GANs',
    org:     'University of Maryland',
    period:  'Apr – Jun 2025',
    outcome: '**8× frame-rate uplift** (60 → 480 fps) via learned intermediate-frame synthesis.',
    bullets: [
      'U-Net-based frame interpolation inserts 2–8 synthetic frames per 0.9 s clip for seamless playback of fast, unpredictable motion.',
      'Trained on sports and nature video; handles challenging motion events where traditional interpolation breaks down.',
      'Evaluated with SSIM and LPIPS; outperforms bilinear baseline by 14% SSIM.',
    ],
    tags:  ['GANs', 'U-Net', 'Frame Interpolation', 'PyTorch', 'Video ML'],
    links: [{ label: 'GitHub', href: 'https://github.com/abhinavsingh9714' }],
    prompt: 'Explain the Slo-Mo Video Generation project — how does the U-Net model synthesize intermediate frames and what was the evaluation methodology using SSIM and LPIPS?',
  },
  {
    id:      'project-multistock',
    title:   'Multi-Stock Price Prediction',
    org:     'University of Maryland',
    period:  'Nov 2024 – Jan 2025',
    outcome: '**$2.38 avg deviation** from actual closing prices across **24 major stocks** via LSTM + embedding fusion.',
    bullets: [
      'Dual-input architecture combining LSTM temporal outputs with stock-specific identifier embeddings to capture both sequential patterns and individual stock behaviour.',
      'Trained on 60-day historical windows using key technical indicators: RSI, SMA20, and MACD.',
      'Modular design supports plug-in of new stocks and indicators without re-engineering.',
    ],
    tags:  ['LSTM', 'Deep Learning', 'Embeddings', 'Time Series', 'Finance', 'PyTorch'],
    links: [{ label: 'GitHub', href: 'https://github.com/abhinavsingh9714' }],
    prompt: 'How does the Multi-Stock Price Prediction model work? Explain the dual-input LSTM + embedding fusion architecture and how technical indicators like RSI, SMA20, and MACD are used.',
  },
]

// ─── Writing ──────────────────────────────────────────────────────────────────

export interface WritingPost {
  id:       string
  title:    string
  hook:     string
  date:     string
  readTime: string
  href:     string
  /** Platform the post was published on — drives badge label and icon */
  kind:     'medium' | 'linkedin'
  /** Pre-filled chat prompt for the "Ask about this" CTA */
  prompt?:  string
}

export const featuredPosts: WritingPost[] = [
  {
    id:       'post-visual-search',
    title:    'Intricacies of Visual Search Systems',
    hook:     'Ever wondered how Google Lens recognizes your sneakers faster than your sneakerhead friend? A deep dive into CBIR, CLIP embeddings, ANN search, multi-modal fusion, and the real-world engineering that makes visual search fast, accurate, and scalable.',
    date:     'Apr 30, 2025',
    readTime: '10 min read',
    href:     'https://medium.com/@sabhinavofficial/intricacies-of-visual-search-systems-af337e42d68d',
    kind:     'medium',
    prompt:   'You wrote about visual search systems — what\'s the core engineering challenge in building a CBIR system with CLIP embeddings and ANN search? How does your FAISS-based visual similarity engine relate to what you described in that article?',
  },
  {
    id:       'post-pinterest-pinlanding',
    title:    'Production ML Is About Constraining Models, Not Empowering Them',
    hook:     'Pinterest\'s PinLanding turns billions of products into shopping collections using multimodal AI — but the real lesson isn\'t model capability. It\'s how they built a compression layer to stop unbounded model output from breaking downstream systems.',
    date:     '2w ago',
    readTime: '2 min read',
    href:     'https://www.linkedin.com/posts/abhinavsingh9714_mlplatform-productionml-genaireliability-activity-7424451682757107712-S-UM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB-SrcQBrkjsMMEUH8j0iJupLU5Dw2LA7Ug',
    kind:     'linkedin',
    prompt:   'You wrote about constraining models in production ML — how does that philosophy show up in your own work? For example, how did you handle output reliability in the multi-agent EdTech evaluation system or the Neuron RAG platform?',
  },
  {
    id:       'post-netflix-knowledge-graph',
    title:    'Most ML Failures Don\'t Start at the Model — They Start in How Data Is Defined',
    hook:     'Netflix\'s Entertainment Knowledge Graph looks like a graph/ontology problem. Underneath, it\'s about keeping data meaning consistent across hundreds of teams — and why schema evolution, lineage, and data trust matter more than model architecture.',
    date:     '3w ago',
    readTime: '2 min read',
    href:     'https://www.linkedin.com/posts/abhinavsingh9714_mlplatform-productionml-datareliability-activity-7422685034144329728-19SM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB-SrcQBrkjsMMEUH8j0iJupLU5Dw2LA7Ug',
    kind:     'linkedin',
    prompt:   'Your post argues ML failures start with data definition — how did you apply that principle in your own work, like the knowledge ingestion pipeline at TAAI Labs or structuring data for the Jira agent?',
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
