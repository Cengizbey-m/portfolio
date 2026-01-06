import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ProfileHeader } from "@/components/steam/ProfileHeader";
import { FavoriteProjectPanel } from "@/components/steam/FavoriteProjectPanel";
import { BadgesPanel } from "@/components/steam/BadgesPanel";

export default function Home() {
  const featured = projects.slice(0, 3);
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <FavoriteProjectPanel />
        <BadgesPanel />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <SectionHeader
            title="Quick actions"
            description="Recruiter shortcuts (fast to scan, fast to click)."
          />
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/projects">View projects</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/resume">Resume</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <SectionHeader
            title="What I build"
            description="Full‑stack features with SDNE depth (networking, Linux, security, databases)."
          />
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- Web apps: Next.js, TypeScript, APIs, auth flows</li>
            <li>- Data: SQL schema design, migrations, query performance</li>
            <li>- Networking: IP/subnetting, IPv6, cloud-enabled networks</li>
            <li>- AI/ML prototyping: Python, notebooks, evaluation</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Featured work"
          description="Shipped-style case studies designed to be scanned in ~30 seconds."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
}
