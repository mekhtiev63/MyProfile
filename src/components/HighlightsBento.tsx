"use client";

import CountUpValue from "@/components/CountUpValue";
import SectionIndex from "@/components/SectionIndex";
import { useSectionId } from "@/lib/site-mode";
import { useInView } from "@/lib/use-in-view";
import { useThread } from "@/lib/threads/use-thread";

export default function HighlightsBento() {
  const { mode, thread } = useThread();
  const { highlights } = thread;
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.08, rootMargin: "0px" });
  const isPublic = mode === "public";
  const sectionId = useSectionId("highlights");

  const heroMetric = highlights.metrics[0];
  const rest = highlights.metrics.slice(1);

  return (
    <section
      id={sectionId}
      data-sid="highlights"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--color-rule)] px-[var(--gutter)] py-[var(--section-gap-s)]"
    >
      <SectionIndex n="01" />

      <div className="relative mx-auto max-w-[var(--container)]" key={thread.id}>
        <div className="grid gap-10 md:grid-cols-12 md:gap-[var(--gap-columns)] md:items-end">
          <div className="md:col-span-7">
            <p className="text-sm text-[var(--color-muted)]">{highlights.label}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-ink)]">
              {highlights.heading}
            </h2>
          </div>
        </div>

        {/* Poster figure: one impossible number */}
        <div className="mt-12 grid items-end gap-8 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-8">
            {heroMetric && (
              <div>
                <CountUpValue
                  active={inView}
                  delay={80}
                  value={heroMetric.value}
                  className="block font-[family-name:var(--font-display)] text-[length:var(--text-poster)] font-bold leading-[0.85] tracking-[-0.05em] text-[var(--color-mark)] tabular-nums"
                />
                <p className="mt-4 max-w-[24ch] text-base text-[var(--color-muted)] md:text-lg">
                  {heroMetric.label}
                </p>
              </div>
            )}
          </div>
          <ul className="flex flex-col gap-5 md:col-span-4 md:pb-3">
            {rest.map((metric) => (
              <li key={metric.label} className="border-t border-[var(--color-rule)] pt-4">
                <CountUpValue
                  active={inView}
                  delay={120}
                  value={metric.value}
                  className="block font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.03em] text-[var(--color-ink)] tabular-nums md:text-4xl"
                />
                <p className="mt-1 text-sm text-[var(--color-muted)]">{metric.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Work cards as index rows, not tiles */}
        <ul className="mt-16 border-t border-[var(--color-rule)] md:mt-20">
          {highlights.cards.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 border-b border-[var(--color-rule)] py-8 md:grid-cols-12 md:gap-6 md:py-10"
            >
              <p
                className={`font-[family-name:var(--font-display)] text-3xl font-bold tabular-nums tracking-[-0.03em] md:col-span-2 md:text-4xl ${
                  isPublic ? "text-[var(--color-mark)]" : "text-[var(--color-accent)]"
                }`}
              >
                {item.stat}
              </p>
              <div className="md:col-span-4">
                <p className="text-sm text-[var(--color-muted)]">{item.statLabel}</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  {item.title}
                </h3>
              </div>
              <p className="text-base leading-relaxed text-[var(--color-muted)] md:col-span-6 md:text-[1.05rem]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
