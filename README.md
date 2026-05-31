# Fanar Documentation

Documentation site for [Fanar](https://github.com/lionjashari/fanar), built with [Docusaurus](https://docusaurus.io/).

**Published site:** https://docs.fanar.tech

## Local development

Requires Node.js 20+.

```bash
npm install
npm start
```

Open http://localhost:3000/

Production build:

```bash
npm run build
npm run serve
```

## Importing Redash knowledge base

User and admin guides were adapted from [getredash/website](https://github.com/getredash/website). To refresh imported content:

```bash
git clone --depth 1 https://github.com/getredash/website /tmp/redash-website
node scripts/import-redash-kb.mjs /tmp/redash-website
```

Then review diffs, re-apply Fanar-specific edits under `docs/fanar/` and `docs/self-hosted/setup.md`, and run `npm run build`.

## Contributing

- Fanar-specific docs: edit `docs/fanar/`
- Imported Redash pages: edit under `docs/user-guide/`, `docs/self-hosted/`, etc.
- Sidebar: `sidebars.ts`

## License

BSD-2-Clause. See [LICENSE](./LICENSE).
