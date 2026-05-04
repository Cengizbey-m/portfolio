"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

const phrases = [
  "Currently in-build",
  "Currently shipping",
  "Currently caffeinated",
  "Currently debugging",
  "Currently reading docs",
];

export function StatusPanel() {
  const [phrase, setPhrase] = React.useState(phrases[0]);
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <Card>
      <CardHeader>
        <SectionHeader
          title="Currently Online"
          description="Pingable in roughly the speed of a mid-range Wi-Fi packet."
        />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-sm bg-white/5 px-3 py-2 ring-1 ring-white/10">
            <span className="status-dot status-dot--online pulse-dot" />
            <span className="text-sm font-semibold text-foreground">Online</span>
            <span className="text-xs text-muted-foreground">· {phrase}</span>
          </div>
          <div className="rounded-sm bg-white/5 px-3 py-2 text-xs text-muted-foreground ring-1 ring-white/10">
            Local time: <span className="font-mono text-foreground">{time}</span>
          </div>
          <div className="rounded-sm bg-white/5 px-3 py-2 text-xs text-muted-foreground ring-1 ring-white/10">
            Reply window: <span className="text-foreground">within 24 hours</span>
          </div>
          <div className="rounded-sm bg-white/5 px-3 py-2 text-xs text-muted-foreground ring-1 ring-white/10">
            Coffee level: <span className="text-foreground">3 / 5 ☕</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
