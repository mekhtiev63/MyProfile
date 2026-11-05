"use client";

import { useId } from "react";
import type { CSSProperties } from "react";
import { useSiteMode } from "@/lib/site-mode";
import { useThread } from "@/lib/threads/use-thread";
import { useSpineNodes } from "@/lib/threads/use-spine-nodes";

/**
 * One scroll choreography per layer (Hallmark scroll-choreography §3).
 * Each dual-render layer owns its own spine + section measurements.
 */
export default function ThreadSpine() {
  const uid = useId();
  const anchorId = `thread-spine-${uid.replace(/:/g, "")}`;
  const { mode, activeMode } = useSiteMode();
  const { thread, ghost } = useThread();
  const { nodes, activeId } = useSpineNodes(anchorId, mode === activeMode);

  const ink = mode === "public" ? "var(--color-ink)" : "var(--color-accent)";
  const mark = mode === "public" ? "var(--color-mark)" : "var(--color-accent)";
  const ghostStroke = mode === "public" ? "var(--color-rule)" : ghost.palette.secondary;

  return (
    <div
      id={anchorId}
      aria-hidden
      className="thread-spine pointer-events-none absolute inset-y-0 z-0 hidden min-[40rem]:block"
      style={
        {
          "--spine-ink": ink,
          "--spine-mark": mark,
        } as CSSProperties
      }
    >
      <div className="thread-spine-rule">
        <div className="thread-spine-rule-fill" />
      </div>

      <svg
        className="thread-spine-svg h-full w-full"
        viewBox="0 0 48 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={ghost.spine.path}
          stroke={ghostStroke}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.3"
          vectorEffect="non-scaling-stroke"
        />

        <path
          key={`spine-${thread.id}`}
          d={thread.spine.path}
          stroke="var(--spine-ink)"
          strokeWidth="2.75"
          strokeLinecap="round"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          className="thread-spine-line"
        />

        {nodes.map((node) => {
          const lit = activeId === node.id;
          return (
            <circle
              key={node.id}
              cx={24}
              cy={node.t * 1000}
              r={lit ? 6 : 4}
              fill={lit ? "var(--spine-mark)" : "var(--color-paper)"}
              stroke="var(--spine-ink)"
              strokeWidth={1.5}
              strokeOpacity={lit ? 1 : 0.45}
              className={lit ? "thread-spine-node-lit" : "thread-spine-node"}
            />
          );
        })}
      </svg>
    </div>
  );
}
