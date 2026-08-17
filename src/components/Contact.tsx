"use client";

import SectionIndex from "@/components/SectionIndex";
import { contact } from "@/data/publicActivity";
import { useSiteMode } from "@/lib/site-mode";

export default function Contact() {
  const { mode } = useSiteMode();
  const openTo = mode === "dev" ? contact.devOpenTo : contact.publicOpenTo;
  const isPublic = mode === "public";

  return (
    <section
      id="contact"
      className="relative border-t border-[var(--hairline)] px-6 py-24 md:px-10"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 50% 0%, color-mix(in srgb, var(--emerald) 16%, transparent), transparent 55%), var(--bg-deep)",
      }}
    >
      <SectionIndex n="05" />
      <div className="civic-panel mx-auto max-w-6xl text-center">
        <span className="civic-kicker-bar mx-auto" aria-hidden />
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
          Контакты
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
          {openTo}
        </h2>

        <div className="mt-10">
          <a
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            className={
              isPublic
                ? "civic-cta inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f172a]/30"
                : "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-emerald px-6 py-3.5 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            }
          >
            {contact.ctaLabel}
          </a>
        </div>

        <nav
          aria-label="Ссылки"
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-faint"
        >
          <a
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer transition hover:text-mint"
          >
            Телеграм
          </a>
          {mode === "dev" && (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-mint"
            >
              Гитхаб
            </a>
          )}
          {mode === "public" && (
            <a
              href={contact.vk}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-mint"
            >
              ВКонтакте
            </a>
          )}
        </nav>
      </div>
    </section>
  );
}
