"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { profile } from "@/data/profile";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";
import { fireConfetti } from "@/lib/confetti";

export function AccountMenu() {
  const [open, setOpen] = React.useState(false);
  const [avatarSrc, setAvatarSrc] = React.useState<string>(profile.avatarUrl);
  const ref = React.useRef<HTMLDivElement>(null);
  const clicks = React.useRef(0);
  const lastClickAt = React.useRef(0);

  React.useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function handleAvatarClick() {
    sfx.click();
    setOpen((v) => !v);
    const now = Date.now();
    if (now - lastClickAt.current > 1500) clicks.current = 0;
    lastClickAt.current = now;
    clicks.current += 1;
    if (clicks.current >= 10) {
      clicks.current = 0;
      fireConfetti(140);
      unlock("avatar-spam");
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleAvatarClick}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-2 rounded px-1.5 text-[hsl(var(--steam-topbar-foreground))] hover:bg-white/5"
      >
        <span className="relative inline-block h-7 w-7 overflow-hidden rounded ring-1 ring-white/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setAvatarSrc("/steam/avatar.svg")}
          />
        </span>
        <span className="hidden text-sm font-semibold sm:inline">{profile.displayName}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] shadow-2xl ring-1 ring-white/10">
          <div className="border-b border-border p-3">
            <p className="text-sm font-semibold text-foreground">{profile.displayName}</p>
            <p className="text-[11px] text-muted-foreground">{profile.realName}</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-sm bg-white/5 px-2 py-1 text-[11px] text-foreground ring-1 ring-white/10">
              <span className="status-dot status-dot--online pulse-dot" />
              Online · Open to opportunities
            </div>
          </div>
          <ul className="text-sm">
            {[
              { href: "/", label: "View profile" },
              { href: "/library", label: "My library" },
              { href: "/library/arcade", label: "Arcade" },
              { href: "/store", label: "Store / Hire me" },
              { href: "/resume", label: "Resume" },
              { href: "/contact", label: "Contact" },
              { href: "/inventory", label: "Trading cards" },
              { href: "/replay", label: "Year in Code 2025" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
            Sign out · <span className="opacity-60">never, please hire me</span>
          </div>
        </div>
      )}
    </div>
  );
}
