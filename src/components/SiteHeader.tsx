"use client";

import { contact } from "@/data/publicActivity";
import { useSiteMode, type SiteMode } from "@/lib/site-mode";

const modes: { id: SiteMode; label: string; short: string }[] = [
  { id: "public", label: "общественника", short: "обществ." },
  { id: "dev", label: "разработчика", short: "разраб." },
];

export default function SiteHeader() {
  const { mode, setMode } = useSiteMode();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)] bg-[rgba(4,12,9,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 md:gap-4 md:px-10">
        <a
          href="#top"
          className="shrink-0 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-ink transition hover:text-mint"
        >
          Мехтиев
          <span className="hidden sm:inline"> Руслан</span>
        </a>

        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden text-xs text-ink-faint md:inline">
            Смотреть как
          </span>
          <div
            role="group"
            aria-label="Смотреть сайт как общественника или разработчика"
            className="flex rounded-md border border-[var(--hairline)] p-0.5"
          >
            {modes.map((item) => {
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-[5px] px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                    active
                      ? "bg-emerald text-[#04110c]"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <a
          href={contact.telegram}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 cursor-pointer rounded-md bg-emerald px-3 py-1.5 text-xs font-semibold text-[#04110c] transition hover:bg-mint"
        >
          Написать
        </a>
      </div>
    </header>
  );
}
