"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import HighlightsBento from "@/components/HighlightsBento";
import ItActivity from "@/components/ItActivity";
import PublicActivity from "@/components/PublicActivity";
import ThreadKnots from "@/components/ThreadKnots";
import SiteHeader from "@/components/SiteHeader";
import ThreadSpine, { threadSpineAnchorId } from "@/components/thread/ThreadSpine";
import { modeLabels } from "@/lib/threads/registry";
import { SiteModeProvider, useSiteMode } from "@/lib/site-mode";

function ActivitySection() {
  const { mode } = useSiteMode();
  if (mode === "dev") return <ItActivity />;
  return <PublicActivity />;
}

function ModeBody() {
  const { mode } = useSiteMode();

  return (
    <div id={threadSpineAnchorId()} className={`relative ${mode === "public" ? "mode-public" : ""}`}>
      <ThreadSpine />
      <div className="relative z-[2]">
        <SiteHeader />
        <Hero />
        <HighlightsBento />
        <About />
        <ActivitySection />
        <ThreadKnots />
        <Contact />
        <footer className="border-t border-[var(--hairline)] px-6 py-8 text-sm text-ink-faint md:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Мехтиев Руслан</span>
            <span className="text-ink-faint">Линия: {modeLabels[mode]}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function HomeView() {
  return (
    <SiteModeProvider>
      <ModeBody />
    </SiteModeProvider>
  );
}
