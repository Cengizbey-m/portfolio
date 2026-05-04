"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/community", label: "COMMUNITY" },
  { href: "/", label: profile.displayName.toUpperCase() },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SteamTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[hsl(var(--steam-topbar))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--steam-topbar))]/85">
      <div className="mx-auto flex h-14 max-w-[100rem] items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[hsl(var(--steam-topbar-foreground))]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-gradient-to-b from-[hsl(var(--steam-link))]/40 to-black/30 text-sm font-black ring-1 ring-white/15">
              C
            </span>
            <span className="hidden font-semibold tracking-tight sm:inline">cengiz</span>
          </Link>

          <MobileNav />

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
          <FriendsBubble />
          <NotificationsMenu />
          <AccountMenu />
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
