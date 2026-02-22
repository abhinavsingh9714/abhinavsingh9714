---
docId: skill-docker
title: Docker — Usage and Experience
type: other
tags: Docker, containerization, MLOps, deployment
---

# Docker

Used for containerizing production ML services to ensure reproducible environments.

**Where used:**
- **KradleJoy (Apr–Aug 2024)** — Containerized the FastAPI baby monitoring pipeline (YOLOv8 + Detectron2 + YAMNet + RetinaFace) with Docker and deployed on AWS EC2. Docker ensured the complex multi-model pipeline ran consistently across development and production without environment drift.
- **Intelligent Jira Backlog Generator** — Dockerized the full application for easy team adoption. Docker packaging ensured the LLM planning agent and its dependencies (LangChain, Pydantic, OpenAI SDK) ran consistently without local setup friction.

Docker is used whenever a service has complex ML dependencies (GPU drivers, model weights, multiple frameworks) or needs to be shared across teams. It bridges the gap between model training environments and production deployment.
