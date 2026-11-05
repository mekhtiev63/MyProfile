"use client";

import ExperienceTimeline from "@/components/ExperienceTimeline";
import SectionIndex from "@/components/SectionIndex";
import {
  competencies,
  recognitions,
  type RecognitionItem,
  type RecognitionKind,
} from "@/data/publicActivity";
import { useSectionId } from "@/lib/site-mode";

const kindLabel: Record<RecognitionKind, string> = {
  "благодарственное письмо": "Благодарственное письмо",
  благодарность: "Благодарность",
};

function FeaturedRecognition({ item }: { item: RecognitionItem }) {
  return (
    <article className="recognition-featured mt-8">
      {item.image && (
        <div className="recognition-featured-media">
          <img src={item.image} alt={item.imageAlt ?? item.from} width={960} height={640} />
        </div>
      )}
      <div className="recognition-featured-body">
        <p className="text-sm text-[var(--color-muted)]">{kindLabel[item.kind]}</p>
        <h3 className="recognition-featured-from">{item.from}</h3>
        <p className="recognition-featured-for">{item.for}</p>
        <p className="recognition-featured-date">{item.date}</p>
      </div>
    </article>
  );
}

export default function PublicActivity() {
  const featured = recognitions.find((item) => item.featured) ?? recognitions[0];
  const rest = recognitions.filter((item) => item !== featured);
  const sectionId = useSectionId("public");

  return (
    <section
      id={sectionId}
      data-sid="public"
      className="relative border-t border-[var(--color-rule)] px-[var(--gutter)] py-[var(--section-gap-s)]"
    >
      <SectionIndex n="03" />
      <div className="mx-auto max-w-[var(--container)]">
        <header className="max-w-3xl border-b border-[var(--color-rule)] pb-10">
          <p className="text-sm text-[var(--color-muted)]">Путь</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-ink)]">
            Как шла общественная линия
          </h2>
        </header>

        <ExperienceTimeline />

        <div className="mt-14 border-t border-[var(--color-rule)] pt-12 md:mt-16 md:pt-14">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
            Благодарности
          </h3>

          <FeaturedRecognition item={featured} />

          <ul className="mt-6">
            {rest.map((item) => (
              <li
                key={`${item.kind}-${item.from}-${item.date}`}
                className="flex flex-col gap-1 border-t border-[var(--color-rule)] py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <p className="shrink-0 text-sm text-[var(--color-muted)] sm:w-28">{item.date}</p>
                <div className="min-w-0">
                  <p className="font-semibold text-[var(--color-ink)]">{item.from}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{item.for}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t border-[var(--color-rule)] pt-12 md:pt-14">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:text-2xl">
            Компетенции
          </h3>
          <ul className="mt-8 space-y-6">
            {competencies.map((group) => (
              <li key={group.title}>
                <p className="text-sm font-semibold text-[var(--color-ink)]">{group.title}</p>
                <p className="mt-2 text-base leading-relaxed text-[var(--color-muted)]">
                  {group.items.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
