import {
  itEducation,
  itExperience,
  itIntro,
  itMetrics,
  itSkills,
  itTimelineSpan,
} from "@/data/itActivity";

export default function ItActivity() {
  return (
    <section
      id="it"
      className="relative border-t border-[var(--hairline)] bg-[var(--bg-deep)] px-6 py-24 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            IT
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            Golang-разработчик в телекоме
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            {itIntro.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            {itIntro.goal}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-[var(--hairline)] py-10 lg:grid-cols-4">
          {itMetrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold tracking-[-0.03em] text-mint">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-ink-faint">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 text-sm text-ink-muted md:grid-cols-3 md:gap-10">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
              Роль
            </p>
            <p className="mt-2 text-ink">
              {itIntro.role} · {itIntro.company}
            </p>
            <p className="mt-1 text-ink-faint">{itIntro.period}</p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
              Нагрузка
            </p>
            <p className="mt-2">{itIntro.load}</p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
              Команда
            </p>
            <p className="mt-2">{itIntro.team}</p>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
              Путь в разработке
            </h3>
            <p className="text-sm font-medium tracking-wide text-emerald">
              {itTimelineSpan}
            </p>
          </div>

          <div className="mt-10 -mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible md:px-0">
            <ol className="relative flex min-w-[420px] items-start md:min-w-0">
              <span
                aria-hidden
                className="absolute left-[12%] right-[12%] top-[7px] h-px bg-gradient-to-r from-moss via-emerald to-mint"
              />
              {itExperience.map((item) => (
                <li
                  key={`it-overview-${item.title}`}
                  className="relative z-[1] flex flex-1 flex-col items-center px-2 text-center"
                >
                  <span
                    aria-hidden
                    className={`h-3.5 w-3.5 rounded-full ring-4 ${
                      item.current
                        ? "bg-mint ring-emerald/25"
                        : "bg-emerald ring-[var(--bg-deep)]"
                    }`}
                  />
                  <p className="mt-4 max-w-[12rem] font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1.5 max-w-[12rem] text-xs leading-snug text-ink-faint">
                    {item.period}
                  </p>
                  {item.current && (
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-mint">
                      сейчас
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 border-t border-[var(--hairline)] pt-14">
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.16em] text-emerald">
              Подробнее
            </p>
            <ol className="mt-10">
              {itExperience.map((item) => (
                <li
                  key={`it-detail-${item.title}`}
                  className="grid gap-4 border-t border-[var(--hairline)] py-10 md:grid-cols-[200px_1fr] md:gap-10"
                >
                  <div>
                    <p className="text-sm text-ink-faint">{item.period}</p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-emerald">
                      {item.title}
                    </p>
                    {item.current && (
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-mint">
                        сейчас
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-ink">{item.org}</p>
                    <p className="mt-3 leading-relaxed text-ink-muted">
                      {item.summary}
                    </p>
                    {item.points.length > 0 && (
                      <ul className="mt-5 space-y-2 text-ink-muted">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.highlight && (
                      <p className="mt-5 border-l-2 border-emerald/60 pl-4 text-ink">
                        {item.highlight}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--hairline)] pt-20">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Стек и навыки
          </h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {itSkills.map((group) => (
              <div key={group.title}>
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.14em] text-emerald">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2 text-ink-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-ink-faint">
            {itEducation.status} · {itEducation.place}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://t.me/meruslano77"
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-5 py-3 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint"
            >
              Написать в Telegram
            </a>
            <a
              href="https://github.com/mekhtiev63"
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer text-sm font-semibold text-mint transition hover:text-ink"
            >
              GitHub →
            </a>
            <a
              href="#public"
              className="inline-flex cursor-pointer text-sm font-semibold text-ink-faint transition hover:text-mint"
            >
              ← Общественный трек
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
