---
docId: skill-sklearn
title: scikit-learn — Usage and Experience
type: other
tags: scikit-learn, machine learning, classical ML, classification, regression
---

# scikit-learn

Standard library for classical ML model training, evaluation, and preprocessing pipelines.

**Where used:**
- **MDI Research (Jan–Jul 2024)** — Built customer churn prediction models and recommendation systems for AI-driven CRM research. scikit-learn provided the model training, cross-validation, and metric evaluation pipelines.
- **IISc Twitter Sentiment Classification (Sep 2023)** — Implemented Naive Bayes (73.85% accuracy) and Logistic Regression (73.04% accuracy) classifiers using scikit-learn on top of PySpark-preprocessed tweet features.
- **IISc Movie Review Analyzer (2018)** — Bag-of-words model with seven classifiers using ensemble voting, all implemented with scikit-learn.
- **Multiple IISc coursework projects** — Used as the default toolkit for classical ML: model selection, hyperparameter search (GridSearchCV), preprocessing (StandardScaler, LabelEncoder), and metrics (classification_report, confusion_matrix).

scikit-learn is the default for any structured/tabular ML problem where deep learning is not required.
