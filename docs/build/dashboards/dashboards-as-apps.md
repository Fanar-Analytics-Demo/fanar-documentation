---
title: "App Dashboards"
---

# App dashboards

An app dashboard is a dashboard written as code instead of arranged on a grid. You
write a small React tree in JSX from a fixed set of Fanar components, and Fanar
renders it: charts come from your saved visualizations, the layout is yours, and a
stylesheet tab restyles everything.

Choose an app when the grid is in the way: a sidebar of inputs, tabs, a KPI strip
above a table, cards of different sizes, or prose between charts.

:::info
App dashboards run code written by editors in every viewer's browser, so they are
only available when the instance allows custom JavaScript
(`FANAR_FEATURE_ALLOW_CUSTOM_JS_VISUALIZATIONS`, see
[Environment variables](../../reference/env-vars)). When it is off, the option is
hidden from the **Create** dialog and existing apps show a notice instead of
rendering.
:::

## Creating an app

Click **Create → Dashboard**, name it, and pick **App written in JSX (Beta)**. The
dashboard opens with three tabs:

- **Preview** renders the app. Charts behave like grid widgets: the title links to
  the query, and the footer has refresh, expand and download controls.
- **Code** holds the JSX source. **Save** publishes it, **Discard** returns to the
  saved version. A source that fails to compile or render shows the error above
  the preview, with the offending line.
- **Styles** holds CSS applied to the preview.

The name is edited in place in the page header. Publishing, sharing, forking and
[version history](../version-history) work as for any dashboard; a version
captures the source and styles, so a bad edit is recoverable.

## Writing the source

The source is one root element, usually `App`, or a module with a default export.
React's `useState`, `useEffect`, `useMemo`, `useCallback` and `useRef` are
available; nothing else from the page is.

```jsx
<App title="Revenue">
  <Grid columns={2}>
    <Card title="Monthly revenue"><Chart visualization={412} /></Card>
    <Card title="By region"><Chart visualization={415} /></Card>
  </Grid>
  <Section title="Notes">
    <Markdown>{"Revenue is **net of refunds**. Updated hourly."}</Markdown>
  </Section>
</App>
```

The module form lets you keep state and logic:

```jsx
export default function Revenue() {
  const [compact, setCompact] = useState(false);
  return (
    <App title="Revenue">
      <button onClick={() => setCompact(!compact)}>{compact ? "Expand" : "Compact"}</button>
      <Grid columns={compact ? 3 : 2}>
        <Chart visualization={412} />
        <Chart visualization={415} />
        <Chart visualization={418} />
      </Grid>
    </App>
  );
}
```

### Components

Every component accepts `className`, so the Styles tab can target it.

| Component | Props | Renders |
|---|---|---|
| `App` | `title` | The root. Class `app-root`; the title gets `app-title`. |
| `Grid` | `columns` (default 2), `gap` (px, default 16) | A grid of equal columns. Class `app-grid`. |
| `Section` | `title`, `description` | A titled block. Classes `app-section`, `app-section-title`. |
| `Card` | `title`, `span` (columns to span, default 1) | A bordered card. Classes `app-card`, `app-card-title`, `app-card-body`. |
| `Tabs`, `Tab` | `Tab` takes `tab` (the label) and `key` | Tabbed panels: `<Tabs><Tab tab="Sales" key="sales">…</Tab></Tabs>`. |
| `Markdown` | children: a string | Markdown text. Class `app-markdown`. |
| `Chart` | `visualization` (id), `height` (px, default 300) | A saved visualization, see below. Class `app-widget`. |

### Charts

`<Chart visualization={412} />` shows visualization 412: the number after `#` in
the URL of a query page with that visualization selected. You can show any
visualization you are allowed to view, from any query; it does not have to be
added to the dashboard first.

A viewer without access to the query sees a placeholder instead of the chart, the
same as a restricted widget on a grid dashboard. An id that does not exist shows a
warning.

Inline [query filters](../querying/query-filters) (`column::filter`) appear inside
the chart, as on a grid dashboard.

:::note
**Planned.** The rest of this page, parameters, filters and the `Controls`
component, describes the planned API for app dashboards. It is not in the product
yet.
:::

## Parameters

[Query parameters](../querying/query-parameters) substitute a value into the SQL
before it runs. On a grid dashboard you share one across widgets through
parameter mapping. In an app you declare the input once in the source, and it
drives every chart whose query has a parameter of that name.

```jsx
<App title="Sales">
  <Controls sticky>
    <Parameter name="period" title="Period" default="d_last_30_days" />
    <Parameter name="region" />
  </Controls>
  <Grid columns={2}>
    <Chart visualization={412} /> {/* its query uses {{ period }} and {{ region }} */}
    <Chart visualization={415} /> {/* uses {{ region }} only */}
  </Grid>
</App>
```

### Where the definition comes from

A parameter's type, dropdown values, source query, multi-select and quoting are
defined on the query, and the server checks every value against that definition.
`Parameter` does not redefine them. It takes the definition from the first chart
in the source whose query has a parameter with that name: a text parameter shows a
text box, a dropdown list shows its values, a query-based dropdown shows the names
from its query, a date range shows the calendar with the quick ranges. Nothing has
to be repeated in the app.

| Prop | Meaning |
|---|---|
| `name` | The parameter keyword, as it appears between `{{ }}` in the query. Required. |
| `title` | Label shown above the input. Defaults to the query's parameter title. |
| `default` | Value used when the URL has none. Date ranges accept the quick-range names with a `d_` prefix, for example `d_last_7_days`. |
| `options` | An array of allowed values. Turns a text parameter into a dropdown list for this app. |
| `query` | Id of a query whose results fill the dropdown, as a query-based dropdown list. |
| `type` | Only for a parameter no query uses (see below). Otherwise the type comes from the query. |
| `as` | `select` (default) or `buttons`, for list-type parameters. |
| `className` | Added to the input's wrapper. |

`options` and `query` only narrow what a viewer can pick; the value still has to
satisfy each bound query. Use them to constrain a free-text parameter. A
parameter's type and multi-select setting are changed on the query, not in the
app.

### How charts bind

Binding is by name: a chart whose query has `{{ region }}` follows the app
parameter named `region`. Two other cases use the `values` prop on `Chart`:

```jsx
const [region] = useParameter("region");
<Chart visualization={418} values={{ sales_region: region }} /> {/* the query calls it sales_region */}
<Chart visualization={421} values={{ region: "EU" }} />        {/* fixed value, no input shown */}
```

A query parameter with neither a matching app parameter nor an entry in `values`
shows its own input inside the chart, like a widget-level parameter on a grid
dashboard.

### Applying values

Changing an input does not run anything. An **Apply Changes** button appears with
a count of pending changes; click it, or press Ctrl+Enter (Cmd+Enter on Mac).
Only the charts bound to a changed parameter re-run. Each one runs its own query
with that query's definition, and two charts on the same query run it once.

Applied values are written to the URL as `p_<name>`, for example
`?p_region=EU&p_period=d_last_30_days`, so a link opens the app in the same
state. `hide_filter=<name>` hides an input, as on grid dashboards.

### When queries define a parameter differently

Matching is by name. If two queries both have `{{ region }}` but one lists EU and
US while the other also lists APAC, the input is built from the first chart in the
source, and choosing APAC fails on the chart whose query rejects it. That chart
shows the query error. Fix the definition on the query so the two agree, or bind
one of them through `values`.

### Parameters no query uses

A parameter can exist only for the app, for example to switch between two charts.
Give it a `type` and, for lists, `options`. It is kept in the URL and batched with
the Apply button like the others.

```jsx
const [view] = useParameter("view");
<Parameter name="view" type="enum" options={["Chart", "Table"]} default="Chart" as="buttons" />
{view === "Table" ? <Chart visualization={413} /> : <Chart visualization={412} />}
```

### Custom inputs

`useParameter(name)` returns the applied value and a setter, so any element can
drive a parameter: a native `select`, a row of buttons, or a card that sets a
value when clicked. A value set this way applies immediately, without the Apply
button.

```jsx
export default function Sales() {
  const [region, setRegion] = useParameter("region");
  return (
    <App title="Sales">
      {["EU", "US", "APAC"].map((r) => (
        <button key={r} className={r === region ? "chip active" : "chip"} onClick={() => setRegion(r)}>
          {r}
        </button>
      ))}
      <Chart visualization={412} />
    </App>
  );
}
```

## Filters

[Query filters](../querying/query-filters) narrow the rows a chart shows after the
query has run; they never run SQL. A query exposes a filter by aliasing a column
`country::filter` or `country::multi-filter`. On a grid dashboard the **Use
Dashboard Level Filters** setting links those inputs across widgets. In an app,
`Filter` does that per column:

```jsx
<Controls>
  <Filter column="country" />
</Controls>
<Chart visualization={412} />                 {/* has country::multi-filter */}
<Chart visualization={415} />                 {/* has country::filter */}
<Chart visualization={418} filters={false} /> {/* other filter columns; hide its inline inputs */}
```

- The values offered are the union of the values in every chart that has the
  column. Single or multiple selection follows the column alias in the query.
- Charts without the column are unaffected. Columns you do not lift into a
  `Filter` keep their inline input inside the chart; `filters={false}` on a
  `Chart` hides those.
- The selection is written to the URL under the column name, `?country=DE`, as on
  grid dashboards.

`Filter` takes `column` (required), `title` and `className`.

## Layout and styling

Inputs are ordinary elements, so they go where the design wants them: a bar at
the top, a sidebar column of a `Grid`, inside the `Card` next to the one chart
they drive, or inside a `Tab`. Their order on the page is their order in the
source.

`Controls` is a horizontal, wrapping row for inputs. With `sticky` it stays at the
top while the page scrolls. The Apply button is shown once, for the whole app,
wherever the inputs are.

```jsx
<Grid columns={4}>
  <Section title="Filters" className="sidebar">
    <Parameter name="period" />
    <Parameter name="region" />
    <Filter column="country" />
  </Section>
  <Card span={3}><Chart visualization={412} height={420} /></Card>
</Grid>
```

Styling is CSS in the **Styles** tab. Besides the component classes above, inputs
use `app-controls`, `app-parameter`, `app-parameter-label`, `app-parameter-input`,
`app-filter` and `app-apply`.

```css
.app-controls { gap: 24px; }
.app-parameter-label { display: none; }
.app-parameter-input { width: 220px; }
.sidebar .app-parameter { margin-bottom: 16px; }
```

## Sharing

A published app and its public link work like any dashboard. Parameter and filter
values travel in the URL, so a shared link can open the app already filtered.
Queries with a Text parameter cannot be shown on a public link; see the
[parameter types safe for embedding](../querying/query-parameters#faq).

## Limits

- **No dependent dropdowns.** A query-based dropdown lists its query's latest
  result; it cannot be narrowed by another parameter.
- **Text parameters need full access** to the data source, and keep a query off
  public links.
- **Filters work in the browser**, so they suit results with hundreds of distinct
  values, not hundreds of thousands.
