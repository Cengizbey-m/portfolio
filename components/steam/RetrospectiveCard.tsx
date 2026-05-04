"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { AnimatedCounter } from "@/components/steam/AnimatedCounter";

const stats = [
  { value: 4, label: "Projects shipped" },
  { value: 1, label: "Hackathons (BearHacks 2026)" },
  { value: 1212, label: "Hours coding" },
  { value: 19684, label: "Lines of TypeScript" },
  { value: 658, label: "Commits pushed" },
  { value: 9, label: "Languages used" },
];

const fav = {
  language: "TypeScript",
  framework: "Next.js",
  editor: "Cursor + VS Code",
  os: "Windows + WSL2",
};

export function RetrospectiveCard() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title="Year in Code · 2025"
          description="Animated stats. Same energy as Steam Replay, fewer microtransactions."
        />
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
          Generated locally · no telemetry
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="count-pop rounded-sm border border-border bg-white/5 p-3 text-center ring-1 ring-white/10"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                <AnimatedCounter to={s.value} />
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(fav).map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between rounded-sm border border-border bg-white/5 px-3 py-2 ring-1 ring-white/10"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Most-used {k}
              </span>
              <span className="text-sm font-semibold text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
