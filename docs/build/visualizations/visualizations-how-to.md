---
title: "Visualizations How To"
sidebar_position: 1
---

## Create a New Visualization

Once your query has finished running for the first time, you can add a
visualization by clicking the “New Visualization” button above the results
table.

![](/img/docs/gitbook/new-viz.png)

## Edit A Visualization

You can modify the settings of an existing visualization from the query editor
screen. Click the visualization on the tab bar and you'll see an
`Edit Visualization` option beneath each visualization. Clicking it will open
the current settings for that visualization (type, X axis, Y axis, groupings
etc.). Hit "Save" to apply your changes or "Cancel" to leave no trace.

## Embedding Visualizations

It's easy to embed Fanar visualizations. Just click the elipsis button beneath
any visualization to show further options and select `Embed Elsewhere`.

<img src="/img/docs/gitbook/embed-viz.png" width="60%" />

This will pop up the `<iframe>` code you can drop into your HTML pages.

:::warning
Queries with text-type parameters do not support embeds.
:::


### Query String Variables for Embeds

You can append query string variables to your embed URLs:

- `?hide_parameters` hides any parameter selection widgets
- `?hide_header` hides the branded Fanar header and query title
- `?hide_link` hides the link back to Fanar
- `?hide_timestamp` hides the timestamp

### Downloading A Visualization as an Image File

For chart visualizations, you can also download a local image file. Just hover
your mouse near the top right area of the visualization and click the camera
icon that appears. A PNG will be downloaded to your device.

<img src="/img/docs/gitbook/download_viz.png" width="60%" />
