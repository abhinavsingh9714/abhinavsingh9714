---
docId: project-jira-agent
title: Intelligent Jira Backlog Generator
type: project
projectId: project-jira-agent
tags: LangChain, GPT-4o, Gemini, Pydantic, Jira API, Docker, Streamlit, LLM
---

# Intelligent Jira Backlog Generator

**Organization:** University of Maryland
**Period:** Jun 2025 – Jul 2025
**Outcome:** 70% reduction in planning overhead — natural language ideas converted into full Jira backlogs (Initiatives → Epics → Stories → Tasks) autonomously.

## Overview

An LLM-powered planning agent that converts natural language product descriptions into structured, schema-enforced Jira backlogs using GPT-4o, Gemini 2.5, and LangChain. The system eliminates manual sprint-planning ticket writing entirely and accelerates cross-functional alignment.

## Architecture

The system uses a LangChain planning loop to parse product ideas and hierarchically decompose them into Jira ticket structures. Each level of the hierarchy (Initiative → Epic → Story → Task) is generated with schema enforcement via Pydantic, ensuring consistent and valid output that maps cleanly to Jira's data model.

Dynamic Jira Cloud integration is handled via the REST API v3, where tickets are created, linked, and labelled autonomously after generation. The output schema is strictly enforced using Pydantic models, preventing hallucinated or malformed ticket structures.

## Key Features

- LLM planning agent using GPT-4o and Gemini 2.5 for natural language understanding
- Hierarchical decomposition: Initiatives → Epics → Stories → Tasks
- Schema-enforced output via Pydantic models preventing malformed tickets
- Direct Jira Cloud integration via REST API v3 — tickets created and linked automatically
- Human-in-the-loop editing via Streamlit for review before submission
- Containerized with Docker for seamless team adoption across environments
- Reduced planning overhead by 70% and accelerated cross-functional alignment

## Technical Stack

- **LLM:** GPT-4o, Gemini 2.5 Pro
- **Orchestration:** LangChain
- **Validation:** Pydantic
- **Integration:** Jira Cloud REST API v3
- **UI:** Streamlit
- **Deployment:** Docker

## GitHub

https://github.com/abhinavsingh9714/JIRA-agent
