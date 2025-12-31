import Link from "next/link";
import Image from "next/image";
import { ProofBar } from "@/components/ProofBar";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { hasResumePdf } from "@/lib/resume";
import { Avatar } from "@/components/Avatar";

export default function Home() {
  const featured = projects.slice(0, 3);
  const showResume = hasResumePdf();
  return (
    <div className="space-y-14">
      <section className="grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-start">
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Oakville / GTA • SDNE @ Sheridan College • graduating in ~7–8 months
          </p>
          <div className="flex items-start gap-4">
            <Avatar
              src="/images/profile.jpg"
              initials="MC"
              alt="Muhammed Cengiz"
            />
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Muhammed Cengiz
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">Goes by Cengiz.</p>
            </div>
          </div>
          <p className="max-w-prose text-base leading-7 text-muted-foreground md:text-lg">
            Junior full‑stack developer with SDNE depth (networking, Linux, security,
            databases) and hands-on project work.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projects">View projects</Link>
            </Button>
            {showResume ? (
              <Button variant="secondary" asChild>
                <Link href="/resume">
                  <FileText className="h-4 w-4" /> Resume
                </Link>
              </Button>
            ) : null}
            <Button variant="outline" asChild>
              <a
                href="https://www.linkedin.com/in/muhammed-cengiz-005aa0278/?locale=en_US"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/Cengizbey-m"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:muhammedcengiz2778@gmail.com">
                <Mail className="h-4 w-4" /> Email
              </a>
            </Button>
          </div>
        </div>
        <ProofBar />
      </section>

      <section className="space-y-5">
        <SectionHeader
          title="Featured work"
          description="Selected projects with clear roles, decisions, and outcomes."
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
            description="Product engineering with clean UX, reliable APIs, and practical security."
          />
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              Full‑stack web apps: Next.js, TypeScript, APIs, auth flows
            </li>
            <li>Data: SQL schema design, migrations, query performance</li>
            <li>Networking: IP/subnetting, IPv6, cloud‑enabled networks</li>
            <li>AI/ML prototyping: Python, evaluation, deployment basics</li>
          </ul>
        </div>
        <div className="space-y-3">
          <SectionHeader title="More" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/about">About</Link>
            </Button>
          </div>
          {/* Resume lives at /public/resume.pdf and headshot at /public/images/profile.jpg */}
        </div>
      </section>
    </div>
  );
}
