---
title: "How To Use Google Spreadsheets IMPORTDATA Function"
---

Using the CSV URL of your query results you can easily import query results
directly into **Google Spreadsheets** , using the `IMPORTDATA` function. The
CSV URL along with the API Key, can be found when clicking on the "Show API
Key" button in the query menu:

<img src="/img/docs/gitbook/query-api-key.png" width="60%" />

In the dialog which opens, you will find a CSV URL similar to:
`https://cloud.fanar.tech/acme/api/queries/123/results.csv?api_key=secret`, which
you input to the `IMPORTDATA` function:

`=IMPORTDATA("https://cloud.fanar.tech/acme/api/queries/123/results.csv?api_key=secret")`
