"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import type { SiteMode } from "@/lib/site-mode";
import { getThread, modeLabels } from "@/lib/threads/registry";
import { useThread } from "@/lib/threads/use-thread";

const STRANDS: { id: SiteMode; label: string; pegY: number }[] = [
  { id: "public", label: "общество", pegY: 150 },
  { id: "dev", label: "разработка", pegY: 230 },
];

const MODE_ORDER: SiteMode[] = ["public", "dev"];
const SHOULDER = { x: 100, y: 188 };
const HAND = { x: 152, y: 200 };
const PEG_X = 228;
const PICK_MS = 720;

export default function ThreadWeaver() {
  const { mode, setMode, thread } = useThread();
  const [picking, setPicking] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hoverPeg, setHoverPeg] = useState<SiteMode | null>(null);
  const [hoverFigure, setHoverFigure] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPicking(false);
      return;
    }
    setPicking(true);
    const timer = window.setTimeout(() => setPicking(false), PICK_MS);
    return () => window.clearTimeout(timer);
  }, [mode, reduced]);

  const palette = thread.palette;
  const active = STRANDS.find((s) => s.id === mode) ?? STRANDS[0];
  const handX = picking ? PEG_X - 40 : HAND.x;
  const handY = picking ? active.pegY * 0.45 + HAND.y * 0.55 : HAND.y;

  const pickStrand = (id: SiteMode) => {
    if (id === mode) {
      if (!reduced) {
        setPicking(true);
        window.setTimeout(() => setPicking(false), PICK_MS);
      }
      return;
    }
    setMode(id);
  };

  const cycleMode = () => {
    const idx = MODE_ORDER.indexOf(mode);
    setMode(MODE_ORDER[(idx + 1) % MODE_ORDER.length]);
  };

  const onPegKey = (e: KeyboardEvent, id: SiteMode) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pickStrand(id);
    }
  };

  return (
    <div
      className={`thread-weaver ${
        picking ? "thread-weaver-picking" : "thread-weaver-settle"
      } ${hoverFigure || hoverPeg ? "thread-weaver-hot" : ""}`}
      style={
        {
          "--weaver-primary": palette.primary,
          "--weaver-secondary": palette.secondary,
          "--weaver-accent": palette.accent,
        } as CSSProperties
      }
    >
      <p className="weaver-hint">выбери линию</p>

      <svg
        viewBox="0 0 260 360"
        className="h-auto w-full"
        fill="none"
        role="group"
        aria-label="Выбор нити: общество или разработка"
      >
        <path
          d="M228 110 V 280"
          stroke="rgba(155, 187, 171, 0.35)"
          strokeWidth={1.2}
          strokeLinecap="round"
          aria-hidden
        />

        {STRANDS.map((strand) => {
          const isActive = strand.id === mode;
          const isHot = hoverPeg === strand.id;
          const strandPalette = getThread(strand.id).palette;
          return (
            <g key={strand.id}>
              <text
                x={214}
                y={strand.pegY - 12}
                textAnchor="end"
                fill={
                  isActive || isHot
                    ? strandPalette.primary
                    : "rgba(155, 187, 171, 0.5)"
                }
                fontSize={8}
                fontWeight={600}
                letterSpacing="0.08em"
                style={{ textTransform: "uppercase" }}
                aria-hidden
              >
                {strand.label}
              </text>
              <circle
                cx={PEG_X}
                cy={strand.pegY}
                r={16}
                fill="transparent"
                className="weaver-hit"
                role="button"
                tabIndex={0}
                aria-label={`Линия: ${modeLabels[strand.id]}`}
                aria-pressed={isActive}
                onClick={() => pickStrand(strand.id)}
                onKeyDown={(e) => onPegKey(e, strand.id)}
                onMouseEnter={() => setHoverPeg(strand.id)}
                onMouseLeave={() => setHoverPeg(null)}
                onFocus={() => setHoverPeg(strand.id)}
                onBlur={() => setHoverPeg(null)}
              />
              <circle
                cx={PEG_X}
                cy={strand.pegY}
                r={isActive || isHot ? 5 : 3.5}
                fill="rgba(7, 21, 16, 0.95)"
                stroke={
                  isActive
                    ? strandPalette.accent
                    : isHot
                      ? strandPalette.primary
                      : "rgba(155, 187, 171, 0.5)"
                }
                strokeWidth={1.4}
                pointerEvents="none"
                aria-hidden
              />
            </g>
          );
        })}

        <path
          key={`pulled-${mode}`}
          d={`M ${PEG_X} ${active.pegY} Q ${(PEG_X + handX) / 2} ${(active.pegY + handY) / 2 - 12} ${handX} ${handY}`}
          stroke={palette.primary}
          strokeWidth={2.4}
          strokeLinecap="round"
          className={`weaver-pulled ${picking ? "weaver-pulled-draw" : ""}`}
          aria-hidden
        />

        <g
          className={`weaver-figure ${hoverFigure ? "weaver-figure-hot" : ""}`}
          stroke="rgba(232, 246, 238, 0.85)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          role="button"
          tabIndex={0}
          aria-label="Следующая линия"
          onClick={cycleMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              cycleMode();
            }
          }}
          onMouseEnter={() => setHoverFigure(true)}
          onMouseLeave={() => setHoverFigure(false)}
          onFocus={() => setHoverFigure(true)}
          onBlur={() => setHoverFigure(false)}
          style={{ cursor: "pointer" }}
        >
          <rect x={60} y={140} width={100} height={140} fill="transparent" stroke="none" />
          <circle cx={100} cy={158} r={18} fill="rgba(4, 12, 9, 0.95)" stroke="none" />
          <circle cx={100} cy={158} r={15} fill="rgba(7, 21, 16, 0.98)" />
          <path d="M100 173 V 220" />
          <path d="M100 188 L 78 214" />
          <path d={`M${SHOULDER.x} ${SHOULDER.y} L ${handX} ${handY}`} />
          <path d="M100 220 L 86 268" />
          <path d="M100 220 L 116 268" />
          <circle cx={handX} cy={handY} r={5} fill={palette.accent} stroke="none" />
        </g>
      </svg>
    </div>
  );
}
