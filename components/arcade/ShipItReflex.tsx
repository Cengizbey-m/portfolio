"use client";

import * as React from "react";
import { Rocket, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

const BEST_KEY = "cengiz.shipit.best.v1";
const BASE_SPEED = 55; // % of track per second
const BASE_ZONE = 26; // % width
const MIN_ZONE = 9;

export function ShipItReflex() {
  const [pos, setPos] = React.useState(50);
  const [zone, setZone] = React.useState({ start: 37, width: BASE_ZONE });
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [lives, setLives] = React.useState(3);
  const [best, setBest] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [result, setResult] = React.useState<"hit" | "miss" | null>(null);

  const posRef = React.useRef(50);
  const dirRef = React.useRef(1);
  const speedRef = React.useRef(BASE_SPEED);
  const rafRef = React.useRef<number | null>(null);
  const lastRef = React.useRef<number | null>(null);
  const runningRef = React.useRef(false);

  React.useEffect(() => {
    const raw = window.localStorage.getItem(BEST_KEY);
    if (raw) setBest(parseInt(raw, 10) || 0);
  }, []);

  const stopLoop = React.useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastRef.current = null;
  }, []);

  const loop = React.useCallback((t: number) => {
    if (!runningRef.current) return;
    if (lastRef.current === null) lastRef.current = t;
    const dt = (t - lastRef.current) / 1000;
    lastRef.current = t;
    let p = posRef.current + dirRef.current * speedRef.current * dt;
    if (p >= 100) {
      p = 100;
      dirRef.current = -1;
    } else if (p <= 0) {
      p = 0;
      dirRef.current = 1;
    }
    posRef.current = p;
    setPos(p);
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startLoop = React.useCallback(() => {
    stopLoop();
    rafRef.current = requestAnimationFrame(loop);
  }, [loop, stopLoop]);

  React.useEffect(() => () => stopLoop(), [stopLoop]);

  function randomZone(width: number) {
    const start = Math.random() * (100 - width);
    return { start, width };
  }

  function start() {
    setScore(0);
    setStreak(0);
    setLives(3);
    setResult(null);
    setZone(randomZone(BASE_ZONE));
    speedRef.current = BASE_SPEED;
    dirRef.current = 1;
    posRef.current = 0;
    setPos(0);
    setRunning(true);
    runningRef.current = true;
    unlock("play-reflex");
    sfx.click();
    startLoop();
  }

  function endGame(finalScore: number) {
    runningRef.current = false;
    setRunning(false);
    stopLoop();
    sfx.arcadeOver();
    setBest((prev) => {
      const next = Math.max(prev, finalScore);
      try {
        window.localStorage.setItem(BEST_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function deploy() {
    if (!runningRef.current) return;
    const p = posRef.current;
    const inZone = p >= zone.start && p <= zone.start + zone.width;
    if (inZone) {
      sfx.arcadeEat();
      setResult("hit");
      const newScore = score + 1 + Math.floor(streak / 3);
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak === 5) unlock("reflex-streak");
      // ramp difficulty
      speedRef.current = Math.min(BASE_SPEED + newStreak * 7, 180);
      const newWidth = Math.max(MIN_ZONE, BASE_ZONE - newStreak * 1.3);
      setZone(randomZone(newWidth));
    } else {
      setResult("miss");
      setStreak(0);
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        endGame(score);
        return;
      }
      sfx.arcadeOver();
      setZone(randomZone(zone.width));
    }
    window.setTimeout(() => setResult(null), 220);
  }

  // Keyboard: Space / Enter
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (running) deploy();
        else start();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, score, streak, lives, zone]);

  const gameOver = !running && lives <= 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-black/25 px-3 py-2 font-mono text-sm ring-1 ring-white/10">
        <div className="flex items-center gap-4">
          <span><span className="text-muted-foreground">SCORE</span> <span className="text-foreground">{score}</span></span>
          <span><span className="text-muted-foreground">STREAK</span> <span className="text-[hsl(var(--steam-green))]">x{streak}</span></span>
          <span><span className="text-muted-foreground">BEST</span> <span className="text-[hsl(var(--steam-gold))]">{best}</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`h-4 w-4 ${i < lives ? "fill-[hsl(var(--steam-red))] text-[hsl(var(--steam-red))]" : "text-muted-foreground/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Track */}
      <div
        className={`relative h-16 overflow-hidden rounded-md border bg-[linear-gradient(180deg,rgba(0,0,0,0.3),rgba(0,0,0,0.15))] ring-1 ring-white/5 transition-colors ${
          result === "hit"
            ? "border-[hsl(var(--steam-green))]/60"
            : result === "miss"
            ? "border-[hsl(var(--steam-red))]/60"
            : "border-border"
        }`}
      >
        {/* deploy zone */}
        <div
          className="absolute inset-y-0 bg-[hsl(var(--steam-green))]/20 ring-1 ring-inset ring-[hsl(var(--steam-green))]/50"
          style={{ left: `${zone.start}%`, width: `${zone.width}%` }}
        >
          <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--steam-green))]">
            deploy
          </span>
        </div>
        {/* marker */}
        <div
          className="absolute inset-y-1 w-1.5 -translate-x-1/2 rounded-full bg-[hsl(var(--steam-link))] shadow-[0_0_12px_hsl(var(--steam-link))]"
          style={{ left: `${pos}%` }}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => (running ? deploy() : start())}
          className="h-12 flex-1 text-base"
        >
          <Rocket className="h-5 w-5" />
          {running ? "DEPLOY" : gameOver ? "Try again" : "Start"}
        </Button>
      </div>

      {gameOver ? (
        <p className="rounded-sm bg-[hsl(var(--steam-red))]/10 p-2 text-center text-sm text-[hsl(var(--steam-red))] ring-1 ring-[hsl(var(--steam-red))]/30">
          Rollback! Final score {score}. {score >= best && score > 0 ? "New best 🎉" : "Tap to redeploy."}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Tap <span className="font-semibold text-foreground">DEPLOY</span> (or press Space) when the marker is inside the
          green zone. Each hit speeds it up and shrinks the window. 3 bad deploys and you&rsquo;re rolled back.
        </p>
      )}
    </div>
  );
}
