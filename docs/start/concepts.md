---
title: Core concepts
sidebar_position: 2
---

# Core concepts

Six things make up almost everything you'll do in Fanar.

## Data source

A connection to a database, warehouse, API, or file. Admins create data sources;
everyone else uses them. Permissions on a data source decide who can query it —
including what the AI can see when it answers your questions.

See [Connect your data](../connect).

## Query

A piece of SQL saved against one data source. Queries have a name, an owner, and
optionally a [schedule](../build/querying/scheduling-a-query) and
[parameters](../build/querying/query-parameters). Everyone on your team can see and
fork each other's queries.

A query is also the unit Fanar's AI works with: it searches your saved queries
before writing new SQL, and [Copilot](../ask/copilot) edits one at a time.

## Visualization

A chart, table, or other rendering of a query's results. One query can have many
visualizations — the same data as a line chart, a table, and a counter.

See [Visualizations](../build/visualizations).

## Dashboard

A collection of visualizations and text arranged on a grid. Dashboards can be
shared with your team or published publicly, and can be built or edited
conversationally with the [Dashboard Copilot](../ask/dashboard-copilot).

See [Dashboards](../build/dashboards).

## Alert

A condition on a query's results, checked after each run, that notifies a
destination when it's met. Useful for "tell me when this number crosses that line".

See [Alerts](../build/alerts).

## Topic

A governed model in the [semantic layer](../ask/semantic-layer): metrics and
dimensions defined once, in YAML, so questions are answered from curated business
definitions instead of raw tables.

Topics are for definitions you want *enforced*. For definitions you want the AI to
*follow*, see [Teaching Fanar your business](../ask/teaching-fanar).

---

## How they fit together

A **data source** is queried by a **query**, which is drawn as one or more
**visualizations**, which are arranged on a **dashboard**. An **alert** watches a
query. A **topic** sits in front of a data source and defines what its numbers
mean.

The AI features work across all of it: ask a question, get a query and a
visualization; ask for a dashboard, get one built.
