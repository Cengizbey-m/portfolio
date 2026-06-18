import { ProfileHero } from "@/components/profile/ProfileHero";
import { RecruiterCard } from "@/components/profile/RecruiterCard";
import { FeaturedProject } from "@/components/profile/FeaturedProject";
import { ProjectsShowcase } from "@/components/profile/ProjectsShowcase";
import { SkillsShowcase } from "@/components/profile/SkillsShowcase";
import { AboutSnapshot } from "@/components/profile/AboutSnapshot";
import { ProfileComments } from "@/components/profile/ProfileComments";
import { NowCard } from "@/components/profile/NowCard";
import { StackCard } from "@/components/profile/StackCard";

export default function Home() {
  return (
    <div className="space-y-6">
      <ProfileHero />

      {/* Mobile-only recruiter summary, right under the hero */}
      <div className="lg:hidden">
        <RecruiterCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          <FeaturedProject />
          <ProjectsShowcase />
          <SkillsShowcase />
          <AboutSnapshot />
          <ProfileComments />
        </div>

        <aside className="hidden lg:block">
          <div className="space-y-6 lg:sticky lg:top-20">
            <RecruiterCard />
            <NowCard />
            <StackCard />
          </div>
        </aside>
      </div>
    </div>
  );
}
