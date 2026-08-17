"use client";

import { contact } from "@/data/publicActivity";
import { getThread, threadModes } from "@/lib/threads/registry";
import { useSiteMode } from "@/lib/site-mode";

export default function SiteHeader() {
  const { mode, setMode } = useSiteMode();
  const isPublic = mode === "public";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:gap-4 md:px-10">
        <a
          href="#top"
          className="min-w-0 shrink font-[family-name:var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-ink transition hover:text-mint"
        >
          <span className="hidden sm:inline">Мехтиев Руслан</span>
          <span className="sm:hidden">М. Руслан</span>
        </a>

        <div className="mx-auto flex min-w-0 items-center gap-2">
          <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-faint sm:inline">
            Линия
          </span>
          <div
            role="group"
            aria-label="Активная линия"
            className="flex min-w-0 shrink-0 rounded-md border border-[var(--hairline)] p-0.5"
          >
            {threadModes.map((item) => {
              const active = mode === item.id;
              const palette = getThread(item.id).palette;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`cursor-pointer rounded-[5px] px-2 py-1.5 text-[0.65rem] font-semibold tracking-[0.02em] transition sm:px-3 sm:text-xs ${
                    active ? "" : "text-ink-faint hover:text-ink"
                  }`}
                  style={
                    active
                      ? {
                          background: palette.primary,
                          color: "#ffffff",
                        }
                      : undefined
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <a
          href={contact.telegram}
          target="_blank"
          rel="noreferrer"
          className={
            isPublic
              ? "civic-cta shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition"
              : "shrink-0 cursor-pointer rounded-md bg-emerald px-3 py-1.5 text-xs font-semibold text-[#04110c] transition hover:bg-mint"
          }
          style={
            isPublic
              ? { backgroundColor: "#b91c1c", color: "#ffffff" }
              : undefined
          }
        >
          Написать
        </a>
      </div>
    </header>
  );
}
