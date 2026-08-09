"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ItActivity from "@/components/ItActivity";
import PublicSales from "@/components/public/PublicSales";
import SiteHeader from "@/components/SiteHeader";
import { SiteModeProvider, useSiteMode } from "@/lib/site-mode";

function ModeBody() {
  const { mode } = useSiteMode();

  return (
    <>
      <SiteHeader />
      <Hero />
      {mode === "public" ? (
        <PublicSales />
      ) : (
        <>
          <About />
          <ItActivity />
          <Contact />
        </>
      )}
      <footer className="border-t border-[var(--hairline)] px-6 py-8 text-sm text-ink-faint md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Мехтиев Руслан</span>
          <span className="text-ink-faint">
            Режим: {mode === "public" ? "Общество" : "Разработка"}
          </span>
        </div>
      </footer>
    </>
  );
}

export default function HomeView() {
  return (
    <SiteModeProvider>
      <ModeBody />
    </SiteModeProvider>
  );
}
