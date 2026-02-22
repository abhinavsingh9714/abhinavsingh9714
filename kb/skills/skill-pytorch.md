---
docId: skill-pytorch
title: PyTorch — Usage and Experience
type: other
tags: PyTorch, deep learning, neural networks
---

# PyTorch

Primary deep learning framework. Used in every custom model training and fine-tuning task.

**Where used:**
- **Slo-Mo Video Generation** — trained U-Net for frame interpolation (temporal + spatial fusion) using PyTorch
- **Multi-Stock Price Prediction (UMD)** — dual-input LSTM + embedding fusion model in PyTorch; $2.38 average deviation from actual close across 24 major stocks
- **Visual Search System (UMD)** — used CLIP (OpenAI's PyTorch model) to generate embeddings for 60,000+ product images
- **Plant Disease Detection (IISc)** — stacked CNN ensemble (Xception + MobileNet) with transfer learning in PyTorch; 99% F1-score on 54,303-image PlantVillage dataset
- **KradleJoy** — fine-tuned YOLOv8 for baby/adult classification in low-light and high-occlusion (80–90%) conditions; fine-tuned YAMNet for cry detection at sub-13ms latency

PyTorch is the default for all neural network work. Custom training loops, loss functions, and model checkpointing all done in PyTorch.
