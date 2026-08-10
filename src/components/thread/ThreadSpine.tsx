"use client";

import { useThread } from "@/lib/threads/use-thread";
import { useScrollSpine } from "@/lib/threads/use-scroll-spine";

const SPINE_ANCHOR_ID = "thread-spine-anchor";

export function threadSpineAnchorId() {
  return SPINE_ANCHOR_ID;
}

export default function ThreadSpine() {
  const { thread, ghost } = useThread();
  const progress = useScrollSpine(SPINE_ANCHOR_ID);
  const drawOffset = 1 - progress;

  return (
    <div
      aria-hidden
      className="thread-spine pointer-events-none absolute inset-y-0 z-0 hidden w-8 md:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 48 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={ghost.spine.path}
          stroke={ghost.palette.secondary}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.1"
          vectorEffect="non-scaling-stroke"
        />

        <path
          key={`spine-${thread.id}`}
          d={thread.spine.path}
          stroke={thread.palette.primary}
          strokeWidth="1.6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={drawOffset}
          vectorEffect="non-scaling-stroke"
          className="thread-spine-line transition-[stroke] duration-500"
        />

        {thread.spine.metricNodes.map((position, index) => {
          const lit = progress >= position - 0.04;
          return (
            <circle
              key={`spine-node-${thread.id}-${index}`}
              cx={24}
              cy={position * 1000}
              r={lit ? 4 : 3}
              fill={lit ? thread.palette.accent : "transparent"}
              stroke={thread.palette.primary}
              strokeWidth={1}
              strokeOpacity={lit ? 0.75 : 0.25}
              className={lit ? "thread-spine-node-lit" : "thread-spine-node"}
            />
          );
        })}

        <circle
          cx={24}
          cy={680}
          r={progress > 0.62 ? 5.5 : 4}
          fill={progress > 0.62 ? thread.palette.accent : "transparent"}
          stroke={thread.palette.primary}
          strokeWidth={1.2}
          strokeOpacity={progress > 0.62 ? 0.85 : 0.3}
          className="thread-spine-knot"
        />
      </svg>
    </div>
  );
}
