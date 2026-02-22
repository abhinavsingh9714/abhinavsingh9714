---
docId: proj-face-mask-detection
title: Face Mask Detection — VGG16 Fine-tuning
type: project
tags: Computer Vision, Transfer Learning, CNN, VGG16, Deep Learning, Keras, IISc
---

# Face Mask Detection (IISc, Oct 2023)

**What:** Deep learning classifier for three mask-wearing states: with mask, without mask, partial mask.

## What was built

- Fine-tuned VGG16 with Adam optimizer and categorical cross-entropy loss
- Custom dataset of 6,000+ images with augmentation (rotation, scaling, flipping)
- 96.76% validation accuracy across diverse scenarios including partial occlusions and varying lighting conditions

## Key technical decisions
- VGG16 chosen for its strong feature extraction on ImageNet — fine-tuning the top layers adapts it to mask detection without training from scratch
- Three-class (not binary) formulation chosen because partial mask-wearing is a distinct safety risk requiring separate handling
- Aggressive augmentation (rotation + scaling + flipping) because real-world face angles and distances vary significantly

**Tags:** Computer Vision, Transfer Learning, VGG16, Keras, Deep Learning, Image Classification
