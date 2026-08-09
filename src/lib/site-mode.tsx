"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type SiteMode = "public" | "dev" | "athlete";

type SiteModeContextValue = {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
};

const SiteModeContext = createContext<SiteModeContextValue | null>(null);

const STORAGE_KEY = "meruslan-site-mode";
const MODES: SiteMode[] = ["public", "dev", "athlete"];

function isSiteMode(value: string | null): value is SiteMode {
  return value !== null && MODES.includes(value as SiteMode);
}

export function SiteModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>("public");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("mode");
    if (isSiteMode(fromQuery)) {
      setModeState(fromQuery);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isSiteMode(stored)) {
      setModeState(stored);
    }
  }, []);

  const setMode = (next: SiteMode) => {
    setModeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <SiteModeContext.Provider value={{ mode, setMode }}>
      {children}
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
