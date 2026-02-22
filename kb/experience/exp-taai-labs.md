---
docId: exp-taai-labs
title: Founding ML Engineer — TAAI Labs
type: resume
tags: TAAI Labs, GenAI, RAG, AWS, Pinecone, LangChain, Qwen, DynamoDB, Textract, Lambda, Step Functions
---

# Founding ML Engineer — TAAI Labs (Aug 2025 – Present)

**Role:** First ML hire. Spearheaded development and launch of Neuron, a multi-tenant ML/GenAI platform on AWS.

## What was built

**Neuron Platform** — powers three core capabilities across all company products:
1. **Knowledge-base ingestion pipeline** — chunks, embeds, and indexes 1,000+ internal documents. Pipeline: Textract (PDF/doc parsing) → chunking → OpenAI embeddings → DynamoDB (metadata) → Pinecone (vector index). Orchestrated with AWS Lambda + Step Functions.
2. **Infrastructure graphing service** — converts Terraform scripts into data-flow and dependency graphs, cutting architecture and security review time by 90%.
3. **Enterprise Q&A** — Qwen-based NIST-compliant Q&A model fine-tuned and integrated with the RAG pipeline for grounded, audit-ready responses in security and compliance workflows.

## Key technical decisions
- AWS-native serverless architecture (Lambda + Step Functions) for scalable, event-driven ingestion without persistent compute costs
- Pinecone for managed vector search at production scale
- Fine-tuned Qwen model (not generic GPT) to ensure NIST compliance and domain-specific grounding
- DynamoDB for stateless Lambda-friendly metadata storage

**Tags:** GenAI, RAG, AWS, Pinecone, Lambda, Step Functions, Qwen, DynamoDB, Textract, LangChain
