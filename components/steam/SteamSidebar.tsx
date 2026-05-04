"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { LevelRing } from "@/components/steam/LevelRing";
import { friends } from "@/data/friends";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";
import { reviews } from "@/data/reviews";

const nav: { href: string; label: string; count?: number }[] = [
  { href: "/", label: "Profile" },
  { href: "/library", label: "Library", count: projects.length },
  { href: "/library/arcade", label: "Arcade" },
  { href: "/inventory", label: "Inventory" },
  { href: "/replay", label: "Year in Code 2025" },
  { href: "/community", label: "Community", count: reviews.length },
  { href: "/store", label: "Store" },
  { href: "/projects", label: "Projects", count: projects.length },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SteamSidebar() {
  const pathname = usePathname();
  const level = profile.level ?? 1;
  const [avatarSrc, setAvatarSrc] = React.useState<string>(profile.avatarUrl);
  const onlineFriends = friends.filter((f) => f.status === "online" || f.status === "in-game").length;

  return (
    <aside className="lg:sticky lg:top-[5.5rem]">
      <div className="space-y-4">
        {/* Profile module */}
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded bg-black/20 ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                onError={() => setAvatarSrc("/steam/avatar.svg")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold leading-5 text-foreground">{profile.displayName}</p>
              <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                <span className="status-dot status-dot--online" />
                Online · {profile.country ?? ""}
              </p>
            </div>
            <LevelRing level={level} progress={0.62} size={40} badgeLabel={`Level ${level}`} />
          </div>

          <div className="mt-3 rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-foreground">{profile.status?.label ?? "Status"}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{profile.status?.sublabel ?? ""}</p>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-sm bg-black/25 px-3 py-2 ring-1 ring-white/5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Global Sentinel · 500 XP
              </p>
              <p className="text-[10px] text-muted-foreground/80">+92 XP to next level</p>
            </div>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-black/40 ring-1 ring-white/5">
              <div className="h-full w-[62%] rounded-full bg-[hsl(var(--steam-link))]" />
            </div>
          </div>
        </div>

        {/* Nav module */}
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            Navigation
          </p>
          <div className="space-y-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded px-2 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground",
                    active && "bg-white/5 text-foreground ring-1 ring-white/10"
                  )}
                >
                  <span>{item.label}</span>
                  {typeof item.count === "number" ? (
                    <span className="rounded bg-black/30 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground ring-1 ring-white/5">
                      {item.count}
                    </span>
                  ) : active ? (
                    <span className="text-xs tracking-[0.2em] text-muted-foreground">▶</span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Counts module (Steam: Inventory / Screenshots / Videos / Reviews) */}
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            Showcase
          </p>
          <ul className="space-y-1 px-1 text-sm">
            {[
              { label: "Inventory (skills)", value: 8, href: "/community#friends" },
              { label: "Screenshots", value: 12, href: "/library" },
              { label: "Videos", value: 2, href: "/library" },
              { label: "Reviews", value: reviews.length, href: "/community#reviews" },
              { label: "Achievements", value: achievements.length, href: "/community#achievements" },
              { label: "Friends online", value: onlineFriends, href: "/community#friends" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded px-2 py-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  <span>{item.label}</span>
                  <span className="text-foreground">{item.value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links module */}
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            Links
          </p>
          <div className="px-2">
            <div className="flex flex-wrap gap-2 text-sm">
              {profile.links.github ? (
                <a
                  className="rounded bg-white/5 px-2 py-1 text-xs text-foreground ring-1 ring-white/10 hover:bg-white/10"
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              ) : null}
              {profile.links.linkedin ? (
                <a
                  className="rounded bg-white/5 px-2 py-1 text-xs text-foreground ring-1 ring-white/10 hover:bg-white/10"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              ) : null}
              {profile.links.email ? (
                <a
                  className="rounded bg-white/5 px-2 py-1 text-xs text-foreground ring-1 ring-white/10 hover:bg-white/10"
                  href={`mailto:${profile.links.email}`}
                >
                  Email
                </a>
              ) : null}
              <Link
                className="rounded bg-white/5 px-2 py-1 text-xs text-foreground ring-1 ring-white/10 hover:bg-white/10"
                href="/resume"
              >
                Resume
              </Link>
              <Link
                className="rounded bg-white/5 px-2 py-1 text-xs text-foreground ring-1 ring-white/10 hover:bg-white/10"
                href="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Recruiter module */}
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            Recruiter info
          </p>
          <div className="space-y-2 px-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between gap-3">
              <span>Availability</span>
              <span className="text-foreground">{profile.status?.label ?? "-"}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Location</span>
              <span className="text-foreground">{profile.location}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Cost</span>
              <span className="text-[hsl(var(--steam-green))]">Free to chat</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
