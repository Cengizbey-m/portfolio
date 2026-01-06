import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "About",
  description: "SDNE background, focus areas, and certificates.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="About"
            description="Junior software developer (full‑stack) with SDNE depth — shipping-focused and proof-first."
          />
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <p className="leading-7 text-muted-foreground">
            I’m Muhammed “Cengiz” Cengiz, an SDNE student at Sheridan College (Oakville/GTA),
            graduating in ~7–8 months. I like roles where I can build product features end‑to‑end:
            UI/UX, APIs, data, deployment, and practical security.
          </p>
          <p className="leading-7 text-muted-foreground">
            I’m currently targeting junior full‑stack / software developer internships and new‑grad roles
            where I can contribute quickly and grow with good engineering practices (code reviews, testing,
            deployment automation, and clear docs).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader id="skills" className="scroll-mt-24">
          <SectionHeader title="Strengths" description="What I’m good at (no fluff)." />
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Full‑stack web (Next.js / TypeScript)</Badge>
            <Badge>API design & integration</Badge>
            <Badge>Database fundamentals (schema, queries)</Badge>
            <Badge>Networking (IP, subnetting, IPv6)</Badge>
            <Badge>Linux/UNIX</Badge>
            <Badge>Security fundamentals</Badge>
            <Badge>AI/ML prototyping (Python)</Badge>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold tracking-[0.08em] uppercase text-foreground">
              Relevant coursework
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>AI & ML – Python (PROG25211)</li>
              <li>Cloud Enabled Networks (TELE20483)</li>
              <li>Cybersecurity Fundamentals (INFO24178)</li>
              <li>Database Design & Implementation (DBAS27198) • Database Management (DBAS32100)</li>
              <li>Enterprise Java Development (PROG32758)</li>
              <li>Linux/UNIX Operating Systems (SYST13416)</li>
              <li>Web Development (SYST10049) • Interactive User Design (SYST15892)</li>
              <li>IT Project Management Using PMP (INFO20172) • Technical Communication (COMM13729)</li>
            </ul>
            <p className="pt-2">
              Also completed (not yet added on LinkedIn): Capstone, C#/.NET Technologies, Hybrid Mobile
              (Next.js), Software Process Management.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader id="certificates" className="scroll-mt-24">
          <SectionHeader title="Certificates" description="Quick trust signals." />
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>CCNA IP Addressing & Subnetting (Exam Prep)</li>
            <li>IPv6 Fundamentals (APNIC)</li>
            <li>Cisco Intro to Cybersecurity</li>
            <li>LinkedIn: Networking Foundations</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <SectionHeader title="Timeline" description="Sheridan SDNE → interviews before graduation." />
        </CardHeader>
        <CardContent className="pt-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Now → Graduation: build interview-ready proof (case studies, demo repos, clean README,
              deploys).
            </li>
            <li>
              0–2 months: polish demos, add tests/monitoring basics, and prepare 2–3 tailored resume versions.
            </li>
            <li>2–6 months: targeted applications + warm outreach; iterate based on recruiter feedback.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}


