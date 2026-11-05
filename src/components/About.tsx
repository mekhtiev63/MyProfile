"use client";

import EventCardsDeck from "@/components/EventCardsDeck";
import SectionIndex from "@/components/SectionIndex";
import { about } from "@/data/publicActivity";
import { useThread } from "@/lib/threads/use-thread";
import { useSectionId, useSiteMode } from "@/lib/site-mode";

export default function About() {
  const { mode } = useSiteMode();
  const { thread } = useThread();
  const content = about[mode];
  const isPublic = mode === "public";
  const sectionId = useSectionId("about");

  return (
    <section
      id={sectionId}
      data-sid="about"
      className="relative border-t border-[var(--color-rule)] px-[var(--gutter)] py-[var(--section-gap-s)]"
    >
      <SectionIndex n="02" />

      <div className="mx-auto max-w-[var(--container)]">
        <div className="grid gap-8 md:grid-cols-12 md:gap-[var(--gap-columns)]">
          <div className="md:col-span-4">
            <p className="text-sm text-[var(--color-muted)]">Обо мне</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-ink)]">
              {content.title}
            </h2>
            <p className="mt-4 text-sm text-[var(--color-accent)]">{thread.about.anchor}</p>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-[var(--color-muted)] md:col-span-7 md:col-start-6 md:space-y-5 md:text-lg">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {isPublic && (
          <div className="mt-14 border-t border-[var(--color-rule)] pt-10 md:mt-16 md:pt-12">
            <p className="text-sm text-[var(--color-muted)]">Кадры с мест</p>
            <div className="mt-6">
              <EventCardsDeck />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
