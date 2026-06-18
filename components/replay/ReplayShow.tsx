"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/steam/AnimatedCounter";
import { unlock } from "@/lib/achievements";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Commits per month — totally vibe-driven, looks like real activity.
const commits = [22, 38, 51, 47, 64, 73, 41, 35, 58, 81, 76, 26];

const langs = [
  { name: "TypeScript", pct: 58, color: "bg-[#3178c6]" },
  { name: "Python", pct: 17, color: "bg-[#3572A5]" },
  { name: "SQL", pct: 9, color: "bg-[#e38c00]" },
  { name: "Bash", pct: 7, color: "bg-[#4eaa25]" },
  { name: "Other", pct: 9, color: "bg-white/30" },
];

export function ReplayShow() {
  React.useEffect(() => {
    unlock("watched-replay");
  }, []);

  return (
    <div className="space-y-12">
      <Hero />

      <Section
        eyebrow="Time logged"
        title="You spent 1,164 hours in here this year."
        sub="That's 48 full days. The compiler was your most active friend."
      >
        <div className="grid gap-3 md:grid-cols-3">
          <Stat big to={1164} suffix=" hrs" label="Hours coding" />
          <Stat big to={612} suffix="" label="Commits pushed" />
          <Stat big to={27} suffix="" label="Late-night deploys" />
        </div>
      </Section>

      <Section
        eyebrow="Most active month"
        title="October. 81 commits, no broken builds."
        sub="That was capstone crunch and tripman polish. You shipped a lot."
      >
        <div className="rounded-md border border-border bg-[hsl(var(--steam-panel))] p-4 ring-1 ring-white/10">
          <CommitChart values={commits} />
        </div>
      </Section>

      <Section
        eyebrow="Top languages"
        title="TypeScript carried the year."
        sub="Python showed up for ML work. SQL kept things honest."
      >
        <ul className="space-y-3">
          {langs.map((l) => (
            <li key={l.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">{l.name}</span>
                <span className="text-muted-foreground tabular-nums">{l.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/30 ring-1 ring-white/10">
                <div
                  className={`h-full ${l.color} transition-[width] duration-1000`}
                  style={{ width: `${l.pct}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Most-played project"
        title="TheTripMan · 612 hours on record."
        sub="Plus a hackathon weekend and two more shipped builds."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Stat big to={612} suffix=" hrs" label="TheTripMan" />
          <Stat big to={384} suffix=" hrs" label="Capstone AI Finance" />
          <Stat big to={168} suffix=" hrs" label="Formally Prototype" />
          <Stat big to={48} suffix=" hrs" label="Le Pathétique · BearHacks" />
        </div>
      </Section>

      <Section
        eyebrow="Vibes"
        title="You were online at 2:14 AM more than any other time."
        sub="Don't worry. Caffeine was up 22% year-over-year."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-sm border border-border bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Most-used editor
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">Cursor + VS Code</p>
          </div>
          <div className="rounded-sm border border-border bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Most-used framework
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">Next.js · App Router</p>
          </div>
        </div>
      </Section>

      <section className="rounded-md border border-[hsl(var(--steam-link))]/30 bg-[hsl(var(--steam-link))]/10 p-6 text-center ring-1 ring-[hsl(var(--steam-link))]/40">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--steam-link))]">
          That&rsquo;s a wrap
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          See you in 2026 · graduating soon
        </h2>
        <p className="mx-auto mt-2 max-w-prose text-sm text-muted-foreground">
          Open to co-op &amp; new-grad full-stack roles. If your team needs a junior who already
          ships, that&rsquo;s the trade.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href="/store">Hire me · Store</Link>
          </Button>
          <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
            <Link href="/contact">Send a message</Link>
          </Button>
          <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
            <Link href="/library">Back to library</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden rounded-md border border-border bg-[radial-gradient(900px_320px_at_15%_15%,rgba(102,192,244,0.35),transparent_55%),linear-gradient(180deg,rgba(23,26,33,0.95),rgba(27,40,56,0.95))] p-8 ring-1 ring-white/5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--steam-link))]">
        Year in Code · 2025
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
        cengiz, your year
        <br />
        was <span className="text-[hsl(var(--steam-link))]">loud</span>.
      </h1>
      <p className="mt-3 max-w-prose text-sm leading-7 text-muted-foreground md:text-base">
        Scroll down. Animated stats, top languages, favourite project, and one
        chart that looks much better than the underlying sleep schedule.
      </p>
    </section>
  );
}

function Section({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--steam-link))]">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({
  big,
  to,
  suffix,
  label,
}: {
  big?: boolean;
  to: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="rounded-md border border-border bg-white/5 p-4 ring-1 ring-white/10">
      <p className={big ? "text-3xl font-extrabold text-foreground md:text-4xl" : "text-xl font-bold text-foreground"}>
        <AnimatedCounter to={to} />
        {suffix}
      </p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function CommitChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="space-y-3">
      <div className="flex items-end gap-1.5 md:gap-2" style={{ height: 200 }}>
        {values.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t bg-gradient-to-t from-[hsl(var(--steam-link))]/30 to-[hsl(var(--steam-link))] transition-[height] duration-1000 ease-out"
                style={{ height: `${(v / max) * 100}%` }}
                title={`${v} commits`}
              />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {months[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
