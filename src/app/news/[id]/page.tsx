import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsShell from "@/components/NewsShell";
import { formatNewsDate, getNewsItem, news } from "@/lib/news";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps<"/news/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsItem(id);
  if (!item) return {};
  return {
    title: `${item.title} — Мехтиев Руслан`,
    description: item.excerpt || item.title,
    openGraph: item.images[0] ? { images: [item.images[0]] } : undefined,
  };
}

export default async function NewsPage({ params }: PageProps<"/news/[id]">) {
  const { id } = await params;
  const item = getNewsItem(id);
  if (!item) notFound();

  const [cover, ...gallery] = item.images;
  const channelName = news.channelTitle ? `«${news.channelTitle}»` : `@${news.channel}`;

  return (
    <NewsShell>
      <main className="px-6 pb-24 pt-28 md:px-10 md:pt-32">
        <article className="mx-auto max-w-3xl">
          <span className="civic-kicker-bar" aria-hidden />
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald">
            {formatNewsDate(item.date)}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4.5vw,2.9rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
            {item.title}
          </h1>

          {cover && (
            <a href={cover} target="_blank" rel="noreferrer" className="mt-10 block overflow-hidden rounded-2xl border border-[var(--hairline)]">
              <img src={cover} alt={item.title} className="w-full object-cover" />
            </a>
          )}

          {item.paragraphs.length > 0 && (
            <div className="mt-10 space-y-5 text-[1.05rem] leading-relaxed text-ink-muted md:text-lg">
              {item.paragraphs.map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {gallery.length > 0 && (
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {gallery.map((src, index) => (
                <li key={src}>
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="block aspect-square overflow-hidden rounded-xl border border-[var(--hairline)]"
                  >
                    <img
                      src={src}
                      alt={`${item.title} — фото ${index + 2}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <footer className="mt-12 border-t border-[var(--hairline)] pt-8">
            <p className="text-sm text-ink-faint">Новость опубликована в Telegram-канале {channelName}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="civic-cta cursor-pointer rounded-md bg-emerald px-4 py-2.5 text-sm font-semibold text-[#04110c] transition hover:bg-mint"
              >
                Открыть пост в Telegram
              </a>
              <a
                href={news.channelUrl}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer rounded-md border border-[var(--hairline)] px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[var(--ink-muted)]"
              >
                Подписаться на канал
              </a>
            </div>
          </footer>
        </article>
      </main>
    </NewsShell>
  );
}
