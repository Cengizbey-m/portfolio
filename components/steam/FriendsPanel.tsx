"use client";

import * as React from "react";
import { friends, type Friend } from "@/data/friends";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

function FriendRow({ f }: { f: Friend }) {
  const dotClass =
    f.status === "online"
      ? "status-dot--online"
      : f.status === "in-game"
      ? "status-dot--in-game"
      : f.status === "away"
      ? "status-dot--away"
      : "status-dot--offline";

  const subtitle =
    f.status === "in-game" && f.playing
      ? `Playing ${f.playing}`
      : f.status === "online"
      ? "Online"
      : f.status === "away"
      ? "Away"
      : "Last online recently";

  const inner = (
    <>
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded text-sm font-bold text-white ring-1 ring-white/10 ${f.avatarColor}`}
      >
        {f.name.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{f.name}</p>
        <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
        <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground/80">{f.bio}</p>
      </div>
      <span className={`status-dot ${dotClass}`} />
    </>
  );

  const cls =
    "flex items-center gap-3 rounded-sm border border-border bg-white/5 p-2.5 ring-1 ring-white/10 hover:bg-white/10";

  if (f.href) {
    return (
      <a href={f.href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function FriendsPanel({ id }: { id?: string }) {
  const sorted = React.useMemo(() => {
    const order: Record<string, number> = { "in-game": 0, online: 1, away: 2, offline: 3 };
    return [...friends].sort((a, b) => order[a.status] - order[b.status]);
  }, []);
  const onlineCount = friends.filter((f) => f.status === "online" || f.status === "in-game").length;

  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="flex flex-row items-end justify-between gap-3">
        <SectionHeader
          title="Friends"
          description="Tools, frameworks, and OS comrades I work with."
        />
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
          {onlineCount} / {friends.length} ONLINE
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="grid gap-2 sm:grid-cols-2">
          {sorted.map((f) => (
            <li key={f.name}>
              <FriendRow f={f} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
