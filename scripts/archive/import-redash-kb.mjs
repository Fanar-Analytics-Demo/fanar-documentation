#!/usr/bin/env node
/**
 * Import Redash knowledge base from getredash/website into Fanar Docusaurus docs.
 *
 * Usage:
 *   node scripts/import-redash-kb.mjs [path-to-redash-website]
 *
 * Default source: /tmp/redash-website (clone getredash/website first)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "docs");
const STATIC_IMG = path.join(ROOT, "static", "img", "docs");

const SOURCE_ROOT =
  process.argv[2] || "/tmp/redash-website";
const KB_ROOT = path.join(SOURCE_ROOT, "src", "pages", "kb");

const PARENT_MAP = {
  "open-source": "self-hosted",
  "user-guide": "user-guide",
  "data-sources": "data-sources",
  faq: "faq",
};

/** @type {Map<string, string>} kb path (no ext) -> docusaurus doc id */
const docIdMap = new Map();

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  return { meta, body: match[2] };
}

function kbPathToDocId(kbRelativePath) {
  const parts = kbRelativePath.replace(/\.md$/, "").split("/");
  const parent = parts[0];
  const mappedParent = PARENT_MAP[parent] || parent;
  const rest = parts.slice(1).join("/");
  return rest ? `${mappedParent}/${rest}` : mappedParent;
}

function destPathForKbFile(kbRelativePath) {
  const docId = kbPathToDocId(kbRelativePath);
  return path.join(DOCS_DIR, `${docId}.md`);
}

function collectKbFiles(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const rel = base ? `${base}/${ent.name}` : ent.name;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) files.push(...collectKbFiles(full, rel));
    else if (ent.name.endsWith(".md")) files.push(rel);
  }
  return files;
}

function convertCallouts(body) {
  return body.replace(
    /\{%\s*callout\s+(\w+)\s*%\}([\s\S]*?)\{%\s*endcallout\s*%\}/g,
    (_, type, inner) => {
      const t = type === "warning" ? "warning" : type === "danger" ? "danger" : "info";
      return `:::${t}\n${inner.trim()}\n:::\n`;
    }
  ).replace(
    /\{%\s*callout\s*%\}([\s\S]*?)\{%\s*endcallout\s*%\}/g,
    (_, inner) => `:::info\n${inner.trim()}\n:::\n`
  );
}

function convertLinks(body, currentDocId) {
  return body.replace(
    /\{%\s*link\s+_kb\/([^%]+)\s*%\}/g,
    (_, kbPath) => {
      const targetId = kbPathToDocId(kbPath.trim());
      const rel = relativeDocLink(currentDocId, targetId);
      return rel;
    }
  );
}

function relativeDocLink(fromId, toId) {
  const fromParts = fromId.split("/");
  const toParts = toId.split("/");
  fromParts.pop();
  let common = 0;
  while (
    common < fromParts.length &&
    common < toParts.length - 1 &&
    fromParts[common] === toParts[common]
  ) {
    common++;
  }
  const ups = fromParts.length - common;
  const prefix = ups === 0 ? "./" : "../".repeat(ups);
  const down = toParts.slice(common).join("/");
  return `${prefix}${down}`;
}

function convertImages(body) {
  return body
    .replace(/!\[([^\]]*)\]\(\/assets\/images\/docs\//g, "![$1](/img/docs/")
    .replace(/!\[([^\]]*)\]\(\/assets\/images\//g, "![$1](/img/docs/")
    .replace(/<img([^>]*?)>/gi, (m, attrs) =>
      attrs.trimEnd().endsWith("/") ? m : `<img${attrs} />`
    );
}

function convertBranding(body) {
  return body
    .replace(/\bREDASH_/g, "FANAR_")
    .replace(/\bRedash\b/g, "Fanar")
    .replace(/\bredash\b/g, "fanar");
}

function addDocusaurusFrontmatter(meta, docId) {
  const title = meta.title || docId.split("/").pop().replace(/-/g, " ");
  const sidebarPosition = meta.order ? parseInt(meta.order, 10) : undefined;
  const lines = ["---", `title: ${JSON.stringify(title)}`];
  if (sidebarPosition !== undefined && !Number.isNaN(sidebarPosition)) {
    lines.push(`sidebar_position: ${sidebarPosition}`);
  }
  if (meta.layout === "kb-category") {
    lines.push("sidebar_class_name: category-index");
  }
  lines.push("---", "");
  return lines.join("\n");
}

function buildDocIdMap(kbFiles) {
  for (const rel of kbFiles) {
    docIdMap.set(`_kb/${rel.replace(/\.md$/, "")}`, kbPathToDocId(rel));
    docIdMap.set(rel.replace(/\.md$/, ""), kbPathToDocId(rel));
  }
}

function main() {
  if (!fs.existsSync(KB_ROOT)) {
    console.error(`KB not found at ${KB_ROOT}. Clone getredash/website first.`);
    process.exit(1);
  }

  const kbFiles = collectKbFiles(KB_ROOT);
  buildDocIdMap(kbFiles);

  const metaByFile = new Map();
  const imported = [];

  for (const rel of kbFiles) {
    const src = path.join(KB_ROOT, rel);
    const raw = fs.readFileSync(src, "utf8");
    const { meta, body } = parseFrontmatter(raw);
    metaByFile.set(rel, meta);

    const docId = kbPathToDocId(rel);
    let converted = convertCallouts(body);
    converted = convertLinks(converted, docId);
    converted = convertImages(converted);
    converted = converted.replace(/src="\/assets\/images\//g, 'src="/img/docs/');
    converted = convertBranding(converted);

    const dest = destPathForKbFile(rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const fm = addDocusaurusFrontmatter(meta, docId);
    fs.writeFileSync(dest, fm + converted);
    imported.push(docId);
  }

  const srcImages = path.join(SOURCE_ROOT, "static", "assets", "images", "docs");
  if (fs.existsSync(srcImages)) {
    fs.mkdirSync(STATIC_IMG, { recursive: true });
    fs.cpSync(srcImages, STATIC_IMG, { recursive: true });
    console.log(`Copied images to ${STATIC_IMG}`);
    console.log("Run: node scripts/fix-image-case.mjs");
  }

  console.log(`Imported ${imported.length} documents into ${DOCS_DIR}`);
}

main();
