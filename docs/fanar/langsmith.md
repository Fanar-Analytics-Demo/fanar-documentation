---
title: LangSmith integration
sidebar_position: 5
---

Fanar can integrate with [LangSmith](https://smith.langchain.com/) for agent prompt management and workflow tracing.

## Environment variables

```bash
LANGSMITH_API_KEY=your_langsmith_api_key_here
LANGSMITH_PROJECT_NAME=fanar-agent
LANGSMITH_ENABLED=true
```

Add these to your `.env` file alongside other Fanar settings.

## Behavior

- **Prompts** — agents fetch prompts from LangSmith Hub with a 24-hour Redis cache, falling back to local `fallback_prompts.py` if unavailable.
- **Tracing** — when enabled, LangGraph workflow steps are traced to the configured LangSmith project for debugging and evaluation.

LangSmith is optional but recommended for production agent workloads.
