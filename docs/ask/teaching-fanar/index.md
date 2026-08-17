---
title: Teaching Fanar your business
sidebar_position: 6
---

# Teaching Fanar your business

Fanar reads your schema, so it knows you have an `orders` table with a `status`
column. It does not know that `status = 3` means refunded, that "revenue" excludes
tax at your company, or that nobody counts the `staging_` tables.

That gap is the difference between answers that are nearly right and answers you
can act on. There are three ways to close it, and they work together.

| Tool | Best for | Who can edit |
|---|---|---|
| [Business context](./business-context.md) | Definitions, rules, conventions — prose | Admins |
| [Golden queries](./golden-queries.md) | Canonical SQL for questions you're asked often | Admins |
| [Table descriptions](./table-descriptions.md) | What a specific table or column actually contains | Admins |

## How Fanar uses them

All three are attached to one or more **data sources**. When you ask a question,
Fanar picks the data source, then pulls in the context attached to it.

Business context and golden queries are matched by relevance: Fanar embeds what
you wrote and retrieves the entries closest to your question, rather than stuffing
everything into the prompt. That means you can write a lot of context without
diluting it — the entries that matter for a given question are the ones that get
used.

:::info
Relevance matching requires embeddings, which need an OpenAI API key configured on
the instance. If it's unavailable, Fanar falls back to including all context for
the data source. See [AI settings](../../reference/env-vars).
:::

## Where to start

If you're setting this up for the first time, do it in this order:

1. **Write down your five most-contested definitions** as business context. Active
   users, revenue, churn, "a customer", the fiscal calendar. These cause the most
   wrong answers per word written.
2. **Add golden queries for the questions you answer every week.** These teach
   Fanar your join patterns and filters by example, which is more reliable than
   describing them in prose.
3. **Describe the confusing tables and columns.** Encoded status columns,
   deprecated tables nobody should query, and anything whose name lies about its
   contents.

Then test it: ask the question that was previously answered wrongly, and check
whether the answer changed. This is worth doing deliberately — it's the fastest way
to find out whether your context is actually landing.
