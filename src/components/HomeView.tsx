"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import { modeLabels } from "@/lib/threads/registry";
import {
  MODE_CROSSFADE_MS,
  ModeLayerProvider,
  SiteModeProvider,
  useSiteMode,
  type SiteMode,
} from "@/lib/site-mode";

const ThreadSpine = dynamic(() => import("@/components/thread/ThreadSpine"), {
  ssr: false,
});
const HighlightsBento = dynamic(() => import("@/components/HighlightsBento"));
const About = dynamic(() => import("@/components/About"));
const ItActivity = dynamic(() => import("@/components/ItActivity"));
const PublicActivity = dynamic(() => import("@/components/PublicActivity"));
const News = dynamic(() => import("@/components/News"));
const ThreadKnots = dynamic(() => import("@/components/ThreadKnots"));
const Contact = dynamic(() => import("@/components/Contact"));

function ModePage({ mode }: { mode: SiteMode }) {
  return (
    <>
      <ThreadSpine />
      <div className="relative z-[2]">
        <SiteHeader />
        <Hero />
        <HighlightsBento />
        <About />
        {mode === "dev" ? <ItActivity /> : <PublicActivity />}
        <News />
        <ThreadKnots />
        <Contact />
        <footer className="site-footer border-t border-[var(--color-rule)] px-[var(--gutter)] py-8 text-sm text-[var(--color-muted)] sm:py-10">
          <div className="mx-auto flex max-w-[var(--container)] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-3">
              <span className="site-footer-thread" aria-hidden />
              © {new Date().getFullYear()} Мехтиев Руслан
            </span>
            <span>Линия: {modeLabels[mode]}</span>
          </div>
        </footer>
      </div>
    </>
  );
}

/**
 * Keep the layer shell in the tree so enter/exit opacity can animate.
 * Heavy page content mounts for the fade, then the inactive tree unmounts.
 */
function ModeLayer({ mode }: { mode: SiteMode }) {
  const { activeMode } = useSiteMode();
  const active = activeMode === mode;
  const [rendered, setRendered] = useState(active);
  const [entered, setEntered] = useState(active);
  const wasActive = useRef(active);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (active) {
      setRendered(true);
      // Animate only when becoming active — not on first hydrate
      if (!wasActive.current && !reduced) {
        setEntered(false);
        const id = window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setEntered(true));
        });
        wasActive.current = true;
        return () => window.cancelAnimationFrame(id);
      }
      wasActive.current = true;
      setEntered(true);
      return;
    }

    wasActive.current = false;
    setEntered(false);
    if (reduced) {
      setRendered(false);
      return;
    }
    const t = window.setTimeout(() => setRendered(false), MODE_CROSSFADE_MS);
    return () => window.clearTimeout(t);
  }, [active]);

  if (!rendered) return null;

  return (
    <ModeLayerProvider mode={mode} active={active}>
      <div
        ref={(node) => {
          if (node) node.inert = !active;
        }}
        className={`mode-layer ${mode === "public" ? "mode-public" : ""} ${
          entered ? "is-active" : ""
        }`}
        data-mode-layer={mode}
        {...(!active ? { "aria-hidden": true as const } : {})}
      >
        <ModePage mode={mode} />
      </div>
    </ModeLayerProvider>
  );
}

function DualModeShell() {
  return (
    <div className="mode-stack">
      <ModeLayer mode="public" />
      <ModeLayer mode="dev" />
    </div>
  );
}

export default function HomeView() {
  return (
    <SiteModeProvider>
      <DualModeShell />
    </SiteModeProvider>
  );
}
