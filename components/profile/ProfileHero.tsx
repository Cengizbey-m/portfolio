"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText, MessageSquare, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { LevelRing } from "@/components/steam/LevelRing";
import { unlock } from "@/lib/achievements";
import { fireConfetti } from "@/lib/confetti";
import { sfx } from "@/lib/sound";

export function ProfileHero() {
  const [bannerSrc, setBannerSrc] = React.useState<string>(profile.bannerUrl);
  const [avatarSrc, setAvatarSrc] = React.useState<string>(profile.avatarUrl);
  const clicks = React.useRef(0);
  const last = React.useRef(0);

  function handleAvatarClick() {
    sfx.click();
    const now = Date.now();
    if (now - last.current > 1500) clicks.current = 0;
    last.current = now;
    clicks.current += 1;
    if (clicks.current >= 8) {
      clicks.current = 0;
      fireConfetti(140);
      unlock("avatar-spam");
    }
  }

  return (
    <section className="panel panel-strong overflow-hidden rise-in">
      {/* Banner */}
      <div className="relative h-28 w-full sm:h-36 md:h-44">
        {bannerSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bannerSrc}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setBannerSrc("")}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(900px_260px_at_20%_10%,rgba(102,192,244,0.25),transparent_55%),linear-gradient(180deg,rgba(23,26,33,0.9),rgba(27,40,56,0.9))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--steam-panel))] via-[hsl(var(--steam-panel))]/70 to-black/30" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--steam-green))]/40 bg-[hsl(var(--steam-green))]/15 px-3 py-1 text-[11px] font-semibold text-[hsl(var(--steam-green))] backdrop-blur">
          <span className="status-dot status-dot--online" />
          {profile.status.label}
        </span>
      </div>

      <div className="px-4 pb-5 sm:px-6">
        {/* Identity row */}
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end">
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Avatar"
            className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-black/30 ring-2 ring-[hsl(var(--steam-link))]/50 shadow-xl sm:h-28 sm:w-28"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt="Muhammed Cengiz"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.05]"
              onError={() => setAvatarSrc("/steam/avatar.svg")}
            />
          </button>

          <div className="min-w-0 flex-1 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {profile.realName}
              </h1>
              <span className="text-sm text-muted-foreground">aka {profile.displayName}</span>
            </div>
            <p className="mt-1 text-base font-semibold text-[hsl(var(--steam-link))]">
              {profile.role}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </p>
          </div>

          <div className="hidden shrink-0 sm:block">
            <LevelRing level={profile.level} progress={0.62} size={56} badgeLabel={`Lvl ${profile.level}`} />
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{profile.tagline}</p>

        {/* Links — recruiter-first, the first thing reachable */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={profile.links.resume}
            className="inline-flex h-10 items-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:brightness-110"
          >
            <FileText className="h-4 w-4" /> Resume
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-[hsl(var(--steam-link))]/40 bg-[hsl(var(--steam-link))]/10 px-4 text-sm font-semibold text-foreground transition hover:bg-[hsl(var(--steam-link))]/20"
          >
            <MessageSquare className="h-4 w-4" /> Contact
          </Link>
          <a className="link-pill h-10" href={profile.links.github} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a className="link-pill h-10" href={profile.links.linkedin} target="_blank" rel="noreferrer">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a className="link-pill h-10" href={`mailto:${profile.links.email}`}>
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>

        {/* Quick stats */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {profile.stats.map((s) => (
            <div key={s.label} className="inset px-3 py-2.5 text-center">
              <p className="truncate text-sm font-bold text-foreground sm:text-base">{s.value}</p>
              <p className="eyebrow mt-1 truncate">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
