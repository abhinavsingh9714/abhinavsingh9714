---
docId: skill-aws
title: AWS — Usage and Experience
type: other
tags: AWS, EC2, Lambda, S3, DynamoDB, Step Functions, Textract, Bedrock, cloud
---

# AWS

Primary cloud platform for all production ML deployment work.

**Where used:**
- **TAAI Labs Neuron Platform (Aug 2025–Present)** — Full AWS infrastructure: EC2 for compute, S3 for document storage, Lambda for serverless knowledge ingestion workers, Step Functions for orchestrating the multi-step ingestion pipeline (parse → chunk → embed → index), Textract for document parsing, DynamoDB for metadata/chunk records, Bedrock for managed LLM serving, Pinecone for vector search.
- **KradleJoy (Apr–Aug 2024)** — Containerized FastAPI baby monitoring pipeline (Docker + FastAPI) deployed on AWS EC2. Ensured scalability and privacy with a RetinaFace-based face blurring module.

AWS is the default cloud platform for production ML systems. Particularly strong with serverless pipeline orchestration (Lambda + Step Functions) and managed AI services (Textract, Bedrock).
