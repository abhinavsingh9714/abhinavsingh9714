---
docId: proj-plant-disease
title: Plant Disease Detection — Stacked CNN Ensemble
type: project
tags: Computer Vision, PyTorch, CNN, Transfer Learning, Xception, MobileNet, Streamlit, K-means, IISc
---

# Plant Disease Detection System (IISc, Jan–Apr 2024)

**What:** Early plant disease detection system to aid farmers in crop management.

## What was built

- Stacked CNN voting classifier using transfer learning: Xception + MobileNet ensemble
- Achieves 99% F1-score and precision on the PlantVillage dataset (54,303 images)
- Semi-supervised contour mapping system using RGB channel analysis, K-means clustering, and morphological transformations to assess disease extent
- Streamlit web app for real-time diagnosis — farmers upload leaf images and receive immediate insights

## Key technical decisions
- Ensemble of two architectures (Xception + MobileNet) via voting reduces single-model overfitting on plant imagery
- Semi-supervised contour mapping added because raw classification doesn't show disease spread area — needed for actionable farm decisions
- Streamlit for quick deployment of the diagnosis UI without a dedicated frontend team

**Tags:** Computer Vision, PyTorch, CNN, Transfer Learning, Xception, MobileNet, K-means, Streamlit
