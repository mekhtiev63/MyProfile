"use client";

import CountUpValue from "@/components/CountUpValue";

export default function AnimatedMetric({
  value,
  label,
  delay = 0,
  active = false,
}: {
  value: string;
  label: string;
  delay?: number;
  active?: boolean;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`metric-card relative overflow-hidden rounded-2xl border border-mint/20 bg-[color-mix(in_srgb,var(--bg-mid)_92%,transparent)] px-3 py-5 text-center shadow-[inset_0_1px_0_rgba(94,224,160,0.15)] sm:px-4 ${
        active ? "metric-pop-in" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 metric-card-glow" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-mint/10" />
      <CountUpValue
        active={active}
        delay={delay}
        value={value}
        className="relative block font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,2.75rem)] font-bold tabular-nums leading-none tracking-[-0.04em] text-mint metric-glow"
      />
      <p className="relative mt-3 text-[0.7rem] leading-snug text-ink-muted sm:text-xs">{label}</p>
    </div>
  );
}
