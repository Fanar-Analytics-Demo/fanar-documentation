---
title: Conversations
sidebar_position: 5
---

# Conversations and follow-ups

Chat and Copilot remember what you've already said in a thread, so you can refine
an answer instead of restating the whole question.

> **You:** How many orders did we ship last month by region?
>
> **You:** Now break that down by product category.
>
> **You:** Make that a bar chart.

The second and third messages don't mention orders, last month, or regions —
Fanar carries that forward.

## What gets remembered

Within a thread, Fanar keeps:

- The questions you asked and the answers it gave
- The **SQL** it wrote, verbatim
- Compact descriptions of the charts, visualizations and dashboards it produced
- Definitions and filters you established along the way ("only enterprise
  accounts", "exclude internal orders")

That last point is the one people underuse. If you tell Fanar "for the rest of
this, exclude test accounts", it holds that for the thread.

## Reopening old conversations

Threads are saved permanently and listed in your chat history, titled by the
first question you asked. Reopening one — days or weeks later — restores its
context and continues where you left off.

Long threads are condensed as they grow: older exchanges are folded into a running
summary that preserves what you were trying to work out, the definitions you
established, and what was built. Recent turns stay verbatim.

## When to start a new thread

Start fresh when you change subject. Carried context is an advantage when you're
drilling into one question and a liability when you've moved on — a thread that
still "knows" you were looking at last quarter's EMEA revenue will quietly assume
it applies to your new question about headcount.

## Threads are per-user

Your conversations are yours. Reopening a thread requires access to it, and the
data in any answer is still subject to your normal Fanar data source permissions.

For how this works internally — the storage model, summarization, and context
budgets — see [Agent memory architecture](../develop/agent-memory-architecture).
