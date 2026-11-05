"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SiteModeProvider, useSiteMode } from "@/lib/site-mode";

function ModeFrame({ children }: { children: ReactNode }) {
  const { mode } = useSiteMode();
  const isPublic = mode === "public";

  return (
    <div
      className={`min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] ${
        isPublic ? "mode-public" : ""
      }`}
    >
      <header className="site-header fixed inset-x-0 top-0 z-[var(--z-sticky-nav)] border-b border-[var(--color-rule)] bg-[var(--header-bg)]">
        <div className="mx-auto flex h-12 max-w-[var(--container)] items-center justify-between gap-3 px-[var(--gutter)] sm:h-14">
          <Link
            href="/"
            className="min-w-0 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-[var(--color-ink)] transition hover:text-[var(--color-accent)]"
          >
            <span className="hidden sm:inline">Мехтиев Руслан</span>
            <span className="sm:hidden">М.Р.</span>
          </Link>
          <Link
            href="/#news"
            className="shrink-0 text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            ← Новости
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

export default function NewsShell({ children }: { children: ReactNode }) {
  return (
    <SiteModeProvider>
      <ModeFrame>{children}</ModeFrame>
    </SiteModeProvider>
  );
}
