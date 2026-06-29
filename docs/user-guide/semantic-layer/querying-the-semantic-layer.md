---
title: "Querying the Semantic Layer"
---

:::caution Beta
In beta you query the semantic layer manually. The AI assistant does not select
it automatically yet.
:::

Once a topic is saved, the semantic layer is available as a data source named
**Semantic Layer**. Create a query against it and reference your cubes' measures
and dimensions:

```sql
SELECT status, MEASURE(total_amount)
FROM orders
GROUP BY status
```

This is **Cube SQL**: you select named measures and dimensions, not physical
columns, and wrap measures in `MEASURE(...)`. The results are governed by your
topic definitions and scoped to your organization automatically.

The schema browser for the **Semantic Layer** source lists your cubes and their
measures and dimensions. If a topic doesn't appear, confirm it saved with a valid
data source and refresh the schema.
