---
title: "How to Upgrade"
sidebar_position: 1
---

We recommend you upgrade your Fanar instance to the latest release so you can benefit from new features and bug fixes. This document assumes you used our Docker images to set up your instance of Fanar.

Upgrade one release at a time rather than jumping several releases in one step —
database migrations are written to run in sequence.

Before each upgrade, check the
[releases page](https://github.com/Fanar-Analytics-Demo/fanar/releases) for
breaking changes and any migration notes.

:::warning
Always back up the Fanar PostgreSQL database before upgrading. Migrations are not
reversible.
:::


## Upgrade Process

1. Make sure to backup your data. You need to backup Fanar's PostgreSQL database (the database Fanar stores metadata in, not the ones you might be querying) and your `.env` file (if it exists). The data in Redis is transient.
2. Change directory to `/opt/fanar`.
3. Update `/opt/fanar/compose.yaml` Fanar image reference to the one you want to upgrade to.
4. Stop Fanar services: `docker compose stop server scheduler scheduled_worker adhoc_worker` (you might need to list additional services if you updated your configuration)
5. Apply migration (if necessary): `docker compose run --rm server manage db upgrade`
6. Start services: `docker compose up -d`

_Done!_

:::info
**Getting an error when running `docker` or `docker compose` commands?**

Make sure the `ubuntu` user is part of the `docker` group:

1. Run `sudo usermod -aG docker $USER` to add current user to the docker group.
2. Logout and login again.
:::

