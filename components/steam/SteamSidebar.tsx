"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const nav = [
  { href: "/", label: "Profile" },
  { href: "/projects", label: "Projects" },
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

  return (
    <aside className="lg:sticky lg:top-[5.5rem]">
      <div className="space-y-4">
        {/* Profile module */}
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded bg-black/20 ring-1 ring-white/10">
              <img
                src={profile.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold leading-5 text-foreground">{profile.displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{profile.country ?? ""}</p>
            </div>
            <div className="relative ml-auto grid h-9 w-9 place-items-center rounded-full bg-black/25 ring-1 ring-white/10">
              <div className="absolute inset-0 rounded-full ring-2 ring-[hsl(var(--steam-link))]/60" />
              <span className="text-xs font-semibold text-foreground">{level}</span>
            </div>
          </div>

          <div className="mt-3 rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-foreground">{profile.status?.label ?? "Status"}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{profile.status?.sublabel ?? ""}</p>
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
                  {active ? <span className="text-xs tracking-[0.2em] text-muted-foreground">▶</span> : null}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Links + mini-stats module */}
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
            </div>
          </div>

          {profile.sideStats?.length ? (
            <div className="mt-4 border-t border-border pt-3">
              <div className="grid grid-cols-3 gap-2 px-2">
                {profile.sideStats.slice(0, 3).map((s) => (
                  <div key={s.label} className="rounded-sm bg-black/20 px-2 py-2 ring-1 ring-white/5">
                    <p className="text-base font-semibold leading-none text-foreground">{s.value}</p>
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}


