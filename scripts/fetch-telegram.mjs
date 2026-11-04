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
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const channel = process.env.TELEGRAM_CHANNEL || "meruslano63";
const limit = Number(process.env.NEWS_LIMIT || 12);
const hashtag = (process.env.NEWS_HASHTAG || "").trim().toLowerCase();
const maxPages = 8;

const dataFile = path.join(root, "src/data/news.json");
const imageDir = path.join(root, "public/news/telegram");
const imagePublicPrefix = "/news/telegram";

const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

async function fetchPage(before) {
  const url = `https://t.me/s/${channel}${before ? `?before=${before}` : ""}`;
  const res = await fetch(url, { headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
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
  return text.length > max ? `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : text;
}

const TITLE_MAX = 130;

/** Title from the first paragraph; `paragraphs` is everything the article page shows under it. */
function splitPost(text) {
  const [firstRaw, ...restParagraphs] = toParagraphs(text);
  const first = firstRaw.replace(/\s*\n\s*/g, " ");

  let title;
  let paragraphs = restParagraphs;
  if (first.length <= TITLE_MAX) {
    title = first;
  } else {
    // the char before the stop must not be a capital letter, so initials like «К. А.» don't end the title
    const sentence = new RegExp(`^(.{20,${TITLE_MAX - 1}}?[^\\sA-ZА-ЯЁ][.!?…])\\s`).exec(first);
    if (sentence) {
      title = sentence[1];
      paragraphs = [first.slice(sentence[0].length), ...restParagraphs];
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
    const file = `${post.id}-${index + 1}.jpg`;
    const target = path.join(imageDir, file);
    if (!existsSync(target)) {
      try {
        const res = await fetch(remote, { headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(20000) });
        if (!res.ok) continue;
        await writeFile(target, Buffer.from(await res.arrayBuffer()));
      } catch {
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
