"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { cards as deck } from "@/data/cards";
import {
  getOwnedCards,
  getActiveSeconds,
  onCardDrop,
  resetCards,
  tryDrop,
} from "@/lib/cards";
import { TradingCardArt } from "@/components/cards/TradingCardArt";
import { unlock } from "@/lib/achievements";
import { sfx } from "@/lib/sound";

const DROP_INTERVAL_S = 90;

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m === 0) return `${sec}s`;
  return `${m}m ${sec.toString().padStart(2, "0")}s`;
}

export function InventoryShell() {
  const [owned, setOwned] = React.useState<Record<string, number>>({});
  const [activeS, setActiveS] = React.useState(0);

  React.useEffect(() => {
    unlock("open-inventory");
    setOwned(getOwnedCards());
    setActiveS(getActiveSeconds());
    const tick = setInterval(() => setActiveS(getActiveSeconds()), 1000);
    const off = onCardDrop(() => setOwned(getOwnedCards()));
    return () => {
      clearInterval(tick);
      off();
    };
  }, []);

  const ownedCount = Object.keys(owned).length;
  const nextThreshold = (Math.floor(activeS / DROP_INTERVAL_S) + 1) * DROP_INTERVAL_S;
  const secondsUntilNext = Math.max(0, nextThreshold - activeS);
  const haveAll = ownedCount >= deck.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            title="Inventory · Trading Cards"
            description="Cards drop while you have the portfolio open. Collect the set."
          />
          <div className="text-right">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
              {ownedCount} / {deck.length} collected
            </p>
            <div className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-black/30 ring-1 ring-white/10">
              <div
                className="h-full rounded-full bg-[hsl(var(--steam-link))] transition-[width] duration-700"
                style={{ width: `${(ownedCount / deck.length) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Stat label="Active time on portfolio" value={fmtTime(activeS)} />
            <Stat
              label="Next drop in"
              value={haveAll ? "All collected" : fmtTime(secondsUntilNext)}
              accent={haveAll ? "text-[hsl(var(--steam-green))]" : undefined}
            />
            <Stat
              label="Drop interval"
              value={`every ${DROP_INTERVAL_S}s of active time`}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                sfx.click();
                tryDrop();
              }}
              className="normal-case tracking-normal font-medium"
              disabled={haveAll}
            >
              Manual drop (skip wait)
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                sfx.click();
                resetCards();
                setOwned({});
                setActiveS(0);
              }}
              className="normal-case tracking-normal font-medium"
            >
              Reset cards (debug)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SectionHeader
            title="Card Set · cengiz portfolio"
            description="Hover any card you own — they tilt with your cursor."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {deck.map((c) => {
              const isOwned = Boolean(owned[c.id]);
              return (
                <li key={c.id} className="flex flex-col items-center gap-2">
                  <div className={isOwned ? "" : "opacity-30 saturate-0"}>
                    <TradingCardArt card={c} size="sm" interactive={isOwned} />
                  </div>
                  <p className="line-clamp-2 text-center text-xs text-muted-foreground">
                    {isOwned ? c.flavor : "Locked — keep the tab open."}
                  </p>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-1 text-lg font-bold text-foreground ${accent ?? ""}`}>
        {value}
      </p>
    </div>
  );
}
