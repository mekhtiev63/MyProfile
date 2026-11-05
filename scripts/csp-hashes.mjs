#!/usr/bin/env node
/**
 * After `next build` (static export), rewrite CSP in out/.htaccess so
 * script-src / style-src use sha256 hashes of inline blocks instead of
 * 'unsafe-inline'. External files stay on 'self'.
 */
import { createHash } from "node:crypto";
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const htaccessPath = path.join(outDir, ".htaccess");

async function* walkHtml(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip Next static asset trees — only HTML needs inline hashes
      if (entry.name === "_next") continue;
      yield* walkHtml(full);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

function sha256Source(source) {
  return `'sha256-${createHash("sha256").update(source, "utf8").digest("base64")}'`;
}

/** Collect inline <script>…</script> and <style>…</style> bodies (not src=/href=). */
function collectInline(html, tag) {
  const re = new RegExp(`<${tag}(\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const hashes = new Set();
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1] || "";
    if (tag === "script" && /\bsrc\s*=/i.test(attrs)) continue;
    if (tag === "style" && /\bhref\s*=/i.test(attrs)) continue;
    const body = match[2];
    if (!body.trim()) continue;
    hashes.add(sha256Source(body));
  }
  return hashes;
}

function buildCsp(scriptHashes, styleHashes) {
  const scripts = ["'self'", ...[...scriptHashes].sort()].join(" ");
  const styles = ["'self'", ...[...styleHashes].sort()].join(" ");
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `style-src ${styles}`,
    // React may set style="" attributes; keep attr inline, block inline event handlers
    "style-src-attr 'unsafe-inline'",
    `script-src ${scripts}`,
    "script-src-attr 'none'",
    "connect-src 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

async function main() {
  const scriptHashes = new Set();
  const styleHashes = new Set();
  let files = 0;

  for await (const file of walkHtml(outDir)) {
    const html = await readFile(file, "utf8");
    files += 1;
    for (const h of collectInline(html, "script")) scriptHashes.add(h);
    for (const h of collectInline(html, "style")) styleHashes.add(h);
  }

  if (!files) {
    console.warn("[csp] no HTML in out/ — skip");
    return;
  }

  let htaccess;
  try {
    htaccess = await readFile(htaccessPath, "utf8");
  } catch {
    console.warn("[csp] out/.htaccess missing — skip");
    return;
  }

  const csp = buildCsp(scriptHashes, styleHashes);
  const headerLine = `  Header set Content-Security-Policy "${csp}"`;

  let next;
  if (/Header set Content-Security-Policy /.test(htaccess)) {
    next = htaccess.replace(/[ \t]*Header set Content-Security-Policy ".*"/, headerLine);
  } else if (/<\/IfModule>\s*$/.test(htaccess) || htaccess.includes("mod_headers.c")) {
    next = htaccess.replace(
      /(<IfModule mod_headers\.c>[\s\S]*?)(<\/IfModule>)/,
      `$1${headerLine}\n$2`,
    );
  } else {
    next = `${htaccess.trimEnd()}\n\n<IfModule mod_headers.c>\n${headerLine}\n</IfModule>\n`;
  }

  await writeFile(htaccessPath, next);
  console.log(
    `[csp] hashed ${scriptHashes.size} script(s), ${styleHashes.size} style(s) across ${files} HTML file(s)`,
  );
}

await main();
