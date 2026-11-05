#!/usr/bin/env node
/**
 * Pulls recent posts from the public preview of a Telegram channel (t.me/s/<channel>)
 * into src/data/news.json and downloads every photo into public/news/telegram/,
 * so each post can be rendered as a full news page on the site.
 *
 * Env:
 *   TELEGRAM_CHANNEL  channel username (default: meruslano63)
 *   NEWS_LIMIT        how many posts to keep (default: 12)
 *   NEWS_HASHTAG      only keep posts containing this hashtag, e.g. "#сайт" (default: all posts)
 *
 * On network failure the existing JSON is kept, so the build never breaks because of Telegram.
 */
import { load } from "cheerio";
import { lookup } from "node:dns/promises";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const channelRaw = process.env.TELEGRAM_CHANNEL || "meruslano63";
const channel = assertTelegramChannel(channelRaw);
const limit = Number(process.env.NEWS_LIMIT || 12);
const hashtag = (process.env.NEWS_HASHTAG || "").trim().toLowerCase();
const maxPages = 8;

const dataFile = path.join(root, "src/data/news.json");
const imageDir = path.join(root, "public/news/telegram");
const imagePublicPrefix = "/news/telegram";

const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

/** Telegram CDN / preview hosts only — blocks SSRF via crafted background-image URLs. */
const ALLOWED_IMAGE_HOST_SUFFIXES = [
  ".telegram.org",
  ".telegram-cdn.org",
  ".cdn-telegram.org",
  ".telesco.pe",
];
const ALLOWED_IMAGE_HOSTS = new Set(["telegram.org", "t.me", "cdn-telegram.org", "telegram-cdn.org", "telesco.pe"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MiB
const MAX_REDIRECTS = 3;

/** Public Telegram usernames only — blocks path injection into t.me/s/<channel>. */
function assertTelegramChannel(name) {
  const channel = String(name || "").trim();
  if (!/^[A-Za-z0-9_]{3,64}$/.test(channel)) {
    throw new Error(
      `invalid TELEGRAM_CHANNEL "${channel}" — expected 3–64 chars of [A-Za-z0-9_]`,
    );
  }
  return channel;
}

function isAllowedImageHost(hostname) {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (ALLOWED_IMAGE_HOSTS.has(host)) return true;
  return ALLOWED_IMAGE_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

/** Block loopback, RFC1918, link-local, ULA, CGNAT, multicast — SSRF via DNS rebinding. */
function isBlockedIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 0 || a === 127 || a === 10) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    if (a >= 224) return true;
    return false;
  }
  if (!net.isIPv6(ip)) return true;
  const n = ip.toLowerCase();
  if (n === "::" || n === "::1") return true;
  if (n.startsWith("fc") || n.startsWith("fd")) return true; // ULA
  if (n.startsWith("fe80:")) return true; // link-local
  if (n.startsWith("ff")) return true; // multicast
  if (n.startsWith("::ffff:")) {
    const v4 = n.slice("::ffff:".length);
    return net.isIPv4(v4) ? isBlockedIp(v4) : true;
  }
  return false;
}

async function assertPublicDns(hostname) {
  const records = await lookup(hostname, { all: true, verbatim: true });
  if (!records.length) throw new Error(`DNS empty for ${hostname}`);
  for (const { address } of records) {
    if (isBlockedIp(address)) {
      throw new Error(`blocked non-public IP ${address} for ${hostname}`);
    }
  }
}

function assertSafeImageUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`invalid image URL: ${raw}`);
  }
  if (url.protocol !== "https:") throw new Error(`non-HTTPS image URL: ${raw}`);
  if (url.username || url.password) throw new Error(`credentialed image URL: ${raw}`);
  if (!isAllowedImageHost(url.hostname)) throw new Error(`disallowed image host: ${url.hostname}`);
  return url;
}

async function fetchPage(before) {
  const url = `https://t.me/s/${channel}${before ? `?before=${before}` : ""}`;
  await assertPublicDns("t.me");
  const res = await fetch(url, { headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

/** Manual redirect follow so every hop is re-checked against the allowlist + public DNS. */
async function fetchAllowedImage(remote) {
  let current = assertSafeImageUrl(remote).href;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const safe = assertSafeImageUrl(current);
    await assertPublicDns(safe.hostname);
    const res = await fetch(current, {
      headers: { "User-Agent": userAgent, Accept: "image/*,*/*;q=0.8" },
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    });

    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get("location");
      if (!location) throw new Error(`redirect without Location from ${current}`);
      current = new URL(location, current).href;
      continue;
    }

    if (!res.ok) throw new Error(`${current} → HTTP ${res.status}`);

    const type = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    if (type && !type.startsWith("image/")) throw new Error(`non-image content-type: ${type}`);

    const lengthHeader = res.headers.get("content-length");
    if (lengthHeader && Number(lengthHeader) > MAX_IMAGE_BYTES) {
      throw new Error(`image too large (Content-Length ${lengthHeader})`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("empty response body");

    const chunks = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_IMAGE_BYTES) {
        await reader.cancel();
        throw new Error(`image exceeds ${MAX_IMAGE_BYTES} bytes`);
      }
      chunks.push(value);
    }
    return Buffer.concat(chunks);
  }
  throw new Error(`too many redirects fetching ${remote}`);
}

function backgroundUrl(style) {
  const match = /background-image:url\(['"]?([^'")]+)['"]?\)/.exec(style || "");
  return match ? match[1] : null;
}

function messageText($, node) {
  const clone = $(node).clone();
  clone.find("br").replaceWith("\n");
  return clone
    .text()
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function shorten(text, max) {
  if (text.length <= max) return text;
  let cut = text.slice(0, max - 1).replace(/\s+\S*$/, "").trimEnd();
  // never leave a dangling initial like «К.» / «К. А.»
  cut = cut.replace(/(?:^|\s)(?:[A-ZА-ЯЁ]\.\s*)+[A-ZА-ЯЁ]\.?$/, "").trimEnd();
  cut = cut.replace(/(?:^|\s)[A-ZА-ЯЁ]\.$/, "").trimEnd();
  return `${cut}…`;
}

const TITLE_MAX = 130;
/** Prefer finishing the first real sentence even a bit past TITLE_MAX (initials eat length). */
const TITLE_SENTENCE_MAX = 180;

/**
 * First sentence end that is not an initial («К.», «А.», «К. А.»).
 * Initials: a single capital letter immediately before the period.
 */
function firstSentenceEnd(text, max) {
  const limit = Math.min(text.length, max);
  for (let i = 20; i < limit; i++) {
    const ch = text[i];
    if (ch !== "." && ch !== "!" && ch !== "?" && ch !== "…") continue;
    const prev = text[i - 1];
    if (/[A-ZА-ЯЁ]/.test(prev)) continue; // initial
    const next = text[i + 1];
    if (next !== undefined && !/\s/.test(next)) continue;
    return i + 1;
  }
  return -1;
}

/** Title from the first paragraph; `paragraphs` is everything the article page shows under it. */
function splitPost(text) {
  const [firstRaw, ...restParagraphs] = toParagraphs(text);
  const first = firstRaw.replace(/\s*\n\s*/g, " ");

  let title;
  let paragraphs = restParagraphs;
  if (first.length <= TITLE_MAX) {
    title = first;
  } else {
    const end = firstSentenceEnd(first, TITLE_SENTENCE_MAX);
    if (end > 0) {
      title = first.slice(0, end).trim();
      const rest = first.slice(end).trim();
      paragraphs = rest ? [rest, ...restParagraphs] : restParagraphs;
    } else {
      title = shorten(first, TITLE_MAX);
      paragraphs = [firstRaw, ...restParagraphs];
    }
  }

  const excerptSource = paragraphs[0] === firstRaw ? restParagraphs[0] : paragraphs[0];
  return { title, paragraphs, excerpt: shorten((excerptSource || "").replace(/\s*\n\s*/g, " "), 220) };
}

function parsePage(html) {
  const $ = load(html);
  const channelTitle = $(".tgme_channel_info_header_title").first().text().trim() || null;
  const posts = [];

  $(".tgme_widget_message[data-post]").each((_, el) => {
    const msg = $(el);
    const [, idRaw] = (msg.attr("data-post") || "").split("/");
    const id = Number(idRaw);
    if (!id) return;

    const textNode = msg.find(".tgme_widget_message_text").first();
    const text = textNode.length ? messageText($, textNode) : "";
    if (!text) return;

    const photos = msg
      .find(".tgme_widget_message_photo_wrap")
      .map((__, p) => backgroundUrl($(p).attr("style")))
      .get()
      .filter(Boolean);
    const videoThumb = backgroundUrl(msg.find(".tgme_widget_message_video_thumb").first().attr("style"));

    posts.push({
      id,
      date: msg.find(".tgme_widget_message_date time").attr("datetime") || null,
      url: msg.find("a.tgme_widget_message_date").attr("href") || `https://t.me/${channel}/${id}`,
      text,
      remoteImages: photos.length ? photos : videoThumb ? [videoThumb] : [],
      forwarded: msg.find(".tgme_widget_message_forwarded_from").length > 0,
    });
  });

  return { channelTitle, posts };
}

async function collectPosts() {
  const byId = new Map();
  let before;
  let channelTitle = null;

  for (let page = 0; page < maxPages; page += 1) {
    const parsed = parsePage(await fetchPage(before));
    channelTitle ??= parsed.channelTitle;
    if (!parsed.posts.length) break;

    for (const post of parsed.posts) {
      if (post.forwarded) continue;
      if (!post.remoteImages.length && post.text.length < 120) continue;
      if (hashtag && !post.text.toLowerCase().includes(hashtag)) continue;
      byId.set(post.id, post);
    }

    if (byId.size >= limit) break;
    const oldest = Math.min(...parsed.posts.map((p) => p.id));
    if (!Number.isFinite(oldest) || oldest <= 1) break;
    before = oldest;
  }

  return { channelTitle, posts: [...byId.values()].sort((a, b) => b.id - a.id).slice(0, limit) };
}

async function downloadImages(post) {
  const saved = [];
  for (const [index, remote] of post.remoteImages.entries()) {
    try {
      assertSafeImageUrl(remote);
    } catch (error) {
      console.warn(`[telegram] skip image for ${post.id}: ${error.message}`);
      continue;
    }

    const file = `${post.id}-${index + 1}.jpg`;
    const target = path.join(imageDir, file);
    if (!existsSync(target)) {
      try {
        await writeFile(target, await fetchAllowedImage(remote));
      } catch (error) {
        console.warn(`[telegram] download failed for ${post.id}: ${error.message}`);
        continue;
      }
    }
    saved.push(`${imagePublicPrefix}/${file}`);
  }
  return saved;
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(dataFile, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  let result;
  try {
    result = await collectPosts();
  } catch (error) {
    const existing = await readExisting();
    console.warn(`[telegram] fetch failed (${error.message}); keeping ${existing?.items?.length ?? 0} cached posts`);
    if (!existing) {
      const empty = { channel, channelTitle: null, channelUrl: `https://t.me/${channel}`, updatedAt: null, items: [] };
      await writeFile(dataFile, `${JSON.stringify(empty, null, 2)}\n`);
    }
    return;
  }

  await mkdir(imageDir, { recursive: true });

  const items = [];
  for (const post of result.posts) {
    const { title, paragraphs, excerpt } = splitPost(post.text);
    items.push({
      id: String(post.id),
      date: post.date,
      sourceUrl: post.url,
      title,
      excerpt,
      paragraphs,
      images: await downloadImages(post),
    });
  }

  const keep = new Set(items.flatMap((item) => item.images.map((image) => path.basename(image))));
  for (const file of await readdir(imageDir)) {
    if (!keep.has(file)) await rm(path.join(imageDir, file));
  }

  const data = {
    channel,
    channelTitle: result.channelTitle,
    channelUrl: `https://t.me/${channel}`,
    updatedAt: new Date().toISOString(),
    items,
  };
  await writeFile(dataFile, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`[telegram] saved ${items.length} posts from @${channel}`);
}

await main();
