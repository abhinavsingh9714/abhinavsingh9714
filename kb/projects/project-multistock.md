---
docId: project-multistock
title: Multi-Stock Price Prediction Using LSTM and Embedding Fusion
type: project
projectId: project-multistock
tags: LSTM, Deep Learning, Embeddings, Time Series, Finance, PyTorch, RSI, MACD
---

# Multi-Stock Price Prediction Using LSTM and Embedding Fusion

**Organization:** University of Maryland
**Period:** Nov 2024 – Jan 2025
**Outcome:** $2.38 average deviation from actual closing prices across 24 major stocks via LSTM + embedding fusion architecture.

## Overview

A scalable stock price forecasting model that integrates LSTM networks with stock-specific learnable embeddings, enabling the model to learn both temporal dependencies and individual stock behaviors simultaneously across 24 major companies.

## Architecture

The system uses a dual-input architecture:
1. **LSTM branch:** processes 60-day historical price windows as sequential input to capture temporal dependencies and market patterns over time.
2. **Embedding branch:** each stock has a unique learnable identifier embedding that captures stock-specific behavior and characteristics not visible in price data alone.

The two outputs are fused via concatenation and passed through fully connected layers to produce the next-day closing price prediction. This allows the model to generalize across stocks while still tailoring predictions to each stock's unique behavior.

## Features and Indicators

The model leverages 60-day historical windows with key technical indicators:
- **RSI (Relative Strength Index):** measures momentum and overbought/oversold conditions
- **SMA20 (Simple Moving Average, 20-day):** smooths price trends to reduce noise
- **MACD (Moving Average Convergence Divergence):** tracks trend changes and momentum shifts

## Key Results

- $2.38 average deviation from actual closing prices across 24 major stocks
- Trained on 24 major company stocks simultaneously
- Modular architecture supports plug-in of new stocks and technical indicators without re-engineering

## Technical Stack

- **Model:** Dual-input LSTM + Embedding Fusion
- **Framework:** PyTorch
- **Input features:** RSI, SMA20, MACD, historical close prices
- **Window:** 60-day lookback
- **Coverage:** 24 major stocks
