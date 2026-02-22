---
docId: skill-huggingface
title: Hugging Face — Usage and Experience
type: other
tags: Hugging Face, transformers, BERT, fine-tuning, NLP
---

# Hugging Face

Used to access and fine-tune pre-trained transformer models for NLP and audio tasks.

**Where used:**
- **Freelance (2023)** — Fine-tuned BERT for real-time sentiment analysis as part of a social media analytics dashboard. Achieved 85%+ classification accuracy with sub-second inference latency. Deployed via FastAPI.
- **KradleJoy (2024)** — Used YAMNet (a Hugging Face / TF Hub audio model) as the base for fine-tuning a baby cry detector; achieved sub-13ms inference latency for real-time alerts.
- **TAAI Labs (2025)** — Used Hugging Face transformers ecosystem as the source of pre-trained model weights when building and integrating the Qwen-based NIST-compliant Q&A model into the Neuron RAG pipeline.

The Hugging Face ecosystem (transformers, datasets, model hub) is the default source for pre-trained NLP and audio models before fine-tuning on task-specific data.
