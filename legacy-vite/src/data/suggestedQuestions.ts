import type { ResumeSection } from '@/lib/types'

export interface SuggestedQuestion {
  category: ResumeSection
  label: string
}

/** Primary pills (6–8) shown by default */
export const suggestedQuestionsPrimary: SuggestedQuestion[] = [
  { category: 'experience', label: "Summarize Abhinav's ML and GenAI experience in 3 bullets" },
  { category: 'experience', label: 'What production ML systems has he built?' },
  { category: 'projects', label: 'Tell me about his Jira ticket generator and RAG work' },
  { category: 'projects', label: 'What are his key academic or side projects?' },
  { category: 'skills', label: 'What ML frameworks and cloud tools does he use?' },
  { category: 'skills', label: 'Backend and MLOps stack?' },
  { category: 'education', label: "What's his education background?" },
]

/** Additional pills in "More" dropdown */
export const suggestedQuestionsMore: SuggestedQuestion[] = [
  { category: 'experience', label: 'What did he do at TAAI Labs and EdTech Tulna?' },
  { category: 'projects', label: 'Slo-mo video and time series risk prediction — what did he build?' },
  { category: 'education', label: 'Where did he study and what courses?' },
]
