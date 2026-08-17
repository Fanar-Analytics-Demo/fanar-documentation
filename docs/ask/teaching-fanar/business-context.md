---
title: Business context
sidebar_position: 1
---

# Business context

A business context is a **named block of Markdown** describing how your company
talks about its data — definitions, rules, conventions, caveats. It is attached to
one or more data sources, and Fanar pulls in the relevant blocks when answering a
question against those sources.

Only admins can create or edit business contexts.

## Creating one

1. Open **Settings → Business Context**.
2. Click **New**, give it a name, and pick the **data sources** it applies to.
3. Write the context in Markdown and save.

The name matters — it's shown to the model alongside the content, so
"Revenue definitions" beats "Notes 3".

## What to write

Write the things a new analyst would get wrong in their first month.

```markdown
## Revenue

"Revenue" always means **recognised** revenue, net of tax and refunds.
Use `orders.net_amount`, never `orders.gross_amount`.

Bookings (signed contract value) is a different number. If someone asks for
bookings, use `contracts.tcv` — do not substitute revenue.

## Fiscal calendar

Our fiscal year starts on 1 February. FY26 Q1 is Feb–Apr 2025.
Calendar quarters are almost never what people mean internally.

## Exclusions

Exclude rows where `orders.is_internal = true` from all customer-facing metrics.
These are staff test orders.
```

Guidelines that work:

- **Be prescriptive, not descriptive.** "Use `net_amount`" is more useful than
  "there are two amount columns".
- **Say what *not* to do.** Naming the common mistake prevents it.
- **One topic per context block.** Blocks are retrieved by relevance, so a block
  that mixes revenue rules with churn rules gets pulled in for both and wastes room
  on the half that doesn't apply.
- **Keep it current.** Stale context is worse than none — it will be followed
  confidently.

## How blocks are chosen

When you ask a question, Fanar embeds it and retrieves the closest-matching
context blocks for that data source — by default the top 5. Everything else is
left out.

This is why several focused blocks beat one long document: a 4,000-word "company
handbook" block will either be retrieved in full for every question or not at all.

If the instance has no embedding key configured, Fanar includes **all** context for
the data source instead. That still works, but the more you write, the more diluted
each answer's context becomes.

## Related

- [Golden queries](./golden-queries) — teach by example instead of by prose
- [Table descriptions](./table-descriptions) — annotate specific tables and columns
- [Semantic layer](../semantic-layer) — enforce definitions rather than suggest them
