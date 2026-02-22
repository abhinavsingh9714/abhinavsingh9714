---
docId: skill-tensorflow-keras
title: TensorFlow and Keras — Usage and Experience
type: other
tags: TensorFlow, Keras, deep learning
---

# TensorFlow / Keras

Used for video-based action classification and face mask detection projects.

**Where used:**
- **Video-based Action Classification (IISc, Oct–Nov 2023)** — CNN-LSTM hybrid on KTH dataset using Keras. Used TimeDistributed layers for per-frame spatial feature extraction before LSTM temporal modeling. Keras Tuner for automated hyperparameter search. Achieved 88% validation accuracy (vs 79.17% VGG16 baseline). Experimented with DenseNet and VGG16 as backbone options.
- **Face Mask Detection (IISc, Oct 2023)** — Fine-tuned VGG16 using Keras with Adam optimizer and categorical cross-entropy. Dataset of 6,000+ images with augmentation (rotation, scaling, flipping). Achieved 96.76% validation accuracy across partial occlusion and varying lighting conditions.
- Early deep learning coursework at IISc used Keras as the primary framework before switching to PyTorch for advanced projects.
