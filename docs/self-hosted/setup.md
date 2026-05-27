---
title: Setting up a Fanar Instance
sidebar_position: 1
---

Fanar is a self-hosted analytics platform. This guide covers running Fanar with Docker Compose for production-like deployments and local development.

## Prerequisites

- **Docker** and **Docker Compose** (v2)
- At least **4 GB RAM** for small deployments; more for heavier query workloads and background workers
- **PostgreSQL** and **Redis** (included in the default Compose stack)

## Quick start with Docker Compose

1. Clone the [Fanar repository](https://github.com/lionjashari/fanar):

   ```bash
   git clone https://github.com/lionjashari/fanar.git
   cd fanar
   ```

2. Create a `.env` file at the repository root with required secrets:

   ```bash
   FLASK_APP=fanar.wsgi:app
   FANAR_COOKIE_SECRET=<generate-a-random-string>
   FANAR_SECRET_KEY=<generate-a-random-string>
   OPENAI_API_KEY=<your-openai-key>   # required for AI agent features
   DB_PORT=5432
   DB_NAME=fanar
   DB_USER=fanar
   DB_PASS=fanar
   DB_HOST=postgres
   ```

   See [Environment variables](./admin-guide/env-vars-settings) for the full list.

3. Build and start services:

   ```bash
   make build
   make create_database
   make up
   ```

4. Open the web UI (default org slug is often `default`), complete the setup wizard, and create your admin account.

## Health check

After the stack is running:

```bash
curl http://localhost:5000/ping
```

Expected response:

```
PONG.
```

## Mail configuration

Configure outbound email so Fanar can send invites, password resets, and alert notifications. Set these environment variables (in `.env` or your deployment platform):

| Variable | Description |
|----------|-------------|
| `FANAR_MAIL_SERVER` | SMTP host (default: `localhost`) |
| `FANAR_MAIL_PORT` | SMTP port (default: `25`) |
| `FANAR_MAIL_USE_TLS` | `true` / `false` |
| `FANAR_MAIL_USERNAME` | SMTP username |
| `FANAR_MAIL_PASSWORD` | SMTP password |
| `FANAR_MAIL_DEFAULT_SENDER` | From address |
| `FANAR_HOST` | Public URL of your instance, e.g. `https://fanar.example.com` |

Restart services after changing environment variables. Test mail with:

```bash
docker compose run --rm server uv run manage.py send_test_mail
```

## Google OAuth (optional)

1. Create OAuth credentials in Google Cloud Console (see [Google developer setup](./admin-guide/google-developer-account-setup)).
2. Set `FANAR_GOOGLE_CLIENT_ID` and `FANAR_GOOGLE_CLIENT_SECRET` in your environment.
3. Restart the web server and configure allowed domains in **Settings** if needed.

## HTTPS

For production, terminate TLS at your reverse proxy or load balancer and enforce HTTPS. See [HTTPS / SSL setup](./admin-guide/https-ssl-setup).

Also set strong values for `FANAR_SECRET_KEY` and `FANAR_COOKIE_SECRET` — see [Secrets](./admin-guide/secrets).

## Multi-organization mode

To host multiple organizations on one deployment, enable `FANAR_MULTI_ORG=true` and follow the [Multi-org deployment](../fanar/multi-org) guide to create a root (super-admin) user and additional orgs.

## Upgrading

Follow [How to upgrade](./admin-guide/how-to-upgrade) for version upgrades. Always back up your PostgreSQL database before upgrading.

## Local development (without Docker)

For day-to-day development, use **uv** for Python dependencies and **Node 18** + **Yarn** for the frontend. See the [Developer guide](./dev-guide) and [Fanar development setup](../fanar/development).
