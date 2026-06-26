"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail, FileText, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const primary = [
  { href: "/", label: "Profile" },
  { href: "/about", label: "About" },
  { href: "/library", label: "Library" },
  { href: "/library/arcade", label: "Arcade" },
  { href: "/store", label: "Hire me · Store" },
];

const secondary = [
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/inventory", label: "Trading cards" },
  { href: "/replay", label: "Year in Code 2025" },
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

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Open navigation"
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-white/5 text-[hsl(var(--steam-topbar-foreground))] ring-1 ring-white/10 hover:bg-white/10"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[84vw] max-w-xs flex-col bg-[hsl(var(--steam-topbar))] shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 overflow-hidden rounded-full bg-black/30 ring-1 ring-white/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/steam/logo-avatar.png" alt="" className="h-full w-full object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{profile.realName}</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="status-dot status-dot--online" />
                    {profile.status.label}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto steam-scroll p-3">
              <div className="space-y-1">
                {primary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      isActive(pathname, item.href) && "bg-white/5 text-foreground ring-1 ring-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <p className="eyebrow px-3 pb-2 pt-5">More</p>
              <div className="space-y-1">
                {secondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      isActive(pathname, item.href) && "bg-white/5 text-foreground ring-1 ring-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="border-t border-border p-3">
              <Link
                href="/resume"
                className="mb-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]"
              >
                <FileText className="h-4 w-4" /> View Resume
              </Link>
              <div className="flex flex-wrap gap-2">
                <a className="link-pill flex-1 justify-center" href={profile.links.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                </a>
                <a className="link-pill flex-1 justify-center" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a className="link-pill flex-1 justify-center" href={`mailto:${profile.links.email}`}>
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
