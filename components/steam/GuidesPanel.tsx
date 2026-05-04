"use client";

import { Star, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { guides } from "@/data/guides";

export function GuidesPanel({ id }: { id?: string }) {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="flex flex-row items-end justify-between gap-3">
        <SectionHeader
          title="Guides"
          description="Short reads from things I've shipped or debugged."
        />
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
          {guides.length}
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="grid gap-3 md:grid-cols-2">
          {guides.map((g) => (
            <li
              key={g.slug}
              className="flex flex-col gap-3 rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded bg-[hsl(var(--steam-link))]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[hsl(var(--steam-link))] ring-1 ring-[hsl(var(--steam-link))]/30">
                  {g.tag}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < g.rating
                          ? "fill-[hsl(var(--steam-gold))] text-[hsl(var(--steam-gold))]"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm font-semibold text-foreground">{g.title}</p>
              <p className="line-clamp-3 text-xs leading-6 text-muted-foreground">{g.summary}</p>
              <div className="mt-auto flex items-center gap-4 border-t border-border pt-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {g.readMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {g.views.toLocaleString()} views
                </span>
                <span className="ml-auto text-muted-foreground/70 italic">
                  Coming soon
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
