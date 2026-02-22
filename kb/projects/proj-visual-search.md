---
docId: proj-visual-search
title: Visual Search System — CLIP + FAISS
type: project
tags: CLIP, FAISS, Computer Vision, Deep Learning, Streamlit, Image Retrieval, Vector Search, PyTorch
---

# Visual Search System (University of Maryland, Dec 2024)

**What:** Content-based image retrieval (CBIR) system for e-commerce and art discovery.

## What was built

- CLIP-based embedding model generates dense vector representations for images
- FAISS vector index over 60,000+ images from the Berkeley Amazon dataset
- Query response times under 50ms with persistent indexing (no constant reindexing)
- Streamlit UI for real-time image uploads, similarity searches, and visualization
- Full pipeline: image preprocessing → CLIP embedding → cosine similarity ranking via FAISS

## Key technical decisions
- CLIP chosen for semantic similarity (captures visual meaning, not pixel-level matching) — queries like "red shoe" return semantically similar items even without exact color/texture match
- FAISS for sub-50ms ANN search without a managed vector DB
- Persistent index stored to disk — avoids re-embedding 60K+ images on every query

**Tags:** CLIP, FAISS, Deep Learning, Computer Vision, Streamlit, Image Retrieval, Vector Search
