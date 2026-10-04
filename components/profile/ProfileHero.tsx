"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Download, MessageSquare, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { LevelRing } from "@/components/steam/LevelRing";
import { unlock } from "@/lib/achievements";
import { fireConfetti } from "@/lib/confetti";
import { sfx } from "@/lib/sound";

/**
 * A Steam profile header: big framed avatar, the persona name with location
 * underneath, the summary, and on the right the level badge and the
 * "Currently In-Game" status. It sits on a translucent band so the animated
 * profile background shows through, the way it does on Steam.
 */
export function ProfileHero() {
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
    <section className="profile-band rise-in p-4 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="flex items-start gap-4 md:contents">
          {/* Avatar in an "in-game" green frame, like Steam shows a player who is playing */}
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Avatar"
            className="group relative h-24 w-24 shrink-0 rounded-[2px] bg-gradient-to-b from-[#8fb93b] to-[#4c6b22] p-[3px] shadow-[0_0_14px_rgba(143,185,59,0.25)] sm:h-32 sm:w-32 md:h-[166px] md:w-[166px] light:from-[hsl(var(--steam-green))] light:to-[hsl(var(--steam-green))]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt="Muhammed Cengiz"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              onError={() => setAvatarSrc("/steam/avatar.svg")}
            />
          </button>

          {/* Level badge on phones sits beside the avatar */}
          <div className="ml-auto md:hidden">
            <LevelRing level={profile.level} size={34} badgeLabel={`Level ${profile.level}`} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-[26px] font-normal leading-tight text-white light:text-foreground sm:text-[28px]">
            {profile.realName}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-[#8f98a0]">
            <span className="text-[#bfbfbf] light:text-muted-foreground">aka {profile.displayName}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </span>
          </p>
          <p className="mt-2 text-[15px] text-[#66c0f4] light:text-[hsl(var(--steam-link))]">{profile.role}</p>

          <p className="mt-3 max-w-2xl text-[14px] leading-[1.6] text-[#c6d4df] light:text-muted-foreground">
            {profile.tagline}
          </p>

          {/* Links, the first thing a recruiter can reach */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={profile.links.resume} className="steam-btn-green h-9 text-[14px]">
              <Download className="h-4 w-4" /> Resume
            </Link>
            <Link href="/contact" className="steam-btn-soft h-9 text-[14px]">
              <MessageSquare className="h-4 w-4" /> Contact
            </Link>
            <a className="steam-btn-soft h-9 text-[14px]" href={profile.links.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a className="steam-btn-soft h-9 text-[14px]" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a className="steam-btn-soft h-9 text-[14px]" href={`mailto:${profile.links.email}`}>
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>

        {/* Right column: level, then online status */}
        <div className="shrink-0 md:w-[230px]">
          <div className="hidden md:block">
            <LevelRing level={profile.level} size={36} badgeLabel={`Level ${profile.level}`} />
          </div>
          <div className="md:mt-6">
            <p className="text-[19px] font-light text-[#90ba3c] light:text-[hsl(var(--steam-green))]">
              Currently In-Game
            </p>
            <p className="mt-0.5 text-[14px] font-medium text-[#90ba3c] light:text-[hsl(var(--steam-green))]">
              {profile.status.label}
            </p>
            <p className="mt-0.5 text-[12px] text-[#8f98a0]">{profile.status.sublabel}</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        {profile.stats.map((s) => (
          <div key={s.label} className="inset px-3 py-2.5 text-center">
            <p className="text-sm font-bold leading-tight text-white light:text-foreground sm:text-base">{s.value}</p>
            <p className="eyebrow mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
