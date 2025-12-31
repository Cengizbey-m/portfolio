import Link from "next/link";
import { ProofBar } from "@/components/ProofBar";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";

export default function Home() {
  const featured = projects.slice(0, 3);
  return (
    <div className="space-y-14">
      <section className="grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-start">
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Oakville / GTA • SDNE @ Sheridan College • graduating in ~7–8 months
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Muhammed “Cengiz” Cengiz
          </h1>
          <p className="max-w-prose text-base leading-7 text-muted-foreground md:text-lg">
            Junior full‑stack developer with SDNE depth (networking, Linux,
            security, databases) and shipping-focused case studies.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projects">View projects</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/resume">Resume (PDF)</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="https://www.linkedin.com/in/muhammed-cengiz-005aa0278/?locale=en_US"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/Cengizbey-m"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
        <ProofBar />
      </section>

      <section className="space-y-5">
        <SectionHeader
          title="Featured work"
          description="Three shipped-style case studies designed to be scanned in 30 seconds."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div>
          <Button variant="secondary" asChild>
            <Link href="/projects">See all projects</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <SectionHeader
            title="What I build"
            description="Product-minded engineering with clean UX, reliable APIs, and security-first defaults."
          />
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              - Full‑stack web apps: Next.js, TypeScript, Node, REST, auth flows
            </li>
            <li>- Data: SQL schema design, migrations, query performance</li>
            <li>- Networking + cloud‑enabled systems: IP/subnetting, IPv6</li>
            <li>- AI/ML prototyping: Python, notebooks, evaluation, deployment</li>
          </ul>
        </div>
        <div className="space-y-3">
          <SectionHeader title="Fast links" description="Recruiter shortcuts." />
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/about">About</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Tip: add your resume at <span className="font-mono">/public/resume.pdf</span>{" "}
            and update LinkedIn/GitHub placeholders.
          </p>
        </div>
      </section>
    </div>
  );
}
