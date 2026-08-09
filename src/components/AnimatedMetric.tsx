"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "@/lib/use-in-view";

type ParsedMetric = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
};

function parseMetricValue(raw: string): ParsedMetric | null {
  const match = raw.match(/^([^0-9]*?)([\d]+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numberPart, suffix] = match;
  const normalized = numberPart.replace(",", ".");
  const target = Number.parseFloat(normalized);
  if (Number.isNaN(target)) return null;

  const decimals = normalized.includes(".") ? normalized.split(".")[1]?.length ?? 0 : 0;
  return { prefix, target, suffix, decimals };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function AnimatedMetric({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!inView || !parsed) {
      if (parsed) setDisplay(`${parsed.prefix}0${parsed.suffix}`);
      return;
    }

    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now() + delay;

    let frame = 0;
    const tick = (now: number) => {
      if (now < start) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = parsed.target * eased;
      const formatted =
        parsed.decimals > 0 ? current.toFixed(parsed.decimals) : Math.round(current).toString();

      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [delay, inView, parsed, reduced, value]);

  return (
    <div
      ref={ref}
      className="group/metric relative overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--bg-deep)]/70 px-4 py-4 text-center backdrop-blur-sm transition duration-500 hover:border-mint/35 hover:shadow-[0_0_40px_-18px_var(--glow)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover/metric:opacity-100">
        <div className="metric-shimmer absolute inset-0" />
      </div>
      <p className="relative font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-mint sm:text-2xl">
        {display}
      </p>
      <p className="relative mt-1 text-xs leading-snug text-ink-faint">{label}</p>
    </div>
  );
}
