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
      title: 'Teaching Assistant',
      org: 'University of Maryland – College of Computer, Mathematical, and Natural Sciences',
      dates: 'Sep 2025 – Present',
      bullets: [
        'Supporting graduate-level course "Principles of Data Science" by assisting with instruction, grading, and student guidance.',
        'Holding weekly office hours (in-person and virtual) to provide academic support and clarify course concepts.',
        'Reviewing and grading assignments, providing constructive feedback to help students improve.',
        'Collaborating with faculty to refine lecture materials, slides, and assignments before release.',
        'Acting as a bridge between students and instructors, fostering an engaging and supportive learning environment.',
      ],
      tags: ['Data Science', 'Machine Learning', 'Teaching', 'Academic'],
      links: [],
    },
    {
      id: 'exp-3',
      title: 'Quantum ML Researcher',
      org: 'Do Quantum',
      dates: 'Mar 2025 – Present',
      bullets: [
        'Led the redesign of classical ML algorithms for quantum hardware, implementing ML workflows for quantum computers.',
        'Performed benchmarking and assessed scalability and limitations of quantum ML approaches to drive innovation in the field.',
      ],
      tags: ['Quantum Computing', 'Machine Learning', 'Benchmarking', 'Research'],
      links: [],
    },
    {
      id: 'exp-4',
      title: 'Machine Learning Intern',
      org: 'EdTech TULNA',
      dates: 'Jun 2025 – Aug 2025',
      bullets: [
        'Designed and deployed a fault-tolerant, production-ready multi-agent AI system with LangGraph to evaluate educational videos on 20+ learning indicators, cutting manual review time by 95% (4 hours to under 10 minutes) and delivering evidence-backed structured docx/pdf reports.',
        'Engineered 2 LLM critic models with structured chain-of-thought prompting and a conflict resolution agent with advanced prompt chaining—boosting rating consistency and accuracy by mitigating single-model bias, achieving >90% alignment with expert human evaluations.',
        'Developed an evidence-planning agent using advanced prompting techniques (instruction-following and reasoning transparency) to identify critical timestamps, then automated screenshot extraction with FFmpeg, producing reports with verifiable, timestamp-linked visual evidence that boosted evaluator trust by 25% compared to text-only reports.',
      ],
      tags: ['LangGraph', 'Multi-agent', 'LLM', 'Chain-of-Thought', 'FFmpeg', 'LangChain'],
      links: [],
    },
    {
      id: 'exp-5',
      title: 'Machine Learning Intern',
      org: 'KradleJoy Pvt Ltd',
      dates: 'Apr 2024 – Aug 2024',
      bullets: [
        'Designed and deployed a real-time video and audio-based AI baby monitoring system using deep learning models, providing instant safety alerts to parents.',
        'Integrated RCNN Detectron2 for general object detection and a custom-trained YOLOv8 model to classify babies and adults, achieving high accuracy even in 80–90% occlusion and low-light conditions.',
        'Developed a video-based sleep tracker using MediaPipe Pose Detection (accurate under 80% coverage) and fine-tuned a YAMNet-based cry detector with sub-13ms latency for real-time alerts.',
        'Built a FastAPI-powered pipeline containerized with Docker and deployed on AWS EC2, ensuring scalability and user privacy with a RetinaFace-based face blurring module.',
      ],
      tags: ['Computer Vision', 'YOLOv8', 'Detectron2', 'MediaPipe', 'YAMNet', 'FastAPI', 'Docker', 'AWS EC2'],
      links: [],
    },
    {
      id: 'exp-6',
      title: 'Research Associate',
      org: 'Management Development Institute, Gurgaon',
      dates: 'Jan 2024 – Jul 2024',
      bullets: [
        'Contributed to a published book on AI-driven CRM, providing practical insights on marketing, sales automation, and customer service.',
        'Built recommendation systems, customer churn prediction models, and dynamic pricing strategies, demonstrating AI\'s role in enhancing customer engagement and revenue optimization.',
        'Collaborated with India\'s National Security Council Secretariat (NSCS) to research AI governance frameworks across major jurisdictions (EU, UK, USA, Australia) and analyzed 50+ cybersecurity threats, directly contributing to India\'s AI-driven cybersecurity policy.',
      ],
      tags: ['AI Research', 'Machine Learning', 'CRM', 'NLP', 'AI Governance'],
      links: [],
    },
    {
      id: 'exp-7',
      title: 'Machine Learning Engineer (Freelance)',
      org: 'Self-employed',
      dates: 'Jul 2023 – Dec 2023',
      bullets: [
        'Built a real-time visual similarity engine using CLIP + FAISS, retrieving similar images from a 60,000+ image database in under 50ms, delivered as an API backend to an interactive visual search web UI.',
        'Engineered a real-time sentiment analysis pipeline for a social media analytics dashboard, achieving over 85% classification accuracy and sub-second inference latency by leveraging PySpark for large-scale tweet preprocessing and fine-tuning a Hugging Face BERT model, deployed via FastAPI.',
      ],
      tags: ['CLIP', 'FAISS', 'PySpark', 'BERT', 'FastAPI'],
      links: [],
    },
    {
      id: 'exp-8',
      title: 'Software Consultant',
      org: 'Rapid Global School',
      dates: 'Oct 2019 – Jul 2021',
      bullets: [
        'Designed and implemented a RESTful API using Java Spring Boot for managing student profiles, academic records, and attendance for 2,000+ students, reducing manual data management overhead.',
        'Established an automated CI/CD pipeline, reducing deployment time and errors, improving system reliability, and enabling faster feature rollouts.',
      ],
      tags: ['Java', 'Spring Boot', 'PostgreSQL', 'REST', 'CI/CD'],
      links: [],
    },
    {
      id: 'exp-9',
      title: 'Graduate Engineering Trainee',
      org: 'Exicom',
      dates: 'Jan 2019 – Sep 2019',
      bullets: [
        'Designed and developed an embedded system integrating EV chargers with a central server using the OCPP protocol, contributing to a network serving over 21,000 users across India and South Asia.',
        'Implemented a finite state machine to manage EV charger operational states, enabling real-time status updates and notifications for enhanced transparency.',
        'Contributed to a CI/CD pipeline ensuring smooth software updates and consistent performance under real-world challenges like internet interruptions and power outages.',
      ],
      tags: ['Embedded Systems', 'OCPP', 'EV', 'CI/CD', 'C/C++'],
      links: [],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Intelligent Jira Backlog Generator',
      org: 'University of Maryland',
      dates: 'Jun 2025 – Jul 2025',
      bullets: [
        'Designed an LLM-powered planning agent that converts natural language product ideas into structured Jira backlogs (Initiatives → Epics → Stories → Tasks) using GPT-4o, Gemini 2.5, and LangChain, reducing planning overhead by 70% and accelerating cross-functional alignment.',
        'Delivered a scalable, enterprise-ready system with dynamic Jira Cloud integration (REST API v3), schema-enforced output via Pydantic, and human-in-the-loop editing via Streamlit—deployed through Docker for seamless adoption across teams and environments.',
      ],
      tags: ['LLM', 'GPT-4o', 'Gemini', 'LangChain', 'Pydantic', 'Jira', 'Docker', 'Streamlit'],
      links: [{ label: 'GitHub', url: 'https://github.com/abhinavsingh9714/JIRA-agent' }],
    },
    {
      id: 'proj-2',
      title: 'Slo-Mo Video Generation with GANs',
      org: 'University of Maryland',
      dates: 'Apr 2025 – Jun 2025',
      bullets: [
        'Developed a U-Net-based frame interpolation model to generate 480fps slow-motion videos from 60fps inputs by inserting 2–8 intermediate frames in 0.9s clips, enabling seamless playback of unpredictable motion events.',
      ],
      tags: ['GANs', 'U-Net', 'Frame Interpolation', 'Video', 'PyTorch'],
      links: [],
    },
    {
      id: 'proj-3',
      title: 'Multi-Stock Price Prediction Using LSTM and Embedding Fusion',
      org: 'University of Maryland',
      dates: 'Nov 2024 – Jan 2025',
      bullets: [
        'Developed a scalable stock price forecasting model integrating LSTM networks with stock-specific embeddings, enabling the model to learn both temporal dependencies and individual stock behaviors across 24 major companies.',
        'Implemented a dual-input architecture combining LSTM outputs with stock identifier embeddings, reducing average deviation to just $2.38 from actual closing prices.',
        'Leveraged 60-day historical data and key technical indicators (RSI, SMA20, MACD) to model market volatility across multiple stocks, providing traders with a robust decision-support tool.',
        'Built a modular architecture that supports integration of new stocks and technical indicators without significant re-engineering, ensuring long-term adaptability across diverse financial instruments.',
      ],
      tags: ['LSTM', 'Deep Learning', 'Stock Prediction', 'Time Series', 'Embeddings', 'Finance'],
      links: [],
    },
    {
      id: 'proj-4',
      title: 'Visual Search System',
      org: 'University of Maryland',
      dates: 'Dec 2024 – Dec 2024',
      bullets: [
        'Built a content-based image retrieval (CBIR) system using a CLIP-based embedding model and FAISS indexing, enabling high-accuracy image searches across 60,000+ images from the Berkeley Amazon dataset for e-commerce and art discovery.',
        'Implemented FAISS vector indexing achieving query response times under 50ms, with a persistent indexing system for efficient large-scale retrieval without constant reindexing.',
        'Developed a Streamlit-powered UI for real-time image uploads, similarity searches, and visualization, integrating image preprocessing, embedding generation, and cosine similarity ranking.',
      ],
      tags: ['CLIP', 'FAISS', 'Deep Learning', 'Computer Vision', 'Streamlit', 'Image Retrieval'],
      links: [],
    },
    {
      id: 'proj-5',
      title: 'Plant Disease Detection System',
      org: 'Indian Institute of Science (IISc)',
      dates: 'Jan 2024 – Apr 2024',
      bullets: [
        'Built a stacked CNN voting classifier with transfer learning (Xception, MobileNet), achieving a 99% F1-score and precision for early plant disease detection, aiding farmers in crop management.',
        'Designed a semi-supervised contour mapping system leveraging RGB channel analysis, K-means clustering, and morphological transformations on the 54,303-image PlantVillage dataset to accurately assess disease extent.',
        'Deployed a Streamlit-based web app for real-time disease diagnosis, allowing farmers to upload leaf images and receive immediate insights via community cloud infrastructure.',
      ],
      tags: ['Computer Vision', 'PyTorch', 'CNN', 'Transfer Learning', 'Xception', 'MobileNet', 'Streamlit', 'K-means'],
      links: [],
    },
    {
      id: 'proj-6',
      title: 'Bitcoin Price Forecasting',
      org: 'Indian Institute of Science (IISc)',
      dates: 'Mar 2024 – Mar 2024',
      bullets: [
        'Built SARIMAX and ARIMA models to forecast Bitcoin prices using historical daily data from Sep 2014 to Jul 2021, achieving a 15% improvement in prediction accuracy over baseline models.',
        'Conducted ADF and KPSS stationarity tests, fine-tuned models using AIC/BIC scores with configurations ranking in the top 5% of tested setups, and explored trends, seasonality, and volatility in Bitcoin price movements.',
      ],
      tags: ['Time Series Forecasting', 'ARIMA', 'SARIMAX', 'Python', 'Statistics', 'Finance'],
      links: [],
    },
    {
      id: 'proj-7',
      title: 'Video-based Action Classification Using LSTM and CNN',
      org: 'Indian Institute of Science (IISc)',
      dates: 'Oct 2023 – Nov 2023',
      bullets: [
        'Implemented a CNN-LSTM hybrid system to classify six human actions (walking, jogging, running, boxing, hand waving, hand clapping) on the KTH dataset, using TimeDistributed layers to process per-frame spatial features before temporal modeling.',
        'Achieved 88% validation accuracy after hyperparameter tuning with Keras Tuner; experimented with DenseNet and VGG16 for feature extraction, outperforming a VGG16-only baseline (79.17%).',
      ],
      tags: ['Video Analytics', 'CNN', 'LSTM', 'Action Recognition', 'Keras', 'Deep Learning'],
      links: [{ label: 'GitHub', url: 'https://github.com/abhinavsingh9714/dev' }],
    },
    {
      id: 'proj-8',
      title: 'Face Mask Detection Using CNN and Transfer Learning',
      org: 'Indian Institute of Science (IISc)',
      dates: 'Oct 2023 – Oct 2023',
      bullets: [
        'Developed a deep learning system to classify images into three categories (with mask, without mask, partial mask) using a custom dataset of 6,000+ images with augmentation (rotation, scaling, flipping).',
        'Fine-tuned a VGG16 model with Adam optimizer and categorical cross-entropy loss, achieving 96.76% validation accuracy across diverse scenarios including partial occlusions and varying lighting conditions.',
      ],
      tags: ['Computer Vision', 'Transfer Learning', 'CNN', 'VGG16', 'Deep Learning'],
      links: [],
    },
    {
      id: 'proj-9',
      title: 'Twitter Sentiment Classification Using PySpark',
      org: 'Indian Institute of Science (IISc)',
      dates: 'Sep 2023 – Sep 2023',
      bullets: [
        'Built a multi-class sentiment classification system (neutral, negative, positive) for tweets about six major US airlines using PySpark for scalable preprocessing—tokenization, stop-word removal, and VectorAssembler feature pipelines.',
        'Implemented and compared Naive Bayes (73.85%) and Logistic Regression (73.04%) classifiers, deploying the final system as an interactive Streamlit web app with Ngrok integration for real-time predictions.',
      ],
      tags: ['PySpark', 'NLP', 'Sentiment Analysis', 'Naive Bayes', 'Logistic Regression', 'Streamlit'],
      links: [],
    },
    {
      id: 'proj-10',
      title: 'Live Sentiment Analysis',
      org: 'Personal',
      dates: 'Mar 2018 – Apr 2018',
      bullets: [
        'Built a live animated graph plotting real-time Twitter sentiment for any user-entered keyword using NLP and an ensemble of 7 ML classifiers with the NLTK library and Twitter API.',
      ],
      tags: ['NLP', 'NLTK', 'Machine Learning', 'Twitter API', 'Python'],
      links: [],
    },
    {
      id: 'proj-11',
      title: 'Movie Review Analyzer',
      org: 'Personal',
      dates: 'Mar 2018 – Mar 2018',
      bullets: [
        'Built a bag-of-words model with seven different classifiers using ensemble voting to automatically sort and classify movie reviews.',
      ],
      tags: ['NLP', 'Machine Learning', 'Bag of Words', 'Ensemble', 'Python'],
      links: [],
    },
    {
      id: 'proj-12',
      title: 'Face and Smile Detection using OpenCV',
      org: 'Personal',
      dates: 'Sep 2017 – Oct 2017',
      bullets: [
        'Detected facial features (eyes) and emotions (smile) using the Viola-Jones algorithm with OpenCV Haar cascades (facehaarcascade, eyehaarcascade, smilehaarcascade).',
      ],
      tags: ['Computer Vision', 'OpenCV', 'Haar Cascade', 'Python'],
      links: [],
    },
    {
      id: 'proj-13',
      title: 'Live Video Streaming Service',
      org: 'Personal',
      dates: 'Jun 2017 – Jul 2017',
      bullets: [
        'Built an eLearning platform supporting live video streaming from teacher to students and real-time chat between all logged-in users.',
      ],
      tags: ['Streaming', 'WebRTC', 'Chat', 'eLearning'],
      links: [],
    },
    {
      id: 'proj-14',
      title: 'Website for Har Hath Kalam Foundation',
      org: 'Personal',
      dates: 'Jun 2016 – Jun 2017',
      bullets: [
        'Developed the official website for Har Hath Kalam Foundation, a social initiative.',
      ],
      tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
      links: [],
    },
    {
      id: 'proj-15',
      title: 'Autonomous Buggy',
      org: 'Personal',
      dates: 'Jan 2017 – May 2017',
      bullets: [
        'Developed an autonomous buggy equipped with sensors (Xbee, UV, ultrasonic) and an L293D motor driver on Arduino ATmega328, featuring obstacle avoidance, wireless inter-buggy communication, and automatic speed variation.',
      ],
      tags: ['Arduino', 'Embedded Systems', 'Robotics', 'Sensors', 'Autonomous'],
      links: [],
    },
    {
      id: 'proj-16',
      title: 'Android Application for Har Hath Kalam',
      org: 'Personal',
      dates: 'May 2016 – Dec 2016',
      bullets: [
        'Built the official Android application for Har Hath Kalam, a social initiative.',
      ],
      tags: ['Android', 'Mobile Development', 'Java'],
      links: [],
    },
    {
      id: 'proj-17',
      title: 'Mangonal (Catapult) Project',
      org: 'Personal',
      dates: 'Aug 2016 – Dec 2016',
      bullets: [
        'Designed and assembled a catapult with a 50-meter firing range, equipped with Arduino and UV sensor to measure firing speed.',
      ],
      tags: ['Arduino', 'Embedded Systems', 'Sensors', 'Mechanical Design'],
      links: [],
    },
    {
      id: 'proj-18',
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
        'GPA: 3.92. Relevant courses: Advanced Machine Learning, Big Data Systems, Natural Language Processing, Algorithms for Data Science.',
      ],
      tags: ['ML', 'NLP', 'Big Data', 'AI', 'Data Science'],
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

export function getAllCards(): ResumeCard[] {
  return (Object.values(resumeSections) as ResumeCard[][]).flat()
}

export function getCardById(cardId: string): ResumeCard | undefined {
  return getAllCards().find((c) => c.id === cardId)
}

export const topHighlightCardIds: string[] = ['exp-1', 'proj-1', 'skill-ml']
