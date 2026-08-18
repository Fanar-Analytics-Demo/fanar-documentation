---
title: Query Copilot
sidebar_position: 3
---

# Query Copilot

Copilot works on **one saved query at a time**. Open a query, describe the change
you want, and Copilot edits the SQL or the visualizations rather than starting
over.

## What you can ask for

Copilot routes your request to one of four actions:

| Ask | What happens |
|---|---|
| "Add a column for average order value" | Edits the SQL and re-runs it |
| "Chart this as a line by month" | Adds a new visualization to the query |
| "Make the bars horizontal and drop the legend" | Edits an existing visualization |
| "Why is this number lower than last month?" | Answers from the current results without changing anything |

You don't have to say which one — Copilot works it out from the phrasing.

## Reviewing changes

When Copilot edits SQL it shows a diff against what was there before. Read it
before saving. Copilot is good at mechanical edits (adding a column, changing a
grouping, fixing a join) and less reliable when a request is genuinely ambiguous.

If an edit isn't what you wanted, say so in the same conversation — Copilot keeps
the thread's context and will adjust, rather than needing the whole request again.
See [Conversations](./conversations).

## Copilot vs chat

Use [chat](./chat) to answer a new question from scratch. Use Copilot when you
already have a query that's nearly right.

The practical difference: chat may write entirely new SQL against any data source
you can see; Copilot stays on the query you have open and its data source.
