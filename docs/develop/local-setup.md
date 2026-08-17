---
title: Development setup
sidebar_position: 4
---

This guide summarizes local development for the [Fanar application](https://github.com/Fanar-Analytics-Demo/fanar). For self-hosted deployment, see [Setting up Fanar](../administer/self-hosted-setup).

## Prerequisites

- Docker and Docker Compose
- [uv](https://docs.astral.sh/uv/) for Python dependencies
- Node **18** and Yarn **1.22** for the frontend (use nvm)

## Environment variables

Create a `.env` file at the repository root:

```bash
FLASK_APP=fanar.wsgi:app
FANAR_COOKIE_SECRET=thisIsNotSecure
FANAR_SECRET_KEY=thisIsNotSecure
OPENAI_API_KEY=notAnActualKey
DB_PORT=5432
DB_NAME=fanar
DB_USER=fanar
DB_PASS=fanar
DB_HOST=postgres
```

See [Environment variables](../reference/env-vars) for the full list.

## Backend

VS Code devcontainers are recommended. Otherwise:

```bash
uv sync
uv venv && source .venv/bin/activate
uv run make format   # ruff format/lint
```

## Frontend

```bash
nvm use 18
npm install -g yarn@1.22.22
make build
make create_database
make up          # run stack
make start       # dev server with hot reload
```

## End-to-end tests

Cypress tests live under `client/cypress/`. See the application repository README for `yarn cypress` commands.

## Further reading

- [Developer guide](./index.md) — debugging, query runners, remote server setup
