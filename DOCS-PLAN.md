# Making the Fanar documentation stand on its own

A long-term plan for weaning the docs off Redash.

Written August 2026. Living document — update it as phases land.

> **Status:** Phase 0 and Phase 1 landed on the `docs/independence-phase-0-1`
> branch. Phase 2 (screenshots and videos) and Phase 3 (the long tail) are still
> open. See [Part 5](#part-5-sequencing) for what remains.

---

## Part 1: What the problem actually is

Right now the documentation is not "based on Redash." It **is** the Redash
knowledge base with the word "Redash" swapped for "Fanar."

`scripts/import-redash-kb.mjs` cloned `getredash/website`, ran a find-and-replace
(`Redash` → `Fanar`, `redash` → `fanar`, `REDASH_` → `FANAR_`), copied all 213
image files across, and wrote 89 markdown pages. Ten of those pages are ours
(the six under `docs/fanar/`, the three semantic layer pages, and `intro.md`).
The other 79 are Redash's.

That produces four distinct problems, and they need different fixes.

### 1a. The rename made the docs say things that aren't true

The find-and-replace didn't know the difference between a product name and a
URL, a company, or a historical fact. So the live site currently claims:

- **Fanar is shutting down.** `docs/faq/eol.md` says *"We are shutting down the
  hosted Fanar service at app.fanar.io, effective November 30, 2021... All
  customer data in app.fanar.io will be deleted within thirty days."* That's
  Databricks' notice about Hosted Redash, with our name pasted in. It is on
  docs.fanar.tech today.
- **43 broken or invented URLs.** `github.com/getredash/fanar`,
  `getredash/fanar-toolbelt`, `app.fanar.io`, `discuss.fanar.io`,
  `snap.fanar.io`, `fanar.io/help/...`. None of these exist.
- **A firewall instruction pointing at someone else's servers.** The getting
  started page tells customers to allow `52.71.84.157` through their database
  firewall. That is Redash's hosted IP. We have Fanar Cloud and
  Bridge/Connect — this is both wrong and a security-shaped instruction.
- **A Docker upgrade table listing ten releases we never shipped**, with image
  tags like `fanar/fanar:5.0.2.b5486` — Redash's release history, renamed. Fanar
  builds its image from source (`FANAR_IMAGE`); there is no such registry.
- **A version history we never had.** Roughly 25 places say things like "Fanar
  V8 added...", "Prior to Fanar V9...", "Starting from Fanar v3...". We have
  never shipped a V3 or a V8. There's a whole page titled *"Setting Up An Alert
  (V8 and Earlier)."*

This is the urgent tier. It isn't a restructuring problem — it's an accuracy
problem that makes the docs untrustworthy on first read.

### 1b. Every screenshot is a picture of Redash

All 213 images came from Redash's website repo. Spot-check
`static/img/docs/gitbook/add-user.png`: it shows the Redash logo, the Redash
v4.0.0 chrome (circa 2018), a "Plan & Subscription" tab we don't have, and a
photo and name of a real Redash employee.

A user following our getting started guide sees screenshots of a different
product, in a UI that hasn't looked like that in eight years, with a stranger's
face in it. No amount of text editing fixes this. The assets have to be
regenerated.

### 1c. The four embedded videos are Redash's marketing videos

Getting Started, Query Parameters, Google Sheets and CSV Files each embed a
YouTube video from Redash's channel, plus one linked demo on the visualization
types page. We're hosting someone else's product tour as our onboarding.

### 1d. The structure documents Redash's product, not ours

The sidebar is Redash's KB taxonomy — User Guide / Self-Hosted / Data Sources /
FAQ — with a category literally labelled **"Fanar"** bolted on the side, as
though the rest of the site is about something else.

Meanwhile these shipped features have **no documentation at all**:

| Feature | Where it lives in the app |
|---|---|
| Dashboard Copilot | `fanar/handlers/dashboard_copilot.py` |
| Business context (teaching the AI about your company) | `fanar/handlers/organization_business_context.py` |
| Golden queries (canonical examples the AI learns from) | `fanar/handlers/organization_golden_queries.py` |
| Table and column descriptions for AI context | `fanar/handlers/data_source_descriptions.py` |
| Query version history | `fanar/handlers/version_history.py` |
| Git-backed content | `fanar/git_content/`, `git_providers/`, `git_hosts/` |
| Chat history UI | `client/app/components/ai_chat/ChatHistory.jsx` |
| Fanar Bridge / Connect (private-network databases) | `fanar-bridge`, `fanar-connect` repos |
| Fanar Cloud as a product | `fanar-deployment` |

This is the real dependency. Not the word "Redash" appearing 62 times — it's
that we've published a thorough manual for the parts we inherited and nothing
for the parts that are the reason anyone would choose us.

### One thing that should NOT change

Redash is BSD-2-Clause. Retaining the copyright notice is a licence obligation,
not an embarrassment. Independence means *not being a reskin*, not hiding where
we came from. Keep the attribution — just move it somewhere honest (see 2f).

---

## Part 2: The target shape

### 2a. Reorganise around what people are trying to do

Replace the inherited taxonomy with seven top-level sections. The ordering is
deliberate: the AI section sits second, right after onboarding, because that's
our product.

```
1. Start here
   What Fanar is · Your first 10 minutes · Core concepts
   (query, visualization, dashboard, topic, data source)

2. Ask Fanar                                          ← our differentiator
   Chat: asking questions in plain language
   Copilot: editing a query with the AI
   Dashboard Copilot: building and changing dashboards
   Conversations and follow-ups (history + memory)
   Teaching Fanar your business
     · Business context
     · Golden queries
     · Table and column descriptions
   Semantic layer (topics, querying topics)
   When the AI gets it wrong — and how to fix it

3. Build
   Writing queries · Parameters · Snippets · Scheduling
   Visualizations · Dashboards · Alerts · Version history

4. Connect your data
   Supported sources · Per-source setup guides
   Private networks: Fanar Bridge / Connect

5. Administer
   Users, groups, permissions · Authentication
   Multi-org · Organization settings · Upgrades · Maintenance

6. Develop
   REST API · Local dev setup · Writing a query runner
   LangSmith and tracing · Git-backed content

7. Reference
   Environment variables · API endpoints · Data source matrix
   Troubleshooting · Attribution
```

Notes on the shape:

- **The "Fanar" category disappears.** Everything on the site is Fanar. The
  material currently in `docs/fanar/` gets distributed: `agent.md` and
  `agent-memory.md` become user-facing pages in section 2 plus an architecture
  page in section 6; `development.md` → section 6; `multi-org.md` → section 5;
  `langsmith.md` → section 6.
- **`agent-memory.md` is currently written for engineers** (Postgres tables,
  Redis TTLs, node-scoped context views). That's good content in the wrong
  place. Split it: a short user-facing "Fanar remembers your conversation" page
  in section 2, and keep the deep version under section 6.
- **Cloud vs self-hosted needs separating.** Right now "Self-Hosted" is a
  top-level section because that's how Redash's open-source docs were laid out.
  We sell a hosted product. Admin tasks that apply to both (users, groups,
  auth) should not be buried under a self-hosting heading. Use a tab or an
  admonition on pages that differ.

### 2b. Triage all 79 inherited pages

Every inherited page gets exactly one label. Do this as a spreadsheet before
writing a word — it's a two-hour job and it makes the rest of the work
schedulable.

- **Delete** — describes a product we don't have, or history we don't share.
  Known members already: `faq/eol.md`, `alerts/setting-up-an-alert-V8-and-earlier.md`,
  `admin-guide/how-to-upgrade-legacy.md`. Expect 8–12 total.
- **Rewrite** — the feature exists in Fanar but the page needs our voice, our
  screenshots, and our AI-first framing. Most of `user-guide/` lands here.
- **Verify and keep** — accurate, boring, low-traffic. Most per-data-source
  setup pages. Fix the URLs, re-shoot only the screenshots that show Fanar's own
  UI (the ones showing AWS or Google consoles are fine), and move on.
- **Merge** — near-duplicates. `data-sources/csv.md` and
  `data-sources/csv-files.md`; the two `favorites-tagging.md` copies under
  `querying/` and `dashboards/`.

### 2c. Kill the version conditionals

We ship one version. Sentences like "Fanar V8 added the ability to..." should
become plain statements of what the product does. Where behaviour genuinely
differs by release, that belongs in a changelog, not scattered through the
manual. Sweep all ~25 of them in one pass.

### 2d. Generate the reference material instead of maintaining it

`admin-guide/env-vars-settings.md` is a hand-maintained table that drifts from
`fanar/settings/` the moment anyone adds a variable. Same story for the API
endpoint list, which is honestly labelled "an incomplete list... as of V9."

Generate both from the source at build time. This is the single highest-leverage
structural change in the plan: it converts two pages that are permanently,
silently wrong into two pages that cannot be wrong.

### 2e. Retire the import script

`scripts/import-redash-kb.mjs` is the mechanism of the dependency. Once the
triage in 2b is done, delete it — or keep it in `scripts/archive/` with a
comment saying it must never be re-run. Re-running it would overwrite our
rewrites with Redash's originals.

**New rule, permanently:** we do not bulk-import documentation. If we want a
page from upstream Redash, someone reads it, decides it's right for Fanar, and
rewrites it.

### 2f. One honest attribution page

A single page under Reference: what Fanar is built on, what the licence is, what
we changed. Keep the footer line. Remove the attribution paragraph currently
sitting in the middle of `intro.md` — the front door should say what Fanar does,
not where the docs came from.

---

## Part 3: Videos

The four embedded Redash videos come down in the first week. What replaces them
is the question of what we actually want to show.

### Production rules — decide once, apply to every video

- **60–120 seconds each.** People do not watch four-minute embedded docs videos.
  One video, one task, cut hard.
- **One demo dataset across every video.** An e-commerce schema (orders,
  customers, products) works: everyone understands it and it demonstrates joins
  and time series. The seeded `demo_database` in the `fanar-tests` stack is the
  natural source. Same org, same user, same theme, same browser window size, so
  the videos feel like one product and not a folder of clips.
- **Voiceover, with subtitles.** Silent screencasts are cheap and age badly —
  the viewer can't tell *why* a step happened. Keep scripts short enough to
  re-record when the UI changes.
- **Host them where re-uploading is cheap.** Whether that's YouTube, Loom, or
  self-hosted MP4, the video will need re-recording every time the UI moves.
  Don't build a workflow that makes that painful.
- **Never embed a video as the only explanation.** The written steps stay on the
  page. Video supplements, it doesn't replace — for search, for accessibility,
  and for the person who can't play audio at work.

### Tier 1 — record these first (7 videos)

These carry the product. All seven are Fanar-only capability, which is the
entire point: no Redash video could ever substitute.

1. **Ask a question, get an answer** *(90s)* — plain-English question in chat →
   Fanar picks a data source, writes SQL, returns an answer and a chart. The
   single most important video on the site. Front page of Start here.
2. **Build a dashboard by asking for it** *(120s)* — a prompt to
   `create_dashboard`, watch widgets get built, then tweak one. This is the
   "wait, it does that?" moment.
3. **Copilot: fix and extend an existing query** *(90s)* — open a saved query,
   ask Copilot to add a column and change the chart type.
4. **Follow-up questions** *(60s)* — "now break that down by region", "make that
   a bar chart", then close the tab, come back tomorrow, and continue the same
   thread. Demonstrates conversation memory, which is invisible in a
   screenshot and therefore *needs* video.
5. **Teach Fanar your business** *(120s)* — business context, golden queries,
   and table descriptions, shown as a before/after on the same question. This is
   the highest-value video for buyers: it answers "how do I make the AI accurate
   on *my* data?" Currently documented nowhere at all.
6. **Semantic layer: author a topic** *(120s)* — write the cube YAML, save,
   query it. Pairs with the existing written pages, which are good but abstract.
7. **First 10 minutes** *(120s)* — connect a data source, run a query, chart it,
   pin it to a dashboard. This is the direct replacement for the embedded Redash
   getting-started video, and it should be recorded *last* in Tier 1, so it can
   gesture at everything else.

### Tier 2 — record after the restructure lands (5 videos)

8. **Connecting a private database with Bridge/Connect** *(120s)* — outbound-only
   agent, no inbound ports. Sales-relevant, security-relevant, undocumented.
9. **Parameters** *(90s)* — replaces the embedded Redash parameters video.
10. **Multi-org setup for admins** *(120s)* — the CLI + Flask-Admin flow that
    `multi-org.md` describes in text.
11. **Alerts end to end** *(90s)* — condition, destination, the alert firing.
12. **Query version history** *(60s)* — undocumented feature, trivially
    demonstrable, genuinely reassuring to see.

### Explicitly not doing

No video for each of the 18 data source setup pages. Those are click-through
forms; screenshots are better because people follow them at their own pace and
can copy field values. One generic "add a data source" video, referenced from
all of them, is sufficient.

---

## Part 4: Screenshots

213 Redash images have to become Fanar images. Doing that by hand once means
doing it by hand again after every UI change, which means it stops happening
after the second time.

**Automate it.** `fanar-tests` already runs the full production stack in Docker
with Playwright and a seeded demo database. Add a screenshot job to that
repo: a script that logs into the demo org, navigates to each documented screen,
and writes PNGs into this repo's `static/img/docs/`. Pin the viewport size and
the seed data so the images are reproducible.

Then screenshots regenerate on demand, and a stale screenshot becomes a CI
concern rather than a chore nobody owns.

Sequence it:

1. Wire up the screenshot script for the ~20 images on the highest-traffic
   pages (getting started, writing queries, dashboards, the AI pages).
2. Delete every unreferenced Redash image immediately — free win, less to sort
   through later.
3. Work down the triage list from 2b; regenerate as each page gets rewritten.
4. Leave third-party console screenshots (AWS IAM, Google OAuth, Databricks)
   alone. They're not Redash's UI and they're still accurate.

Also worth doing while you're in there: the animated GIFs in
`static/img/docs/gifs/` and `gitbook/` are Redash's, low-resolution, and can't
be captioned or paused. Where a GIF is doing real explanatory work, it should
become one of the Tier 1/2 videos. Where it's decorative, it should become a
still.

---

## Part 5: Sequencing

Rough effort in person-days. Assumes one person writing, with occasional help
recording.

### Phase 0 — Stop saying false things ✅ done

- ~~Delete `docs/faq/eol.md`. We are not shutting down.~~
- ~~Fix all 43 invented URLs.~~ Links that genuinely point upstream were restored
  to `getredash/redash` and `redash-toolbelt` rather than faked; links that are
  ours now point at `Fanar-Analytics-Demo/fanar` and `cloud.fanar.tech`.
- ~~Delete the `52.71.84.157` firewall instruction~~ — replaced with a pointer to
  [Fanar Bridge](docs/connect/bridge.md). Also removed the "Hosted Fanar SSH
  Tunnel API" page, which documented Redash's SaaS tunnel service.
- ~~Remove the four embedded Redash YouTube videos and the linked one.~~
- ~~Set `onBrokenLinks: 'throw'`.~~
- Also fixed along the way: the alert destinations list claimed HipChat (dead)
  and omitted Teams, Discord, Datadog, Webex and Asana, which Fanar actually
  ships; the "PNG image embeds" section documented a `snap.redash.io` service we
  don't have.

### Phase 1 — Restructure ✅ done

- ~~Delete the delete-list; merge the duplicates.~~ Removed: `faq/eol.md`, the
  V8-and-earlier alerts page, the legacy upgrade guide, the deprecated CSV
  tutorial, the duplicated favorites-tagging page, the SSH tunnel page.
- ~~New sidebar and directory layout, with redirects.~~ Seven sections; every old
  URL redirects, including whole moved subtrees.
- ~~Rewrite `intro.md` as a real front door.~~
- ~~Sweep the version conditionals.~~ Including a table of ten "Fanar" Docker
  release tags that were Redash's release history renamed.
- ~~Write the missing AI pages.~~ Ask Fanar (landing), Chat, Query Copilot,
  Dashboard Copilot, Conversations, Teaching Fanar your business (+ business
  context, golden queries, table descriptions), Core concepts, Version history,
  Fanar Bridge, Attribution.
- ~~Retire the import script~~ — moved to `scripts/archive/` with a README
  explaining why it must never run again, and dropped from `package.json`.

**Two of our own pages turned out to be wrong**, which the plan hadn't
anticipated — worth remembering that "pages we wrote" is not the same as "pages
that are accurate":

- `fanar/langsmith.md` documented a LangSmith integration. Fanar uses **Langfuse**,
  and there is no LangSmith code anywhere in the app. Rewritten as
  `develop/langfuse.md`, including the fact that Langfuse is **required** rather
  than optional — agents raise on construction without it.
- `fanar/agent.md` and `fanar/agent-memory.md` listed eleven environment variables
  between them that don't exist (`FANAR_SQL_GENERATION_MODEL_NAME`,
  `FANAR_CONVERSATION_MEMORY_TTL_HOURS`, and others), and pointed at an
  `agent/schema_graph/` directory that lives at
  `agent/query_generation/schema_graph/`. Both corrected against the source.

### Phase 2 — Assets (weeks 6–10, ~10 days)

- Build the Playwright screenshot pipeline (Part 4).
- Regenerate the top ~20 screenshots.
- Record and publish Tier 1 videos.
- Delete unreferenced Redash images.

### Phase 3 — The long tail (months 3–6, ~15 days, background work)

- Work through the rewrite list a few pages a week.
- Generate the env var and API reference from source (2d).
- Split Cloud vs self-hosted where the instructions actually differ.
- Document Bridge/Connect and git-backed content.
- Record Tier 2 videos.
- Retire the import script (2e).

### Phase 4 — Keep it from rotting (ongoing)

- A feature PR that changes the UI or adds a capability doesn't merge without a
  docs change. Enforce it in the PR template, not in someone's memory.
- One person owns the docs site. Not "the team."
- Quarterly: re-run the screenshot pipeline, watch the Tier 1 videos, fix what
  drifted.

---

## Part 6: How we'll know it worked

The honest test isn't "does the word Redash still appear." It's these:

1. **No page contains a factual claim inherited from Redash.** No fake URLs, no
   version history we didn't have, no other company's IP addresses.
2. **Every screenshot is of Fanar, generated from a script, regenerable in one
   command.**
3. **Every AI feature we ship has a page.** Today: nine features, five pages.
4. **A new user can get to "I asked a question and got a chart" without leaving
   the docs site or watching a video from another company.**
5. **The word "Redash" appears in exactly one place: the attribution page.** Not
   because we're hiding it, but because it belongs in the place where we credit
   our foundations, not in the middle of instructions.

---

## Appendix: the numbers, as of August 2026

| | |
|---|---|
| | Before | After phases 0–1 |
|---|---|---|
| Total doc pages | 89 | 93 |
| Written for Fanar | 10 | 23 |
| Untouched Redash imports | 79 | 70 |
| Image files, all imported from Redash | 213 | 213 |
| Broken/invented URLs from the rename | 43 | 0 |
| Embedded videos from Redash's channel | 4 (+1 linked) | 0 |
| Version conditionals referencing Redash releases | ~25 | 0 |
| Shipped Fanar features with zero documentation | 9 | 0 |
| Build passes with `onBrokenLinks: throw` | no | yes |

The image column is the one that hasn't moved, and it's the biggest remaining
job — see [Part 4](#part-4-screenshots).
