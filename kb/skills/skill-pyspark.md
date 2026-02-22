---
docId: skill-pyspark
title: Apache Spark / PySpark — Usage and Experience
type: other
tags: PySpark, Apache Spark, big data, NLP, preprocessing
---

# Apache Spark / PySpark

Used for large-scale data preprocessing in NLP pipelines.

**Where used:**
- **Freelance Sentiment Analysis Pipeline (2023)** — Used PySpark for large-scale tweet preprocessing (tokenization, stop-word removal) as part of a social media analytics dashboard backend. The Spark pipeline fed into a fine-tuned BERT model served via FastAPI.
- **IISc Twitter Airline Sentiment Classification (Sep 2023)** — Built the full classification pipeline in PySpark: tokenization, stop-word removal, VectorAssembler feature pipelines, then trained Naive Bayes (73.85%) and Logistic Regression (73.04%) classifiers. Deployed as a Streamlit app with Ngrok for real-time predictions.

PySpark is the tool of choice for scalable preprocessing when datasets are large enough to benefit from distributed processing. Used it specifically for text preprocessing pipelines where tokenization and feature assembly needed to happen at scale.
