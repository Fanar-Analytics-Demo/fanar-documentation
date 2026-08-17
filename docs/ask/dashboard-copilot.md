---
title: Dashboard Copilot
sidebar_position: 4
---

# Dashboard Copilot

Dashboard Copilot works on the dashboard you have open. It can read the current
layout and — if you have edit access — change it.

## What it can do

Copilot reads the dashboard first, then acts. It can:

- **Add a chart** from a question in plain language ("add weekly active users for
  the last quarter") — it generates the query and the widget together
- **Add or edit a text box** for headings, notes, and commentary
- **Rewrite the dashboard name and description**
- **Move and resize widgets**
- **Turn dashboard filters on or off**
- **Set a description on a visualization** so its purpose is recorded

Every change is applied to the live dashboard, and Copilot can undo the operation
it just performed if you tell it to.

## Permissions

Reading a dashboard needs only view access. Any change needs edit access on that
dashboard. If you can't edit it, Copilot will answer questions about the dashboard
but decline to modify it.

## Working effectively with it

- **Ask for one change at a time.** Copilot works in small targeted edits, and a
  single clear instruction lands more reliably than a list of five.
- **Adding a chart needs a usable data source.** If the dashboard has no data
  source that can answer the question, the request will fail with an error rather
  than guess.
- **It explains before it writes.** You'll usually get a one-line plan before the
  edit is applied — that's the moment to correct course.

## Limits

Dashboard Copilot has a ceiling on how many steps it will take for a single
request. A very broad instruction ("rebuild this whole dashboard") may stop
part-way. Break large restructures into steps, or ask
[chat](./chat) to create a fresh dashboard instead.
