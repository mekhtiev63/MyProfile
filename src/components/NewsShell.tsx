"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SiteModeProvider, useSiteMode } from "@/lib/site-mode";

function ModeFrame({ children }: { children: ReactNode }) {
  const { mode } = useSiteMode();

  return (
    <div className={`min-h-screen bg-[var(--bg-deep)] text-ink ${mode === "public" ? "mode-public" : ""}`}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)] bg-[var(--header-bg)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-10">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-ink transition hover:text-mint"
          >
            Мехтиев Руслан
          </Link>
          <Link
            href="/#news"
            className="text-sm font-semibold text-ink-muted transition hover:text-ink"
          >
            ← Все новости
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
