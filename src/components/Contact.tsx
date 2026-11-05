"use client";

import SectionIndex from "@/components/SectionIndex";
import { contact } from "@/data/publicActivity";
import { useSectionId, useSiteMode } from "@/lib/site-mode";

export default function Contact() {
  const { mode } = useSiteMode();
  const openTo = mode === "dev" ? contact.devOpenTo : contact.publicOpenTo;
  const isPublic = mode === "public";
  const sectionId = useSectionId("contact");

  return (
    <section
      id={sectionId}
      data-sid="contact"
      className="relative border-t border-[var(--color-rule)] bg-[var(--color-paper-2)] px-[var(--gutter)] py-[var(--section-gap-s)]"
    >
      <SectionIndex n="06" />
      <div className="mx-auto max-w-[var(--container)] md:grid md:grid-cols-12 md:items-end md:gap-[var(--gap-columns)]">
        <div className="md:col-span-7">
          <p className="text-sm text-[var(--color-muted)]">Контакты</p>
          <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-ink)]">
            {openTo}
          </h2>
        </div>
        <div className="mt-8 md:col-span-5 md:mt-0 md:text-right">
          <a
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            className={
              isPublic
                ? "civic-cta inline-flex min-h-12 w-full cursor-pointer items-center justify-center px-6 py-3.5 text-sm font-semibold transition duration-200 sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                : "cta-accent inline-flex min-h-12 w-full cursor-pointer items-center justify-center px-6 py-3.5 text-sm font-semibold transition duration-200 sm:w-auto active:translate-y-px"
            }
          >
            {contact.ctaLabel}
          </a>
          <nav
            aria-label="Ссылки"
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-muted)] md:justify-end"
          >
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-[var(--color-accent)]"
            >
              Телеграм
            </a>
            {mode === "dev" && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer transition hover:text-[var(--color-accent)]"
              >
                Гитхаб
              </a>
            )}
            {mode === "public" && (
              <a
                href={contact.vk}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer transition hover:text-[var(--color-accent)]"
              >
                ВКонтакте
              </a>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
