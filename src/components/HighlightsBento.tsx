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
      description: "Календарь мероприятий и межвузовские проекты.",
      stat: "64",
      statLabel: "активиста",
      span: "md:col-span-2 md:row-span-2",
      accent: "from-emerald/25 to-moss/10",
      glow: "rgba(31,157,99,0.45)",
    },
    {
      title: "Городская повестка",
      description: "Помощник депутата МГД на общественных началах.",
      stat: "МГД",
      statLabel: "город",
      span: "md:col-span-1",
      accent: "from-mint/15 to-emerald/5",
      glow: "rgba(94,224,160,0.35)",
    },
    {
      title: "Публичные выступления",
      description: "Открытия форумов и церемоний.",
      stat: "1200+",
      statLabel: "аудитория",
      span: "md:col-span-1",
      accent: "from-forest/40 to-emerald/10",
      glow: "rgba(20,107,69,0.5)",
    },
    {
      title: "Молодёжные сообщества",
      description: "Форумы, круглые столы, образовательные проекты.",
      stat: "18",
      statLabel: "вузов",
      span: "md:col-span-2",
      accent: "from-moss/20 to-forest/20",
      glow: "rgba(94,224,160,0.28)",
    },
  ],
  dev: [
    {
      title: "Incident automation",
      description: "Классификация, маршрутизация и SLA для линий поддержки.",
      stat: "~30%",
      statLabel: "быстрее",
      span: "md:col-span-2 md:row-span-2",
      accent: "from-emerald/25 to-moss/10",
      glow: "rgba(31,157,99,0.45)",
    },
    {
      title: "High-load backend",
      description: "Массовые инциденты и пиковые нагрузки.",
      stat: "800",
      statLabel: "evt/min",
      span: "md:col-span-1",
      accent: "from-mint/15 to-emerald/5",
      glow: "rgba(94,224,160,0.35)",
    },
    {
      title: "Go + event-driven",
      description: "Kafka, PostgreSQL, gRPC, Redis.",
      stat: "+70%",
      statLabel: "perf",
      span: "md:col-span-1",
      accent: "from-forest/40 to-emerald/10",
      glow: "rgba(20,107,69,0.5)",
    },
    {
      title: "Production ownership",
      description: "Рефакторинг, LLM-сервисы, prod-инциденты.",
      stat: "600k",
      statLabel: "evt/mo",
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

function CardStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="mb-3 flex items-baseline gap-2.5">
      <span className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,6vw,2.5rem)] font-bold tabular-nums tracking-[-0.04em] text-mint metric-glow">
        {value}
      </span>
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </span>
    </div>
  );
}

export default function HighlightsBento() {
  const { mode } = useSiteMode();
  const items = cards[mode];
  const metrics = mode === "public" ? impactMetrics : itMetrics;
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.08, rootMargin: "0px" });
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40, active: false });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
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
      className="highlights-stage relative overflow-hidden border-t border-[var(--hairline)] px-6 py-10 md:px-10 md:py-16"
    >
      <FloatingOrbs />
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 hidden transition-opacity duration-500 md:block"
        style={{
          opacity: spotlight.active ? 1 : 0.35,
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(94,224,160,0.16), transparent 42%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className={`max-w-2xl ${inView ? "highlights-rise" : ""}`}>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            {mode === "public" ? "Фокус" : "Stack & impact"}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {mode === "public"
              ? "Ключевые направления работы"
              : "Что строю на backend"}
          </h2>
        </div>

        <div className={`mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 ${inView ? "highlights-rise" : ""}`}>
          {metrics.map((metric, index) => (
            <AnimatedMetric
              key={metric.label}
              value={metric.value}
              label={metric.label}
              delay={index * 100}
            />
          ))}
        </div>

        <div className="bento-scroll mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:mt-10 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:snap-none md:auto-rows-[minmax(11rem,auto)]">
          {items.map((item, index) => (
            <article
              key={item.title}
              style={{ animationDelay: `${index * 80}ms` }}
              className={`bento-card bento-card-live group relative w-[82vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg-mid)_88%,transparent)] p-5 shadow-[0_20px_60px_-40px_var(--glow)] md:w-auto md:shrink md:p-6 ${item.span} ${
                inView ? "highlights-rise" : ""
              }`}
            >
              <div className="bento-beam pointer-events-none absolute inset-0 rounded-2xl opacity-40 md:opacity-0 md:group-hover:opacity-100" />
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-30 blur-2xl md:opacity-0 md:group-hover:opacity-70"
                style={{ background: item.glow }}
              />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition duration-500 group-hover:opacity-100 ${item.accent}`}
              />
              <div className="relative">
                <CardStat value={item.stat} label={item.statLabel} />
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-ink md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
