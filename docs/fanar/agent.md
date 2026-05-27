---
title: AI Agent and Copilot
sidebar_position: 2
---

The Fanar agent module converts natural language into SQL queries and answers using LangGraph workflows.

## Chat workflow

Handles end-to-end natural language → SQL → answer, plus on-demand dashboard creation.

1. **detect_intent** — classifies intent (`answer_sql_question`, `search_queries`, `create_dashboard`)
2. **answer_sql_question** / **search_queries**:
   - Semantic search of saved queries
   - If needed: select data source → generate SQL → validate → execute → generate answer
3. **create_dashboard** — filters schema once, checks widget feasibility, runs the SQL pipeline per widget, persists dashboard widgets

Validation and execution failures retry SQL generation up to `max_attempts` (default 3).

## Copilot workflow

Intent-driven editing of an existing saved query: edit SQL, add or edit visualizations, or answer general questions about the data.

## Schema graph

`fanar/agent/schema_graph/` uses **FalkorDB** for graph RAG over database schema:

- **Indexing** — embeds tables/columns when schema is refreshed
- **Retrieval** — vector search + FK traversal to narrow schema for each query

## Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `OPENAI_API_KEY` | *(required)* | OpenAI API access |
| `FANAR_LLM_REQUEST_TIMEOUT` | `55` | LLM request timeout (seconds) |
| `FANAR_SQL_GENERATION_MODEL_NAME` | `gpt-5-mini` | SQL generation model |
| `FANAR_ANSWER_MODEL_NAME` | `gpt-5-mini` | Answer generation model |
| `FANAR_COPILOT_MODEL_NAME` | `gpt-5-mini` | Copilot model |
| `FANAR_QUERY_SEMANTIC_INDEX_ENABLED` | auto | Enable saved-query semantic index |
| `FANAR_FALKORDB_HOST` | `localhost` | FalkorDB host |
| `FANAR_FALKORDB_PORT` | `6379` | FalkorDB port |

See [LangSmith](./langsmith) for optional tracing and prompt hub integration.
