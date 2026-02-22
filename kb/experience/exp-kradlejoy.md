---
docId: exp-kradlejoy
title: Machine Learning Intern — KradleJoy
type: resume
tags: KradleJoy, Computer Vision, YOLOv8, Detectron2, MediaPipe, YAMNet, FastAPI, Docker, AWS EC2, baby monitoring
---

# Machine Learning Intern — KradleJoy Pvt Ltd (Apr 2024 – Aug 2024)

**Project:** Real-time AI baby monitoring system providing instant safety alerts to parents.

## What was built

**Video pipeline:**
- Fine-tuned YOLOv8 for baby/adult classification — handles 80–90% occlusion and low-light conditions
- Integrated Detectron2 (RCNN) for general object detection
- Built a video-based sleep tracker using MediaPipe Pose Detection (accurate under 80% body coverage)

**Audio pipeline:**
- Fine-tuned YAMNet for baby cry detection — sub-13ms inference latency for real-time alerts

**Infrastructure:**
- FastAPI-powered backend serving both video and audio pipelines
- Containerized with Docker, deployed on AWS EC2
- RetinaFace-based face blurring module for user privacy

## Key technical decisions
- YOLOv8 chosen over pure Detectron2 for inference speed in real-time video
- YAMNet fine-tuned (not used off-the-shelf) to reduce false positives on baby-specific sounds
- Docker + EC2 for reproducible deployment without complex orchestration overhead

**Tags:** Computer Vision, YOLOv8, Detectron2, MediaPipe, YAMNet, FastAPI, Docker, AWS EC2
