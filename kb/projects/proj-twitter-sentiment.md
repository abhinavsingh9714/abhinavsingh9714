---
docId: proj-twitter-sentiment
title: Twitter Sentiment Classification — PySpark + NLP
type: project
tags: PySpark, NLP, Sentiment Analysis, Naive Bayes, Logistic Regression, Streamlit, IISc
---

# Twitter Sentiment Classification (IISc, Sep 2023)

**What:** Multi-class sentiment analysis (neutral, negative, positive) for tweets about six major US airlines.

## What was built

- PySpark pipeline for scalable preprocessing: tokenization, stop-word removal, VectorAssembler feature pipelines
- Naive Bayes classifier: 73.85% accuracy
- Logistic Regression classifier: 73.04% accuracy
- Streamlit web app with Ngrok integration for real-time predictions on new tweets

## Key technical decisions
- PySpark chosen for scalable preprocessing — tweet datasets are high-volume and tokenization/stop-word removal pipelines benefit from distributed execution
- Both Naive Bayes and Logistic Regression implemented to compare a probabilistic vs. discriminative classifier on the same features
- Streamlit + Ngrok for live demo without deploying to a cloud server

**Tags:** PySpark, NLP, Sentiment Analysis, Naive Bayes, Logistic Regression, Streamlit, Ngrok
