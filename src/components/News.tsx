import NewsCard from "@/components/NewsCard";
import SectionIndex from "@/components/SectionIndex";
import { news } from "@/lib/news";

export default function News() {
  if (!news.items.length) return null;

  return (
    <section
      id="news"
      className="relative border-t border-[var(--hairline)] px-6 py-16 md:px-10 md:py-24"
    >
      <SectionIndex n="04" />
      <div className="civic-panel mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="civic-kicker-bar" aria-hidden />
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Новости
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            Последние события
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
