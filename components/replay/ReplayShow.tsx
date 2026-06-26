"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/steam/AnimatedCounter";
import { unlock } from "@/lib/achievements";

// A "Spotify Wrapped"-style year recap — but built on things that actually
// happened, not invented stats. Real projects, real grades, real tools.

// Roughly where my keyboard time went — a feel, not a GitHub export.
const langs = [
  { name: "TypeScript", pct: 55, color: "bg-[#3178c6]" },
  { name: "C# / .NET", pct: 18, color: "bg-[#9b6bd6]" },
  { name: "Python", pct: 15, color: "bg-[#3572A5]" },
  { name: "SQL", pct: 7, color: "bg-[#e38c00]" },
  { name: "Other", pct: 5, color: "bg-white/30" },
];

const builds = [
  { name: "TheTripMan", note: "Booking + payments for a 1.2M-follower client. Live, solo, revenue-share." },
  { name: "Le Pathétique", note: "Solo multimodal-AI hackathon build at BearHacks 2026." },
  { name: "Feather (Capstone)", note: "AI market-insights app with a team — prototype graded 94/100." },
  { name: "Puffy", note: "A second real client: a website for a local patisserie." },
];

export function ReplayShow() {
  React.useEffect(() => {
    unlock("watched-replay");
  }, []);

  return (
    <div className="space-y-12">
      <Hero />

      <Section
        eyebrow="The headline"
        title="Six builds shipped — two of them for real clients."
        sub="Not coursework screenshots. Live, deployed software people actually use."
      >
        <div className="grid gap-3 md:grid-cols-3">
          <Stat big to={6} suffix="" label="Projects shipped" />
          <Stat big to={2} suffix="" label="Real clients" />
          <Stat big to={94} suffix=" / 100" label="Capstone score" />
        </div>
      </Section>

      <Section
        eyebrow="Biggest build"
        title="TheTripMan went live — and kept running."
        sub="A booking + payments platform for an influencer-led business, built solo end-to-end and processing real bookings."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {builds.map((b) => (
            <li
              key={b.name}
              className="rounded-md border border-border bg-white/5 p-4 ring-1 ring-white/10"
            >
              <p className="text-sm font-bold text-foreground">{b.name}</p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">{b.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Where the time went"
        title="TypeScript carried the year."
        sub="A rough sense of the split — C#/.NET and Python pulled their weight on coursework and ML."
      >
        <ul className="space-y-3">
          {langs.map((l) => (
            <li key={l.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">{l.name}</span>
                <span className="text-muted-foreground tabular-nums">~{l.pct}%</span>
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
        eyebrow="Tools I lived in"
        title="Next.js and a fast editor did the heavy lifting."
        sub="Modern stack, used the way a working dev actually uses it."
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
          Graduating Aug 2026 — and already shipping
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
        Year in Code · 2025–26
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
        cengiz, your year
        <br />
        was <span className="text-[hsl(var(--steam-link))]">loud</span>.
      </h1>
      <p className="mt-3 max-w-prose text-sm leading-7 text-white/70 md:text-base">
        Scroll down — the projects that shipped, where the time went, and the tools that
        carried it. No invented stats; just the real highlights.
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
