"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/steam/MobileNav";
import { NotificationsMenu } from "@/components/steam/NotificationsMenu";
import { FriendsBubble } from "@/components/steam/FriendsBubble";
import { AccountMenu } from "@/components/steam/AccountMenu";
import { profile } from "@/data/profile";

// The logo already points home, but an avatar is not a signpost: people look
// for the word. HOME is labelled rather than named "CENGIZ" so it does not
// repeat what the wordmark beside it is already saying.
const nav = [
  { href: "/", label: "HOME" },
  { href: "/store", label: "STORE" },
  { href: "/library", label: "LIBRARY" },
  { href: "/library/arcade", label: "ARCADE" },
  { href: "/about", label: "ABOUT" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/store") return pathname === "/store" || pathname.startsWith("/projects/");
  if (href === "/library") return pathname === "/library" || pathname.startsWith("/library/projects");
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The Steam global header: near-black bar, the wordmark on the left, big
 * uppercase sections with a blue underline on the active one, and the green
 * "Install Steam" button on the right, which here is the resume.
 */
export function SteamTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[hsl(var(--steam-topbar))] shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex h-14 max-w-[80rem] items-center justify-between gap-3 px-3 sm:px-4 md:h-16 lg:px-8">
        <div className="flex h-full items-center gap-2 sm:gap-6">
          <MobileNav />

          <Link
            href="/"
            aria-label="Home, Muhammed Cengiz"
            className="flex items-center gap-2.5 text-white"
          >
            <span className="inline-flex h-8 w-8 overflow-hidden rounded-[2px] bg-black/30 ring-1 ring-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/steam/logo-avatar.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden text-[19px] font-bold uppercase tracking-[0.16em] text-[#c5c3c0] sm:inline">
              Cengiz
            </span>
          </Link>

          <nav className="hidden h-full items-stretch md:flex" aria-label="Main">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center px-3 text-[14px] font-medium uppercase tracking-[0.04em] text-[#dcdedf] transition-colors hover:text-white lg:px-3.5",
                    active && "text-[hsl(var(--steam-accent))] hover:text-[hsl(var(--steam-accent))]"
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-sm bg-[hsl(var(--steam-accent))] lg:inset-x-3.5" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          {/* Social links, always one tap away */}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-[2px] text-[#b8b6b4] hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            <Github className="h-[1.1rem] w-[1.1rem]" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 items-center justify-center rounded-[2px] text-[#b8b6b4] hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            <Linkedin className="h-[1.1rem] w-[1.1rem]" />
          </a>

          {/* Steam puts its green Install button here; a recruiter gets the resume. */}
          <Link href="/resume" className="steam-btn-green ml-1 h-8 px-2.5 text-[13px] font-medium sm:px-3">
            <Download className="h-4 w-4" />
            <span>Resume</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <FriendsBubble />
            <NotificationsMenu />
          </div>
          <AccountMenu />
          <div className="ml-0.5 hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
