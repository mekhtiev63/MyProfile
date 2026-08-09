"use client";

import About from "@/components/About";
import AthleteActivity from "@/components/AthleteActivity";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import HighlightsBento from "@/components/HighlightsBento";
import ItActivity from "@/components/ItActivity";
import PublicActivity from "@/components/PublicActivity";
import SiteHeader from "@/components/SiteHeader";
import ThreadSpine, { threadSpineAnchorId } from "@/components/thread/ThreadSpine";
import { modeLabels } from "@/lib/threads/registry";
import { SiteModeProvider, useSiteMode } from "@/lib/site-mode";

function ActivitySection() {
  const { mode } = useSiteMode();

  if (mode === "public") return <PublicActivity />;
  if (mode === "dev") return <ItActivity />;
  return <AthleteActivity />;
}

function ModeBody() {
  const { mode } = useSiteMode();

  return (
    <div id={threadSpineAnchorId()} className="relative">
      <ThreadSpine />
      <SiteHeader />
      <Hero />
      <HighlightsBento />
      <About />
      <ActivitySection />
      <Contact />
      <footer className="border-t border-[var(--hairline)] px-6 py-8 text-sm text-ink-faint md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Мехтиев Руслан</span>
          <span className="text-ink-faint">Режим: {modeLabels[mode]}</span>
        </div>
      </footer>
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
