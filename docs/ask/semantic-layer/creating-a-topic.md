---
title: "Creating a Topic"
---

:::caution Beta
The semantic layer is in beta — the AI assistant does not query it automatically
yet. You author and query topics directly.
:::

Authoring a topic requires admin access.

1. Open **Semantic Layer** from the sidebar.
2. Click **New topic**, give it a name (the `.yml` extension is added for you),
   and pick the **data source** the topic is built on.
3. Define your cubes in YAML, then **Save**.

You never write `data_source:` in the YAML — your dropdown selection is applied
to every cube automatically.

## Example

```yaml
cubes:
  - name: orders
    sql_table: public.orders

    dimensions:
      - name: id
        sql: id
        type: number
        primary_key: true
      - name: status
        sql: status
        type: string
      - name: created_at
        sql: created_at
        type: time

    measures:
      - name: count
        type: count
      - name: total_amount
        sql: amount
        type: sum
```

## Supported data sources

A topic can only be built on a data source the semantic layer supports:
**PostgreSQL, MySQL, SQL Server, BigQuery, Athena, and Databricks**. Other source
types (APIs, files, NoSQL) cannot back a topic.

Joins are only possible between cubes built on the **same** data source — the
semantic layer cannot join across two different sources in one query.
