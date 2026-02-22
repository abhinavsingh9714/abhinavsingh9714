---
docId: skill-fastapi
title: FastAPI — Usage and Experience
type: other
tags: FastAPI, Python, API, REST, ML serving
---

# FastAPI

Primary framework for serving production ML models as APIs.

**Where used:**
- **KradleJoy (Apr–Aug 2024)** — FastAPI-powered pipeline serving the real-time baby monitoring system (YOLOv8 + Detectron2 + YAMNet). Containerized with Docker and deployed on AWS EC2. Integrated a RetinaFace face-blurring module for privacy.
- **Freelance Sentiment Analysis (2023)** — Fine-tuned BERT model for real-time sentiment analysis deployed via FastAPI as a backend for a social media analytics dashboard. Sub-second inference latency.
- **Freelance Visual Search Engine (2023)** — CLIP + FAISS visual similarity engine delivered as a FastAPI backend, returning similar images from a 60,000+ image database in under 50ms.

FastAPI is the default for ML model serving due to: async request handling, automatic OpenAPI documentation generation, Pydantic-based request/response validation, and high performance compared to Flask.
