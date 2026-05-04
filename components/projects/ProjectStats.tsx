"use client";

import { Star, Clock, Users, HardDrive, Trophy } from "lucide-react";
import { getStatsFor } from "@/lib/projectStats";

export function ProjectStats({ slug }: { slug: string }) {
  const s = getStatsFor(slug);
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Stat icon={<Clock className="h-4 w-4" />} label="Hours on record" value={`${s.hoursPlayed} hrs`} />
      <Stat label="Last played" value={s.lastPlayed} />
      <Stat icon={<Trophy className="h-4 w-4" />} label="Achievements" value={`${s.achievementsUnlocked} / ${s.achievementsTotal}`} />
      <Stat
        icon={<Star className="h-4 w-4 text-[hsl(var(--steam-gold))]" />}
        label="Reviews"
        value={`${s.reviewSummary} (${s.reviewCount.toLocaleString()})`}
      />
      <Stat icon={<HardDrive className="h-4 w-4" />} label="Install size" value={`${s.installedSizeMb} MB`} />
      <Stat icon={<Users className="h-4 w-4" />} label="Players" value="Single + Co-op" />
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
