"use client";

import AnimatedMetric from "@/components/AnimatedMetric";
import CountUpValue from "@/components/CountUpValue";
import { useInView } from "@/lib/use-in-view";
import { useThread } from "@/lib/threads/use-thread";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="orb-drift absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-emerald/20 blur-3xl" />
      <span className="orb-drift orb-drift-delay absolute right-[12%] top-[8%] h-52 w-52 rounded-full bg-mint/10 blur-3xl" />
      <span className="orb-drift orb-drift-slow absolute bottom-[10%] left-[35%] h-56 w-56 rounded-full bg-moss/15 blur-3xl" />
    </div>
  );
}

function CardStat({ value, label, active }: { value: string; label: string; active: boolean }) {
  const numeric = /^[~+]?[\d]/.test(value);

  return (
    <div className="mb-3">
      {numeric ? (
        <CountUpValue
          active={active}
          delay={120}
          value={value}
          className="block font-[family-name:var(--font-display)] text-[clamp(2.2rem,8vw,3rem)] font-bold tabular-nums leading-none tracking-[-0.04em] text-mint metric-glow"
        />
      ) : (
        <span className="block font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,2.6rem)] font-bold tracking-[-0.03em] text-mint metric-glow">
          {value}
        </span>
      )}
      <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </span>
    </div>
  );
}

export default function HighlightsBento() {
  const { thread } = useThread();
  const { highlights } = thread;
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

      {/* Нить продолжается в секцию */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-24 w-full opacity-40"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 40 C200 10 400 70 600 40 S1000 10 1200 40"
          stroke={thread.palette.primary}
          strokeWidth="2"
          className="thread-section-bridge"
        />
      </svg>

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 hidden transition-opacity duration-500 md:block"
        style={{
          opacity: spotlight.active ? 1 : 0.35,
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(94,224,160,0.16), transparent 42%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl" key={thread.id}>
        <div className={`max-w-2xl ${inView ? "highlights-rise" : ""}`}>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            {highlights.label}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {highlights.heading}
          </h2>
        </div>

        <div className={`mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 ${inView ? "highlights-rise" : ""}`}>
          {highlights.metrics.map((metric, index) => (
            <AnimatedMetric
              key={metric.label}
              value={metric.value}
              label={metric.label}
              delay={index * 150}
              active={inView}
            />
          ))}
        </div>

        <div className="bento-scroll mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:mt-10 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:snap-none md:auto-rows-[minmax(11rem,auto)]">
          {highlights.cards.map((item, index) => (
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
                <CardStat value={item.stat} label={item.statLabel} active={inView} />
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
