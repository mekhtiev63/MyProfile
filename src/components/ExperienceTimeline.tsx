import { experience, timelineSpan } from "@/data/publicActivity";

export default function ExperienceTimeline() {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
          Путь достижений
        </h3>
        <p className="text-sm font-medium tracking-wide text-emerald">
          {timelineSpan}
        </p>
      </div>

      {/* Overview: horizontal path */}
      <div className="mt-10 -mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible md:px-0">
        <ol className="relative flex min-w-[920px] items-start md:min-w-0">
          <span
            aria-hidden
            className="absolute left-[6%] right-[6%] top-[7px] h-px bg-gradient-to-r from-moss via-emerald to-mint"
          />

          {experience.map((item) => (
            <li
              key={`overview-${item.title}-${item.period}`}
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
              <p className="mt-4 max-w-[12.5rem] font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-ink md:text-[0.95rem]">
                {item.title}
              </p>
              <p className="mt-1.5 max-w-[12.5rem] text-xs leading-snug text-ink-faint">
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

      {/* Details */}
      <div className="mt-16 border-t border-[var(--hairline)] pt-14">
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.16em] text-emerald">
          Подробнее
        </p>

        <ol className="mt-10 space-y-0">
          {experience.map((item, index) => {
            const isLast = index === experience.length - 1;

            return (
              <li
                key={`detail-${item.title}-${item.period}`}
                className={`grid gap-4 border-t border-[var(--hairline)] py-10 md:grid-cols-[200px_1fr] md:gap-10 ${
                  isLast ? "pb-0" : ""
                }`}
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
            );
          })}
        </ol>
      </div>
    </div>
  );
}
