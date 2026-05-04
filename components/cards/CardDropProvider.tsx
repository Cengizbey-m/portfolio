"use client";

import * as React from "react";
import { getCard, type TradingCard } from "@/data/cards";
import { tryDrop, onCardDrop, getActiveSeconds, setActiveSeconds, ownAll } from "@/lib/cards";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";
import { CardDropToast } from "./CardDropToast";

const DROP_INTERVAL_S = 90; // every 90s of active time

type ToastItem = {
  key: number;
  card: TradingCard;
};

export function CardDropProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const visibleRef = React.useRef<boolean>(true);
  const lastDropAtRef = React.useRef<number>(0);

  // Timer: every second the tab is visible, increment active time. Drop when threshold hits.
  React.useEffect(() => {
    function onVisibility() {
      visibleRef.current = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    let active = getActiveSeconds();
    lastDropAtRef.current = Math.floor(active / DROP_INTERVAL_S) * DROP_INTERVAL_S;

    const id = setInterval(() => {
      if (!visibleRef.current) return;
      active += 1;
      setActiveSeconds(active);
      if (active - lastDropAtRef.current >= DROP_INTERVAL_S) {
        lastDropAtRef.current = active;
        if (!ownAll()) tryDrop();
      }
    }, 1000);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Listen for drops, push toast + sound + achievement.
  React.useEffect(() => {
    return onCardDrop((e) => {
      const card = getCard(e.id);
      if (!card) return;
      sfx.unlock();
      unlock("first-card");
      if (ownAll()) unlock("all-cards");
      setToasts((cur) => [...cur, { key: Date.now() + Math.random(), card }]);
    });
  }, []);

  return (
    <>
      {children}
      <div className="pointer-events-none fixed right-4 top-44 z-[100] flex flex-col items-end gap-2">
        {toasts.map((t) => (
          <CardDropToast
            key={t.key}
            card={t.card}
            onDismiss={() => setToasts((cur) => cur.filter((x) => x.key !== t.key))}
          />
        ))}
      </div>
    </>
  );
}
