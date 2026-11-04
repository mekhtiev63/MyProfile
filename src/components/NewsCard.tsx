import Link from "next/link";
import { formatNewsDate, type NewsItem } from "@/lib/news";

export default function NewsCard({ item }: { item: NewsItem }) {
  const cover = item.images[0];

  return (
    <li className="civic-tile flex flex-col overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg-mid)_88%,transparent)]">
      <Link href={`/news/${item.id}`} className="group flex flex-1 cursor-pointer flex-col">
        {cover && (
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-deep)]">
            <img
              src={cover}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            {item.images.length > 1 && (
              <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                {item.images.length} фото
              </span>
            )}
          </div>
        )}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {formatNewsDate(item.date)}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-[-0.02em] text-ink">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink-muted">{item.excerpt}</p>
          )}
          <span className="mt-auto pt-5 text-sm font-semibold text-emerald transition group-hover:text-mint">
            Читать новость →
          </span>
        </div>
      </Link>
    </li>
  );
}
