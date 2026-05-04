"use client";

import * as React from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { LevelRing } from "@/components/steam/LevelRing";
import { unlock } from "@/lib/achievements";
import { fireConfetti } from "@/lib/confetti";
import { sfx } from "@/lib/sound";

export function ProfileHeader({ className }: { className?: string }) {
  const level = profile.level ?? 1;
  const [bannerSrc, setBannerSrc] = React.useState<string>(profile.bannerUrl);
  const [avatarSrc, setAvatarSrc] = React.useState<string>(profile.avatarUrl);
  const clicks = React.useRef(0);
  const last = React.useRef(0);

  function handleAvatarClick() {
    sfx.click();
    const now = Date.now();
    if (now - last.current > 1500) clicks.current = 0;
    last.current = now;
    clicks.current += 1;
    if (clicks.current >= 10) {
      clicks.current = 0;
      fireConfetti(140);
      unlock("avatar-spam");
    }
  }

  return (
    <section
      className={cn(
        "overflow-hidden rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      <div className="relative h-32 w-full md:h-44">
        {bannerSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bannerSrc}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setBannerSrc("")}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(900px_260px_at_20%_10%,rgba(102,192,244,0.18),transparent_55%),linear-gradient(180deg,rgba(23,26,33,0.8),rgba(27,40,56,0.8))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
      </div>

      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Avatar"
            className="group relative h-16 w-16 overflow-hidden rounded bg-black/20 ring-1 ring-white/10 md:h-20 md:w-20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt=""
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
              loading="lazy"
              onError={() => setAvatarSrc("/steam/avatar.svg")}
            />
            <span className="absolute inset-x-0 bottom-0 grid h-5 place-items-center bg-black/60 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
              Click me
            </span>
          </button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {profile.displayName}
              </p>
              <p className="text-xs text-muted-foreground">{profile.realName}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {profile.country ? `${profile.country} • ` : ""}
              {profile.headline} • {profile.location}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <LevelRing level={level} progress={0.62} size={44} />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Global Sentinel
                </p>
                <p className="text-xs text-muted-foreground">
                  500 XP · {profile.status?.label ?? "Status"}
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
