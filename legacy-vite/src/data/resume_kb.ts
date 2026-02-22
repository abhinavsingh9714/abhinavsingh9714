import type { ResumeCardsBySection, ResumeCard } from '@/lib/types'

export const resumeSections: ResumeCardsBySection = {
  experience: [
    {
      id: 'exp-1',
      title: 'Founding ML Engineer',
      org: 'TAAI Labs',
      dates: 'Aug 2025 – Present',
      bullets: [
        'Spearheaded development and launch of Neuron, a multi-tenant ML/GenAI platform on AWS powering knowledge-base ingestion, infrastructure graphing, and enterprise Q&A across all company products.',
        'Architected end-to-end knowledge ingestion pipeline that chunks, embeds, and indexes 1000+ internal documents using DynamoDB, Textract, Lambda, Step Functions, and Pinecone for RAG search and Q&A.',
        'Designed infrastructure graphing service that converts Terraform scripts into data-flow and dependency graphs, cutting architecture and security review time by 90%.',
        'Fine-tuned and integrated a Qwen-based NIST-compliant Q&A model with the RAG pipeline for grounded, audit-ready responses in security and compliance workflows.',
      ],
      tags: ['GenAI', 'RAG', 'AWS', 'Pinecone', 'Lambda', 'Step Functions'],
      links: [],
    },
    {
      id: 'exp-2',
      title: 'Machine Learning Intern',
      org: 'EdTech Tulna - IIT Delhi',
      dates: 'Jun 2025 – Aug 2025',
      bullets: [
        'Designed and deployed a fault-tolerant multi-agent AI system with LangGraph to evaluate educational videos on 20+ learning indicators, cutting manual review time by 95% and delivering evidence-backed structured reports.',
        'Engineered 2 LLM critic models with structured chain-of-thought prompting and a conflict resolution agent with advanced prompt chaining, achieving over 90% alignment with expert human evaluations.',
      ],
      tags: ['LangGraph', 'Multi-agent', 'LLM', 'Structured prompting'],
      links: [],
    },
    {
      id: 'exp-3',
      title: 'Founding Machine Learning Engineer',
      org: 'KradleJoy Pvt Ltd',
      dates: 'Jan 2024 – Aug 2024',
      bullets: [
        'Led end-to-end development of a real-time multimodal baby monitoring system integrating live video and audio into a FastAPI-based ML inference API on AWS EC2, achieving sub-2s latency and synchronized safety alerts.',
        'Built a multimodal spatial understanding module using fine-tuned YOLOv8 for baby detection, sequential pose analysis for sleep tracking under 80–90% occlusion, and YAMNet for real-time cry detection.',
      ],
      tags: ['Multimodal', 'YOLOv8', 'FastAPI', 'AWS EC2'],
      links: [],
    },
    {
      id: 'exp-4',
      title: 'Machine Learning Engineer (Freelance)',
      org: 'Self-employed',
      dates: 'Jul 2023 – Dec 2023',
      bullets: [
        'Developed a real-time visual similarity engine using CLIP + FAISS to retrieve lookalike images from a 60K+ image library in <50 ms, exposed as an API backend for an interactive visual search UI.',
        'Architected a low-latency sentiment analysis pipeline for a social media analytics dashboard by scaling tweet preprocessing with PySpark and fine-tuning a Hugging Face BERT model, achieving 85%+ accuracy with sub-second inference via FastAPI.',
      ],
      tags: ['CLIP', 'FAISS', 'PySpark', 'BERT', 'FastAPI'],
      links: [],
    },
    {
      id: 'exp-5',
      title: 'Software Engineer',
      org: 'Rapid Global School',
      dates: 'Oct 2019 – Jul 2021',
      bullets: [
        'Engineered a modular RESTful API with Java Spring Boot, integrating multiple workflows for school management over a unified PostgreSQL-backed system for 2000+ users.',
      ],
      tags: ['Java', 'Spring Boot', 'PostgreSQL', 'REST'],
      links: [],
    },
    {
      id: 'exp-6',
      title: 'Software Engineer',
      org: 'Exicom Tele-Systems Limited',
      dates: 'Jan 2019 – Sep 2019',
      bullets: [
        'Collaborated with a cross-functional team to build an embedded OCPP-based communication system connecting EV chargers with a central server for 25,000+ users.',
      ],
      tags: ['Embedded', 'OCPP', 'EV'],
      links: [],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Intelligent Jira Ticket Generator',
      org: 'Personal',
      dates: 'Jun 2025 – Jul 2025',
      bullets: [
        'Devised and deployed an LLM planning agent that converts product descriptions into structured Jira tickets with real-time Jira Cloud integration, schema-enforced Pydantic output, and Langchain, reducing planning overhead by 70%.',
      ],
      tags: ['LLM', 'Langchain', 'Pydantic', 'Jira'],
      links: [],
    },
    {
      id: 'proj-2',
      title: 'Slo-Mo Video Generation with GANs',
      org: 'Academic',
      dates: 'Apr 2025 – Jun 2025',
      bullets: [
        'Developed a U-Net-based frame interpolation model to generate 480fps slow-motion videos from 60fps inputs by inserting 2–8 intermediate frames in 0.9s clips for seamless playback of unpredictable motion events.',
      ],
      tags: ['U-Net', 'GAN', 'Video', 'PyTorch'],
      links: [],
    },
    {
      id: 'proj-3',
      title: 'Multi-Time Series Risk Prediction',
      org: 'Academic',
      dates: 'Jan 2025 – Apr 2025',
      bullets: [
        'Built a deep learning system to forecast 15-day volatility across 30 financial time series by combining entity embeddings with an attention-enhanced Temporal Convolutional Network, resulting in 14% F1 improvement over LSTM baselines.',
      ],
      tags: ['Time Series', 'TCN', 'Attention', 'Finance'],
      links: [],
    },
    {
      id: 'proj-4',
      title: 'Resume RAG Portfolio',
      org: 'Personal',
      dates: '2025',
      bullets: [
        'Retrieval-augmented Q&A over resume with cited answers, sidebar highlighting, SSE streaming, and recruiter-first UX.',
      ],
      tags: ['React', 'TypeScript', 'RAG', 'SSE'],
      links: [{ label: 'GitHub', url: 'https://github.com/abhinavsingh9714' }],
    },
  ],
  skills: [
    {
      id: 'skill-ml',
      title: 'ML & AI',
      org: '—',
      bullets: [
        'Machine Learning, Deep Learning, Generative AI (LLMs, Diffusion), Multimodal Learning, Computer Vision, NLP, Time Series Forecasting, Reinforcement Learning.',
        'Frameworks: PyTorch, TensorFlow, Keras, scikit-learn, Hugging Face, LangChain, LangGraph, XGBoost, FAISS, Chroma, CUDA.',
      ],
      tags: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'GenAI'],
    },
    {
      id: 'skill-data',
      title: 'Data & Cloud',
      org: '—',
      bullets: [
        'SQL (PostgreSQL, MySQL), NoSQL (MongoDB, DynamoDB, Pinecone, Neo4j), Apache Spark, AWS (EC2, S3, Lambda, Step Functions, Bedrock).',
      ],
      tags: ['AWS', 'Spark', 'Pinecone', 'DynamoDB'],
    },
    {
      id: 'skill-swe',
      title: 'Backend & MLOps',
      org: '—',
      bullets: [
        'Languages: Python, R, Matlab, Java, C++, C. Backend: FastAPI, Spring Boot. MLOps & tools: Docker, Git, CI/CD, Linux. Agile, System Design.',
      ],
      tags: ['Python', 'FastAPI', 'Docker', 'Spring Boot'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      title: 'Master of Science in Data Science',
      org: 'University of Maryland, College Park',
      dates: 'Aug 2024 – May 2026',
      bullets: [
        'GPA: 3.89. Relevant courses: Advanced Machine Learning, Big Data Systems, Natural Language Processing, Algorithms for Data Science.',
      ],
      tags: ['ML', 'NLP', 'Big Data'],
    },
    {
      id: 'edu-2',
      title: 'Postgraduate Certification in Computational Data Science',
      org: 'Indian Institute of Science, Bangalore',
      dates: 'Apr 2023 – May 2024',
      bullets: [
        'Grade: A. Relevant courses: Deep Learning, MLOps, Data Engineering, Big Data Analytics, Probability and Statistics.',
      ],
      tags: ['Deep Learning', 'MLOps', 'Data Engineering'],
    },
    {
      id: 'edu-3',
      title: 'Bachelor of Engineering in Electronics and Computer Engineering',
      org: 'Thapar University, Patiala',
      dates: 'Jul 2015 – Jul 2019',
      bullets: ['GPA: 8.13'],
      tags: ['ECE', 'Engineering'],
    },
  ],
}

/** Flat list of all cards with stable ids for citation lookup */
export function getAllCards(): ResumeCard[] {
  return (Object.values(resumeSections) as ResumeCard[][]).flat()
}

/** Lookup card by id (for citation chips) */
export function getCardById(cardId: string): ResumeCard | undefined {
  return getAllCards().find((c) => c.id === cardId)
}

/** Top 3 card ids for "Top Highlights" section in sidebar */
export const topHighlightCardIds: string[] = ['exp-1', 'proj-1', 'skill-ml']
