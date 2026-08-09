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
      className="pointer-events-none absolute inset-y-0 left-3 z-[1] hidden w-10 md:left-[max(1rem,calc((100vw-72rem)/2+0.5rem))] md:block"
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
          strokeOpacity="0.12"
          vectorEffect="non-scaling-stroke"
        />

        <path
          key={`spine-${thread.id}`}
          d={thread.spine.path}
          stroke={thread.palette.primary}
          strokeWidth="2.2"
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
              r={lit ? 5 : 3.5}
              fill={lit ? thread.palette.accent : "transparent"}
              stroke={thread.palette.primary}
              strokeWidth={1.2}
              strokeOpacity={lit ? 0.9 : 0.35}
              className={lit ? "thread-spine-node-lit" : "thread-spine-node"}
            />
          );
        })}

        <circle
          cx={24}
          cy={680}
          r={progress > 0.62 ? 7 : 5}
          fill={progress > 0.62 ? thread.palette.accent : "transparent"}
          stroke={thread.palette.primary}
          strokeWidth={1.5}
          strokeOpacity={progress > 0.62 ? 1 : 0.4}
          className="thread-spine-knot"
        />
      </svg>
    </div>
  );
}
