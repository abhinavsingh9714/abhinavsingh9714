---
docId: skill-dynamodb
title: DynamoDB — Usage and Experience
type: other
tags: DynamoDB, AWS, NoSQL, database, serverless
---

# DynamoDB

Used at TAAI Labs for the Neuron knowledge ingestion pipeline.

**Where used:**
- **TAAI Labs Neuron Platform (Aug 2025–Present)** — DynamoDB stores document metadata and chunk records for the Neuron RAG system. Each ingested document's metadata (source, title, chunk IDs, status) and each chunk record (text, embedding pointer) are stored in DynamoDB tables. Chosen for its serverless scalability and tight AWS Lambda integration — Lambda functions read/write DynamoDB directly without a persistent DB connection, making it ideal for event-driven ingestion pipelines.

DynamoDB is the metadata and record store in a Lambda-orchestrated RAG pipeline. It enables decoupled, stateless processing workers (Lambda) to track and persist ingestion state without a traditional relational DB.
