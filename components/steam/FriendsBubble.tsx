"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquareMore, Mail, Linkedin, Github, FileText, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { sfx } from "@/lib/sound";

// This used to be a fake "friends list." It's now a real quick-connect panel —
// the fastest way for someone to actually reach me without leaving the page.
type ConnectLink = {
  label: string;
  sub: string;
  href: string;
  external?: boolean;
  icon: React.ComponentType<{ className?: string }>;
};

export function FriendsBubble() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const links: ConnectLink[] = [
    { label: "Email", sub: profile.links.email, href: `mailto:${profile.links.email}`, icon: Mail },
    { label: "LinkedIn", sub: "Connect & message me", href: profile.links.linkedin, external: true, icon: Linkedin },
    { label: "GitHub", sub: "See what I'm building", href: profile.links.github, external: true, icon: Github },
    { label: "Contact form", sub: "Lands straight in my inbox", href: "/contact", icon: Send },
    { label: "Resume", sub: "One-page PDF", href: "/resume", icon: FileText },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          sfx.click();
          setOpen((v) => !v);
        }}
        aria-label="Connect with me"
        className="relative inline-flex h-9 items-center gap-1.5 rounded px-2 text-[hsl(var(--steam-topbar-foreground))] hover:bg-white/5"
      >
        <span className="status-dot status-dot--online" />
        <MessageSquareMore className="h-4.5 w-4.5" />
        <span className="hidden text-xs font-semibold sm:inline">Connect</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-72 max-w-[92vw] overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] shadow-2xl ring-1 ring-white/10">
          <div className="border-b border-border px-3 py-2.5">
            <p className="text-sm font-semibold text-foreground">Let&apos;s connect</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="status-dot status-dot--online" />
              Open to opportunities · replies within a day
            </p>
          </div>
          <ul>
            {links.map((l) => {
              const Icon = l.icon;
              const inner = (
                <span className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-black/30 text-[hsl(var(--steam-link))] ring-1 ring-white/10">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{l.label}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{l.sub}</span>
                  </span>
                </span>
              );
              return (
                <li key={l.label} className="border-b border-border/60 last:border-b-0">
                  {l.external || l.href.startsWith("mailto:") ? (
                    <a href={l.href} target={l.external ? "_blank" : undefined} rel="noreferrer" onClick={() => setOpen(false)}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={l.href} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
