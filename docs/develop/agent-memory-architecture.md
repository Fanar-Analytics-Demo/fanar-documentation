---
title: Agent Memory
sidebar_position: 2.5
---

Conversation memory lets the chat and Copilot agents handle follow-up questions ("now break that down by region", "make that chart a bar chart") within a thread, including threads reopened from history days later.

## Architecture

**Postgres is the canonical store; Redis is a fast cache.**

| Store | What it holds | Lifetime |
|-------|---------------|----------|
| `conversation_threads` (Postgres) | The parent entity: one row per thread — `agent_type` (chat / copilot), owner, title (first user query), archive flags, and the running LLM summary. The history UI lists these | Permanent |
| `thread_messages` (Postgres) | One row per user-query → answer turn (FK to its thread), keyed by session UUID (idempotent): `artifacts` for memory, `response_payload` for transcript rendering | Permanent |
| Redis (`chat_conversation:*`) | Working copy of a thread: recent exchanges + summary | TTL, default 24h |
| LangGraph checkpointer (Postgres) | Graph execution state for pause/resume (human-in-the-loop) | Per session |

The LangGraph checkpointer and conversation memory are separate systems: the checkpointer resumes a *paused workflow run*; conversation memory carries context *across runs* in the same thread.

## Within a thread

Each completed turn is written once, at finalize: the thread row is upserted (created on the first turn, titled by it) and a canonical `thread_messages` row lands with it, then the Redis cache is updated. A message carries **artifacts** — verbatim SQL plus compact descriptors of charts, visualizations, and dashboards produced in that turn (never raw configs). Artifacts are derived exactly once, where the live objects are in hand; everything downstream reads them back as-is.

When a thread exceeds the compression threshold (20 messages), the oldest turns are folded into a **running LLM summary** (`ConversationSummarizer`, one call per ~10 turns). The summary preserves analytical goals, definitions/filters established in conversation, and what was built; the last few folded exchanges keep their artifact lines verbatim. Each successful fold is stored on the thread row (one summary per thread — an attribute, not a table), so Redis expiry never erases distilled context.

Summarization failures never lose data: the turn is already cached before the LLM call, the error is logged and emitted as a `memory_summarization_failed` session event, and folding retries on later exchanges with exponential backoff (60s doubling, capped at 1h). Summaries are an optimization for context quality and token efficiency — not a dependency for durability or correctness.

## Node-scoped context views

Workflow state carries structured context (`conversation_context`: summary + recent messages). Each node renders its own view via `render_conversation_context(ctx, focus)` under a token budget (oldest exchanges dropped first; the summary always survives):

| Focus | Emphasis | Consumers |
|-------|----------|-----------|
| `brief` | Gist only; artifacts one-lined | Intent detection |
| `sql` | SQL verbatim; other artifacts one-lined | Chat SQL generator, Copilot query editor |
| `visualizations` | Viz/dashboard descriptors expanded; SQL one-lined | Copilot add/edit visualization nodes |

## Resuming old conversations

Reopening a conversation from history keeps its thread id. On a Redis miss (TTL expired), memory is rehydrated from Postgres — the stored summary plus recent rows from `thread_messages` (an indexed thread lookup, authorized on the thread) — and the thread continues normally.

## Tuning

Memory behaviour is set by constructor defaults on `RedisConversationMemory`, not
by environment variables:

| Parameter | Default | Purpose |
|-----------|---------|---------|
| `ttl_hours` | `24` | Redis cache TTL per thread |
| `max_recent_messages` | `10` | Recent turns kept verbatim in the cache |
| `compression_threshold` | `20` | Messages before folding into the summary begins |
| `key_prefix` | `chat_conversation` | Redis key prefix |

Changing any of these means changing the call site. If they need to be operator-
tunable, promote them to settings first.

The summarizer uses the Langfuse prompt `conversation_summarizer` when available,
with built-in fallback prompts otherwise.

## Key code

- `fanar/agent/conversation_memory.py` — Redis cache, compression, artifact rendering, context views
- `fanar/agent/conversation_summarizer.py` — LLM summarizer agent
- `fanar/models/chat_history.py` — `ConversationThread`, `ThreadMessage` models and their history/rehydration queries (Redash-style fat models; methods never commit — callers own the transaction)
- `fanar/agent/session_handler.py` — `save_session_to_thread_safe`, the snapshot → model adapter at session finalize
