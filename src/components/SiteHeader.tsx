"use client";

import { contact } from "@/data/publicActivity";
import { threadModes } from "@/lib/threads/registry";
import { useSiteMode } from "@/lib/site-mode";

const shortLabel: Record<string, string> = {
  public: "Общ.",
  dev: "Dev",
};

export default function SiteHeader() {
  const { activeMode, setMode } = useSiteMode();

  return (
    <header className="site-header fixed inset-x-0 top-0 z-[var(--z-sticky-nav)] border-b border-[var(--color-rule)] bg-[var(--header-bg)]">
      <div className="mx-auto grid h-12 max-w-[var(--container)] grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)] items-center gap-1.5 px-[var(--gutter)] sm:h-14 sm:gap-3">
        <a
          href="#top"
          aria-label="Мехтиев Руслан — наверх"
          className="min-w-0 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-[var(--color-ink)] transition hover:text-[var(--color-accent)]"
        >
          <span className="hidden whitespace-nowrap md:inline" aria-hidden>
            Мехтиев Руслан
          </span>
          <span className="hidden whitespace-nowrap sm:inline md:hidden" aria-hidden>
            М. Руслан
          </span>
          <span className="whitespace-nowrap sm:hidden" aria-hidden>
            М.Р.
          </span>
        </a>

        <div
          role="group"
          aria-label="Активная линия"
          className="flex min-w-0 items-center justify-center gap-0 sm:gap-1"
        >
          {threadModes.map((item) => {
            const active = activeMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                aria-pressed={active}
                aria-label={item.label}
                className={`min-h-10 cursor-pointer px-2 py-2 text-xs font-medium transition sm:min-h-0 sm:px-2.5 sm:py-1.5 sm:text-sm ${
                  active
                    ? item.id === "public"
                      ? "text-[var(--color-mark)]"
                      : "text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span className="sm:hidden">{shortLabel[item.id] ?? item.label}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        <a
          href={contact.telegram}
          target="_blank"
          rel="noreferrer"
          aria-label="Написать в Телеграм"
          className="justify-self-end inline-flex min-h-10 shrink-0 cursor-pointer items-center border border-[var(--color-rule)] px-2.5 text-xs font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-muted)] sm:min-h-0 sm:px-3 sm:py-1.5"
        >
          <span className="sm:hidden">ТГ</span>
          <span className="hidden sm:inline">Написать</span>
        </a>
      </div>
    </header>
  );
}
