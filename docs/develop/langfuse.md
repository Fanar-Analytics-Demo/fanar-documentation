---
title: Langfuse (prompts and tracing)
sidebar_position: 6
---

# Langfuse

Fanar uses [Langfuse](https://langfuse.com/) for two things: **prompt management**
and **workflow tracing**.

:::warning
Langfuse is **required**, not optional. Agents fetch their prompts from Langfuse
at construction time and raise an error if it is disabled or unconfigured. An
instance without Langfuse credentials can serve queries and dashboards, but the AI
features will fail.
:::

## Environment variables

```bash
LANGFUSE_ENABLED=true
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_BASE_URL=https://lf.fanar.tech
```

`LANGFUSE_BASE_URL` defaults to `https://lf.fanar.tech`. Point it at your own
Langfuse instance if you self-host one.

## Prompts

Each agent node fetches its prompt from Langfuse by name. Every node also ships a
`fallback_prompts.py` next to it, used when the managed prompt cannot be resolved.

This means prompt changes can be made and rolled out from Langfuse without
redeploying Fanar — but it also means Langfuse availability is on the critical path
for the agent.

## Tracing

When enabled, agent workflow steps are traced to the configured Langfuse project,
which is the primary tool for debugging why the agent produced a particular answer.

## Choosing models per node

Each agent node resolves its model from an environment variable named after its
config prefix, `<PREFIX>_MODEL_NAME`, falling back to app config and then a
built-in default.

| Prefix | Used by |
|---|---|
| `INTENT` | Intent detection, query search, semantic layer routing |
| `SQL_GENERATION` | SQL generation and data source selection |
| `ANSWER_GENERATION` | Chat answer generation, dashboard widget feasibility |
| `ANSWER_GENERATOR` | Copilot answer generation |
| `VISUALIZATION` | Visualization generation and editing |
| `COPILOT` | Copilot query editing |
| `QUERY_SEMANTIC` | Saved-query semantic index descriptions |

So `SQL_GENERATION_MODEL_NAME=gpt-5` overrides the SQL generation model, and
`SQL_GENERATION_MODEL_TEMPERATURE` its temperature.

OpenAI, Anthropic and Mistral model names are all recognised and routed to the
right client automatically.
