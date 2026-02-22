---
docId: skill-langgraph
title: LangGraph — Usage and Experience
type: other
tags: LangGraph, multi-agent, stateful agents, orchestration
---

# LangGraph

Core orchestration framework for complex, stateful multi-agent systems.

**Where used:**
- **EdTech TULNA (Jun–Aug 2025)** — Designed and deployed a fault-tolerant multi-agent AI pipeline using LangGraph. The graph has: two independent LLM critic agents (structured chain-of-thought), a conflict resolution agent that reconciles disagreements between critics, and an evidence-planning agent that identifies critical video timestamps for screenshot extraction via FFmpeg. The pipeline cut manual video review time by 95% (4 hours → under 10 minutes) and achieved >90% alignment with expert human evaluations.
- **Intelligent Jira Backlog Generator** — LangGraph used for the stateful multi-step planning loop: requirement parsing → story generation → review → human edit → finalization.

LangGraph extends LangChain with graph-based state machines, enabling fault-tolerant, resumable, multi-step agent workflows where each node can be an LLM call, tool use, or branching condition.
