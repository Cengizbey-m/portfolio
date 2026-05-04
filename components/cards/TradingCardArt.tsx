"use client";

import * as React from "react";
import type { TradingCard } from "@/data/cards";

type Props = {
  card: TradingCard;
  size?: "sm" | "md" | "lg";
  /** When true, parallax-tilts on mouse hover. */
  interactive?: boolean;
};

const SIZES = {
  sm: { w: 140, h: 200, glyph: 56 },
  md: { w: 200, h: 280, glyph: 80 },
  lg: { w: 260, h: 360, glyph: 110 },
};

export function TradingCardArt({ card, size = "md", interactive = true }: Props) {
  const dim = SIZES[size];
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!interactive || !ref.current) return;
    const el = ref.current;
    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`;
    }
    function onLeave() {
      el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [interactive]);

  const isFoil = card.rarity === "foil";

  return (
    <div
      ref={ref}
      className="relative shrink-0 overflow-hidden rounded-md ring-1 ring-white/15 transition-transform duration-150 ease-out"
      style={{
        width: dim.w,
        height: dim.h,
        background: card.art,
        boxShadow:
          card.rarity === "foil"
            ? "0 0 24px hsl(var(--steam-gold) / 0.45), inset 0 1px 0 rgba(255,255,255,0.18)"
            : card.rarity === "rare"
            ? "0 0 18px hsl(var(--steam-purple) / 0.35), inset 0 1px 0 rgba(255,255,255,0.14)"
            : "0 8px 22px -10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Foil shimmer overlay */}
      {isFoil && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-70"
          style={{
            background:
              "linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.5) 50%, transparent 75%)",
            animation: "shine 3.2s linear infinite",
          }}
        />
      )}
      {/* Glyph */}
      <div
        className="absolute inset-0 grid place-items-center font-extrabold tracking-tight text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        style={{ fontSize: dim.glyph }}
      >
        {card.glyph}
      </div>
      {/* Footer */}
      <div className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 backdrop-blur-sm">
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
          {card.rarity}
        </p>
        <p className="truncate text-sm font-bold text-white">{card.title}</p>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="shine"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
