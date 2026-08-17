"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  braidCrossings,
  braidOrder,
  braidPaths,
  braidUnifiedPath,
  BRAID_KNOT,
} from "@/lib/threads/braid";
import { getThread } from "@/lib/threads/registry";
import { useThread } from "@/lib/threads/use-thread";
import type { SiteMode } from "@/lib/site-mode";

export default function ThreadCanvas() {
  const { mode, setMode, thread } = useThread();
  const [morphing, setMorphing] = useState(false);
  const [parallax, setParallax] = useState(0);
  const [hoverMode, setHoverMode] = useState<SiteMode | null>(null);

  useEffect(() => {
    setMorphing(true);
    const timer = window.setTimeout(() => setMorphing(false), thread.motion.morphMs);
    return () => window.clearTimeout(timer);
  }, [thread.id, thread.motion.morphMs]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => setParallax(Math.min(window.scrollY * 0.12, 80));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-[background,opacity] duration-500 ease-out"
        style={{
          background: thread.palette.atmosphere,
          opacity: morphing ? 0.82 : 1,
        }}
        aria-hidden
      />

      <svg
        className={`thread-svg pointer-events-none absolute right-[-6%] top-[4%] h-[70%] w-[62%] md:right-0 md:top-[8%] md:h-[68%] md:w-[46%] ${
          morphing ? "thread-morphing" : ""
        }`}
        viewBox="0 0 600 600"
        fill="none"
        role="img"
        aria-label="Две нити сходятся в одну"
        style={
          {
            "--thread-primary": thread.palette.primary,
            "--thread-secondary": thread.palette.secondary,
            "--thread-dash": thread.motion.dashDuration,
            transform: `translate3d(0, ${parallax}px, 0)`,
          } as CSSProperties
        }
      >
        {/* Три подхода к узлу */}
        {braidOrder
          .filter((id) => id !== mode)
          .concat(mode)
          .map((id) => {
            const profile = getThread(id);
            const path = braidPaths[id];
            const active = id === mode;
            const hot = hoverMode === id;
            const opacity = active ? 0.95 : hot ? 0.7 : 0.38;

            return (
              <g key={`braid-${id}`}>
                <path
                  d={path.d}
                  stroke={profile.palette.primary}
                  strokeWidth={active ? 2.8 : hot ? 2 : 1.45}
                  strokeLinecap="round"
                  strokeOpacity={opacity}
                  className="thread-line-main transition-all duration-500"
                />
                <path
                  d={path.d}
                  stroke="transparent"
                  strokeWidth={20}
                  strokeLinecap="round"
                  className="pointer-events-auto cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Линия: ${profile.label}`}
                  aria-pressed={active}
                  onClick={() => setMode(id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setMode(id);
                    }
                  }}
                  onMouseEnter={() => setHoverMode(id)}
                  onMouseLeave={() => setHoverMode(null)}
                  onFocus={() => setHoverMode(id)}
                  onBlur={() => setHoverMode(null)}
                />
                {active &&
                  path.nodes.map((node, index) => (
                    <circle
                      key={`${id}-node-${index}`}
                      cx={node.cx}
                      cy={node.cy}
                      r={4}
                      fill={profile.palette.accent}
                      className="thread-node-soft"
                    />
                  ))}
              </g>
            );
          })}

        {/* Одна общая линия после пересечения */}
        <path
          d={braidUnifiedPath}
          stroke={thread.palette.primary}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeOpacity={0.9}
          className="thread-line-main transition-[stroke] duration-500"
        />
        <path
          d={braidUnifiedPath}
          stroke={thread.palette.secondary}
          strokeWidth={1}
          strokeLinecap="round"
          strokeOpacity={0.35}
          strokeDasharray="4 10"
          className="transition-[stroke] duration-500"
        />

        {/* Единственный узел схождения */}
        {braidCrossings.map((crossing) => (
          <g key={`cross-${crossing.cx}-${crossing.cy}`}>
            <circle
              cx={crossing.cx}
              cy={crossing.cy}
              r={18}
              fill={thread.palette.glow}
              opacity={0.45}
            />
            <circle
              cx={BRAID_KNOT.cx}
              cy={BRAID_KNOT.cy}
              r={8}
              fill={thread.palette.accent}
              stroke="#e8f6ee"
              strokeWidth={2}
              className="thread-spine-knot"
            />
          </g>
        ))}
      </svg>

      <div className="site-grain" aria-hidden />
    </div>
  );
}
