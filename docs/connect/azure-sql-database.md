---
title: "Microsoft Azure SQL Database & Synapse"
---

:::warning
Fanar ships two SQL Server connectors. Use the **Microsoft SQL Server (ODBC)** type — it has better Azure compatibility. The non-ODBC connector is deprecated and will be removed in a future release.
:::


![](/img/docs/gitbook/mssql-ds-choice.png)

When entering the username you need to make sure it's of the form: `user@server-name`. Where `server-name` is your server address without the `.database-windows.net` suffix.

Check out [Microsoft's documentation](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/create-data-warehouse-portal#create-a-server-level-firewall-rule) for instructions to whitelist your Fanar IP address when connecting to Synapse.
