import { getAllCards } from '@/data/resume_kb'
import type { Citation } from '@/lib/types'

export function getMockResponse(question: string): { content: string; citations: Citation[] } {
  const cards = getAllCards()
  const cite = (cardId: string, score?: number): Citation => ({ cardId, score: score ?? 0.9 })
  const lower = question.toLowerCase()

  if (
    lower.includes('experience') ||
    lower.includes('ml experience') ||
    lower.includes('genai') ||
    lower.includes('summarize')
  ) {
    return {
      content: `• Founding ML Engineer at TAAI Labs: built Neuron (multi-tenant GenAI platform), RAG pipeline over 1000+ docs, infrastructure graphing from Terraform (90% faster reviews), NIST-compliant Q&A.\n• ML Intern at EdTech Tulna: multi-agent system with LangGraph for video evaluation (95% less manual review), 90%+ alignment with experts.\n• KradleJoy: real-time multimodal baby monitoring (YOLOv8, YAMNet), sub-2s latency on AWS.`,
      citations: [cite('exp-1'), cite('exp-2'), cite('exp-3')],
    }
  }
  if (
    lower.includes('project') ||
    lower.includes('jira') ||
    lower.includes('rag') ||
    lower.includes('portfolio')
  ) {
    return {
      content: `• Intelligent Jira Ticket Generator: LLM planning agent with Langchain and Pydantic, 70% reduction in planning overhead.\n• Slo-Mo Video Generation: U-Net frame interpolation for 480fps from 60fps.\n• Multi-Time Series Risk Prediction: attention-enhanced TCN, 14% F1 over LSTM. Resume RAG portfolio with cited answers and SSE streaming.`,
      citations: [cite('proj-1'), cite('proj-2'), cite('proj-3')],
    }
  }
  if (
    lower.includes('skill') ||
    lower.includes('framework') ||
    lower.includes('stack') ||
    lower.includes('cloud') ||
    lower.includes('mlops')
  ) {
    return {
      content: `• ML & AI: PyTorch, TensorFlow, Hugging Face, LangChain, LangGraph, GenAI, NLP, CV, time series.\n• Data & Cloud: AWS (EC2, S3, Lambda, Step Functions, Bedrock), Spark, Pinecone, DynamoDB.\n• Backend & MLOps: Python, FastAPI, Spring Boot, Docker, Git, CI/CD.`,
      citations: [cite('skill-ml'), cite('skill-data'), cite('skill-swe')],
    }
  }
  if (
    lower.includes('education') ||
    lower.includes('thesis') ||
    lower.includes('study') ||
    lower.includes('courses')
  ) {
    return {
      content: `• M.S. Data Science, University of Maryland (GPA 3.89): Advanced ML, Big Data Systems, NLP, Algorithms.\n• Postgraduate Certification in Computational Data Science, IISc Bangalore (Grade A): Deep Learning, MLOps, Data Engineering.\n• B.E. Electronics and Computer Engineering, Thapar University (GPA 8.13).`,
      citations: [cite('edu-1'), cite('edu-2'), cite('edu-3')],
    }
  }
  if (lower.includes('taai') || lower.includes('edtech') || lower.includes('tulna')) {
    return {
      content: `• TAAI Labs: Neuron platform (GenAI, RAG, knowledge ingestion, infrastructure graphing), Qwen-based NIST Q&A.\n• EdTech Tulna: LangGraph multi-agent system for educational video evaluation, LLM critics with 90%+ expert alignment.`,
      citations: [cite('exp-1'), cite('exp-2')],
    }
  }

  const ids = cards.slice(0, 2).map((c) => c.id)
  return {
    content:
      "Here's a summary based on Abhinav's resume. Ask about experience, projects, skills, or education for more detail.",
    citations: ids.map((id) => cite(id)),
  }
}
