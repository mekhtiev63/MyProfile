"use client";

import {
  itEducation,
  itExperience,
  itIntro,
  itLoadNumbers,
  itSkills,
} from "@/data/itActivity";
import { contact } from "@/data/publicActivity";
import { useSectionId } from "@/lib/site-mode";

export default function ItActivity() {
  const main = itExperience[0];
  const side = itExperience.slice(1);
  const sectionId = useSectionId("it");

  return (
    <section
      id={sectionId}
      data-sid="it"
      className="relative border-t border-[var(--color-rule)] px-[var(--gutter)] py-[var(--section-gap-s)]"
    >
      <div className="mx-auto max-w-[var(--container)]">
        <div className="max-w-2xl">
          <p className="text-sm text-[var(--color-muted)]">Backend</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-ink)]">
            {itIntro.role} · {itIntro.company}
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">{itIntro.period}</p>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {itIntro.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {itIntro.goal}
          </p>
        </div>

        <div className="mt-12 grid gap-8 border-t border-[var(--color-rule)] pt-10 text-sm text-[var(--color-muted)] md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
              Нагрузка
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-[var(--color-ink)]">{itLoadNumbers.eventsPerMonthLabel}</span>{" "}
                обращений и событий в месяц — суммарный объём, не «пик × время»
              </li>
              <li>
                до {itLoadNumbers.eventsPerMinutePeak} соб./мин — кратковременный пик потока при
                массовых инцидентах
              </li>
              <li>
                до {itLoadNumbers.apiRpsPeak} RPS ({itLoadNumbers.apiRpsLabel}) на внутренние API —
                порядок ~{itLoadNumbers.apiRpsPeak * 60} зап./мин
              </li>
            </ul>
          </div>
          <div className="md:col-span-5">
            <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
              Команда
            </p>
            <p className="mt-3">{itIntro.team}</p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
            Стек
          </h3>
          <ul className="mt-8 border-t border-[var(--color-rule)]">
            {itSkills.map((group) => (
              <li
                key={group.title}
                className="grid gap-3 border-b border-[var(--color-rule)] py-5 md:grid-cols-12 md:gap-6"
              >
                <p className="text-sm text-[var(--color-muted)] md:col-span-3">{group.title}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--color-ink)] md:col-span-9">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 border-t border-[var(--color-rule)] pt-16">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
            Что сделал
          </h3>
          <p className="mt-3 text-lg font-semibold text-[var(--color-ink)]">{main.org}</p>
          <ul className="mt-6 space-y-3 text-[var(--color-muted)]">
            {main.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-[var(--color-accent)]"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {side.length > 0 && (
          <div className="mt-16 border-t border-[var(--color-rule)] pt-12">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
              Дополнительно
            </h3>
            {side.map((item) => (
              <div key={item.title} className="mt-6">
                <p className="font-semibold text-[var(--color-accent)]">{item.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{item.org}</p>
                <p className="mt-2 text-[var(--color-muted)]">{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-12 text-sm text-[var(--color-muted)]">
          {itEducation.status} · {itEducation.place}
        </p>

        <div className="mt-8">
          <a
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            className="cta-accent inline-flex min-h-11 cursor-pointer items-center justify-center px-5 py-3 text-sm font-semibold transition duration-200 active:translate-y-px"
          >
            {contact.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
