"use client";

import { useEffect, useMemo, useState } from "react";

type ParsedValue = {
  prefix: string;
  target: number;
  suffix: string;
};

function parseValue(raw: string): ParsedValue | null {
  const match = raw.match(/^([^0-9]*?)([\d]+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;

  const target = Number.parseFloat(match[2].replace(",", "."));
  if (Number.isNaN(target)) return null;

  return { prefix: match[1], target, suffix: match[3] };
}

function formatCurrent(parsed: ParsedValue, current: number) {
  const isFloat = !Number.isInteger(parsed.target);
  const text = isFloat ? current.toFixed(1) : String(Math.round(current));
  return `${parsed.prefix}${text}${parsed.suffix}`;
}

export default function CountUpValue({
  value,
  active,
  delay = 0,
  className = "",
}: {
  value: string;
  active: boolean;
  delay?: number;
  className?: string;
}) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(value);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplay(value);
      setRunning(false);
      return;
    }

    if (!parsed) {
      setDisplay(value);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let cancelled = false;
    let frame = 0;
    const duration = 1800;
    const startAt = performance.now() + delay;

    setRunning(true);
    setDisplay(formatCurrent(parsed, 0));

    const tick = (now: number) => {
      if (cancelled) return;

      const elapsed = now - startAt;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      const current = parsed.target * eased;
      setDisplay(formatCurrent(parsed, current));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
        setRunning(false);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [active, delay, parsed, value]);

  return (
    <span aria-label={value} className={`${className} ${running ? "metric-counting" : ""}`}>
      {display}
    </span>
  );
}
