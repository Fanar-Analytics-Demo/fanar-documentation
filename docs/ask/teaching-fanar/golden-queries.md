---
title: Golden queries
sidebar_position: 2
---

# Golden queries

A golden query is a piece of SQL you've blessed as the correct way to answer a
particular question. Fanar uses them as worked examples: when your question
resembles one, that SQL is put in front of the model before it writes its own.

This is usually the highest-leverage context you can add, because it teaches join
paths, filters and conventions by demonstration rather than description.

Only admins can create or edit golden queries.

## Creating one

1. Open **Settings → Golden Queries**.
2. Click **New**.
3. Fill in:
   - **Name** — the question this answers, phrased as a person would ask it
   - **Description** — when this query applies, and when it doesn't
   - **SQL** — the blessed query
   - **Data sources** — which sources it applies to
4. Save.

## Writing them well

**Name it as a question.** Matching is done against your users' phrasing, so
"Monthly active users by plan" retrieves better than `mau_by_plan_v2`.

**Use the description to draw boundaries.**

```
Name:        Monthly recurring revenue by month
Description: MRR at the end of each calendar month, for active paid
             subscriptions only. Excludes trials, internal accounts, and
             one-off purchases. Use this for any MRR/ARR question.
             Do NOT use for bookings — see the bookings golden query.
SQL:         SELECT date_trunc('month', s.period_end) AS month,
                    SUM(s.mrr_cents) / 100.0 AS mrr
             FROM subscriptions s
             JOIN accounts a ON a.id = s.account_id
             WHERE s.status = 'active'
               AND s.plan_type = 'paid'
               AND a.is_internal = false
             GROUP BY 1
             ORDER BY 1
```

**Cover the awkward joins.** If getting from customers to revenue requires going
through three tables in a specific order, one golden query showing that path is
worth several paragraphs of prose.

**Keep them runnable.** A golden query that no longer executes teaches the model a
pattern that will fail. When you change your schema, revisit them.

## Which ones get used

Golden queries are matched by relevance to the question, scoped to the data source
in play — by default the top 5. Adding more doesn't degrade existing answers,
because irrelevant ones simply aren't retrieved.

Where the instance has no embedding key configured, all golden queries for the
data source are included instead.

## Golden queries vs saved queries

They're different things:

- **Saved queries** are your team's working library. Fanar already searches them
  when answering, and may reuse one directly.
- **Golden queries** are curated teaching examples. They are never returned to the
  user as-is — they shape the SQL Fanar writes.

A good workflow is to promote proven saved queries into golden queries once
they've settled.
