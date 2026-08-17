"use client";

import SectionIndex from "@/components/SectionIndex";
import { threadKnots } from "@/data/threadKnots";
import { modeLabels } from "@/lib/threads/registry";
import { useThread } from "@/lib/threads/use-thread";

export default function ThreadKnots() {
  const { mode, setMode, thread } = useThread();

  return (
    <section
      id="knots"
      className="relative border-t border-[var(--hairline)] px-6 py-16 md:px-10 md:py-24"
      style={{
        background: "var(--bg-deep)",
      }}
    >
      <SectionIndex n="04" />
      <div className="civic-panel mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="civic-kicker-bar" aria-hidden />
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Пересечения
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            Где линии сходятся
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            Две ветки — общество и разработка — не живут отдельно. Ниже узлы,
            где они пересекаются в реальных проектах.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {threadKnots.map((knot) => {
            const related = knot.modes.includes(mode);
            return (
              <li
                key={knot.id}
                className="relative rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg-mid)_88%,transparent)] p-5 transition duration-300 md:p-6"
                style={{
                  borderColor: related
                    ? `${thread.palette.primary}55`
                    : undefined,
                  boxShadow: related
                    ? `0 20px 50px -36px ${thread.palette.glow}`
                    : undefined,
                }}
              >
                <p
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: thread.palette.primary }}
                >
                  {knot.tag}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-ink">
                  {knot.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {knot.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {knot.modes.map((id) => {
                    const active = mode === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMode(id)}
                        className="cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-semibold tracking-[0.02em] transition hover:border-[var(--ink-muted)] hover:text-ink"
                        style={{
                          borderColor: active
                            ? "var(--color-primary, var(--emerald))"
                            : "var(--hairline)",
                          color: active
                            ? "var(--on-primary)"
                            : "var(--ink-faint)",
                          background: active
                            ? "var(--color-primary, var(--emerald))"
                            : "transparent",
                        }}
                        aria-pressed={active}
                      >
                        {modeLabels[id]}
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
