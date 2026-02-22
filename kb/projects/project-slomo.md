---
docId: project-slomo
title: Slo-Mo Video Generation with GANs
type: project
projectId: project-slomo
tags: GANs, U-Net, Frame Interpolation, PyTorch, Video ML, SSIM, LPIPS
---

# Slo-Mo Video Generation with GANs

**Organization:** University of Maryland
**Period:** Apr 2025 – Jun 2025
**Outcome:** 8× frame-rate uplift (60 → 480 fps) via learned intermediate-frame synthesis using a U-Net-based model.

## Overview

A deep learning system that generates slow-motion video by inserting 2–8 synthetic intermediate frames between real frames in 0.9-second clips. The model was trained to handle fast and unpredictable motion events where traditional interpolation methods break down.

## Architecture

The core model is a U-Net-based frame interpolation network. Given two consecutive frames from a 60fps input, the model learns to synthesize multiple intermediate frames with temporal consistency. The architecture uses skip connections to preserve spatial detail while the encoder-decoder structure captures motion dynamics.

The model was trained on sports and nature video datasets that contain challenging, fast motion events. Traditional bilinear interpolation struggles with these scenarios because it cannot reason about motion trajectories. The learned model outperforms bilinear baseline by 14% on SSIM (Structural Similarity Index Measure) on sports and nature clips.

## Evaluation

- SSIM: 14% improvement over bilinear baseline
- LPIPS: evaluated for perceptual quality
- Supports 2× to 8× frame-rate multiplier per 0.9 second clip

## Key Features

- U-Net architecture with skip connections for high-fidelity frame synthesis
- Supports 60 → 120, 240, or 480 fps conversion
- Evaluated with SSIM and LPIPS metrics for quality assessment
- Trained on sports and nature video for challenging motion events
- Outperforms bilinear baseline by 14% SSIM on test set

## Technical Stack

- **Model:** U-Net (encoder-decoder with skip connections)
- **Training:** PyTorch
- **Loss:** Perceptual loss + reconstruction loss
- **Evaluation:** SSIM, LPIPS
- **Dataset:** Sports and nature video clips
