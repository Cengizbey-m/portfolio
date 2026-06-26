import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "About",
  description: "SDNE background, focus areas, and certificates.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="About"
            description="Software developer with SDNE depth (networking, Linux, security, databases)."
          />
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <p className="leading-7 text-muted-foreground">
            I’m Muhammed Cengiz, a full-stack developer in the Oakville / GTA area, finishing my
            Software Development &amp; Network Engineering diploma at Sheridan College (graduating
            August 2026). What I care about most is shipping real, working products — a live booking
            and payments platform for a client with a 1.2M-follower audience, a site for a local
            patisserie, and a handful of hackathon and product builds in between.
          </p>
          <p className="leading-7 text-muted-foreground">
            My favourite kind of work is owning a feature end-to-end: the UI/UX, the API, the data,
            and getting it to production with the practical security and networking I picked up in
            SDNE. I move fast, I lean on modern tools (including AI) the way a senior dev leans on an
            IDE, and I understand everything I put my name on.
          </p>
          <p className="leading-7 text-muted-foreground">
            Right now I’m looking for a junior full-stack / software developer role where I can
            contribute quickly and grow with good engineering habits — code reviews, testing,
            deployment automation, and clear docs. I’m a Canadian permanent resident, so no
            sponsorship is needed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader id="skills" className="scroll-mt-24">
          <SectionHeader title="Strengths" description="Areas I work in most often." />
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
              <li>AI &amp; Machine Learning – Python (PROG25211)</li>
              <li>iOS Application Development · Advanced iOS (PROG31632 / PROG39856)</li>
              <li>.NET / C# Technologies · Advanced .NET Server-Side (PROG32356 / PROG36944)</li>
              <li>Hybrid Mobile Apps with Next.js (SYST35300)</li>
              <li>Cloud Systems · Cloud-Enabled Networks (SYST35144 / TELE20483)</li>
              <li>Database Design &amp; Implementation · Database Management (DBAS27198 / DBAS32100)</li>
              <li>Enterprise Java Development (PROG32758) · Data Structures in C (PROG20799)</li>
              <li>Linux/UNIX Operating Systems (SYST13416) · Computer &amp; Network Security (INFO24178)</li>
              <li>Software Process Management · Systems Development Methodologies (SYST38634 / SYST28951)</li>
              <li>Capstone Prototype + Project (INFO34049 / INFO39014)</li>
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
            <li>CCNA IP Addressing & Subnetting</li>
            <li>IPv6 Fundamentals (APNIC)</li>
            <li>Cisco Intro to Cybersecurity</li>
            <li>LinkedIn: Networking Foundations</li>
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}


