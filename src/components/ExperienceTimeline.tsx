import { experience, timelineSpan } from "@/data/publicActivity";

export default function ExperienceTimeline() {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
          Путь
        </h3>
        <p className="text-base font-medium text-[var(--color-accent)]">
          {timelineSpan}
        </p>
      </div>

      <div className="experience-timeline-scroll mt-10 -mx-4 overflow-x-auto overscroll-x-contain px-4 pb-3 pt-2 sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
        <ol className="relative flex min-w-[920px] items-start pl-2 pr-2 md:min-w-0 md:pl-0 md:pr-0">
          <span
            aria-hidden
            className="civic-rail absolute left-[6%] right-[6%] top-3 h-px"
          />

          {experience.map((item) => (
            <li
              key={`overview-${item.title}-${item.period}`}
              className="relative z-[1] flex flex-1 flex-col items-center px-2 text-center"
            >
              <span
                aria-hidden
                className="experience-timeline-node flex size-6 shrink-0 items-center justify-center"
              >
                <span
                  className={`size-3.5 rounded-full ring-4 ring-[var(--color-background)] ${
                    item.focus
                      ? "bg-[var(--color-destructive)]"
                      : "bg-[var(--color-primary)]"
                  }`}
                />
              </span>
              <p className="mt-4 max-w-[12.5rem] font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-ink">
                {item.title}
              </p>
              <p className="mt-1.5 max-w-[12.5rem] text-sm leading-snug text-ink-faint">
                {item.period}
              </p>
              {item.focus && (
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-destructive)]">
                  главное
                </p>
              )}
              {item.parallel && (
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink-faint">
                  параллельно
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>

      <ol className="mt-16 space-y-0 border-t border-[var(--hairline)]">
        {experience.map((item, index) => {
          const isLast = index === experience.length - 1;
          const study = item.caseStudy;

          return (
            <li
              key={`detail-${item.title}-${item.period}`}
              className={`grid gap-4 border-t border-[var(--hairline)] py-10 md:grid-cols-[200px_1fr] md:gap-10 ${
                isLast ? "pb-0" : ""
              }`}
            >
              <div>
                <p className="text-base text-ink-faint">{item.period}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-primary)]">
                  {item.title}
                </p>
                {item.focus && (
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-destructive)]">
                    главное сейчас
                  </p>
                )}
                {item.parallel && (
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    параллельно
                  </p>
                )}
              </div>

              <div>
                <p className="text-lg font-semibold text-ink">{item.org}</p>

                {study && (
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-faint">
                        Задача
                      </dt>
                      <dd className="mt-1.5 text-base leading-relaxed text-ink-muted">
                        {study.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-faint">
                        Действие
                      </dt>
                      <dd className="mt-1.5 text-base leading-relaxed text-ink-muted">
                        {study.action}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-destructive)]">
                        Результат
                      </dt>
                      <dd className="mt-1.5 border-l-2 border-[var(--color-destructive)] pl-4 text-base leading-relaxed text-ink">
                        {study.result}
                      </dd>
                    </div>
                  </dl>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
