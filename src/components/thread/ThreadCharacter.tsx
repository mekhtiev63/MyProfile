"use client";

import {
  Alignment,
  Fit,
  Layout,
  useRive,
} from "@rive-app/react-canvas";
import {
  RIVE_ARTBOARDS,
  RIVE_CHARACTER_SRC,
  RIVE_IDLE_ANIMATION,
  THREAD_STRAND_LABELS,
} from "@/lib/threads/rive-character";
import { useThread } from "@/lib/threads/use-thread";
import type { SiteMode } from "@/lib/site-mode";
import { useSiteMode } from "@/lib/site-mode";
import { useEffect, useRef, useState } from "react";

const THREAD_MODES: SiteMode[] = ["public", "dev", "athlete"];

function ThreadStrands({
  activeMode,
  picking,
  palette,
}: {
  activeMode: SiteMode;
  picking: boolean;
  palette: { primary: string; secondary: string; accent: string };
}) {
  return (
    <svg
      aria-hidden
      className="thread-character-strands pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 320 420"
      fill="none"
    >
      {THREAD_MODES.map((threadMode, index) => {
        const active = threadMode === activeMode;
        const y = 118 + index * 54;
        const color =
          threadMode === activeMode
            ? palette.primary
            : "rgba(94, 224, 160, 0.22)";

        return (
          <g
            key={threadMode}
            className={`thread-strand ${active ? "thread-strand-active" : "thread-strand-idle"} ${
              active && picking ? "thread-strand-picking" : ""
            }`}
          >
            <path
              d={`M24 ${y} C 90 ${y - 18}, 150 ${y + 10}, 210 ${y - 6} S 290 ${y + 8}, 300 ${y}`}
              stroke={color}
              strokeWidth={active ? 2.6 : 1.4}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={active ? 0 : 0.35}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={24}
              cy={y}
              r={active ? 5 : 3.5}
              fill={active ? palette.accent : "transparent"}
              stroke={color}
              strokeWidth={1.2}
            />
            <text
              x={8}
              y={y + 22}
              fill={active ? palette.primary : "rgba(155, 187, 171, 0.55)"}
              className="font-[family-name:var(--font-body)] text-[9px] font-semibold uppercase tracking-[0.14em]"
            >
              {THREAD_STRAND_LABELS[threadMode]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function RiveAvatar({ mode }: { mode: SiteMode }) {
  const { RiveComponent } = useRive({
    src: RIVE_CHARACTER_SRC,
    artboard: RIVE_ARTBOARDS[mode],
    animations: RIVE_IDLE_ANIMATION,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.BottomCenter,
    }),
  });

  return (
    <div className="relative h-full w-full">
      <RiveComponent className="h-full w-full" aria-hidden />
    </div>
  );
}

export default function ThreadCharacter() {
  const { mode } = useSiteMode();
  const { thread } = useThread();
  const [picking, setPicking] = useState(false);
  const prevMode = useRef(mode);

  useEffect(() => {
    if (prevMode.current === mode) return;
    prevMode.current = mode;
    setPicking(true);
    const timer = window.setTimeout(() => setPicking(false), 720);
    return () => window.clearTimeout(timer);
  }, [mode]);

  return (
    <div
      className={`thread-character relative mx-auto aspect-[4/5] w-[min(100%,18rem)] sm:w-72 md:mx-0 md:w-80 ${
        picking ? "thread-character-picking" : ""
      }`}
      aria-hidden
    >
      <ThreadStrands activeMode={mode} picking={picking} palette={thread.palette} />

      <div
        className="thread-character-glow pointer-events-none absolute inset-x-6 bottom-8 top-16 rounded-[40%] opacity-70 blur-3xl"
        style={{ background: thread.palette.glow }}
      />

      <div className="thread-character-avatar absolute inset-x-2 bottom-0 top-10">
        <RiveAvatar key={mode} mode={mode} />
      </div>

      <p className="pointer-events-none absolute bottom-1 left-0 right-0 text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        {THREAD_STRAND_LABELS[mode]} · нить
      </p>
    </div>
  );
}
