"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { onUnlock, unlock } from "@/lib/achievements";
import { sfx } from "@/lib/sound";
import { fireConfetti } from "@/lib/confetti";
import { achievements, getAchievement, type Achievement } from "@/data/achievements";
import { AchievementToast } from "./AchievementToast";

type ToastItem = {
  key: number;
  achievement: Achievement;
};

const PAGE_ACHIEVEMENTS: Record<string, string> = {
  "/": "welcome",
  "/library": "browse-projects",
  "/store": "open-store",
  "/resume": "open-resume",
};

const ALL_PAGES_KEY = "cengiz.visitedPages.v1";

function recordPageVisit(pathname: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(ALL_PAGES_KEY);
    const set = new Set<string>(raw ? JSON.parse(raw) : []);
    set.add(pathname);
    window.localStorage.setItem(ALL_PAGES_KEY, JSON.stringify(Array.from(set)));
    const required = ["/", "/library", "/community", "/store"];
    return required.every((p) => set.has(p));
  } catch {
    return false;
  }
}

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  // Mount: ensure pre-unlocked achievements (welcome) fire toast first time.
  React.useEffect(() => {
    achievements.filter((a) => a.preunlocked).forEach((a) => unlock(a.id));
  }, []);

  React.useEffect(() => {
    return onUnlock((e) => {
      if (e.id === "__reset__") return;
      const a = getAchievement(e.id);
      if (!a) return;
      sfx.unlock();
      if (a.rarity === "legendary") fireConfetti(120);
      setToasts((current) => [...current, { key: Date.now() + Math.random(), achievement: a }]);
    });
  }, []);

  React.useEffect(() => {
    const id = PAGE_ACHIEVEMENTS[pathname];
    if (id) unlock(id);
    if (recordPageVisit(pathname)) unlock("all-pages");
  }, [pathname]);

  return (
    <>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[100] flex flex-col items-end gap-2">
        {toasts.map((t) => (
          <AchievementToast
            key={t.key}
            achievement={t.achievement}
            onDismiss={() => setToasts((cur) => cur.filter((x) => x.key !== t.key))}
          />
        ))}
      </div>
    </>
  );
}
