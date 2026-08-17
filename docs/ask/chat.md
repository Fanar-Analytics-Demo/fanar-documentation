---
title: Chat
sidebar_position: 2
---

# Asking questions in chat

Open the chat panel and type a question the way you'd ask a colleague:

> How many orders did we ship last month, broken down by region?

Fanar works out what you're asking for, finds the right data source, writes the
SQL, runs it, and answers in prose alongside the result.

## What Fanar does with your question

Behind the scenes, chat classifies your message into one of three intents:

- **Answer a question about the data** — the common case. Fanar searches your
  saved queries for something that already answers it; if nothing fits, it picks a
  data source, generates SQL, validates it, runs it, and writes the answer.
- **Find an existing query** — when you're looking for work someone has already
  done rather than a fresh answer.
- **Create a dashboard** — when you ask for several things at once ("build me a
  dashboard of signups, activation and churn by month"). Fanar checks each widget
  is answerable, runs the SQL pipeline per widget, and saves the dashboard.

If generated SQL fails to validate or errors on execution, Fanar rewrites and
retries — up to three attempts — before telling you it couldn't answer.

## Seeing the SQL

Every answer that ran a query shows the SQL it used. Expand it to check the logic,
and open it as a full query if you want to keep it, schedule it, or build a
visualization on top.

This matters: treat Fanar's answers the way you'd treat a colleague's first draft.
The SQL is there so you can verify it.

## Getting better answers

If answers are close but not right, the fix is almost always context rather than
rephrasing. See [Teaching Fanar your business](./teaching-fanar).

Two things help immediately:

- **Save good queries.** Fanar searches your saved queries before writing new SQL,
  so a well-named saved query is reused rather than reinvented.
- **Be specific about the grain.** "Revenue by month" is ambiguous — booked or
  recognised? Say which, or define it once as
  [business context](./teaching-fanar/business-context).

## Limits

- Fanar answers from the data sources you already have access to. It cannot see
  data your Fanar permissions don't allow.
- It writes read-only SQL for analysis. It is not a tool for modifying your
  database.
- Very large result sets are limited by the same constraints as any other Fanar
  query — see [Troubleshooting](../reference/troubleshooting).
