---
title: Agent architecture
sidebar_position: 2
---

# Agent architecture

The Fanar agent module converts natural language into SQL queries and answers
using LangGraph workflows. This page covers how it is built; for how to use it,
see [Ask Fanar](../ask).

## Chat workflow

Handles end-to-end natural language → SQL → answer, plus on-demand dashboard
creation.

1. **detect_intent** — classifies intent (`answer_sql_question`, `search_queries`,
   `create_dashboard`)
2. **answer_sql_question** / **search_queries**:
   - Semantic search of saved queries
   - If needed: select data source → generate SQL → validate → execute → generate
     answer
3. **create_dashboard** — filters schema once, checks widget feasibility, runs the
   SQL pipeline per widget, persists dashboard widgets

Validation and execution failures retry SQL generation up to `max_attempts`
(default 3).

## Copilot workflow

Intent-driven editing of an existing saved query: edit SQL, add or edit
visualizations, or answer general questions about the data
(`fanar/agent/copilot/`).

## Dashboard copilot

A tool-calling loop over the open dashboard (`fanar/agent/dashboard_copilot/`),
distinct from the LangGraph workflows above. The model is given read and write
tools — `read_dashboard`, `add_chart_widget_from_question`, `add_textbox_widget`,
`update_widget_layout`, `set_dashboard_name`, and others — and iterates until the
request is satisfied, capped at 22 tool iterations per request.

## Retrieval context

Three sources of context are assembled per request:

- **Business contexts and golden queries** (`fanar/agent/business_context.py`,
  `fanar/agent/golden_queries.py`) — pgvector similarity search scoped to the
  org and data source, top `FANAR_CONTEXT_RAG_LIMIT` (default 5). Falls back to
  returning everything for the data source when `FANAR_CONTEXT_RAG_ENABLED` is off
  or embeddings are missing.
- **Saved query semantic index** (`fanar/agent/query_semantic_index/`) — lets chat
  reuse an existing query instead of writing new SQL.
- **Schema graph** (`fanar/agent/query_generation/schema_graph/`) — FalkorDB-backed
  graph RAG over the database schema. Embeds tables and columns when the schema is
  refreshed; retrieval combines vector search with foreign-key traversal to narrow
  the schema passed to SQL generation.

## Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `OPENAI_API_KEY` | *(required)* | OpenAI API access, and the default gate for embeddings |
| `LANGFUSE_ENABLED` / `LANGFUSE_PUBLIC_KEY` / `LANGFUSE_SECRET_KEY` | — | **Required** — agents fetch prompts from Langfuse; see [Langfuse](./langfuse) |
| `FANAR_LLM_REQUEST_TIMEOUT` | `55` | LLM request timeout (seconds) |
| `FANAR_CONTEXT_RAG_ENABLED` | auto | Relevance-match business context and golden queries |
| `FANAR_CONTEXT_RAG_LIMIT` | `5` | How many context entries to retrieve |
| `FANAR_QUERY_SEMANTIC_INDEX_ENABLED` | auto | Enable saved-query semantic index |
| `FANAR_QUERY_SEMANTIC_EMBEDDING_MODEL` | `text-embedding-3-small` | Embedding model |
| `FANAR_FALKORDB_HOST` | `localhost` | FalkorDB host |
| `FANAR_FALKORDB_PORT` | `6379` | FalkorDB port |
| `FANAR_FALKORDB_GRAPH_NAME` | `fanar_schema` | FalkorDB graph name |

Per-node model selection is documented in [Langfuse](./langfuse#choosing-models-per-node).

`auto` means the setting defaults to enabled when `OPENAI_API_KEY` is present.
