---
title: Fanar Bridge
sidebar_position: 2
---

# Fanar Bridge

Fanar Bridge connects a database inside your private network to Fanar Cloud
**without opening any inbound firewall ports** and without putting your database
on the internet.

A small agent runs next to your database. It makes only **outbound** HTTPS
connections to Fanar Cloud, picks up query jobs, runs them locally, and posts
results back. Database credentials never leave your environment — Fanar Cloud
never holds them and never connects inbound.

```
┌──────────── your private network ─────────────┐
│                                                │
│   Postgres ◀── SQL ── fanar-bridge agent ──────┼──▶ Fanar Cloud
│                       (outbound HTTPS only)    │
└────────────────────────────────────────────────┘
```

Because results come back in the same shape as a native Postgres query, everything
downstream works unchanged: dashboards, alerts, schema browsing, and the AI agent.

:::info
Bridge currently supports **PostgreSQL**.
:::

## Requirements

- Python 3.10+ or Docker on a host inside your network
- Outbound HTTPS (443) from that host to your Fanar Cloud URL
- A database user for the agent — **read-only is strongly recommended**

## 1. Install the agent

```bash
pip install .
```

Or build the container:

```bash
docker build -t fanar-bridge .
```

## 2. Configure it

Copy the example config and fill it in:

```bash
cp config.example.yaml config.yaml
```

| Field | Description |
|---|---|
| `cloud_url` | Base URL of your Fanar Cloud instance |
| `bridge_id` | Identifier for this bridge — must match the cloud and the data source |
| `token` | Shared secret for this `bridge_id` |
| `connections` | The local databases this agent may query, keyed by name |

For containers, these can be set as environment variables instead:
`FANAR_BRIDGE_CLOUD_URL`, `FANAR_BRIDGE_ID`, `FANAR_BRIDGE_TOKEN`,
`FANAR_BRIDGE_VERIFY_TLS`.

## 3. Register the bridge on the Fanar side

Set the matching token on your Fanar instance:

```bash
FANAR_BRIDGE_TOKENS="acme-prod:<the-same-token-as-the-agent>"
```

Comma-separate multiple `bridge_id:token` pairs.

## 4. Test and run

Check the agent can reach your databases:

```bash
fanar-bridge test
```

Then start it:

```bash
fanar-bridge run -v
```

The agent heartbeats every few seconds so Fanar Cloud knows it is online.

## 5. Create the data source

In Fanar, add a data source of type **PostgreSQL (via Fanar Bridge)**:

- **Bridge ID** — the same `bridge_id` as the agent (e.g. `acme-prod`)
- **Connection name** — a connection key from the agent's config (e.g. `default`)
- **Database Name** — a display label only

No host or credentials are entered in Fanar. Click **Test Connection** — Fanar
confirms the agent is connected and runs `SELECT 1` through it.

## Security notes

- Use a **dedicated read-only** database user for the agent.
- Keep the token secret. Rotate it by updating both the agent config and the
  instance's `FANAR_BRIDGE_TOKENS`.
- Always use `https://` for `cloud_url` in production and leave
  `verify_tls: true`.
- Set `max_rows` on a connection to cap how much data any single query can pull.
