"use client";

import CountUpValue from "@/components/CountUpValue";
import { useThread } from "@/lib/threads/use-thread";

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
  const { thread } = useThread();

  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`metric-card relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg-mid)_92%,transparent)] px-3 py-5 text-center sm:px-4 ${
        active ? "metric-pop-in metric-thread-node" : ""
      }`}
    >
      <span
        aria-hidden
        className="absolute left-2 top-3 hidden h-2 w-2 rounded-full md:inline-block"
        style={{
          background: active ? thread.palette.accent : "transparent",
          boxShadow: active ? `0 0 12px ${thread.palette.glow}` : undefined,
          border: `1px solid ${thread.palette.primary}`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 metric-card-glow" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-mint/10" />
      <CountUpValue
        active={active}
        delay={delay}
        value={value}
        className="relative block font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,2.75rem)] font-bold tabular-nums leading-none tracking-[-0.04em] text-emerald"
      />
      <p className="relative mt-3 text-[0.7rem] leading-snug text-ink-muted sm:text-xs">{label}</p>
    </div>
  );
}
