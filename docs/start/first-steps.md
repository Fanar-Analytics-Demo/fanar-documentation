---
title: "Getting Started"
sidebar_position: 1
---

## 1. Add A Data Source

The first thing you'll want to do is connect a data source ([see supported data sources](../connect)). You can open the Data Sources management page by clicking the Settings icon:

![](/img/docs/settings_icon.png)

:::info
If your database sits inside a private network and you don't want to open it to
inbound connections, use [Fanar Bridge](../connect/bridge) instead of exposing it
directly.
:::


:::info
We recommend using a user with **read-only permissions**, if possible.
:::


![](/img/docs/gitbook/add-data-source.gif)

## 2. Write A Query

Once you've connected a data source, it's time to write a query: **click on "Create" in the navigation bar, and then choose "Query"**. See the [“Writing Queries” page](../build/querying/writing-queries) for detailed instructions on how to write queries.

![](/img/docs/gifs/queries/add_new_query.gif)

## 3. Add Visualizations

By default, your query results (data) will appear in a simple table. Visualizations are much better to help you digest complex information, so let's visualize your data. Fanar supports [multiple types of
visualizations](../build/visualizations/visualization-types) so you should find one that suits your needs.

Click the “New Visualization” button just above the results to select the perfect visualization for your needs. You can view more detailed instructions [here](../build/visualizations/visualizations-how-to).

![](/img/docs/gifs/visualization/new_viz.gif)

## 4. Create A Dashboard

You can combine visualizations and text into thematic & powerful dashboards. Add a new dashboard by clicking on "Create" in the navigation bar, and then choose "Dashboard". Dashboards are visible for your team members or they can be shared publicly. For more details, [click here](../build/dashboards/dashboard-editing).

![](/img/docs/gifs/dashboards/dashboards.gif)

## 5. Invite Colleagues

Fanar is better together.

Admins, to start enjoying the collaborative nature of Fanar you'll want to invite your team!

Users can view team member's queries for inspiration (or debugging 😉), fork them to create similar queries of their own, view & create dashboards, and share insights with others via Email, Slack, Microsoft Teams, Discord and more.

Users can only be invited by admins - to invite a new user go to `Settings`>`Users` and hit `New User`:

![](/img/docs/gitbook/add-user.png)

Then, fill in their name and email. They'll get an invite via email and be required to set up a Fanar account.

To add a user to an existing group, go to `Setting`>`Groups`, select the group and add users by typing their name:

![](/img/docs/gitbook/view-only-groups.png)
