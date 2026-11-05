import data from "@/data/news.json";

export type NewsItem = {
  id: string;
  date: string | null;
  sourceUrl: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  images: string[];
};

type NewsData = {
  channel: string;
  channelTitle: string | null;
  channelUrl: string;
  updatedAt: string | null;
  items: NewsItem[];
};

export const news = data as NewsData;

const TELEGRAM_HOSTS = new Set(["t.me", "www.t.me", "telegram.me", "www.telegram.me"]);

/** Allow only https://t.me/… (and telegram.me) links — blocks phishing hrefs from news.json. */
export function safeTelegramUrl(url: string, fallback: string = news.channelUrl) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return fallback;
    if (parsed.username || parsed.password) return fallback;
    if (!TELEGRAM_HOSTS.has(parsed.hostname.toLowerCase())) return fallback;
    if (parsed.pathname === "" || parsed.pathname === "/") return fallback;
    return parsed.href;
  } catch {
    return fallback;
  }
}

export function getNewsItem(id: string) {
  return news.items.find((item) => item.id === id);
}

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Moscow",
});

export function formatNewsDate(iso: string | null) {
  return iso ? dateFormat.format(new Date(iso)) : "";
}
