---
title: "Developer Guide"
sidebar_position: 3
sidebar_class_name: category-index
---

Fanar is a Python (3) and Javascript / Typescript app. To fully run Fanar you will also need
PostgreSQL (version 9.6 or newer) and Redis (version 3 or newer). While it's not
needed in production, for development you will need a recent version of Node.js
(latest LTS version is recommended).

On the backend we use Flask, RQ and SQLALchemy (along with many other packages) and on
the frontend we use ES6, React and Webpack for bundling.

:::info
Windows users: while it should be possible to run Fanar on a Windows machine, we don't know anyone who did this and lived to tell. We recommend using some sort of a virtual machine or Docker in such case.
:::


## Setup

- [Fanar development setup](../fanar/development) — uv, Docker, Node 18, and Yarn
- [Debugging a Fanar Server on Docker Using Visual Studio Code](./dev-guide/debugging)
- [Using a remote server and installing locally only the frontend dependencies](./dev-guide/remote-server)
- End-to-end tests — see the [Fanar repository README](https://github.com/lionjashari/fanar#end-to-end-testing)

## Additional Resources

- [How to create a new visualization](https://discuss.fanar.io/t/how-to-create-new-visualization-types-in-fanar/86)
- [How to create a new query runner](./dev-guide/write-a-query-runner)

## Getting Help

- [GitHub Discussions](https://github.com/getredash/fanar/discussions/categories/q-a)
