# Phase 2 worklist — assets

Every page that needs a screenshot or video change, in the order worth doing it.
Companion to [DOCS-PLAN.md](./DOCS-PLAN.md) Part 4.

Measured from the repo on 18 August 2026, after Phases 0–1.

---

## The shape of the problem

| | Count | Automatable? |
|---|---|---|
| Fanar-UI screenshots inherited from Redash | 84 | Yes — Playwright pipeline |
| Chart output examples | 13 | Yes — same pipeline, demo data |
| Animated GIFs | 6 | No — become video or stills |
| Third-party console screenshots | 16 | No — manual, vendor consoles |
| **Referenced images total** | **119** | |
| Unreferenced images sitting in the repo | 94 | Delete, no work |
| **Pages with no images at all** | **58 of 93** | |

Two separate jobs hide in that table, and the second is the one that's easy to
miss:

1. **Replace** 84 screenshots of another product.
2. **Add** screenshots to pages that have none — including all 12 pages of the
   *Ask Fanar* section, which is our entire differentiator and is currently pure
   text.

Do job 2 first. A new page with no screenshot is a bigger gap than an old page
with a dated one.

---

## Group 0 — Free win, do it first (30 minutes)

**Delete 94 unreferenced images.** Nothing links to them; they're leftovers from
the bulk import. Removing them means you're not sorting through them later.

| Directory | Unreferenced |
|---|---|
| `static/img/docs/gitbook/` | 65 |
| `static/img/docs/` (root) | 17 |
| `static/img/docs/gifs/` | 7 |
| `static/img/docs/alerts/` | 5 |

```bash
# from repo root — lists them; drop the echo to delete
comm -13 <(grep -rhoE '/img/docs/[^)"]+' docs --include="*.md" | sort -u) \
         <(find static/img/docs -type f | sed 's|^static||' | sort) \
  | sed 's|^|static|' | xargs echo rm
```

Re-run `npm run build` after — `onBrokenMarkdownImages: 'throw'` will catch a
mistake immediately.

---

## Group 1 — Pages with no screenshots that need them most

These are Fanar-only features. There is no inherited screenshot to replace,
because the pages didn't exist until Phase 1. **This is where new screenshots buy
the most.**

| Page | What to capture | Video? |
|---|---|---|
| `ask/chat.md` | The chat panel mid-answer: question, prose answer, chart, expanded SQL block | **Tier 1 #1** |
| `ask/index.md` | One hero shot of chat answering a question | — |
| `ask/copilot.md` | Copilot open on a saved query showing the SQL diff | **Tier 1 #3** |
| `ask/dashboard-copilot.md` | Copilot panel beside a dashboard, mid-edit | **Tier 1 #2** |
| `ask/conversations.md` | A thread with 3+ follow-ups; the history list | **Tier 1 #4** |
| `ask/teaching-fanar/business-context.md` | Settings → Business Context: list view + editor with real Markdown | **Tier 1 #5** |
| `ask/teaching-fanar/golden-queries.md` | Golden query editor with name/description/SQL filled in | **Tier 1 #5** |
| `ask/teaching-fanar/table-descriptions.md` | Descriptions screen after sync, with a coded column annotated | **Tier 1 #5** |
| `ask/semantic-layer/creating-a-topic.md` | Topic editor with cube YAML and the data-source dropdown | **Tier 1 #6** |
| `ask/semantic-layer/querying-the-semantic-layer.md` | Querying the Semantic Layer data source | — |
| `build/version-history.md` | Version list for a query, and the restore confirmation | Tier 2 #12 |
| `connect/bridge.md` | Data source form for **PostgreSQL (via Fanar Bridge)**; Test Connection success | Tier 2 #8 |
| `start/concepts.md` | Optional — one annotated diagram of how the six concepts relate | — |
| `administer/multi-org.md` | Flask-Admin organizations screen | Tier 2 #10 |

**~16 new screenshots.** Every one is of a screen no competitor doc has, which is
the opposite of the current situation.

---

## Group 2 — Highest-traffic inherited pages

Replace these first among the 84. Ordered by (likely traffic × images to fix).

| Page | Fanar-UI shots | GIFs | Notes |
|---|---|---|---|
| `start/first-steps.md` | 3 | 4 | **Do first.** The front-door page; more GIF than screenshot. `add-user.png` shows a real Redash employee's name and face |
| `build/querying/writing-queries.md` | 4 | 2 | Includes `schema-browser.png`, and two "experimental-*" shots of features that may not exist in Fanar — verify before re-shooting |
| `build/querying/query-parameters.md` | 8 | 0 | Includes `parameter-modal-v9.png` — filename still carries a Redash version |
| `build/dashboards/dashboard-editing.md` | 9 | 1 | Largest single batch |
| `build/visualizations/chart-visualizations.md` | 11 | 0 | Largest batch overall |
| `build/alerts/setting-up-an-alert.md` | 5 | 0 | Includes `alert_settings_V9.png` |
| `build/alerts/creating-new-alert-destination.md` | 5 | 0 | Destination list was corrected in Phase 0; screenshots still show the old set |
| `administer/users/inviting-users.md` | 3 | 0 | `view-only-groups.png` also used by `first-steps` |
| `administer/users/creating-editing-groups.md` | 3 | 0 | |
| `build/querying/scheduling-a-query.md` | 3 | 0 | |
| `build/visualizations/visualizations-how-to.md` | 3 | 0 | |
| `connect/json-api.md` | 3 | 0 | |

Subtotal: **60 screenshots across 12 pages** — about 70% of the replacement job
in a dozen pages.

---

## Group 3 — Long tail, two shots or fewer

Batch these once the pipeline works. One page, one or two captures.

`build/visualizations/table-visualizations.md` · `pivot-table-visualizations.md` ·
`funnel-chart-how-to.md` · `build/querying/query-results-data-source.md` ·
`query-filters.md` · `favorites-tagging.md` · `download-query-results.md` ·
`query-snippets.md` · `build/dashboards/sharing-dashboards.md` ·
`administer/users/permissions-groups.md` ·
`develop/how-to-use-google-spreadsheets-importdata-function.md` ·
`connect/mongodb.md` · `jira.md` · `bigquery.md` · `azure-sql-database.md` ·
`amazon-cloudwatch.md` · `amazon-redshift.md` · `amazon-athena.md` ·
`develop/creating-a-zap.md`

Subtotal: **~24 screenshots across 19 pages.**

---

## Group 4 — The six GIFs

GIFs can't be captioned, paused or subtitled, and these are low-resolution
recordings of a 2018 UI. Each one either becomes a video or a still.

| GIF | Used by | Recommendation |
|---|---|---|
| `gitbook/add-data-source.gif` | `start/first-steps` | → Tier 1 video #7 |
| `gifs/queries/add_new_query.gif` | `start/first-steps`, `writing-queries` | → Tier 1 video #7 |
| `gifs/visualization/new_viz.gif` | `start/first-steps` | → Tier 1 video #7 |
| `gifs/dashboards/dashboards.gif` | `start/first-steps`, `dashboard-editing` | → Tier 1 video #7 |
| `gifs/queries/fork_query.gif` | `writing-queries` | → still, forking is one click |
| `gitbook/turn-on-url-sharing.gif` | `sharing-dashboards` | → still |

Four of the six collapse into the single "First 10 minutes" video. That video is
worth recording partly because it retires four stale GIFs.

---

## Group 5 — Third-party consoles (manual, not automatable)

These show vendor UIs, not Fanar, so the Playwright pipeline can't touch them.
They're stale for a different reason: the consoles themselves were redesigned.

| Page | Shots | Console | State |
|---|---|---|---|
| `administer/google-developer-account-setup.md` | 7 | Google Cloud | Pre-2019 UI; OAuth consent flow has changed substantially |
| `connect/axibase-time-series-database.md` | 4 | Axibase | Verify the product still ships this way |
| `connect/amazon-athena.md` | 2 | AWS IAM | 2016 console. **Also shows "Redash" in the AWS account menu** |
| `connect/databricks.md` | 2 | Databricks | Check against current workspace UI |
| `develop/creating-a-zap.md` | 1 | Zapier | |

**Lowest priority.** They're wrong but they're not *ours*, and a reader following
an obviously-dated AWS screenshot usually adapts. Fix opportunistically — except
the Athena one, where the "Redash" account name should go whenever that page is
next touched.

---

## Group 6 — Chart examples

`build/visualizations/visualization-types.md` has 13 example charts
(`visualization_examples/*.png`). They show chart output rather than app chrome,
so they age more gracefully — but they're rendered from Redash's demo data with
its styling, and dates in them start "Feb 4 2018".

Regenerate from the seeded demo database once the pipeline exists. One page, 13
images, entirely mechanical.

---

## Suggested order

1. **Group 0** — delete 94 unreferenced images (30 min)
2. **Build the pipeline** — Playwright job in `fanar-tests`, seeded demo org, pinned
   viewport (see [DOCS-PLAN.md](./DOCS-PLAN.md) Part 4)
3. **Group 1** — 16 new screenshots for the AI pages *(highest value)*
4. **Tier 1 videos 1–6**, which cover the same screens you just learned to capture
5. **Group 2** — 60 replacements across 12 pages
6. **Tier 1 video 7** (First 10 minutes) + **Group 4** GIF retirement
7. **Group 6** — 13 chart examples
8. **Group 3** — long tail
9. **Group 5** — third-party consoles, opportunistically

Groups 0–4 remove every inherited screenshot from the pages people actually land
on. That is the point at which the site stops looking like someone else's product.

---

## Definition of done for Phase 2

- No image on the site shows Redash branding, Redash chrome, or a Redash
  employee.
- Every page in `ask/` has at least one screenshot.
- `static/img/docs/` contains only referenced files.
- Screenshots regenerate with one command; a stale screenshot is a CI concern,
  not a chore.
- Tier 1 videos 1–7 published and embedded, with the written steps still on the
  page beside them.
