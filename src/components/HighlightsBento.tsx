"use client";

import { itMetrics } from "@/data/itActivity";
import { impactMetrics } from "@/data/publicActivity";
import { useSiteMode } from "@/lib/site-mode";

const cards = {
  public: [
    {
      title: "Студенческий парламент",
      description: "Команда из 64 активистов, календарь мероприятий и межвузовские проекты.",
      span: "md:col-span-2 md:row-span-2",
      accent: "from-emerald/25 to-moss/10",
    },
    {
      title: "Городская повестка",
      description: "Помощник депутата МГД на общественных началах.",
      span: "md:col-span-1",
      accent: "from-mint/15 to-emerald/5",
    },
    {
      title: "Публичные выступления",
      description: "Открытия форумов и церемоний для аудитории 360–1200+ человек.",
      span: "md:col-span-1",
      accent: "from-forest/40 to-emerald/10",
    },
    {
      title: "Молодёжные сообщества",
      description: "Организация форумов, круглых столов и образовательных проектов.",
      span: "md:col-span-2",
      accent: "from-moss/20 to-forest/20",
    },
  ],
  dev: [
    {
      title: "Incident automation",
      description: "Классификация, маршрутизация и SLA для линий поддержки МТС.",
      span: "md:col-span-2 md:row-span-2",
      accent: "from-emerald/25 to-moss/10",
    },
    {
      title: "High-load backend",
      description: "До 600–800 событий в минуту во время массовых инцидентов.",
      span: "md:col-span-1",
      accent: "from-mint/15 to-emerald/5",
    },
    {
      title: "Go + event-driven",
      description: "Kafka, PostgreSQL, gRPC, Redis — микросервисная платформа.",
      span: "md:col-span-1",
      accent: "from-forest/40 to-emerald/10",
    },
    {
      title: "Production ownership",
      description: "Рефакторинг, LLM-сервисы, расследование RAM 94% на prod.",
      span: "md:col-span-2",
      accent: "from-moss/20 to-forest/20",
    },
  ],
} as const;

export default function HighlightsBento() {
  const { mode } = useSiteMode();
  const items = cards[mode];
  const metrics = mode === "public" ? impactMetrics : itMetrics;

  return (
    <section
      id="highlights"
      className="relative border-t border-[var(--hairline)] px-6 py-20 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            {mode === "public" ? "Фокус" : "Stack & impact"}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {mode === "public"
              ? "Ключевые направления работы"
              : "Что строю на backend"}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:auto-rows-[minmax(9rem,auto)]">
          {items.map((item) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg-mid)_88%,transparent)] p-6 shadow-[0_20px_60px_-40px_var(--glow)] transition duration-300 hover:border-mint/30 hover:shadow-[0_24px_70px_-36px_var(--glow)] ${item.span}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition duration-300 group-hover:opacity-100 ${item.accent}`}
              />
              <div className="relative">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-ink md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-deep)]/70 px-4 py-4 text-center backdrop-blur-sm"
            >
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-mint sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-faint">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
