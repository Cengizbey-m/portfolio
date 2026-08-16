import path from "path";
import { promises as fs } from "fs";
import { Mail, Linkedin, Github, MapPin, BadgeCheck, GraduationCap, Trophy } from "lucide-react";
import { profile } from "@/data/profile";
import { education, certificates } from "@/data/cv";
import { resumeSummary, experience, sideProjects, skills } from "@/data/resume";
import { ResumeActions } from "@/components/resume/ResumeActions";

export const metadata = {
  title: "Resume",
  description:
    "Resume for Muhammed Cengiz, full-stack developer in the Greater Toronto Area. Canadian permanent resident.",
};

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section">
      <h2 className="mb-3 border-b border-border pb-1 text-[13px] font-bold uppercase tracking-[0.14em] text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Role({
  title,
  org,
  location,
  period,
  bullets,
  tech,
}: {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string;
}) {
  return (
    <div className="resume-entry mb-4 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <p className="text-[15px] font-semibold text-foreground">
          {title}
          <span className="font-normal text-muted-foreground"> · {org}</span>
        </p>
        <p className="text-xs font-medium text-muted-foreground">{period}</p>
      </div>
      <p className="text-xs text-muted-foreground">{location}</p>
      <ul className="mt-1.5 space-y-1">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-[13px] leading-[1.55] text-muted-foreground">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--steam-link))]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {tech ? (
        <p className="mt-1.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/80">Tech:</span> {tech}
        </p>
      ) : null}
    </div>
  );
}

export default async function ResumePage() {
  const hasPdf = await fileExists(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <div className="mx-auto max-w-4xl">
      <ResumeActions hasPdf={hasPdf} pdfHref={profile.links.resumePdf} />

      <article className="resume-sheet panel overflow-hidden">
        <div className="space-y-6 p-6 sm:p-8">
          {/* Header: name and every way to reach him, immediately visible */}
          <header className="border-b border-border pb-5">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{profile.realName}</h1>
            <p className="mt-1 text-base font-semibold text-[hsl(var(--steam-link))]">
              {profile.role}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px]">
              <a
                href={`mailto:${profile.links.email}`}
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-[hsl(var(--steam-link))]"
              >
                <Mail className="h-3.5 w-3.5 text-[hsl(var(--steam-link))]" />
                {profile.links.email}
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-[hsl(var(--steam-link))]"
              >
                <Linkedin className="h-3.5 w-3.5 text-[hsl(var(--steam-link))]" />
                linkedin.com/in/muhammed-cengiz
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-[hsl(var(--steam-link))]"
              >
                <Github className="h-3.5 w-3.5 text-[hsl(var(--steam-link))]" />
                github.com/Cengizbey-m
              </a>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-[hsl(var(--steam-link))]" />
                Greater Toronto Area, Canada
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[hsl(var(--steam-green))]">
                <BadgeCheck className="h-3.5 w-3.5" />
                Canadian Permanent Resident
              </span>
            </div>
          </header>

          <Section title="Summary">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">{resumeSummary}</p>
          </Section>

          <Section title="Experience">
            {experience.map((r) => (
              <Role key={r.title + r.org} {...r} />
            ))}
          </Section>

          <Section title="Selected Projects">
            {sideProjects.map((r) => (
              <Role key={r.title} {...r} />
            ))}
          </Section>

          <Section title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-[15px] font-semibold text-foreground">
                {education.credential}, {education.program}
              </p>
              <p className="text-xs font-medium text-muted-foreground">{education.grad}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {education.school}, {education.location}
            </p>
            <ul className="mt-1.5 space-y-1">
              <li className="flex gap-2 text-[13px] leading-[1.55] text-foreground">
                <Trophy className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[hsl(var(--steam-gold))]" />
                <span>
                  <span className="font-semibold">Capstone ranked #1 of 50+ projects</span> at the
                  2026 capstone showcase. A full-year project, graded 97/100 in the final term.
                </span>
              </li>
              <li className="flex gap-2 text-[13px] leading-[1.55] text-muted-foreground">
                <GraduationCap className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[hsl(var(--steam-link))]" />
                <span>
                  Coursework across full-stack development, databases, enterprise Java, .NET, iOS,
                  cloud-enabled networks, and computer and network security.
                </span>
              </li>
            </ul>
          </Section>

          <Section title="Technical Skills">
            <dl className="space-y-1.5">
              {skills.map((s) => (
                <div key={s.label} className="flex flex-col gap-x-2 sm:flex-row">
                  <dt className="w-44 shrink-0 text-[13px] font-semibold text-foreground">
                    {s.label}
                  </dt>
                  <dd className="text-[13px] leading-[1.55] text-muted-foreground">{s.items}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Certifications">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {certificates.join(" · ")}
            </p>
          </Section>
        </div>
      </article>
    </div>
  );
}
