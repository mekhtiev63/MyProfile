"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SiteMode = "public" | "dev";

type SiteModeContextValue = {
  /** Content mode for this tree (locked inside a layer). */
  mode: SiteMode;
  /** Which layer is on top / interactive. */
  activeMode: SiteMode;
  setMode: (mode: SiteMode) => void;
};

const SiteModeContext = createContext<SiteModeContextValue | null>(null);

const SectionIdsContext = createContext(true);

const STORAGE_KEY = "meruslan-site-mode";
const MODES: SiteMode[] = ["public", "dev"];

/** Keep in sync with `.mode-layer` opacity transition in globals.css */
export const MODE_CROSSFADE_MS = 640;

function isSiteMode(value: string | null): value is SiteMode {
  return value !== null && MODES.includes(value as SiteMode);
}

function persistMode(next: SiteMode) {
  window.localStorage.setItem(STORAGE_KEY, next);
  const url = new URL(window.location.href);
  url.searchParams.set("mode", next);
  window.history.replaceState({}, "", url.toString());
}

const modeAnnounce: Record<SiteMode, string> = {
  public: "Активна линия: Общество",
  dev: "Активна линия: Разработка",
};

export function SiteModeProvider({ children }: { children: ReactNode }) {
  const [activeMode, setActiveMode] = useState<SiteMode>("public");
  const [status, setStatus] = useState("");
  const busy = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("mode");
    if (isSiteMode(fromQuery)) {
      setActiveMode(fromQuery);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isSiteMode(stored)) {
      setActiveMode(stored);
    } else if (stored === "athlete") {
      window.localStorage.setItem(STORAGE_KEY, "public");
    }
  }, []);

  const setMode = useCallback((next: SiteMode) => {
    setActiveMode((current) => {
      if (next === current || busy.current) return current;
      busy.current = true;
      persistMode(next);
      setStatus(modeAnnounce[next]);
      window.setTimeout(() => {
        busy.current = false;
      }, MODE_CROSSFADE_MS + 60);
      return next;
    });
  }, []);

  return (
    <SiteModeContext.Provider
      value={{ mode: activeMode, activeMode, setMode }}
    >
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {status}
      </div>
      {children}
    </SiteModeContext.Provider>
  );
}

/** Locks content `mode` for one dual-render layer; `setMode` still switches the front layer. */
export function ModeLayerProvider({
  mode,
  active,
  children,
}: {
  mode: SiteMode;
  active: boolean;
  children: ReactNode;
}) {
  const parent = useSiteMode();
  return (
    <SiteModeContext.Provider
      value={{ mode, activeMode: parent.activeMode, setMode: parent.setMode }}
    >
      <SectionIdsContext.Provider value={active}>{children}</SectionIdsContext.Provider>
    </SiteModeContext.Provider>
  );
}

export function useSiteMode() {
  const ctx = useContext(SiteModeContext);
  if (!ctx) {
    throw new Error("useSiteMode must be used within SiteModeProvider");
  }
  return ctx;
}

/** Section element id — only on the front layer, so anchors stay unique. */
export function useSectionId(id: string): string | undefined {
  const enabled = useContext(SectionIdsContext);
  return enabled ? id : undefined;
}
