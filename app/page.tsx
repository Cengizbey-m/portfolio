import { ProfileHero } from "@/components/profile/ProfileHero";
import { RecruiterCard } from "@/components/profile/RecruiterCard";
import { FeaturedProject } from "@/components/profile/FeaturedProject";
import { ProjectsShowcase } from "@/components/profile/ProjectsShowcase";
import { SkillsShowcase } from "@/components/profile/SkillsShowcase";
import { AboutSnapshot } from "@/components/profile/AboutSnapshot";
import { ProfileComments } from "@/components/profile/ProfileComments";
import { NowCard } from "@/components/profile/NowCard";
import { StackCard } from "@/components/profile/StackCard";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  // The home page is a single scroll: hero first, then the work, then the
  // "hire me" details in the sidebar. Each block is wrapped in <Reveal> so it
  // eases in as you scroll — keeps a long page feeling alive instead of static.
  return (
    <div className="space-y-6">
      <ProfileHero />

      {/* Mobile-only recruiter summary, right under the hero */}
      <div className="lg:hidden">
        <RecruiterCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          <Reveal>
            <FeaturedProject />
          </Reveal>
          <Reveal>
            <ProjectsShowcase />
          </Reveal>
          <Reveal>
            <SkillsShowcase />
          </Reveal>
          <Reveal>
            <AboutSnapshot />
          </Reveal>
          <Reveal>
            <ProfileComments />
          </Reveal>
        </div>

        <aside className="hidden lg:block">
          <div className="space-y-6 lg:sticky lg:top-20">
            <Reveal>
              <RecruiterCard />
            </Reveal>
            <Reveal delay={0.05}>
              <NowCard />
            </Reveal>
            <Reveal delay={0.1}>
              <StackCard />
            </Reveal>
          </div>
        </aside>
      </div>
    </div>
  );
}
