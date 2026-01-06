"use client";

import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ProfileHeader({ className }: { className?: string }) {
  const level = profile.level ?? 1;
  return (
    <section
      className={cn(
        "overflow-hidden rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      <div className="relative h-32 w-full md:h-40">
        <img
          src={profile.bannerUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded bg-black/20 ring-1 ring-white/10 md:h-20 md:w-20">
            <img
              src={profile.avatarUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {profile.displayName}
              </p>
              <p className="text-xs text-muted-foreground">
                {profile.realName}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {profile.country ? `${profile.country} • ` : ""}
              {profile.headline} • {profile.location}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="relative grid h-9 w-9 place-items-center rounded-full bg-black/25 ring-1 ring-white/10">
                <div className="absolute inset-0 rounded-full ring-2 ring-[hsl(var(--steam-link))]/70" />
                <span className="text-xs font-semibold text-foreground">{level}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {profile.status?.label ?? "Status"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {profile.status?.sublabel ?? ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {profile.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-sm border border-border bg-white/5 px-3 py-2 text-center ring-1 ring-white/10"
            >
              <p className="text-lg font-semibold leading-none text-foreground">{s.value}</p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


