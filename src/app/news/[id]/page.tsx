import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsAlbum from "@/components/NewsAlbum";
import NewsShell from "@/components/NewsShell";
import { formatNewsDate, getNewsItem, news, safeTelegramUrl } from "@/lib/news";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps<"/news/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsItem(id);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt || item.title,
    openGraph: {
      title: item.title,
      description: item.excerpt || item.title,
      images: item.images[0] ? [{ url: item.images[0] }] : [{ url: "/portrait.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.excerpt || item.title,
      images: item.images[0] ? [item.images[0]] : ["/portrait.jpg"],
    },
  };
}

export default async function NewsPage({ params }: PageProps<"/news/[id]">) {
  const { id } = await params;
  const item = getNewsItem(id);
  if (!item) notFound();

  const channelName = news.channelTitle ? `«${news.channelTitle}»` : `@${news.channel}`;

  return (
    <NewsShell>
      <main id="main-content" tabIndex={-1} className="pb-20 pt-12 sm:pb-24 sm:pt-14">
        <article className="mx-auto max-w-3xl px-[var(--gutter)] pt-8 md:pt-14">
          <p className="text-sm text-[var(--color-muted)]">Новость</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">{formatNewsDate(item.date)}</p>
          <h1 className="mt-5 max-w-[24ch] font-[family-name:var(--font-display)] text-[clamp(1.8rem,4.5vw,2.9rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--color-ink)]">
            {item.title}
          </h1>
          {item.excerpt && (
            <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
              {item.excerpt}
            </p>
          )}

          {item.paragraphs.length > 0 && (
            <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--color-muted)] md:mt-10 md:text-lg">
              {item.paragraphs.map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {item.images.length > 0 && (
            <NewsAlbum images={item.images} alt={item.title} className="mt-10 md:mt-12" />
          )}

          <footer className="mt-12 border-t border-[var(--color-rule)] pt-10 md:mt-16">
            <p className="text-sm text-[var(--color-muted)]">
              Опубликовано в Telegram-канале {channelName}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={safeTelegramUrl(item.sourceUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center bg-[var(--color-mark)] px-5 py-3 text-sm font-semibold text-[var(--color-mark-ink)] transition hover:opacity-90"
              >
                Открыть в Telegram
              </a>
              <a
                href={safeTelegramUrl(news.channelUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center border border-[var(--color-rule)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-muted)]"
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
