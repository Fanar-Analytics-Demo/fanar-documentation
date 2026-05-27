#!/usr/bin/env node
/**
 * Normalize static image filenames to lowercase extensions for Linux CI.
 * Run after import-redash-kb.mjs copies gitbook assets.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATIC = path.join(__dirname, "..", "static");

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const exts = [".PNG", ".JPG", ".JPEG", ".GIF"];
let renamed = 0;

for (const file of walk(STATIC)) {
  const ext = path.extname(file);
  const lower = ext.toLowerCase();
  if (!exts.includes(ext)) continue;
  const target = file.slice(0, -ext.length) + lower;
  if (file === target) continue;
  if (file.toLowerCase() === target.toLowerCase() && file !== target) {
    // Case-only rename on case-insensitive filesystems: copy then remove source.
    fs.copyFileSync(file, target);
    fs.unlinkSync(file);
  } else if (!fs.existsSync(target)) {
    fs.renameSync(file, target);
  } else if (file !== target) {
    fs.unlinkSync(file);
  }
  renamed++;
  console.log(`${path.basename(file)} -> ${path.basename(target)}`);
}

console.log(`Normalized ${renamed} file(s).`);
