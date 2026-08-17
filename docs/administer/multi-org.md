---
title: Multi-org deployment
sidebar_position: 3
---

When running with `FANAR_MULTI_ORG=true`, you manage multiple organizations on a single Fanar instance. A **super admin** (`super_admin` permission) can create organizations and manage users via the Flask-Admin UI at `/admin`.

## 1. Create the root organization and user

```bash
uv run manage.py users create_root admin@example.com "Admin User" --org default --password "changeme"
```

Omit `--password` to be prompted interactively. Add `--google` if you use Google authentication.

## 2. Log in and open Admin

Log in at `/<org-slug>/login` (e.g. `/default/login`) and browse to `/admin`. Only users with the `super_admin` permission can access full organization management in Flask-Admin.

## 3. Add organizations

In Admin UI: **Organizations → Create**. Each organization gets `admin` and `default` groups automatically, but no users yet.

## 4. Seed users per organization

```bash
docker compose exec server uv run manage.py users create user@example.com "Org Admin" --org my-org-slug --admin
```

The `--admin` flag assigns the user to both `admin` and `default` groups for that org.

After the first user exists, they can invite teammates from the UI. Repeat steps 3–4 for each additional organization.
