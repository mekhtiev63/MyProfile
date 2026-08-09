"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useThread } from "@/lib/threads/use-thread";

export default function ThreadCanvas() {
  const { thread, ghost } = useThread();
  const [morphing, setMorphing] = useState(false);
  const [parallax, setParallax] = useState(0);

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
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 transition-[background,opacity] duration-500 ease-out"
        style={{
          background: thread.palette.atmosphere,
          opacity: morphing ? 0.82 : 1,
        }}
      />

      <svg
        className={`thread-svg absolute right-[-12%] top-[8%] h-[75%] w-[85%] md:right-0 md:top-[10%] md:h-[72%] md:w-[58%] ${
          morphing ? "thread-morphing" : ""
        }`}
        viewBox="0 0 600 600"
        fill="none"
        style={
          {
            "--thread-primary": thread.palette.primary,
            "--thread-secondary": thread.palette.secondary,
            "--thread-dash": thread.motion.dashDuration,
            transform: `translate3d(0, ${parallax}px, 0)`,
          } as CSSProperties
        }
      >
        {/* Ghost thread — намёк на переплетение */}
        <path
          key={`ghost-${ghost.id}`}
          d={ghost.paths.ghost}
          stroke={ghost.palette.secondary}
          strokeWidth={1}
          strokeLinecap="round"
          strokeOpacity={0.14}
          className="transition-all duration-500"
        />

        <path
          key={`secondary-${thread.id}`}
          d={thread.paths.secondary}
          stroke="var(--thread-secondary)"
          strokeWidth={
            thread.motion.pulse === "sharp" ? 1.4 : thread.motion.pulse === "rhythm" ? 1.3 : 1.1
          }
          strokeLinecap="round"
          strokeOpacity={0.75}
          className={`thread-line-secondary transition-all duration-500 ${
            thread.motion.pulse === "rhythm" ? "thread-line-rhythm" : ""
          }`}
        />

        <path
          key={`main-${thread.id}`}
          d={thread.paths.main}
          stroke="var(--thread-primary)"
          strokeWidth={
            thread.motion.pulse === "sharp" ? 2.2 : thread.motion.pulse === "rhythm" ? 2.4 : 2.6
          }
          strokeLinecap="round"
          className={`thread-line-main transition-all duration-500 ${
            thread.motion.pulse === "rhythm" ? "thread-line-rhythm" : ""
          }`}
        />

        {thread.paths.nodes.map((node, index) => (
          <g key={`${thread.id}-node-${index}`}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={thread.motion.pulse === "sharp" ? 4 : thread.motion.pulse === "rhythm" ? 4.5 : 5}
              fill={thread.palette.accent}
              className={
                thread.motion.pulse === "sharp"
                  ? "thread-node-sharp"
                  : thread.motion.pulse === "rhythm"
                    ? "thread-node-rhythm"
                    : "thread-node-soft hero-glow"
              }
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={12}
              stroke={thread.palette.primary}
              strokeWidth={1}
              strokeOpacity={0.25}
              className="thread-node-ring"
            />
          </g>
        ))}
      </svg>

      <div className="site-grain" />
    </div>
  );
}
