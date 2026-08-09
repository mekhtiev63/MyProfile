"use client";

import { contact } from "@/data/publicActivity";
import { useSiteMode } from "@/lib/site-mode";

export default function Contact() {
  const { mode } = useSiteMode();
  const openTo =
    mode === "dev"
      ? contact.devOpenTo
      : mode === "athlete"
        ? contact.athleteOpenTo
        : contact.publicOpenTo;

  return (
    <section
      id="contact"
      className="relative border-t border-[var(--hairline)] px-6 py-24 md:px-10"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(31,157,99,0.18), transparent 55%), var(--bg-deep)",
      }}
    >
      <div className="mx-auto max-w-6xl text-center">
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
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-6 py-3.5 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
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
            Telegram
          </a>
          {mode === "dev" && (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-mint"
            >
              GitHub
            </a>
          )}
          {mode === "public" && (
            <a
              href={contact.vk}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-mint"
            >
              VK
            </a>
          )}
          {mode === "athlete" && (
            <span className="text-ink-faint">Strava · скоро</span>
          )}
        </nav>
      </div>
    </section>
  );
}
