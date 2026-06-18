"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/steam/MobileNav";
import { NotificationsMenu } from "@/components/steam/NotificationsMenu";
import { FriendsBubble } from "@/components/steam/FriendsBubble";
import { AccountMenu } from "@/components/steam/AccountMenu";
import { profile } from "@/data/profile";

const nav = [
  { href: "/store", label: "STORE" },
  { href: "/library", label: "LIBRARY" },
  { href: "/library/arcade", label: "ARCADE" },
  { href: "/", label: profile.displayName.toUpperCase() },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/library") return pathname === "/library" || pathname.startsWith("/library/projects");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SteamTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[hsl(var(--steam-topbar))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--steam-topbar))]/85">
      <div className="mx-auto flex h-14 max-w-[100rem] items-center justify-between gap-3 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <MobileNav />

          <Link
            href="/"
            className="flex items-center gap-2 text-[hsl(var(--steam-topbar-foreground))]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-gradient-to-b from-[hsl(var(--steam-link))]/40 to-black/30 text-sm font-black ring-1 ring-white/15">
              C
            </span>
            <span className="hidden font-semibold tracking-tight sm:inline">cengiz</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={cn(
                    "rounded px-3 py-2 text-xs font-semibold tracking-[0.14em] text-[hsl(var(--steam-topbar-muted))] transition-colors hover:text-[hsl(var(--steam-topbar-foreground))]",
                    active &&
                      "bg-white/5 text-[hsl(var(--steam-topbar-foreground))] ring-1 ring-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          {/* Social — recruiter-first, always one tap away */}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded text-[hsl(var(--steam-topbar-foreground))] hover:bg-white/5 sm:inline-flex"
          >
            <Github className="h-[1.15rem] w-[1.15rem]" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 items-center justify-center rounded text-[hsl(var(--steam-topbar-foreground))] hover:bg-white/5 sm:inline-flex"
          >
            <Linkedin className="h-[1.15rem] w-[1.15rem]" />
          </a>

          {/* Resume — prominent, visible on every screen size */}
          <Link
            href="/resume"
            className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-2.5 text-xs font-semibold tracking-[0.08em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] hover:brightness-110 sm:px-3"
          >
            <FileText className="h-4 w-4" />
            <span>RESUME</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <FriendsBubble />
            <NotificationsMenu />
          </div>
          <AccountMenu />
          <div className="ml-0.5 hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
