---
docId: proj-action-classification
title: Video Action Classification — CNN-LSTM on KTH Dataset
type: project
tags: Video Analytics, CNN, LSTM, Action Recognition, Keras, Deep Learning, IISc
---

# Video-based Action Classification (IISc, Oct–Nov 2023)

**What:** CNN-LSTM hybrid for classifying six human actions in video.

## What was built

- CNN-LSTM hybrid: TimeDistributed CNN layers extract per-frame spatial features, LSTM models temporal patterns across frames
- Classes: walking, jogging, running, boxing, hand waving, hand clapping (KTH dataset)
- 88% validation accuracy after hyperparameter tuning with Keras Tuner
- Outperforms VGG16-only baseline (79.17%) — demonstrates value of temporal modeling over single-frame classification
- Experimented with DenseNet and VGG16 as CNN backbone options

## Key technical decisions
- TimeDistributed wrapper used to apply the same CNN to each frame before feeding the sequence to LSTM — enables end-to-end training of spatial + temporal features together
- Keras Tuner for automated hyperparameter search (learning rate, LSTM units, dropout) rather than manual grid search
- The gap from 79.17% (static CNN) to 88% (CNN-LSTM) quantifies the benefit of explicitly modeling temporal motion dynamics

**Tags:** Video Analytics, CNN, LSTM, Action Recognition, Keras, Deep Learning, Keras Tuner
