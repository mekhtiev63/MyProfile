"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  const hasRun = useRef(false);
  const [display, setDisplay] = useState(value);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    if (!parsed) {
      setDisplay(value);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    setRunning(true);
    const duration = 1800;
    const startAt = performance.now() + delay;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - startAt;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      const current = Math.round(parsed.target * eased);
      setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setRunning(false);
      }
    };

    setDisplay(`${parsed.prefix}0${parsed.suffix}`);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, delay, parsed, value]);

  const shown = running || hasRun.current ? display : value;

  return (
    <span aria-label={value} className={`${className} ${running ? "metric-counting" : ""}`}>
      {shown}
    </span>
  );
}
