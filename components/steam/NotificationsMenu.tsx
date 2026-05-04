"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Trophy, Tag, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { staticNotifications, type StaticNotification } from "@/data/notifications";
import { sfx } from "@/lib/sound";

const ICONS: Record<StaticNotification["kind"], React.ComponentType<{ className?: string }>> = {
  achievement: Trophy,
  friend: Users,
  update: Sparkles,
  sale: Tag,
};

const READ_KEY = "cengiz.notif.read.v1";

function readSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(READ_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}
function writeSet(s: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(READ_KEY, JSON.stringify(Array.from(s)));
  } catch { /* ignore */ }
}

export function NotificationsMenu() {
  const [open, setOpen] = React.useState(false);
  const [read, setRead] = React.useState<Set<string>>(new Set());
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setRead(readSet());
  }, []);

  React.useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const unreadCount = staticNotifications.filter((n) => !read.has(n.id)).length;

  function markAllRead() {
    const next = new Set(staticNotifications.map((n) => n.id));
    writeSet(next);
    setRead(next);
  }

  function toggle() {
    setOpen((v) => {
      const next = !v;
      if (next) sfx.notify();
      return next;
    });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded text-[hsl(var(--steam-topbar-foreground))] hover:bg-white/5"
      >
        <Bell className="h-4.5 w-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[1rem] place-items-center rounded-full bg-[hsl(var(--steam-green))] px-1 text-[10px] font-bold text-black ring-2 ring-[hsl(var(--steam-topbar))]">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-80 max-w-[92vw] overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] shadow-2xl ring-1 ring-white/10"
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
              Notifications
            </p>
            <button
              type="button"
              onClick={markAllRead}
              className="rounded px-2 py-1 text-[11px] text-[hsl(var(--steam-link))] hover:bg-white/5"
            >
              Mark all read
            </button>
          </div>
          <ul className="max-h-80 overflow-y-auto steam-scroll">
            {staticNotifications.map((n) => {
              const Icon = ICONS[n.kind];
              const isUnread = !read.has(n.id);
              const Body = (
                <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-white/5">
                  <div
                    className={cn(
                      "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-black/30 ring-1 ring-white/10",
                      n.kind === "achievement" && "text-[hsl(var(--steam-gold))]",
                      n.kind === "sale" && "text-[hsl(var(--steam-orange))]",
                      n.kind === "friend" && "text-[hsl(var(--steam-green))]",
                      n.kind === "update" && "text-[hsl(var(--steam-link))]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">{n.title}</p>
                      <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {n.when}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {n.body}
                    </p>
                  </div>
                  {isUnread && (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--steam-green))]" />
                  )}
                </div>
              );
              return (
                <li key={n.id} className="border-b border-border/60 last:border-b-0">
                  {n.href ? (
                    <Link href={n.href} onClick={() => setOpen(false)}>
                      {Body}
                    </Link>
                  ) : (
                    Body
                  )}
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border px-3 py-2 text-right">
            <Link
              href="/community"
              onClick={() => setOpen(false)}
              className="text-xs text-[hsl(var(--steam-link))] hover:underline"
            >
              View all activity →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
