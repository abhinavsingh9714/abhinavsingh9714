---
docId: proj-bitcoin-forecasting
title: Bitcoin Price Forecasting — ARIMA / SARIMAX
type: project
tags: Time Series, ARIMA, SARIMAX, Finance, Python, Statistics, IISc
---

# Bitcoin Price Forecasting (IISc, Mar 2024)

**What:** Time series forecasting of Bitcoin prices using classical statistical models.

## What was built

- SARIMAX and ARIMA models trained on historical daily Bitcoin prices (Sep 2014 – Jul 2021)
- 15% improvement in prediction accuracy over baseline models
- Statistical rigor: ADF and KPSS stationarity tests, AIC/BIC model selection (top 5% of tested configurations)
- Explored trends, seasonality, and volatility in Bitcoin price movements

## Key technical decisions
- SARIMAX chosen over pure ARIMA to capture seasonal patterns in crypto price cycles
- ADF + KPSS tests used together — ADF alone can miss certain non-stationarity patterns
- AIC/BIC for model selection to balance goodness-of-fit against overfitting on small daily data

**Tags:** Time Series Forecasting, ARIMA, SARIMAX, Python, Statistics, Finance
