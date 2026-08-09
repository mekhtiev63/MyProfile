"use client";

import { useInView } from "@/lib/use-in-view";

export default function AnimatedMetric({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15, rootMargin: "0px" });

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`metric-card group/metric relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg-mid)_90%,transparent)] px-3 py-5 text-center backdrop-blur-sm sm:px-4 ${
        inView ? "metric-pop-in" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 metric-card-glow opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/50 to-transparent" />
      <p className="relative font-[family-name:var(--font-display)] text-[clamp(1.85rem,6.5vw,2.5rem)] font-bold tabular-nums tracking-[-0.04em] text-mint metric-glow">
        {value}
      </p>
      <p className="relative mt-2 text-[0.7rem] leading-snug text-ink-muted sm:text-xs">{label}</p>
    </div>
  );
}
