"use client";

import { about } from "@/data/publicActivity";
import { useSiteMode } from "@/lib/site-mode";

export default function About() {
  const { mode } = useSiteMode();
  const content = about[mode];

  return (
    <section
      id="about"
      className="relative border-t border-[var(--hairline)] bg-[var(--bg-deep)] px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.2fr] md:gap-20">
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Обо мне
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {content.title}
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
