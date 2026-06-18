import Link from "next/link";
import { GraduationCap, ArrowRight, Award } from "lucide-react";
import { bio, education, certificates } from "@/data/cv";

export function AboutSnapshot() {
  return (
    <section id="about" className="panel overflow-hidden rise-in scroll-mt-20">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="accent-bar" />
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">About</p>
        <Link href="/about" className="steam-link ml-auto inline-flex items-center gap-1 text-xs font-semibold">
          Full bio <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {bio.map((p) => (
            <p key={p.slice(0, 24)} className="text-sm leading-6 text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        <div className="space-y-3">
          <div className="inset p-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <GraduationCap className="h-4 w-4 text-[hsl(var(--steam-link))]" />
              Education
            </p>
            <p className="mt-1.5 text-sm text-foreground">{education.school}</p>
            <p className="text-xs text-muted-foreground">{education.program}</p>
            <p className="mt-1 text-xs text-muted-foreground">Graduating {education.grad}</p>
          </div>
          <div className="inset p-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Award className="h-4 w-4 text-[hsl(var(--steam-gold))]" />
              Certificates
            </p>
            <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
              {certificates.map((c) => (
                <li key={c} className="flex gap-1.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--steam-gold))]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
