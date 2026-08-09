"use client";

import { contact } from "@/data/publicActivity";
import { useSiteMode, type SiteMode } from "@/lib/site-mode";

const modes: { id: SiteMode; label: string }[] = [
  { id: "public", label: "Public" },
  { id: "dev", label: "Dev" },
];

export default function SiteHeader() {
  const { mode, setMode } = useSiteMode();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)] bg-[rgba(4,12,9,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:px-10">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-ink transition hover:text-mint"
        >
          Мехтиев Руслан
        </a>

        <div
          role="group"
          aria-label="Режим сайта"
          className="flex rounded-md border border-[var(--hairline)] p-0.5"
        >
          {modes.map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`cursor-pointer rounded-[5px] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-emerald text-[#04110c]"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <a
          href={contact.telegram}
          target="_blank"
          rel="noreferrer"
          className="hidden cursor-pointer rounded-md bg-emerald px-3 py-1.5 text-xs font-semibold text-[#04110c] transition hover:bg-mint sm:inline-flex"
        >
          Написать
        </a>
      </div>
    </header>
  );
}
