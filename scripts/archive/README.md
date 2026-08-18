# Archived scripts

## `import-redash-kb.mjs`

**Do not run this.** It bulk-imported the Redash knowledge base and applied a
blind `Redash` → `Fanar` find-and-replace. That rename produced invented URLs
(`app.fanar.io`, `getredash/fanar`), a version history Fanar never had, and an
end-of-life notice announcing the shutdown of a service that isn't ours.

The imported pages have since been triaged, rewritten and restructured. Re-running
this script would overwrite that work with the upstream originals.

If a page from upstream Redash is worth having, read it, decide whether it is true
of Fanar, and write it. Kept here for provenance only.
