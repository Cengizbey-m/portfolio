"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HouseModeToggle } from "@/components/HouseModeToggle";
import { MobileNav } from "@/components/steam/MobileNav";
import { profile } from "@/data/profile";

const nav = [
  { href: "/", label: "PROFILE" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/about", label: "ABOUT" },
  { href: "/resume", label: "RESUME" },
  { href: "/contact", label: "CONTACT" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SteamTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[hsl(var(--steam-topbar))]/90 backdrop-blur">
      <div className="steam-container">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-gradient-to-b from-white/10 to-black/10 ring-1 ring-white/10">
                C
              </span>
              <span className="hidden sm:inline">{profile.displayName}</span>
            </Link>
            <MobileNav />
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded px-3 py-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground",
                      active &&
                        "bg-white/5 text-foreground ring-1 ring-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <HouseModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}


