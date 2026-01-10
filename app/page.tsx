import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ProfileHeader } from "@/components/steam/ProfileHeader";
import { FavoriteProjectPanel } from "@/components/steam/FavoriteProjectPanel";
import { BadgesPanel } from "@/components/steam/BadgesPanel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  const featured = projects.slice(0, 3);
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <FavoriteProjectPanel />
        <BadgesPanel />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <SectionHeader title="Quick actions" description="Quick links." />
          </CardHeader>
          <CardContent className="pt-4">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeader
              title="What I build"
              description="Full‑stack work with a strong networking background."
            />
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Web apps: Next.js, TypeScript, APIs, auth flows</li>
              <li>- Data: SQL schema design, migrations, query performance</li>
              <li>- Networking: IP/subnetting, IPv6, cloud-enabled networks</li>
              <li>- AI/ML prototyping: Python, notebooks, evaluation</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              title="Featured work"
              description="Selected projects with short, readable case studies."
            />
            <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
              <Link href="/projects">See all</Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
