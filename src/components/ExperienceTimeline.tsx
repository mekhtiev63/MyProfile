import { experience, timelineSpan } from "@/data/publicActivity";

export default function ExperienceTimeline() {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
          Путь
        </h3>
        <p className="text-base font-medium text-[var(--color-accent)]">{timelineSpan}</p>
      </div>

      <div className="experience-timeline-scroll mt-10 -mx-4 overflow-x-auto overscroll-x-contain px-4 pb-3 pt-2 sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
        <ol className="relative flex min-w-[920px] items-start pl-2 pr-2 md:min-w-0 md:pl-0 md:pr-0">
          <span
            aria-hidden
            className="civic-rail absolute left-[6%] right-[6%] top-3 h-px bg-[var(--color-ink)]"
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
                  className={`size-3.5 rounded-full ring-4 ring-[var(--color-paper)] ${
                    item.focus ? "bg-[var(--color-mark)]" : "bg-[var(--color-ink)]"
                  }`}
                />
              </span>
              <p className="mt-4 max-w-[12.5rem] font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[var(--color-ink)]">
                {item.title}
              </p>
              <p className="mt-1.5 max-w-[12.5rem] text-sm leading-snug text-[var(--color-muted)]">
                {item.period}
              </p>
              {item.focus && (
                <p className="mt-2 text-sm font-medium text-[var(--color-mark)]">главное</p>
              )}
              {item.parallel && (
                <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">параллельно</p>
              )}
            </li>
          ))}
        </ol>
      </div>

      <ol className="mt-16 space-y-0 border-t border-[var(--color-rule)]">
        {experience.map((item, index) => {
          const isLast = index === experience.length - 1;
          const study = item.caseStudy;

          return (
            <li
              key={`detail-${item.title}-${item.period}`}
              className={`grid gap-4 border-t border-[var(--color-rule)] py-10 md:grid-cols-12 md:gap-6 ${
                isLast ? "pb-0" : ""
              }`}
            >
              <div className="md:col-span-3">
                <p className="text-base text-[var(--color-muted)]">{item.period}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-accent)]">
                  {item.title}
                </p>
                {item.focus && (
                  <p className="mt-2 text-sm font-medium text-[var(--color-mark)]">главное сейчас</p>
                )}
                {item.parallel && (
                  <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">параллельно</p>
                )}
              </div>

              <div className="md:col-span-9">
                <p className="text-lg font-semibold text-[var(--color-ink)]">{item.org}</p>

                {study && (
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="text-sm text-[var(--color-muted)]">Задача</dt>
                      <dd className="mt-1.5 text-base leading-relaxed text-[var(--color-muted)]">
                        {study.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-[var(--color-muted)]">Действие</dt>
                      <dd className="mt-1.5 text-base leading-relaxed text-[var(--color-muted)]">
                        {study.action}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-[var(--color-mark)]">Результат</dt>
                      <dd className="mt-1.5 border-l-2 border-[var(--color-mark)] pl-4 text-base leading-relaxed text-[var(--color-ink)]">
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
