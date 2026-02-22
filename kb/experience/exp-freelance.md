---
docId: exp-freelance
title: Machine Learning Engineer (Freelance)
type: resume
tags: Freelance, CLIP, FAISS, PySpark, BERT, FastAPI, sentiment analysis, visual search
---

# Machine Learning Engineer — Freelance (Jul 2023 – Dec 2023)

Two production ML deliverables built and deployed independently.

## 1. Visual Similarity Search Engine

- **What:** Real-time visual similarity API — given an image query, returns visually similar items from a 60,000+ image database in under 50ms
- **Stack:** CLIP (OpenAI's vision-language model) for image embeddings + FAISS for approximate nearest neighbor indexing
- **Delivered as:** FastAPI backend powering an interactive visual search web UI
- **Key design choice:** CLIP embeddings capture semantic visual similarity (not just pixel-level matching); FAISS handles sub-50ms ANN search at 60K+ image scale

## 2. Real-time Sentiment Analysis Pipeline

- **What:** Real-time sentiment classification for a social media analytics dashboard
- **Stack:** PySpark for large-scale tweet preprocessing (tokenization, stop-word removal) → fine-tuned Hugging Face BERT model → FastAPI serving
- **Performance:** 85%+ classification accuracy, sub-second inference latency
- **Key design choice:** Fine-tuned BERT (not off-the-shelf) for domain-specific social media language; PySpark for scalable preprocessing of high-volume tweet data

**Tags:** CLIP, FAISS, Vector Search, PySpark, BERT, Hugging Face, FastAPI, NLP, Computer Vision
