import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ProfileHeader } from "@/components/steam/ProfileHeader";
import { FavoriteProjectPanel } from "@/components/steam/FavoriteProjectPanel";
import { BadgesPanel } from "@/components/steam/BadgesPanel";
import { RetrospectiveCard } from "@/components/steam/RetrospectiveCard";
import { RecentlyPlayed } from "@/components/steam/RecentlyPlayed";
import { StatusPanel } from "@/components/steam/StatusPanel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <StatusPanel />

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <FavoriteProjectPanel />
        <BadgesPanel />
      </section>

      <RecentlyPlayed />

      <RetrospectiveCard />

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <SectionHeader
              title="Quick actions"
              description="Jump straight in. Steam-style keys: F = library, C = community, S = store."
            />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/library">Open library</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/library/arcade">Arcade</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/inventory">Inventory</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/replay">Year in Code 2025</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/store">Hire me · Store</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/community">Community</Link>
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
              description="Full-stack work with a strong networking background."
            />
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Web apps: Next.js, TypeScript, APIs, auth flows</li>
              <li>- Data: SQL schema design, migrations, query performance</li>
              <li>- Networking: IP/subnetting, IPv6, cloud-enabled networks</li>
              <li>- AI/ML prototyping: Python, notebooks, evaluation</li>
              <li className="pt-1 text-xs italic text-muted-foreground/80">
                Tip: try the Konami code somewhere on this page.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
