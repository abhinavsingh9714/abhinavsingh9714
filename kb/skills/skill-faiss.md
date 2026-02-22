---
docId: skill-faiss
title: FAISS — Usage and Experience
type: other
tags: FAISS, vector search, similarity search, embeddings
---

# FAISS

Used for fast approximate nearest neighbor search over dense embedding vectors.

**Where used:**
- **Visual Search System (UMD, Dec 2024)** — Built a CLIP + FAISS content-based image retrieval (CBIR) system over 60,000+ product images from the Berkeley Amazon dataset. FAISS index achieves query response times under 50ms with a persistent indexing system to avoid constant reindexing. Built a Streamlit UI for real-time image uploads and similarity searches.
- **Freelance Visual Similarity Engine (2023)** — Built a real-time visual similarity API using CLIP + FAISS, retrieving similar images from a 60,000+ image database in under 50ms. Delivered as an API backend to an interactive visual search web UI.

FAISS (Facebook AI Similarity Search) provides fast approximate nearest neighbor (ANN) search, enabling sub-50ms retrieval at scale without a managed vector database. Used when low-latency local vector search is needed without infrastructure overhead.
