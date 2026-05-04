"use client";

import * as React from "react";
import { Bug, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

const ROUND_SECONDS = 30;
const ROWS = 3;
const COLS = 4;
const HIGH_KEY = "cengiz.whack.high.v1";

type Mole =
  | { kind: "empty" }
  | { kind: "bug"; bornAt: number; ttl: number }
  | { kind: "feature"; bornAt: number; ttl: number };

function emptyGrid(): Mole[] {
  return Array.from({ length: ROWS * COLS }, () => ({ kind: "empty" } as Mole));
}

export function WhackABug() {
  const [grid, setGrid] = React.useState<Mole[]>(emptyGrid);
  const [running, setRunning] = React.useState(false);
  const [time, setTime] = React.useState(ROUND_SECONDS);
  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [misses, setMisses] = React.useState(0);
  const [high, setHigh] = React.useState(0);

  React.useEffect(() => {
    const raw = window.localStorage.getItem(HIGH_KEY);
    if (raw) setHigh(parseInt(raw, 10) || 0);
  }, []);

  // Spawn loop
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setGrid((g) => {
        const next = [...g];
        // Expire old
        const now = performance.now();
        for (let i = 0; i < next.length; i++) {
          const m = next[i];
          if (m.kind !== "empty" && now - m.bornAt > m.ttl) {
            // bug expired = miss
            if (m.kind === "bug") {
              setMisses((x) => x + 1);
              setCombo(0);
            }
            next[i] = { kind: "empty" };
          }
        }
        // Fill some empties
        const empties = next
          .map((m, i) => (m.kind === "empty" ? i : -1))
          .filter((i) => i >= 0);
        const target = Math.min(5, empties.length);
        const want = Math.min(target, 3 + Math.floor(Math.random() * 2));
        for (let k = 0; k < want; k++) {
          if (!empties.length) break;
          const idx = empties.splice(Math.floor(Math.random() * empties.length), 1)[0];
          const isBug = Math.random() > 0.22;
          next[idx] = isBug
            ? { kind: "bug", bornAt: now, ttl: 1000 + Math.random() * 600 }
            : { kind: "feature", bornAt: now, ttl: 900 + Math.random() * 500 };
        }
        return next;
      });
    }, 380);
    return () => clearInterval(id);
  }, [running]);

  // Timer
  React.useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      setRunning(false);
      sfx.arcadeOver();
      setScore((s) => {
        if (s > high) {
          setHigh(s);
          try { window.localStorage.setItem(HIGH_KEY, String(s)); } catch {/* ignore */}
        }
        if (s >= 30) unlock("whack-30");
        return s;
      });
      setGrid(emptyGrid());
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [time, running, high]);

  function start() {
    setScore(0);
    setMisses(0);
    setCombo(0);
    setTime(ROUND_SECONDS);
    setGrid(emptyGrid());
    setRunning(true);
    unlock("play-whack");
    sfx.click();
  }

  function whack(i: number) {
    if (!running) return;
    setGrid((g) => {
      const next = [...g];
      const m = next[i];
      if (m.kind === "bug") {
        sfx.arcadeEat();
        setCombo((c) => c + 1);
        setScore((s) => s + 1 + Math.floor(combo / 3));
        next[i] = { kind: "empty" };
      } else if (m.kind === "feature") {
        sfx.arcadeOver();
        setMisses((x) => x + 1);
        setCombo(0);
        setScore((s) => Math.max(0, s - 2));
        next[i] = { kind: "empty" };
      }
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-black/25 px-3 py-2 font-mono text-sm ring-1 ring-white/10">
        <div className="flex items-center gap-4">
          <span><span className="text-muted-foreground">SCORE</span> <span className="text-foreground">{score}</span></span>
          <span><span className="text-muted-foreground">HIGH</span> <span className="text-[hsl(var(--steam-gold))]">{high}</span></span>
          <span><span className="text-muted-foreground">COMBO</span> <span className="text-[hsl(var(--steam-green))]">x{combo}</span></span>
          <span><span className="text-muted-foreground">MISSES</span> <span className="text-[hsl(var(--steam-red))]">{misses}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">TIME</span>
          <div className="relative h-2 w-32 overflow-hidden rounded-full bg-black/40 ring-1 ring-white/10">
            <div
              className="h-full bg-[hsl(var(--steam-link))] transition-[width] duration-700"
              style={{ width: `${(time / ROUND_SECONDS) * 100}%` }}
            />
          </div>
          <span className="tabular-nums text-foreground">{time}s</span>
          <Button onClick={start} className="normal-case tracking-normal font-medium">
            {running ? "Restart" : score > 0 || time !== ROUND_SECONDS ? "Play again" : "Start"}
          </Button>
        </div>
      </div>

      <div
        className="grid gap-3 rounded-md border border-border bg-[hsl(var(--steam-panel))] p-4 ring-1 ring-white/10"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((m, i) => {
          const occupied = m.kind !== "empty";
          return (
            <button
              key={i}
              type="button"
              onClick={() => whack(i)}
              disabled={!running}
              className={`relative grid aspect-square place-items-center overflow-hidden rounded-md border bg-black/30 ring-1 ring-white/5 transition ${
                occupied
                  ? m.kind === "bug"
                    ? "border-[hsl(var(--steam-red))]/40"
                    : "border-[hsl(var(--steam-green))]/40"
                  : "border-border"
              }`}
            >
              {occupied && m.kind === "bug" && (
                <Bug className="h-10 w-10 text-[hsl(var(--steam-red))] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
              )}
              {occupied && m.kind === "feature" && (
                <Sparkles className="h-10 w-10 text-[hsl(var(--steam-green))] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
              )}
              {!occupied && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/40">
                  ./src
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        🐞 = bug (whack it). ✨ = feature (don&rsquo;t). Combos multiply your score; misses break it. Score 30+ for an achievement.
      </p>
    </div>
  );
}
