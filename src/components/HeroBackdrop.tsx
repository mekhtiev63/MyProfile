"use client";

import { useSiteMode } from "@/lib/site-mode";

/** Атмосфера без 3D-туториала: две линии пути, акцент зависит от режима */
export default function HeroBackdrop() {
  const { mode } = useSiteMode();
  const publicActive = mode === "public";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: publicActive
            ? "radial-gradient(ellipse 70% 55% at 78% 35%, rgba(31,157,99,0.28), transparent 55%), radial-gradient(ellipse 45% 40% at 20% 70%, rgba(13,59,42,0.45), transparent 50%)"
            : "radial-gradient(ellipse 60% 50% at 75% 40%, rgba(94,224,160,0.16), transparent 50%), radial-gradient(ellipse 40% 35% at 25% 65%, rgba(20,107,69,0.35), transparent 50%)",
        }}
      />

      <svg
        className="absolute right-[-8%] top-[12%] h-[70%] w-[70%] opacity-70 md:right-[2%] md:w-[55%]"
        viewBox="0 0 600 600"
        fill="none"
      >
        <path
          d="M80 420 C180 380 220 260 300 220 C380 180 420 120 520 90"
          stroke={publicActive ? "#5ee0a0" : "#146b45"}
          strokeWidth={publicActive ? 2.5 : 1.2}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        <path
          d="M100 480 C200 440 260 340 340 300 C420 260 470 200 540 160"
          stroke={publicActive ? "#1f9d63" : "#5ee0a0"}
          strokeWidth={publicActive ? 1.2 : 2.5}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        <circle
          cx={publicActive ? 300 : 340}
          cy={publicActive ? 220 : 300}
          r="6"
          fill="#5ee0a0"
          className="transition-all duration-500"
        />
      </svg>

      <div className="site-grain" />
    </div>
  );
}
