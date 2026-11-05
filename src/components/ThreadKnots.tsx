"use client";

import SectionIndex from "@/components/SectionIndex";
import { threadKnots, type ThreadKnot } from "@/data/threadKnots";
import { useSectionId, type SiteMode } from "@/lib/site-mode";
import { useThread } from "@/lib/threads/use-thread";

function KnotMark({ modes, active }: { modes: SiteMode[]; active: boolean }) {
  const both = modes.includes("public") && modes.includes("dev");
  const onlyPublic = modes.length === 1 && modes[0] === "public";
  const opacity = active ? 1 : 0.45;

  if (both) {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-8 w-12 shrink-0"
        aria-hidden
        style={{ opacity }}
      >
        <path
          d="M3 9 C14 9 18 23 45 23"
          fill="none"
          stroke="var(--color-mark)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3 23 C14 23 18 9 45 9"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="16" r="3.5" fill="var(--color-ink)" />
        <circle cx="24" cy="16" r="1.5" fill="var(--color-paper)" />
      </svg>
    );
  }

  const stroke = onlyPublic ? "var(--color-mark)" : "var(--color-accent)";
  return (
    <svg
      viewBox="0 0 48 32"
      className="h-8 w-12 shrink-0"
      aria-hidden
      style={{ opacity }}
    >
      <path
        d="M3 16 H45"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="16" r="3.5" fill={stroke} />
      <circle cx="24" cy="16" r="1.5" fill="var(--color-paper)" />
    </svg>
  );
}

function primaryMode(knot: ThreadKnot, current: SiteMode): SiteMode {
  if (knot.modes.includes(current)) return current;
  return knot.modes[0];
}

export default function ThreadKnots() {
  const { mode, setMode } = useThread();
  const sectionId = useSectionId("knots");

  return (
    <section
      id={sectionId}
      data-sid="knots"
      className="relative border-t border-[var(--color-rule)] px-[var(--gutter)] py-[var(--section-gap-s)]"
    >
      <SectionIndex n="05" />
      <div className="mx-auto max-w-[var(--container)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-xl">
            <p className="text-sm text-[var(--color-muted)]">Узлы</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-ink)]">
              Где линии сходятся
            </h2>
          </div>
          <p className="max-w-[28ch] text-sm leading-relaxed text-[var(--color-muted)] md:pb-1">
            Нажми узел — сменит линию.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {threadKnots.map((knot) => {
            const related = knot.modes.includes(mode);
            return (
              <li key={knot.id}>
                <button
                  type="button"
                  onClick={() => setMode(primaryMode(knot, mode))}
                  className={`flex h-full w-full cursor-pointer flex-col gap-3 border border-[var(--color-rule)] p-5 text-left transition md:p-6 ${
                    related
                      ? "border-[var(--color-ink)] bg-[color-mix(in_oklab,var(--color-paper-2)_70%,transparent)]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-pressed={related}
                >
                  <div className="flex items-center justify-between gap-3">
                    <KnotMark modes={knot.modes} active={related} />
                    <span className="text-xs text-[var(--color-muted)]">{knot.tag}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-xl">
                    {knot.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                    {knot.description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
