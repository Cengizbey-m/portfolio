"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open navigation"
        className="inline-flex h-9 items-center gap-2 rounded-sm bg-white/5 px-3 text-xs font-semibold tracking-[0.12em] text-foreground ring-1 ring-white/10 hover:bg-white/10"
      >
        <span className="grid gap-1">
          <span className="h-[2px] w-4 bg-foreground/80" />
          <span className="h-[2px] w-4 bg-foreground/80" />
          <span className="h-[2px] w-4 bg-foreground/80" />
        </span>
        MENU
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-56 overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-topbar))] shadow-lg ring-1 ring-white/10">
          <div className="p-2">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground",
                    active && "bg-white/5 text-foreground ring-1 ring-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}


