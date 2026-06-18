"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

const SYMBOLS = ["{ }", "☕", "🐞", "/24", "▲", "🚀"];
const BEST_KEY = "cengiz.cachematch.bestmoves.v1";

type Card = { id: number; symbol: string; flipped: boolean; matched: boolean };

function buildDeck(): Card[] {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  // Fisher–Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((symbol, id) => ({ id, symbol, flipped: false, matched: false }));
}

export function CacheMatch() {
  const [deck, setDeck] = React.useState<Card[]>(buildDeck);
  const [first, setFirst] = React.useState<number | null>(null);
  const [lock, setLock] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const [won, setWon] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [best, setBest] = React.useState<number | null>(null);

  React.useEffect(() => {
    const raw = window.localStorage.getItem(BEST_KEY);
    if (raw) setBest(parseInt(raw, 10) || null);
  }, []);

  // Timer (counts up while playing)
  React.useEffect(() => {
    if (!started || won) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, won]);

  const matchedCount = deck.filter((c) => c.matched).length;

  // Win detection
  React.useEffect(() => {
    if (started && !won && matchedCount === deck.length) {
      setWon(true);
      sfx.unlock();
      unlock("memory-win");
      setBest((prev) => {
        const next = prev === null ? moves : Math.min(prev, moves);
        try {
          window.localStorage.setItem(BEST_KEY, String(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    }
  }, [matchedCount, deck.length, started, won, moves]);

  function reset() {
    setDeck(buildDeck());
    setFirst(null);
    setLock(false);
    setMoves(0);
    setWon(false);
    setSeconds(0);
    setStarted(true);
    unlock("play-memory");
    sfx.click();
  }

  function flip(index: number) {
    if (lock || won) return;
    const card = deck[index];
    if (!card || card.flipped || card.matched) return;
    if (!started) setStarted(true);

    sfx.hover();
    const next = deck.map((c, i) => (i === index ? { ...c, flipped: true } : c));
    setDeck(next);

    if (first === null) {
      setFirst(index);
      return;
    }

    // Second pick
    setMoves((m) => m + 1);
    const a = deck[first];
    const b = card;
    if (a.symbol === b.symbol) {
      // Match
      sfx.arcadeEat();
      setDeck((cur) =>
        cur.map((c, i) => (i === index || i === first ? { ...c, matched: true } : c))
      );
      setFirst(null);
    } else {
      // No match — flip both back after a beat
      setLock(true);
      window.setTimeout(() => {
        setDeck((cur) =>
          cur.map((c, i) => (i === index || i === first ? { ...c, flipped: false } : c))
        );
        setFirst(null);
        setLock(false);
      }, 750);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-black/25 px-3 py-2 font-mono text-sm ring-1 ring-white/10">
        <div className="flex items-center gap-4">
          <span><span className="text-muted-foreground">MOVES</span> <span className="text-foreground">{moves}</span></span>
          <span><span className="text-muted-foreground">PAIRS</span> <span className="text-[hsl(var(--steam-green))]">{matchedCount / 2}/{SYMBOLS.length}</span></span>
          <span><span className="text-muted-foreground">TIME</span> <span className="tabular-nums text-foreground">{seconds}s</span></span>
          <span><span className="text-muted-foreground">BEST</span> <span className="text-[hsl(var(--steam-gold))]">{best === null ? "—" : `${best} mv`}</span></span>
        </div>
        <Button onClick={reset} className="normal-case tracking-normal font-medium">
          {started ? "Restart" : "Start"}
        </Button>
      </div>

      <div className="relative grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {deck.map((card, i) => {
          const revealed = card.flipped || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(i)}
              aria-label={revealed ? card.symbol : "Hidden card"}
              className={`relative grid aspect-square place-items-center rounded-md border text-2xl font-black transition-all duration-200 sm:text-3xl ${
                revealed
                  ? card.matched
                    ? "border-[hsl(var(--steam-green))]/50 bg-[hsl(var(--steam-green))]/15 text-[hsl(var(--steam-green))]"
                    : "border-[hsl(var(--steam-link))]/50 bg-[hsl(var(--steam-link))]/10 text-foreground"
                  : "border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(0,0,0,0.2))] text-muted-foreground/30 hover:border-[hsl(var(--steam-link))]/40"
              }`}
            >
              {revealed ? card.symbol : <span className="text-base">?</span>}
            </button>
          );
        })}

        {won ? (
          <div className="absolute inset-0 grid place-items-center rounded-md bg-black/70 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-lg font-bold text-[hsl(var(--steam-green))]">Cache cleared! 🎉</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {moves} moves · {seconds}s{best === moves ? " · new best!" : ""}
              </p>
              <Button onClick={reset} className="mt-3 normal-case tracking-normal font-medium">
                Play again
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">
        Flip two cards to find matching pairs. Clear the board in as few moves as possible. Tap-friendly — works great on mobile.
      </p>
    </div>
  );
}
