"use client";

import * as React from "react";

type HouseModeContextValue = {
  enabled: boolean;
  setEnabled: (next: boolean) => void;
  toggle: () => void;
};

const HouseModeContext = React.createContext<HouseModeContextValue | null>(null);

const STORAGE_KEY = "houseMode";

export function HouseModeProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === null) return;
      setEnabledState(raw === "true");
    } catch {
      // ignore
    }
  }, []);

  const setEnabled = React.useCallback((next: boolean) => {
    setEnabledState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore
    }
  }, []);

  const toggle = React.useCallback(() => setEnabled(!enabled), [enabled, setEnabled]);

  const value = React.useMemo(() => ({ enabled, setEnabled, toggle }), [enabled, setEnabled, toggle]);

  return <HouseModeContext.Provider value={value}>{children}</HouseModeContext.Provider>;
}

export function useHouseMode() {
  const ctx = React.useContext(HouseModeContext);
  if (!ctx) throw new Error("useHouseMode must be used within HouseModeProvider");
  return ctx;
}


