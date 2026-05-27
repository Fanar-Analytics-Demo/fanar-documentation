---
title: "Using a Remote Server and Installing Locally only the Frontend Dependencies"
---

If you want to work only on the frontend side of Fanar, and have a Fanar
instance deployed already (running version 1.0.0 or newer), you can use this
instance as your API server and run locally only the webpack dev-server.

The setup in this case is very simple:

1. [Install Node.js](https://nodejs.org/en/download/) (14.16.1 or newer, can be
   installed with Homebrew on OS/X)
2. Install Yarn (1.22.10 or newer): `npm install --global yarn@1.22.10`
3. Git clone the repository.
4. Change to the repository directory, and install Node packages:
   `yarn --frozen-lockfile`.
5. Start webpack dev-server:
   `FANAR_BACKEND="URL of your fanar server" yarn start`.

The `FANAR_BACKEND=""` part of the command sets the URL of your remote Fanar
server.
