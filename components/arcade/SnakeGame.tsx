"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

const COLS = 24;
const ROWS = 18;
const CELL = 20; // px
const TICK_MS = 110;

type Cell = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const HIGH_KEY = "cengiz.snake.high.v1";

function randomFood(snake: Cell[]): Cell {
  while (true) {
    const c = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => s.x === c.x && s.y === c.y)) return c;
  }
}

const COMMIT_MSGS = [
  "fix: typo",
  "feat: shipit",
  "refactor",
  "wip",
  "init",
  "chore",
  "docs",
  "test",
  "perf",
  "lint",
];

export function SnakeGame() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [high, setHigh] = React.useState(0);
  const [foodMsg, setFoodMsg] = React.useState<string>(COMMIT_MSGS[0]);

  const stateRef = React.useRef({
    snake: [
      { x: 10, y: 9 },
      { x: 9, y: 9 },
      { x: 8, y: 9 },
    ] as Cell[],
    dir: "right" as Dir,
    pendingDir: "right" as Dir,
    food: { x: 14, y: 9 } as Cell,
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(HIGH_KEY);
    if (raw) setHigh(parseInt(raw, 10) || 0);
  }, []);

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#0e1620";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL + 0.5, 0);
      ctx.lineTo(x * CELL + 0.5, ROWS * CELL);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL + 0.5);
      ctx.lineTo(COLS * CELL, y * CELL + 0.5);
      ctx.stroke();
    }

    const { snake, food } = stateRef.current;

    // Food (commit)
    ctx.fillStyle = "#e1ad21";
    ctx.shadowColor = "rgba(225,173,33,0.6)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#1b2838";
    ctx.font = "bold 10px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⋯", food.x * CELL + CELL / 2, food.y * CELL + CELL / 2 + 1);

    // Snake
    snake.forEach((s, i) => {
      const head = i === 0;
      ctx.fillStyle = head ? "#66c0f4" : `rgba(102,192,244,${0.85 - i * 0.02})`;
      ctx.shadowColor = head ? "rgba(102,192,244,0.55)" : "transparent";
      ctx.shadowBlur = head ? 10 : 0;
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
      ctx.shadowBlur = 0;
    });
  }, []);

  React.useEffect(() => {
    draw();
  }, [draw]);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const st = stateRef.current;
      st.dir = st.pendingDir;
      const head = st.snake[0];
      const next: Cell = {
        x: head.x + (st.dir === "left" ? -1 : st.dir === "right" ? 1 : 0),
        y: head.y + (st.dir === "up" ? -1 : st.dir === "down" ? 1 : 0),
      };

      if (
        next.x < 0 ||
        next.x >= COLS ||
        next.y < 0 ||
        next.y >= ROWS ||
        st.snake.some((s) => s.x === next.x && s.y === next.y)
      ) {
        setRunning(false);
        setOver(true);
        sfx.arcadeOver();
        setScore((sc) => {
          if (sc > high) {
            setHigh(sc);
            try {
              window.localStorage.setItem(HIGH_KEY, String(sc));
            } catch {/* ignore */}
          }
          return sc;
        });
        return;
      }

      st.snake.unshift(next);
      if (next.x === st.food.x && next.y === st.food.y) {
        setScore((s) => {
          const ns = s + 1;
          if (ns >= 50) unlock("snake-score-50");
          return ns;
        });
        sfx.arcadeEat();
        st.food = randomFood(st.snake);
        setFoodMsg(COMMIT_MSGS[Math.floor(Math.random() * COMMIT_MSGS.length)]);
      } else {
        st.snake.pop();
      }
      draw();
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, draw, high]);

  const reset = React.useCallback(() => {
    stateRef.current.snake = [
      { x: 10, y: 9 },
      { x: 9, y: 9 },
      { x: 8, y: 9 },
    ];
    stateRef.current.dir = "right";
    stateRef.current.pendingDir = "right";
    stateRef.current.food = randomFood(stateRef.current.snake);
    setScore(0);
    setOver(false);
    setRunning(true);
    unlock("play-snake");
    draw();
  }, [draw]);

  const start = React.useCallback(() => {
    if (over) {
      reset();
      return;
    }
    setRunning((r) => !r);
    if (!running) unlock("play-snake");
  }, [over, running, reset]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key;
      const st = stateRef.current;
      const set = (d: Dir, opp: Dir) => {
        if (st.dir !== opp) st.pendingDir = d;
      };
      if (k === "ArrowUp" || k === "w" || k === "W") set("up", "down");
      else if (k === "ArrowDown" || k === "s" || k === "S") set("down", "up");
      else if (k === "ArrowLeft" || k === "a" || k === "A") set("left", "right");
      else if (k === "ArrowRight" || k === "d" || k === "D") set("right", "left");
      else if (k === " ") {
        e.preventDefault();
        if (over) reset();
        else setRunning((r) => !r);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [over, reset]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm bg-black/25 px-3 py-2 ring-1 ring-white/10">
        <div className="flex items-center gap-4 font-mono text-sm">
          <span>
            <span className="text-muted-foreground">SCORE</span>{" "}
            <span className="font-semibold text-foreground">{score}</span>
          </span>
          <span>
            <span className="text-muted-foreground">HIGH</span>{" "}
            <span className="font-semibold text-[hsl(var(--steam-gold))]">{high}</span>
          </span>
          <span className="hidden sm:inline">
            <span className="text-muted-foreground">EATING</span>{" "}
            <span className="text-[hsl(var(--steam-link))]">{foodMsg}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={start} className="normal-case tracking-normal font-medium">
            {over ? "Restart" : running ? "Pause" : score > 0 ? "Resume" : "Start"}
          </Button>
          <Button variant="secondary" onClick={reset} className="normal-case tracking-normal font-medium">
            Reset
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-black ring-1 ring-white/10">
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="block max-w-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {over && (
        <div className="rounded-sm border border-[hsl(var(--steam-red))]/40 bg-[hsl(var(--steam-red))]/10 px-3 py-2 text-sm text-foreground">
          Game over — your snake bit itself. Final score: <strong>{score}</strong>. Press{" "}
          <kbd className="rounded bg-white/10 px-1 py-0.5 text-xs">Space</kbd> or hit restart.
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Controls: arrow keys / WASD, space to pause. Score 50+ for a hidden achievement.
      </p>

      {/* Mobile touch controls */}
      <div className="grid grid-cols-3 gap-2 sm:hidden">
        <span />
        <Button variant="secondary" onClick={() => (stateRef.current.dir !== "down" ? (stateRef.current.pendingDir = "up") : null)}>↑</Button>
        <span />
        <Button variant="secondary" onClick={() => (stateRef.current.dir !== "right" ? (stateRef.current.pendingDir = "left") : null)}>←</Button>
        <Button variant="secondary" onClick={() => (stateRef.current.dir !== "up" ? (stateRef.current.pendingDir = "down") : null)}>↓</Button>
        <Button variant="secondary" onClick={() => (stateRef.current.dir !== "left" ? (stateRef.current.pendingDir = "right") : null)}>→</Button>
      </div>
    </div>
  );
}
