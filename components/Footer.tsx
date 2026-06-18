import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { profile } from "@/data/profile";

const sections: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Browse",
    links: [
      { href: "/", label: "Profile" },
      { href: "/library", label: "Library" },
      { href: "/library/arcade", label: "Arcade" },
      { href: "/store", label: "Hire me" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/resume", label: "Resume" },
      { href: "/contact", label: "Contact" },
      { href: "/inventory", label: "Trading cards" },
      { href: "/replay", label: "Year in Code 2025" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-[hsl(var(--steam-topbar))]/60">
      <div className="mx-auto w-full max-w-[80rem] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-gradient-to-b from-[hsl(var(--steam-link))]/40 to-black/30 text-sm font-black text-white ring-1 ring-white/15">
                C
              </span>
              <span className="font-semibold tracking-tight text-foreground">Muhammed Cengiz</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              Full-stack developer with a networking background. Open to co-op / internship roles.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a className="link-pill" href={profile.links.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a className="link-pill" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a className="link-pill" href={`mailto:${profile.links.email}`}>
                <Mail className="h-4 w-4" /> Email
              </a>
              <Link className="link-pill" href="/resume">
                <FileText className="h-4 w-4" /> Resume
              </Link>
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <p className="eyebrow">{s.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Muhammed Cengiz · Oakville / GTA, Canada</p>
          <p className="opacity-70">
            Built with Next.js + TypeScript. Steam-inspired, not affiliated with Valve.
          </p>
        </div>
      </div>
    </footer>
  );
}
