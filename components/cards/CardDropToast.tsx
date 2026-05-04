"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { TradingCard } from "@/data/cards";
import { TradingCardArt } from "./TradingCardArt";

type Props = {
  card: TradingCard;
  onDismiss: () => void;
};

export function CardDropToast({ card, onDismiss }: Props) {
  React.useEffect(() => {
    const id = setTimeout(onDismiss, 5800);
    return () => clearTimeout(id);
  }, [onDismiss]);

  return (
    <div className="achievement-toast pointer-events-auto w-80 max-w-[92vw] overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] shadow-2xl ring-1 ring-white/10">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[hsl(var(--steam-gold))]/35 to-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
        <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--steam-gold))]" />
        Trading card dropped · {card.rarity}
      </div>
      <div className="flex items-center gap-3 p-3">
        <div className="shrink-0">
          <TradingCardArt card={card} size="sm" interactive={false} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{card.title}</p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {card.flavor}
          </p>
          <Link
            href="/inventory"
            onClick={onDismiss}
            className="mt-2 inline-block text-[11px] text-[hsl(var(--steam-link))] hover:underline"
          >
            View inventory →
          </Link>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="ml-1 self-start rounded text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>
    </div>
  );
}
