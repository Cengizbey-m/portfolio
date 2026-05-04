"use client";

import * as React from "react";
import { Trophy } from "lucide-react";
import type { Achievement } from "@/data/achievements";

type Props = {
  achievement: Achievement;
  onDismiss: () => void;
};

const RARITY_COLOR: Record<Achievement["rarity"], string> = {
  common: "from-[hsl(var(--steam-link))]/30 to-transparent",
  uncommon: "from-[hsl(var(--steam-green))]/40 to-transparent",
  rare: "from-[hsl(var(--steam-purple))]/45 to-transparent",
  legendary: "from-[hsl(var(--steam-gold))]/55 to-transparent",
};

export function AchievementToast({ achievement, onDismiss }: Props) {
  React.useEffect(() => {
    const id = setTimeout(onDismiss, 4900);
    return () => clearTimeout(id);
  }, [onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="achievement-toast pointer-events-auto w-80 max-w-[90vw] overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] shadow-2xl ring-1 ring-white/10"
    >
      <div className={`bg-gradient-to-r ${RARITY_COLOR[achievement.rarity]} px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/90`}>
        Achievement Unlocked · {achievement.rarity}
      </div>
      <div className="flex items-start gap-3 p-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-black/30 ring-1 ring-white/10">
          <Trophy className="h-6 w-6 text-[hsl(var(--steam-gold))]" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{achievement.title}</p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {achievement.description}
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="ml-1 rounded text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>
    </div>
  );
}
