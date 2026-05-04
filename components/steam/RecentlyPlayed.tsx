"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { getStatsFor } from "@/lib/projectStats";

export function RecentlyPlayed() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title="Recently Played"
          description="Most recent build sessions, ordered like Steam orders your library."
        />
        <Button
          variant="secondary"
          asChild
          className="normal-case tracking-normal font-medium"
        >
          <Link href="/library">Open library</Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => {
            const s = getStatsFor(p.slug);
            return (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="game-card block overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] ring-1 ring-white/5"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-black/30">
                    {p.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.coverImage}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-xs text-muted-foreground">
                        No cover
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {p.title.split("(")[0].trim()}
                    </p>
                    <div className="mt-1 flex items-baseline justify-between gap-2 text-[11px] text-muted-foreground">
                      <span>
                        <span className="font-mono text-foreground">{s.hoursPlayed}</span> hrs on record
                      </span>
                      <span>last played {s.lastPlayed}</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
