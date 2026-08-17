---
title: Version history
sidebar_position: 6
---

# Version history

Fanar keeps a history of queries and dashboards, so a bad edit is recoverable.

## What is captured

For a **query**, a version records the whole object, not just the SQL: name,
description, query text, data source, options, tags, schedule, and every
visualization attached to it (type, name, description, options).

For a **dashboard**, a version records the dashboard and its widgets, including
the query behind each widget.

That means restoring a query version brings back its charts too — you don't have to
rebuild visualizations after a rollback.

## Viewing and restoring

Open the query or dashboard and use its version history to see previous versions.
Restoring makes the selected version current.

Restoring requires the same permission as editing the object. Anyone who can view
it can see its history.

:::info
Restoring creates a new current state rather than deleting what came after it, so
restoring the wrong version is itself recoverable.
:::

## Working with Copilot

Version history pairs well with [Query Copilot](../ask/copilot) and
[Dashboard Copilot](../ask/dashboard-copilot). If an AI-assisted edit goes further
than you wanted, restore the previous version rather than trying to talk it back.

## API

Versions are available over the REST API:

```
GET  /api/queries/<query_id>/versions
POST /api/queries/<query_id>/versions/<version_id>/restore

GET  /api/dashboards/<dashboard_id>/versions
POST /api/dashboards/<dashboard_id>/versions/<version_id>/restore
```

See the [API guide](../develop/api) for authentication.
