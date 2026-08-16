import { Trophy, GraduationCap, BadgeCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { bio, education, certificates } from "@/data/cv";

export const metadata = {
  title: "About",
  description:
    "Full-stack developer in the Greater Toronto Area. Sheridan SDNE graduate, capstone ranked #1 of 50+, Canadian permanent resident.",
};

const strengths = [
  "Full-stack web (Next.js / TypeScript)",
  "API design and integration",
  "Relational data (Postgres, schema, queries)",
  "Payments (Stripe)",
  "Auth and access control",
  "Networking (IP, subnetting, IPv6)",
  "Linux / UNIX",
  "Security fundamentals",
  "AI/ML prototyping (Python)",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="About"
            description="Full-stack developer with network engineering depth."
          />
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {bio.map((p) => (
            <p key={p.slice(0, 24)} className="leading-7 text-muted-foreground">
              {p}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SectionHeader title="Highlights" description="The short version." />
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--steam-gold))]" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">Capstone ranked #1 of 50+.</span>{" "}
                Feather was picked for the showcase round and judged first overall at Sheridan&rsquo;s 2026
                capstone showcase, at the end of a full year of work. Graded 97/100 in the final term, up from 94/100 for the prototype.
              </span>
            </li>
            <li className="flex gap-3">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--steam-link))]" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {education.credential}, {education.program}.
                </span>{" "}
                {education.school}, {education.location}. {education.status} {education.grad}.
              </span>
            </li>
            <li className="flex gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--steam-green))]" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">Canadian permanent resident.</span>{" "}
                Authorized to work anywhere in Canada with no sponsorship or work permit required.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader id="skills" className="scroll-mt-24">
          <SectionHeader title="Strengths" description="Where I spend most of my time." />
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {strengths.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold uppercase tracking-[0.08em] text-foreground">
              Relevant coursework
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {education.coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader id="certificates" className="scroll-mt-24">
          <SectionHeader title="Certificates" description="Credentials and training." />
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {certificates.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
