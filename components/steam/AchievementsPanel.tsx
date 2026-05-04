"use client";

import * as React from "react";
import {
  BookOpen,
  Bug,
  CreditCard,
  FileText,
  Gamepad2,
  Heart,
  Keyboard,
  Library,
  Lock,
  Map,
  Network,
  Package,
  Play,
  Rocket,
  Send,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Trophy,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { achievements, type Achievement } from "@/data/achievements";
import { getUnlocked, onUnlock } from "@/lib/achievements";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

const ICONS: Record<string, LucideIcon> = {
  rocket: Rocket,
  library: Library,
  "book-open": BookOpen,
  "gamepad-2": Gamepad2,
  trophy: Trophy,
  network: Network,
  keyboard: Keyboard,
  heart: Heart,
  "shopping-cart": ShoppingCart,
  "shopping-bag": ShoppingBag,
  "credit-card": CreditCard,
  "file-text": FileText,
  send: Send,
  "volume-2": Volume2,
  map: Map,
  bug: Bug,
  sparkles: Sparkles,
  package: Package,
  play: Play,
};

const RARITY_BORDER: Record<Achievement["rarity"], string> = {
  common: "border-border",
  uncommon: "border-[hsl(var(--steam-green))]/40",
  rare: "border-[hsl(var(--steam-purple))]/45",
  legendary: "border-[hsl(var(--steam-gold))]/55",
};

const RARITY_GLOW: Record<Achievement["rarity"], string> = {
  common: "",
  uncommon: "shadow-[0_0_18px_-6px_hsl(var(--steam-green)/0.5)]",
  rare: "shadow-[0_0_18px_-6px_hsl(var(--steam-purple)/0.6)]",
  legendary: "shadow-[0_0_22px_-4px_hsl(var(--steam-gold)/0.7)]",
};

export function AchievementsPanel({ id }: { id?: string }) {
  const [unlocked, setUnlocked] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    setUnlocked(getUnlocked());
    return onUnlock(() => setUnlocked(getUnlocked()));
  }, []);

  const totalUnlocked = achievements.filter((a) => unlocked[a.id]).length;
  const pct = Math.round((totalUnlocked / achievements.length) * 100);

  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="flex flex-row items-end justify-between gap-3">
        <SectionHeader
          title="Achievements"
          description="Click around the site, you'll unlock more."
        />
        <div className="text-right">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            {totalUnlocked} / {achievements.length}
          </p>
          <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-black/30 ring-1 ring-white/10">
            <div
              className="h-full rounded-full bg-[hsl(var(--steam-link))] transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => {
            const Icon = ICONS[a.icon] ?? Trophy;
            const isUnlocked = Boolean(unlocked[a.id]);
            const showHidden = a.hidden && !isUnlocked;
            return (
              <li
                key={a.id}
                className={`flex items-start gap-3 rounded-sm border bg-white/5 p-3 ring-1 ring-white/10 transition ${RARITY_BORDER[a.rarity]} ${
                  isUnlocked ? RARITY_GLOW[a.rarity] : "opacity-70"
                }`}
              >
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-sm ${
                    isUnlocked ? "bg-black/30" : "bg-black/40"
                  } ring-1 ring-white/10`}
                >
                  {isUnlocked ? (
                    <Icon
                      className={`h-5 w-5 ${
                        a.rarity === "legendary"
                          ? "text-[hsl(var(--steam-gold))]"
                          : a.rarity === "rare"
                          ? "text-[hsl(var(--steam-purple))]"
                          : a.rarity === "uncommon"
                          ? "text-[hsl(var(--steam-green))]"
                          : "text-[hsl(var(--steam-link))]"
                      }`}
                    />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {showHidden ? "Hidden achievement" : a.title}
                  </p>
                  <p className="line-clamp-2 text-[11px] leading-5 text-muted-foreground">
                    {showHidden
                      ? a.hint ?? "Discover this one yourself."
                      : a.description}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {a.rarity}
                    {isUnlocked
                      ? ` · unlocked`
                      : ""}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
