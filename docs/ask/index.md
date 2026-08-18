---
title: Ask Fanar
sidebar_position: 1
---

# Ask Fanar

Fanar answers questions about your data in plain language. You don't have to
write SQL to get an answer, and you don't have to abandon SQL when you want
control — the AI features sit alongside the query editor rather than replacing it.

There are three places to ask:

| Where | What it does |
|---|---|
| [Chat](./chat.md) | Ask a question, get an answer, a chart, or a whole dashboard |
| [Query Copilot](./copilot.md) | Edit a saved query and its visualizations by describing the change |
| [Dashboard Copilot](./dashboard-copilot.md) | Read and modify an open dashboard through conversation |

All three remember what you've already said, so you can refine an answer instead
of restating it — see [Conversations](./conversations.md).

## Accuracy depends on context

Out of the box, Fanar knows your table and column names. It does not know that
`status = 3` means "refunded", that your fiscal year starts in February, or that
the sales team only counts deals from the `enterprise` segment.

[Teaching Fanar your business](./teaching-fanar/index.md) covers the three ways to close
that gap — business context, golden queries, and table descriptions. Every minute
spent there shows up directly in answer quality.

For teams that want stronger guarantees than prompt context can give, the
[semantic layer](./semantic-layer/index.md) lets you define metrics and dimensions once, as
governed models.
