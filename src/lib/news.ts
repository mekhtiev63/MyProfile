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
