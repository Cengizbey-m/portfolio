"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquareMore } from "lucide-react";
import { friends } from "@/data/friends";
import { sfx } from "@/lib/sound";

export function FriendsBubble() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const onlineCount = friends.filter((f) => f.status === "online" || f.status === "in-game").length;

  React.useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          sfx.click();
          setOpen((v) => !v);
        }}
        aria-label={`Friends, ${onlineCount} online`}
        className="relative inline-flex h-9 items-center gap-1.5 rounded px-2 text-[hsl(var(--steam-topbar-foreground))] hover:bg-white/5"
      >
        <span className="status-dot status-dot--online" />
        <MessageSquareMore className="h-4.5 w-4.5" />
        <span className="hidden text-xs font-semibold sm:inline">{onlineCount}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-72 max-w-[92vw] overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] shadow-2xl ring-1 ring-white/10">
          <div className="border-b border-border px-3 py-2 text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            Friends ({onlineCount} online)
          </div>
          <ul className="max-h-80 overflow-y-auto steam-scroll">
            {friends.map((f) => {
              const dotClass =
                f.status === "online"
                  ? "status-dot--online"
                  : f.status === "in-game"
                  ? "status-dot--in-game"
                  : f.status === "away"
                  ? "status-dot--away"
                  : "status-dot--offline";
              return (
                <li key={f.name} className="border-b border-border/60 last:border-b-0">
                  <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5">
                    <div className={`grid h-8 w-8 shrink-0 place-items-center rounded text-xs font-bold text-white ring-1 ring-white/10 ${f.avatarColor}`}>
                      {f.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{f.name}</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {f.status === "in-game" && f.playing
                          ? `Playing ${f.playing}`
                          : f.status === "online"
                          ? "Online"
                          : f.status === "away"
                          ? "Away"
                          : "Offline"}
                      </p>
                    </div>
                    <span className={`status-dot ${dotClass}`} />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border px-3 py-2 text-right">
            <Link
              href="/community#friends"
              onClick={() => setOpen(false)}
              className="text-xs text-[hsl(var(--steam-link))] hover:underline"
            >
              Friends list →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
