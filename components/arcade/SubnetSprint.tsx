"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

const HIGH_KEY = "cengiz.subnet.high.v1";
const ROUND_SECONDS = 60;

type Question = {
  prompt: string;
  options: string[];
  answer: number; // index
  why: string;
};

const POOL: Question[] = [
  {
    prompt: "How many usable hosts in a /24?",
    options: ["256", "254", "510", "126"],
    answer: 1,
    why: "/24 = 256 addresses minus network + broadcast = 254.",
  },
  {
    prompt: "What's the subnet mask for /27?",
    options: ["255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248"],
    answer: 1,
    why: "/27 borrows 3 host bits: 224 in the last octet.",
  },
  {
    prompt: "Which is a private IPv4 range?",
    options: ["172.32.0.0/12", "192.169.0.0/16", "10.0.0.0/8", "11.0.0.0/8"],
    answer: 2,
    why: "10.0.0.0/8 is RFC1918. 172.16.0.0/12 (not /32!) and 192.168.0.0/16 are the others.",
  },
  {
    prompt: "How many usable hosts in a /30?",
    options: ["1", "2", "4", "0"],
    answer: 1,
    why: "/30 has 4 addresses, minus 2 = 2 usable. Classic point-to-point link.",
  },
  {
    prompt: "Which CIDR has 1024 addresses?",
    options: ["/22", "/20", "/24", "/21"],
    answer: 0,
    why: "2^(32-22) = 2^10 = 1024.",
  },
  {
    prompt: "IPv6 link-local prefix?",
    options: ["fc00::/7", "fe80::/10", "ff00::/8", "2001::/16"],
    answer: 1,
    why: "fe80::/10 — link-local. fc00::/7 = unique local, ff00::/8 = multicast.",
  },
  {
    prompt: "Default gateway typically lives at... in a /24?",
    options: [
      "the network address",
      "the broadcast address",
      "the first or last usable host",
      "any random IP",
    ],
    answer: 2,
    why: "Convention: .1 (or sometimes .254) — the first or last usable host.",
  },
  {
    prompt: "Which is NOT a valid subnet mask?",
    options: ["255.255.255.192", "255.255.255.128", "255.255.255.160", "255.255.255.224"],
    answer: 2,
    why: "Subnet masks must be contiguous 1-bits. 160 = 10100000 — gap = invalid.",
  },
  {
    prompt: "What's the network address of 192.168.10.45/27?",
    options: ["192.168.10.0", "192.168.10.32", "192.168.10.48", "192.168.10.64"],
    answer: 1,
    why: "/27 = blocks of 32. 45 falls in 32-63, so network = .32.",
  },
  {
    prompt: "DNS commonly uses which port?",
    options: ["TCP 25", "UDP 53", "TCP 80", "UDP 123"],
    answer: 1,
    why: "DNS is mostly UDP/53 (TCP/53 for zone transfers + large responses).",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type State = "idle" | "playing" | "over";

export function SubnetSprint() {
  const [state, setState] = React.useState<State>("idle");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [answered, setAnswered] = React.useState<number | null>(null);
  const [time, setTime] = React.useState(ROUND_SECONDS);
  const [high, setHigh] = React.useState(0);
  const [allRight, setAllRight] = React.useState(true);

  React.useEffect(() => {
    const raw = window.localStorage.getItem(HIGH_KEY);
    if (raw) setHigh(parseInt(raw, 10) || 0);
  }, []);

  React.useEffect(() => {
    if (state !== "playing") return;
    if (time <= 0) {
      finish();
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
    // finish is stable within the component for the loop's lifetime; intentionally not tracked.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, state]);

  function start() {
    setQuestions(shuffle(POOL));
    setIdx(0);
    setScore(0);
    setStreak(0);
    setTime(ROUND_SECONDS);
    setAnswered(null);
    setAllRight(true);
    setState("playing");
    sfx.click();
  }

  function answer(i: number) {
    if (answered !== null || state !== "playing") return;
    setAnswered(i);
    const q = questions[idx];
    if (i === q.answer) {
      sfx.arcadeEat();
      setScore((s) => s + 1 + streak);
      setStreak((s) => s + 1);
    } else {
      sfx.arcadeOver();
      setStreak(0);
      setAllRight(false);
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        finish();
      } else {
        setIdx((i2) => i2 + 1);
        setAnswered(null);
      }
    }, 800);
  }

  function finish() {
    setState("over");
    setScore((s) => {
      if (s > high) {
        setHigh(s);
        try { window.localStorage.setItem(HIGH_KEY, String(s)); } catch {/* ignore */}
      }
      return s;
    });
    if (allRight && answered !== null) unlock("subnet-perfect");
  }

  if (state === "idle") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Sixty seconds. Ten questions max. Streaks multiply your score.
        </p>
        <Button onClick={start}>Start round</Button>
      </div>
    );
  }

  if (state === "over") {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-border bg-white/5 p-4 ring-1 ring-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Round complete
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            Score: {score} <span className="text-base font-medium text-muted-foreground">· high {high}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {allRight ? "Perfect run — Subnet Sensei unlocked." : "Restart and chase a perfect round for an achievement."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={start}>Play again</Button>
        </div>
      </div>
    );
  }

  const q = questions[idx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-black/25 px-3 py-2 font-mono text-sm ring-1 ring-white/10">
        <div className="flex items-center gap-4">
          <span><span className="text-muted-foreground">Q</span> {idx + 1}/{questions.length}</span>
          <span><span className="text-muted-foreground">SCORE</span> <span className="text-foreground">{score}</span></span>
          <span><span className="text-muted-foreground">STREAK</span> <span className="text-[hsl(var(--steam-green))]">x{streak}</span></span>
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
        </div>
      </div>

      <div className="rounded-md border border-border bg-[hsl(var(--steam-panel))] p-4 ring-1 ring-white/10">
        <p className="text-base font-semibold text-foreground">{q.prompt}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isAnswered = answered !== null;
            const isCorrect = i === q.answer;
            const isPicked = i === answered;
            return (
              <li key={opt}>
                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => answer(i)}
                  className={`w-full rounded-sm border bg-white/5 px-3 py-2 text-left text-sm ring-1 ring-white/10 transition ${
                    isAnswered && isCorrect
                      ? "border-[hsl(var(--steam-green))]/60 bg-[hsl(var(--steam-green))]/15 text-foreground"
                      : isAnswered && isPicked && !isCorrect
                      ? "border-[hsl(var(--steam-red))]/60 bg-[hsl(var(--steam-red))]/15 text-foreground"
                      : "border-border text-foreground hover:bg-white/10"
                  }`}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
        {answered !== null && (
          <p className="mt-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Why:</span> {q.why}
          </p>
        )}
      </div>
    </div>
  );
}
