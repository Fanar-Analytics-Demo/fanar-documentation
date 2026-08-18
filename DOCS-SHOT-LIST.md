# Shot list — screenshots, GIFs and videos to create

Organised by **capture session**, not by page. You set up the app state once and
take every shot that needs it, rather than jumping between screens.

134 captures total: 112 replacements, 22 new, 8 videos. 6 GIFs retired.

Companion to [DOCS-PHASE-2-WORKLIST.md](./DOCS-PHASE-2-WORKLIST.md).

---

## Before you start

### Naming convention

Current filenames are a mess — a legacy `gitbook/` directory that means nothing,
mixed case (`Snippet.png`), a typo that shipped (`shcedule_none.png`), and version
numbers baked in (`parameter-modal-v9.png`, `alert_settings_V9.png`).

Adopt this, and have the Playwright pipeline write to it:

```
static/img/docs/<section>/<subject>-<detail>.png

static/img/docs/ask/chat-answer-with-chart.png
static/img/docs/build/query-editor-schema-browser.png
static/img/docs/administer/groups-view-only.png
```

Renaming as you go is mechanical — one `sed` per page — and it means the pipeline
target and the markdown reference never drift.

### Fixtures to set up once

Everything below assumes one seeded demo org, so the shots look like one product:

- **Dataset:** the e-commerce schema in `fanar-tests`' `demo_database` — orders,
  customers, products. Understandable to anyone, exercises joins and time series.
- **Org name:** something neutral (`Acme Analytics`), never a real customer.
- **User:** a generated persona with a generated avatar. The current
  `add-user.png` shows a real Redash employee's name and face — don't repeat that
  mistake with a real colleague.
- **Viewport:** pin it. 1440×900 for full-page, 1280×720 for video.
- **Theme:** pick light or dark and never mix within a page.
- **Saved objects:** 8–10 named queries, 3 dashboards, 2 alerts, 3 users, 2 groups.
  Half the shots below need something already existing to point at.

### Fix these while you're in the files

- `build/visualizations/chart-visualizations.md:7` renders the literal text
  `` `video: /img/docs/gifs/visualization/chart-examples.mp4` `` — a Redash
  website shortcode the import didn't convert. The mp4 exists but never plays.
  Replace with a real embed.
- `static/img/docs/gifs/visualization/new vis.stg` — stray file, unreferenced,
  delete.
- Two shots on `writing-queries` and `dashboard-editing` are named
  `experimental-owners-support` / `experimental-permissions-button`. **Verify
  those features exist in Fanar before re-shooting** — they may have been
  Redash-experimental and never shipped here.

---

# Part 1 — New captures (Fanar-only features)

Nothing exists for these. Highest value in the whole list.

## Session A — Chat

Set up: demo data loaded, chat panel open, one question already answered.

| # | Target file | Page | What's on screen |
|---|---|---|---|
| A1 | `ask/chat-answer-with-chart.png` | `ask/chat`, `ask/index` | A question, the prose answer, and the generated chart together in one frame |
| A2 | `ask/chat-sql-expanded.png` | `ask/chat` | Same answer with the SQL block expanded — the "you can verify it" shot |
| A3 | `ask/chat-dashboard-created.png` | `ask/chat` | Result of "build me a dashboard of…" — several widgets laid out |
| A4 | `ask/chat-reused-saved-query.png` | `ask/chat` | An answer that reused an existing saved query rather than writing new SQL |

## Session B — Conversations

Set up: a thread with at least four turns, plus one older thread in history.

| # | Target file | Page | What's on screen |
|---|---|---|---|
| B1 | `ask/conversation-followups.png` | `ask/conversations` | A thread showing "…by region" → "now by category" → "make it a bar chart" |
| B2 | `ask/conversation-history-list.png` | `ask/conversations` | The history list, threads titled by first question, with dates |

## Session C — Query Copilot

Set up: a saved query open with a visualization attached.

| # | Target file | Page | What's on screen |
|---|---|---|---|
| C1 | `ask/copilot-sql-diff.png` | `ask/copilot` | Copilot's SQL diff before saving — additions highlighted |
| C2 | `ask/copilot-added-visualization.png` | `ask/copilot` | Copilot having added a chart to the open query |

## Session D — Dashboard Copilot

Set up: a populated dashboard you have edit rights on.

| # | Target file | Page | What's on screen |
|---|---|---|---|
| D1 | `ask/dashboard-copilot-panel.png` | `ask/dashboard-copilot` | Copilot panel beside the live dashboard, mid-conversation |
| D2 | `ask/dashboard-copilot-widget-added.png` | `ask/dashboard-copilot` | A widget that was just added from a plain-language request |

## Session E — Teaching Fanar your business

Set up: Settings, with two or three realistic entries already saved.

| # | Target file | Page | What's on screen |
|---|---|---|---|
| E1 | `ask/business-context-list.png` | `teaching-fanar/business-context` | List view — several named contexts with their data sources |
| E2 | `ask/business-context-editor.png` | `teaching-fanar/business-context` | Editor with real Markdown (revenue definition, fiscal calendar) |
| E3 | `ask/golden-query-editor.png` | `teaching-fanar/golden-queries` | Name, description and SQL filled in, data sources selected |
| E4 | `ask/table-descriptions-synced.png` | `teaching-fanar/table-descriptions` | Post-sync tree of tables and columns |
| E5 | `ask/table-description-coded-column.png` | `teaching-fanar/table-descriptions` | A status column annotated with what its integer codes mean |
| E6 | `ask/teaching-before-after.png` | `teaching-fanar/index` | **Composite.** Same question answered wrong without context, right with it. The most persuasive image on the site — worth building by hand |

## Session F — Semantic layer

| # | Target file | Page | What's on screen |
|---|---|---|---|
| F1 | `ask/semantic-topic-editor.png` | `semantic-layer/creating-a-topic` | Topic editor: cube YAML, data source dropdown, Save |
| F2 | `ask/semantic-layer-querying.png` | `semantic-layer/querying-the-semantic-layer` | Querying the **Semantic Layer** data source, results shown |

## Session G — Version history

| # | Target file | Page | What's on screen |
|---|---|---|---|
| G1 | `build/version-history-list.png` | `build/version-history` | Version list for a query with several entries and timestamps |
| G2 | `build/version-history-restore.png` | `build/version-history` | The restore action / confirmation |

## Session H — Bridge and multi-org

Needs a Bridge agent running against a local Postgres.

| # | Target file | Page | What's on screen |
|---|---|---|---|
| H1 | `connect/bridge-data-source-form.png` | `connect/bridge` | **PostgreSQL (via Fanar Bridge)** form — Bridge ID, connection name, no credentials |
| H2 | `connect/bridge-test-connection.png` | `connect/bridge` | Successful Test Connection confirming the agent is online |
| H3 | `administer/multi-org-admin.png` | `administer/multi-org` | Flask-Admin organizations list |

**New captures: 22.**

---

# Part 2 — Replacements (currently showing Redash)

## Session I — Data sources · 11 shots

Replaces: `settings_icon.png`, `athena_data_source.png`, `cloudwatch-schema.png`,
`jira-setup.png`, `mongo-setup.png`, `mssql-ds-choice.png`,
`json_single_object.png`, `json_list_of_objects.png`, `json_field_select.png`,
`databricks-setup-screen.png`, `databricks-schema-browser.png`

One session: open Settings → Data Sources and walk each connector's setup form.
The three `json_*` shots are query-editor results against the JSON data source,
so do them after Session J.

## Session J — Query editor · 5 shots + 1 GIF

Replaces: `schema-browser.png`, `archive_query.png`, `Snippet.png`,
`experimental-owners-support.png`, `experimental-permissions-button.png`,
`fork_query.gif` → still

Pages: `build/querying/writing-queries`, `query-snippets`,
`build/dashboards/dashboard-editing` (permissions shots are shared)

## Session K — Query parameters · 8 shots

Replaces: `parameter-example.png`, `parameter-modal-v9.png`,
`query-parameter-widgets.png`, `date-range-picker.png`,
`dropdown-list-name-value.png`, `multi-select.png`, `multi-select-dropdown.png`,
`dashboard_parameter_mapping.png`

Page: `build/querying/query-parameters`. Build one query with every parameter
type, then capture each widget in turn. Drop `-v9` from the new filename.

## Session L — Scheduling, filters, results, downloads · 13 shots

Replaces: `schedule-modal.png`, `refresh-settings.png`, `failure-report.png`,
`filter_example_action_create.png`, `multifilter_example.png`,
`query-results-setup.png`, `query-results-example.png`, `download-dataset.png`,
`show-api-key.png`, `query-api-key.png`, `user_api_key.png`,
`favorites-example.png`, `tagging-example.png`

Pages: `scheduling-a-query`, `query-filters`, `query-results-data-source`,
`download-query-results`, `favorites-tagging`, `develop/creating-a-zap`,
`develop/how-to-use-google-spreadsheets-importdata-function`

:::warning
The three API-key shots must show a **revoked or fake** key. Check the pixels
before committing.
:::

## Session M — Visualizations · 19 shots + 1 video

Replaces, chart mechanics (10): `multi-form-chart.png`,
`animation-table-data.png`, `group-by-ex.png`, `grouped-vs-pivot.png`,
`stacked_vs_not_stacked.png`, `area_grouped_stacked_errors.png`,
`error_double_entries.png`, `error_double_entries__solved.png`,
`charted_redash_logo__broken.png`, `charted_redash_logo__working.png`

> The last two literally render the **Redash logo** as chart data. Replace the
> plotted shape with the Fanar mark or neutral data.

Replaces, other viz (9): `new-viz.png`, `download_viz.png`, `embed-viz.png`,
`table-viz-options.png`, `dashboard-with-images.png`, `pivot-table-query.png`,
`pivot-table-configuration-examples.png`, `funnel-data.png`,
`funnel-example.png`

Plus: `gifs/visualization/chart-examples.mp4` — re-record, and fix the broken
embed noted above.

## Session N — Dashboards · 9 shots + 2 GIFs

Replaces: `create-dashboard.png`, `add-widgets-to-dashboard.png`,
`add-widgets-modal.png`, `edit-dashboard.png`, `dashboard-filter.png`,
`dashboard-refresh.png`, `public-dashboard-refresh.png`,
`full_screen_button.png`, `dashboard-with-images.png`,
`dashboards.gif` → video, `turn-on-url-sharing.gif` → still

Pages: `build/dashboards/dashboard-editing`, `sharing-dashboards`

## Session O — Alerts · 10 shots

Replaces: `alerts.png`, `create-alert.png`, `alert_settings_V9.png`,
`new-alert-query-search.png`, `alert_destination.png`,
`create-new-alert-destination.png`, `pick-a-destination.png`,
`slack-destination.png`, `pagerduty.png`, `alerts/pagerduty-key-location.png`

Pages: `build/alerts/setting-up-an-alert`, `creating-new-alert-destination`

:::info
`pick-a-destination.png` must show the **current** destination list. Phase 0
corrected the prose — HipChat is gone; Teams, Discord, Datadog, Webex and Asana
are in — but the screenshot still shows the old set.
:::

## Session P — Users, groups, permissions · 8 shots

Replaces: `add-user.png`, `invite-user.png`, `invite-user-2.png`,
`view-only-groups.png`, `view_only_group.png`, `group_settings.png`,
`disable-user.png`, `restricted-widget.png`

Pages: `start/first-steps`, `administer/users/*`

:::danger
`add-user.png` currently shows a real person's name and profile photo. Use a
generated persona.
:::

## Session Q — Chart examples · 13 shots

Replaces every file in `visualization_examples/`: `boxplot`, `chart`, `chart_2`,
`chart_3`, `cohort`, `counter`, `d3-cloud`, `funnel`, `map`, `pie_chart`,
`pivot-table`, `sankey`, `sunburst`

Page: `build/visualizations/visualization-types`. Fully mechanical — one query
per type against demo data. Current ones show dates starting "Feb 4 2018".

**Replacement captures: 112** — 96 Fanar-UI stills, 13 chart examples & third-party shots covered in sessions I and Q, 2 GIFs→stills, 1 video re-record.

---

# Part 3 — Videos

Full production rules in [DOCS-PLAN.md](./DOCS-PLAN.md) Part 3. Same demo org and
dataset as the screenshots.

| # | Video | Length | Embed on | Retires |
|---|---|---|---|---|
| 1 | Ask a question, get an answer | 90s | `ask/chat`, `intro` | — |
| 2 | Build a dashboard by asking | 120s | `ask/dashboard-copilot` | — |
| 3 | Copilot: fix and extend a query | 90s | `ask/copilot` | — |
| 4 | Follow-up questions | 60s | `ask/conversations` | — |
| 5 | Teach Fanar your business | 120s | `ask/teaching-fanar` | — |
| 6 | Semantic layer: author a topic | 120s | `semantic-layer/creating-a-topic` | — |
| 7 | First 10 minutes | 120s | `start/first-steps` | 4 GIFs |

Record 7 last — it should gesture at everything else.

Tier 2, after the above: Bridge setup, parameters, multi-org, alerts end-to-end,
version history.

---

# Totals

| | Count |
|---|---|
| New screenshots (Fanar-only features) | 22 |
| Replacement screenshots | 96 |
| GIFs → stills | 2 |
| Videos (incl. re-recorded chart animation) | 8 |
| GIFs retired by video #7 | 4 |
| Unreferenced images to delete first | 94 |

Sessions A–H (22 shots) plus videos 1–6 cover every Fanar-only feature. That's the
subset worth doing even if nothing else gets done — it's the part no competitor's
documentation can match, and it's currently pure text.
