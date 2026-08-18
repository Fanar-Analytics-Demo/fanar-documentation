---
title: Table and column descriptions
sidebar_position: 3
---

# Table and column descriptions

Where [business context](./business-context) describes your company and
[golden queries](./golden-queries) demonstrate patterns, table descriptions
annotate the schema itself: what this table holds, what that column's codes mean,
which tables to leave alone.

Only admins can edit descriptions.

## Getting started

1. Open **Settings → Data Source Descriptions**.
2. Pick a data source and click **Sync**. Fanar reads the source's schema in the
   background and creates an entry for every table and column it finds.
3. Fill in the Markdown description for the tables and columns that need one.

Re-run **Sync** after a schema change to pick up new tables and columns. Syncing
adds structure; it does not overwrite descriptions you've written.

## What's worth describing

You do not need to describe everything. Aim at the things that mislead:

**Encoded columns.** The single highest-value annotation.

```markdown
Order status. Integer code, not a label:
1 = pending, 2 = shipped, 3 = refunded, 4 = cancelled.
"Completed" in business terms means status = 2.
```

**Tables whose name lies.**

```markdown
Despite the name, this table holds *subscription events*, not subscriptions.
One row per state change. For the current state of a subscription, use
`subscriptions_current`.
```

**Deprecated or trap tables.**

```markdown
DEPRECATED — frozen since 2024-11. Kept for historical reporting only.
Do not use for any question about current data; use `orders_v2`.
```

**Columns with non-obvious units or timezones.**

```markdown
Amount in **cents**, not dollars. Always divide by 100 before presenting.
```

**Ambiguous joins.**

```markdown
`account_id` here refers to the *billing* account, not the login account.
Join to `billing_accounts`, not `accounts`.
```

## What's not worth describing

Skip anything the name already tells you. A description reading "The customer's
email address" on `customers.email` adds nothing and costs prompt space that a
useful annotation could have used.

## Descriptions vs business context

Use descriptions for facts about **this table or column**. Use business context
for rules that span the schema — definitions, exclusions, calendars. If you find
yourself writing the same caveat on eight columns, it belongs in business context
instead.
