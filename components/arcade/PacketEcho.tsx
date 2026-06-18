"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

const BEST_KEY = "cengiz.packetecho.best.v1";

type Phase = "idle" | "showing" | "input" | "over";

const PADS = [
  { freq: 329.63, on: "bg-[hsl(var(--steam-link))]", glow: "shadow-[0_0_24px_hsl(var(--steam-link))]" },
  { freq: 415.3, on: "bg-[hsl(var(--steam-green))]", glow: "shadow-[0_0_24px_hsl(var(--steam-green))]" },
  { freq: 523.25, on: "bg-[hsl(var(--steam-gold))]", glow: "shadow-[0_0_24px_hsl(var(--steam-gold))]" },
  { freq: 659.25, on: "bg-[hsl(var(--steam-purple))]", glow: "shadow-[0_0_24px_hsl(var(--steam-purple))]" },
];

function randPad() {
  return Math.floor(Math.random() * PADS.length);
}

export function PacketEcho() {
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [level, setLevel] = React.useState(0);
  const [best, setBest] = React.useState(0);
  const [active, setActive] = React.useState<number | null>(null);

  const seqRef = React.useRef<number[]>([]);
  const inputRef = React.useRef(0);
  const timers = React.useRef<number[]>([]);
  const phaseRef = React.useRef<Phase>("idle");

  React.useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  React.useEffect(() => {
    const raw = window.localStorage.getItem(BEST_KEY);
    if (raw) setBest(parseInt(raw, 10) || 0);
  }, []);

  const clearTimers = React.useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  React.useEffect(() => () => clearTimers(), [clearTimers]);

  const playSequence = React.useCallback(() => {
    clearTimers();
    setPhase("showing");
    const seq = seqRef.current;
    let delay = 450;
    const step = Math.max(360, 620 - seq.length * 18); // speeds up as it grows
    seq.forEach((pad) => {
      const tOn = window.setTimeout(() => {
        setActive(pad);
        sfx.tone(PADS[pad].freq);
      }, delay);
      const tOff = window.setTimeout(() => setActive(null), delay + step * 0.6);
      timers.current.push(tOn, tOff);
      delay += step;
    });
    const tEnd = window.setTimeout(() => {
      inputRef.current = 0;
      setPhase("input");
    }, delay + 120);
    timers.current.push(tEnd);
  }, [clearTimers]);

  function persistBest(value: number) {
    setBest((prev) => {
      const next = Math.max(prev, value);
      try {
        window.localStorage.setItem(BEST_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function start() {
    clearTimers();
    seqRef.current = [randPad()];
    setLevel(1);
    unlock("play-echo");
    sfx.click();
    playSequence();
  }

  function nextRound() {
    seqRef.current = [...seqRef.current, randPad()];
    setLevel(seqRef.current.length);
    playSequence();
  }

  function handlePad(i: number) {
    if (phaseRef.current !== "input") return;
    setActive(i);
    sfx.tone(PADS[i].freq, 0.16);
    window.setTimeout(() => setActive(null), 160);

    const seq = seqRef.current;
    if (seq[inputRef.current] === i) {
      inputRef.current += 1;
      if (inputRef.current === seq.length) {
        const cleared = seq.length;
        persistBest(cleared);
        if (cleared >= 8) unlock("echo-master");
        setPhase("showing");
        const t = window.setTimeout(nextRound, 750);
        timers.current.push(t);
      }
    } else {
      clearTimers();
      sfx.arcadeOver();
      setPhase("over");
    }
  }

  const isPlaying = phase === "showing" || phase === "input";
  const statusText =
    phase === "showing"
      ? "Watch the sequence…"
      : phase === "input"
      ? "Your turn — repeat it"
      : phase === "over"
      ? `Dropped packet! You reached length ${level}.`
      : "Repeat the growing packet sequence.";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-black/25 px-3 py-2 font-mono text-sm ring-1 ring-white/10">
        <div className="flex items-center gap-4">
          <span><span className="text-muted-foreground">LENGTH</span> <span className="text-foreground">{level}</span></span>
          <span><span className="text-muted-foreground">BEST</span> <span className="text-[hsl(var(--steam-gold))]">{best}</span></span>
        </div>
        <Button onClick={start} disabled={phase === "showing"} className="normal-case tracking-normal font-medium">
          {phase === "idle" ? "Start" : isPlaying ? "Restart" : "Play again"}
        </Button>
      </div>

      <div
        className={`rounded-sm px-3 py-2 text-center text-sm ring-1 ${
          phase === "over"
            ? "bg-[hsl(var(--steam-red))]/10 text-[hsl(var(--steam-red))] ring-[hsl(var(--steam-red))]/30"
            : phase === "input"
            ? "bg-[hsl(var(--steam-green))]/10 text-[hsl(var(--steam-green))] ring-[hsl(var(--steam-green))]/30"
            : "bg-black/20 text-muted-foreground ring-white/10"
        }`}
      >
        {statusText}
      </div>

      <div className="mx-auto grid max-w-sm grid-cols-2 gap-3">
        {PADS.map((pad, i) => {
          const lit = active === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => handlePad(i)}
              disabled={phase !== "input"}
              aria-label={`Pad ${i + 1}`}
              className={`aspect-[4/3] rounded-lg border transition-all duration-100 ${
                lit
                  ? `${pad.on} ${pad.glow} border-white/30 scale-[1.03]`
                  : "border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.25))] hover:border-white/20"
              } ${phase === "input" ? "cursor-pointer" : "cursor-default"}`}
            />
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Watch the packets light up, then tap them back in the same order. Each round adds one more. Tap-friendly on mobile.
      </p>
    </div>
  );
}
