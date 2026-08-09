"use client";

import AnimatedMetric from "@/components/AnimatedMetric";
import { itMetrics } from "@/data/itActivity";
import { impactMetrics } from "@/data/publicActivity";
import { useInView } from "@/lib/use-in-view";
import { useSiteMode } from "@/lib/site-mode";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const cards = {
  public: [
    {
      title: "Студенческий парламент",
      description: "Команда из 64 активистов, календарь мероприятий и межвузовские проекты.",
      span: "md:col-span-2 md:row-span-2",
      accent: "from-emerald/25 to-moss/10",
      glow: "rgba(31,157,99,0.45)",
    },
    {
      title: "Городская повестка",
      description: "Помощник депутата МГД на общественных началах.",
      span: "md:col-span-1",
      accent: "from-mint/15 to-emerald/5",
      glow: "rgba(94,224,160,0.35)",
    },
    {
      title: "Публичные выступления",
      description: "Открытия форумов и церемоний для аудитории 360–1200+ человек.",
      span: "md:col-span-1",
      accent: "from-forest/40 to-emerald/10",
      glow: "rgba(20,107,69,0.5)",
    },
    {
      title: "Молодёжные сообщества",
      description: "Организация форумов, круглых столов и образовательных проектов.",
      span: "md:col-span-2",
      accent: "from-moss/20 to-forest/20",
      glow: "rgba(94,224,160,0.28)",
    },
  ],
  dev: [
    {
      title: "Incident automation",
      description: "Классификация, маршрутизация и SLA для линий поддержки МТС.",
      span: "md:col-span-2 md:row-span-2",
      accent: "from-emerald/25 to-moss/10",
      glow: "rgba(31,157,99,0.45)",
    },
    {
      title: "High-load backend",
      description: "До 600–800 событий в минуту во время массовых инцидентов.",
      span: "md:col-span-1",
      accent: "from-mint/15 to-emerald/5",
      glow: "rgba(94,224,160,0.35)",
    },
    {
      title: "Go + event-driven",
      description: "Kafka, PostgreSQL, gRPC, Redis — микросервисная платформа.",
      span: "md:col-span-1",
      accent: "from-forest/40 to-emerald/10",
      glow: "rgba(20,107,69,0.5)",
    },
    {
      title: "Production ownership",
      description: "Рефакторинг, LLM-сервисы, расследование RAM 94% на prod.",
      span: "md:col-span-2",
      accent: "from-moss/20 to-forest/20",
      glow: "rgba(94,224,160,0.28)",
    },
  ],
} as const;

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="orb-drift absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-emerald/20 blur-3xl" />
      <span className="orb-drift orb-drift-delay absolute right-[12%] top-[8%] h-52 w-52 rounded-full bg-mint/10 blur-3xl" />
      <span className="orb-drift orb-drift-slow absolute bottom-[10%] left-[35%] h-56 w-56 rounded-full bg-moss/15 blur-3xl" />
    </div>
  );
}

export default function HighlightsBento() {
  const { mode } = useSiteMode();
  const items = cards[mode];
  const metrics = mode === "public" ? impactMetrics : itMetrics;
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.12 });
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40, active: false });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const node = spotlightRef.current;
    if (!node) return;

    setSpotlight((prev) => ({ ...prev, active: true }));
  }, []);

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setSpotlight({ x, y, active: true });
  };

  return (
    <section
      id="highlights"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setSpotlight((prev) => ({ ...prev, active: false }))}
      className="highlights-stage relative overflow-hidden border-t border-[var(--hairline)] px-6 py-20 md:px-10"
    >
      <FloatingOrbs />
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: spotlight.active ? 1 : 0.35,
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(94,224,160,0.16), transparent 42%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className={`max-w-2xl ${inView ? "highlights-rise" : "opacity-0 translate-y-8"}`}>
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
          {items.map((item, index) => (
            <article
              key={item.title}
              style={{ transitionDelay: `${index * 90}ms` }}
              className={`bento-card group relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg-mid)_88%,transparent)] p-6 shadow-[0_20px_60px_-40px_var(--glow)] ${item.span} ${
                inView ? "highlights-rise" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bento-beam pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-2xl transition duration-500 group-hover:opacity-70"
                style={{ background: item.glow }}
              />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition duration-500 group-hover:opacity-100 ${item.accent}`}
              />
              <div className="relative translate-y-1 transition duration-500 group-hover:translate-y-0">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-ink md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted transition duration-500 group-hover:text-ink md:text-[0.95rem]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 ${
            inView ? "highlights-rise highlights-rise-delay" : "opacity-0 translate-y-8"
          }`}
        >
          {metrics.map((metric, index) => (
            <AnimatedMetric
              key={metric.label}
              value={metric.value}
              label={metric.label}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
