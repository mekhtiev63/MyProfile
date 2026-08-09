import GalleryGrid from "@/components/public/GalleryGrid";
import {
  formats,
  guarantees,
  publicContact,
  salesAwards,
  salesCases,
  salesMetrics,
} from "@/data/publicSales";

export default function PublicSales() {
  return (
    <>
      <section
        id="guarantees"
        className="border-t border-[var(--hairline)] px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Почему я
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {guarantees.title}
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {guarantees.items.map((item) => (
              <div key={item.title} className="border-t border-emerald/40 pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-mint">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="formats"
        className="border-t border-[var(--hairline)] px-6 py-24 md:px-10"
        style={{
          background:
            "linear-gradient(180deg, #040c09 0%, #071510 45%, #040c09 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Форматы
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {formats.title}
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {formats.items.map((item) => (
              <article
                key={item.title}
                className="border border-[var(--hairline)] px-6 py-7"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-ink-muted">{item.scope}</p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-emerald">
                  Что получаете
                </p>
                <p className="mt-2 leading-relaxed text-ink">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="results"
        className="border-t border-[var(--hairline)] px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Доказательства
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            Результаты в цифрах
          </h2>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {salesMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] text-mint">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-ink-faint">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-[var(--hairline)] pt-16">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
              Признание и награды
            </h3>
            <ul className="mt-10 space-y-8">
              {salesAwards.map((award) => (
                <li
                  key={award.title}
                  className="grid gap-2 border-l-2 border-emerald/50 pl-5 md:grid-cols-[140px_1fr] md:gap-10 md:border-l-0 md:pl-0"
                >
                  <p className="text-sm text-ink-faint">{award.date}</p>
                  <div>
                    <p className="font-semibold text-ink">{award.title}</p>
                    <p className="mt-2 leading-relaxed text-ink-muted">
                      {award.for}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="cases"
        className="border-t border-[var(--hairline)] px-6 py-24 md:px-10"
        style={{
          background:
            "linear-gradient(180deg, #040c09 0%, #071510 40%, #040c09 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Кейсы
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            Как закрываю задачи на практике
          </h2>
          <div className="mt-14 space-y-0">
            {salesCases.map((item) => (
              <article
                key={item.title}
                className="grid gap-6 border-t border-[var(--hairline)] py-12 md:grid-cols-[240px_1fr] md:gap-12"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-emerald">
                  {item.title}
                </h3>
                <dl className="space-y-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                      Было
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-muted">
                      {item.before}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                      Что сделано
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-muted">
                      {item.action}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
                      Результат
                    </dt>
                    <dd className="mt-1.5 border-l-2 border-emerald/60 pl-4 leading-relaxed text-ink">
                      {item.result}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="border-t border-[var(--hairline)] px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Галерея
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            В работе и на площадке
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Награждение, сцена, модерация СПК и рабочие встречи.
          </p>
          <GalleryGrid />
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-[var(--hairline)] px-6 py-24 md:px-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(31,157,99,0.18), transparent 55%), var(--bg-deep)",
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {publicContact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {publicContact.text}
          </p>
          <div className="mt-10">
            <a
              href={publicContact.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-6 py-3.5 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              {publicContact.cta}
            </a>
          </div>
          <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <a
              href={publicContact.vk}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-mint"
            >
              ВКонтакте
            </a>
            <a
              href={publicContact.resume}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-mint"
            >
              Резюме PDF
            </a>
          </nav>
        </div>
      </section>
    </>
  );
}
