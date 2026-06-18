"use client";

import * as React from "react";
import Link from "next/link";
import { Download, MessageSquare, Plus, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { isMuted, setMuted, onMuteChange, sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

export function StatusBar() {
  const [muted, setMutedState] = React.useState(true);
  const [downloading, setDownloading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setMutedState(isMuted());
    return onMuteChange(setMutedState);
  }, []);

  React.useEffect(() => {
    if (!downloading) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 1.5;
        if (next >= 100) {
          setDownloading(false);
          return 100;
        }
        return next;
      });
    }, 220);
    return () => clearInterval(id);
  }, [downloading]);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) sfx.click();
    unlock("toggle-mute");
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-11 border-t border-border bg-[hsl(var(--steam-topbar))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--steam-topbar))]/80">
      <div className="mx-auto flex h-full max-w-[100rem] items-center gap-3 px-3 text-xs text-[hsl(var(--steam-topbar-muted))]">
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 hover:bg-white/5 hover:text-[hsl(var(--steam-topbar-foreground))]"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add a project</span>
        </Link>

        <div className="hidden md:flex min-w-0 flex-1 items-center gap-2">
          <Download className="h-3.5 w-3.5 shrink-0" />
          {downloading ? (
            <>
              <span className="shrink-0 text-[hsl(var(--steam-topbar-foreground))]">
                Installing portfolio.exe
              </span>
              <div className="relative h-2 w-44 overflow-hidden rounded-sm bg-black/40 ring-1 ring-white/10">
                <div
                  className="absolute inset-y-0 left-0 download-bar"
                  style={{ width: `${progress.toFixed(1)}%` }}
                />
              </div>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                {progress.toFixed(0)}% · 4.2 MB/s
              </span>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setProgress(0);
                setDownloading(true);
              }}
              className="rounded px-2 py-0.5 hover:bg-white/5 hover:text-[hsl(var(--steam-topbar-foreground))]"
            >
              Downloads · idle (click to redownload)
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Enable sound effects" : "Mute sound effects"}
            className="inline-flex items-center gap-1.5 rounded px-2 py-1 hover:bg-white/5 hover:text-[hsl(var(--steam-topbar-foreground))]"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{muted ? "Sound off" : "Sound on"}</span>
          </button>

          <Link
            href="/#comments"
            className={cn(
              "inline-flex items-center gap-1.5 rounded px-2 py-1 text-[hsl(var(--steam-topbar-foreground))]",
              "hover:bg-white/5"
            )}
          >
            <span className="status-dot status-dot--online" />
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Friends &amp; Chat</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
