"use client";

import EventCardsDeck from "@/components/EventCardsDeck";
import SectionIndex from "@/components/SectionIndex";
import { about } from "@/data/publicActivity";
import { useThread } from "@/lib/threads/use-thread";
import { useSiteMode } from "@/lib/site-mode";

export default function About() {
  const { mode } = useSiteMode();
  const { thread } = useThread();
  const content = about[mode];
  const isPublic = mode === "public";

  return (
    <section
      id="about"
      className="relative border-t border-[var(--hairline)] bg-[var(--bg-deep)] px-6 py-16 md:px-10 md:py-24"
    >
      <SectionIndex n="02" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${thread.palette.primary}, transparent)`,
          opacity: 0.45,
        }}
      />

      <div className="civic-panel mx-auto max-w-6xl">
        {isPublic ? (
          <>
            <div className="max-w-3xl">
              <span className="civic-kicker-bar" aria-hidden />
              <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
                Обо мне
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                {content.title}
              </h2>
              <p
                className="mt-5 inline-flex items-center gap-2 text-sm text-ink-faint"
                style={{ color: thread.palette.primary }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full thread-spine-knot"
                  style={{ background: thread.palette.accent }}
                />
                {thread.about.anchor}
              </p>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
                {content.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-[var(--hairline)] pt-10 md:mt-14 md:pt-12">
              <EventCardsDeck />
            </div>
          </>
        ) : (
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.2fr] md:gap-20">
            <div>
              <span className="civic-kicker-bar" aria-hidden />
              <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
                Обо мне
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                {content.title}
              </h2>
              <p
                className="mt-5 inline-flex items-center gap-2 text-sm text-ink-faint"
                style={{ color: thread.palette.primary }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full thread-spine-knot"
                  style={{ background: thread.palette.accent }}
                />
                {thread.about.anchor}
              </p>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
