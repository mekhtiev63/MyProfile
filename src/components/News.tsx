"use client";

import Link from "next/link";
import NewsAlbum from "@/components/NewsAlbum";
import SectionIndex from "@/components/SectionIndex";
import { formatNewsDate, news } from "@/lib/news";
import { useSectionId } from "@/lib/site-mode";

export default function News() {
  const sectionId = useSectionId("news");
  if (!news.items.length) return null;

  const [featured, ...rest] = news.items;

  return (
    <section
      id={sectionId}
      data-sid="news"
      className="relative border-t border-[var(--color-rule)] py-[var(--section-gap-s)]"
    >
      <SectionIndex n="04" />
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)]">
        <div className="max-w-2xl">
          <p className="text-sm text-[var(--color-muted)]">Новости</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-ink)]">
            Последние события
          </h2>
        </div>
      </div>

      <article className="mx-auto mt-12 max-w-3xl px-[var(--gutter)] md:mt-16">
        <Link href={`/news/${featured.id}`} className="group block cursor-pointer">
          <p className="text-sm text-[var(--color-muted)]">{formatNewsDate(featured.date)}</p>
          <h3 className="mt-3 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
            {featured.title}
          </h3>
          {featured.excerpt && (
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
              {featured.excerpt}
            </p>
          )}
          <span className="mt-5 inline-block text-sm font-semibold text-[var(--color-ink)] underline decoration-[color-mix(in_oklab,var(--color-ink)_35%,transparent)] underline-offset-4 transition group-hover:decoration-[var(--color-ink)]">
            Открыть новость
          </span>
        </Link>

        {featured.images.length > 0 && (
          <NewsAlbum
            images={featured.images}
            alt={featured.title}
            className="mt-8"
          />
        )}
      </article>

      <ul className="mx-auto mt-4 max-w-[var(--container)] px-[var(--gutter)]">
        {rest.map((item) => (
          <li key={item.id} className="border-b border-[var(--color-rule)]">
            <Link
              href={`/news/${item.id}`}
              className="group grid cursor-pointer gap-4 py-7 md:grid-cols-12 md:items-center md:gap-6 md:py-8"
            >
              <p className="text-sm text-[var(--color-muted)] md:col-span-2">
                {formatNewsDate(item.date)}
              </p>
              {item.images[0] && (
                <div className="aspect-[4/3] overflow-hidden bg-[var(--color-paper-2)] md:col-span-2">
                  <img
                    src={item.images[0]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 160px"
                    width={320}
                    height={240}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className={item.images[0] ? "md:col-span-8" : "md:col-span-10"}>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-[-0.02em] text-[var(--color-ink)] md:text-xl">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
