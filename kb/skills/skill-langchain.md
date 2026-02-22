---
docId: skill-langchain
title: LangChain — Usage and Experience
type: other
tags: LangChain, LLM, agents, RAG, agentic
---

# LangChain

Used for chaining LLM calls, managing prompts, and integrating external tools in agentic pipelines.

**Where used:**
- **Intelligent Jira Backlog Generator (featured project)** — LangChain used to orchestrate the planning agent loop with GPT-4o and Gemini 2.5 Pro. Handles tool calls, structured output parsing (Pydantic), and human-in-the-loop editing flows.
- **EdTech TULNA (2025)** — LangChain provides the LLM integration layer that LangGraph builds its state machine on top of. Used for structured prompting to the critic and conflict resolution agents.
- **TAAI Labs Neuron (2025)** — LangChain used for prompt management and LLM calls within the Neuron knowledge platform, integrating with the Pinecone-backed RAG retrieval layer.

LangChain is used as the foundation when building multi-step LLM workflows. LangGraph extends it for stateful, graph-based multi-agent pipelines.
