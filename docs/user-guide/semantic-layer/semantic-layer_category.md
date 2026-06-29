---
title: "Semantic Layer"
slug: /user-guide/semantic-layer
sidebar_position: 6
sidebar_class_name: category-index
---

:::caution Beta
The semantic layer is in **beta**. You can author governed models (called
**topics**) and query them directly, but the AI assistant does **not yet query
the semantic layer automatically** — that connection is still being wired up.
Definitions and APIs may change.
:::

The semantic layer lets you define governed metrics and dimensions once — as
**topics** — so questions are answered from curated business definitions instead
of raw tables. It is powered by an embedded [Cube](https://cube.dev) instance,
and all access is derived from your Fanar groups and data-source permissions —
there is no separate permission system to manage.

## How it works

- A **topic** is one model file (authored in YAML) that targets a single data
  source you pick from a dropdown.
- Each topic defines **cubes** — a table with **measures** (aggregations such as
  count or sum) and **dimensions** (attributes such as status or date).
- The semantic layer shows up in Fanar as a data source named **Semantic
  Layer**; you query it like any other source.
- Every query is automatically scoped to your organization.

Continue with [Creating a Topic](./creating-a-topic.md) and
[Querying the Semantic Layer](./querying-the-semantic-layer.md).
