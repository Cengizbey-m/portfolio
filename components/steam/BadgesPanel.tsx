"use client";

import * as React from "react";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  Network,
  Server,
  Shield,
  Terminal,
} from "lucide-react";
import { badges, type PortfolioBadge } from "@/data/badges";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

const iconMap: Record<PortfolioBadge["icon"], React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  cloud: Cloud,
  code: Code2,
  database: Database,
  network: Network,
  server: Server,
  shield: Shield,
  terminal: Terminal,
};

export function BadgesPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-end justify-between gap-3">
        <SectionHeader
          title="Badges"
          description="Skills and focus areas."
        />
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
          {badges.length}
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {badges.map((b) => {
            const Icon = iconMap[b.icon];
            return (
              <div
                key={b.label}
                className="flex items-center gap-3 rounded-sm border border-border bg-white/5 px-3 py-2 ring-1 ring-white/10"
              >
                <div className="grid h-8 w-8 place-items-center rounded-sm bg-black/20 ring-1 ring-white/10">
                  <Icon className="h-4 w-4 text-[hsl(var(--steam-link))]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {b.label}
                  </p>
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                    {b.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}


