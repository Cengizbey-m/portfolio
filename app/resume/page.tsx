import path from "path";
import { promises as fs } from "fs";
import { Mail, Linkedin, Github, MapPin, BadgeCheck } from "lucide-react";
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
    <section className="resume-section mt-4 first:mt-0">
      <h2 className="mb-1.5 border-b border-[#c9ced6] pb-0.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1a2733]">
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
    <div className="resume-entry mb-2.5 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <p className="text-[11.5px] font-bold text-[#111820]">
          {title}
          <span className="font-normal text-[#3c4956]"> · {org}</span>
        </p>
        <p className="text-[9.5px] font-semibold text-[#5a6673]">{period}</p>
      </div>
      <p className="text-[9.5px] italic text-[#5a6673]">{location}</p>
      <ul className="mt-1 space-y-[3px]">
        {bullets.map((b) => (
          <li key={b} className="flex gap-1.5 text-[10.5px] leading-[1.45] text-[#26313d]">
            <span className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#4a5866]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {tech ? (
        <p className="mt-1 text-[9.5px] leading-[1.4] text-[#4a5866]">
          <span className="font-bold text-[#26313d]">Tech:</span> {tech}
        </p>
      ) : null}
    </div>
  );
}

export default async function ResumePage() {
  const hasPdf = await fileExists(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <div className="mx-auto max-w-[8.5in]">
      <ResumeActions hasPdf={hasPdf} pdfHref={profile.links.resumePdf} />

      {/* A real sheet of paper: fixed page width, white, with a drop shadow, so
          the preview reads as a document rather than another web page. */}
      <article className="resume-sheet mx-auto w-full bg-white px-[0.55in] py-[0.5in] text-[#26313d] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
        <header className="border-b-2 border-[#1a2733] pb-2.5">
          <h1 className="text-[26px] font-bold leading-none tracking-tight text-[#111820]">
            {profile.realName}
          </h1>
          <p className="mt-1 text-[12px] font-semibold tracking-wide text-[#2f6fb5]">
            {profile.role}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#26313d]">
            <a href={`mailto:${profile.links.email}`} className="inline-flex items-center gap-1">
              <Mail className="h-3 w-3 text-[#2f6fb5]" />
              {profile.links.email}
            </a>
            <span className="text-[#aeb6c0]">|</span>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
              <Linkedin className="h-3 w-3 text-[#2f6fb5]" />
              linkedin.com/in/muhammed-cengiz
            </a>
            <span className="text-[#aeb6c0]">|</span>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
              <Github className="h-3 w-3 text-[#2f6fb5]" />
              github.com/Cengizbey-m
            </a>
            <span className="text-[#aeb6c0]">|</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-[#2f6fb5]" />
              Greater Toronto Area, Canada
            </span>
            <span className="text-[#aeb6c0]">|</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#1d7a44]">
              <BadgeCheck className="h-3 w-3" />
              Canadian Permanent Resident
            </span>
          </div>
        </header>

        <Section title="Summary">
          <p className="text-[10.5px] leading-[1.5] text-[#26313d]">{resumeSummary}</p>
        </Section>

        <Section title="Experience">
          {experience.map((r) => (
            <Role key={r.title + r.org} {...r} />
          ))}
        </Section>

        <Section title="Projects">
          {sideProjects.map((r) => (
            <Role key={r.title} {...r} />
          ))}
        </Section>

        <Section title="Education">
          <div className="resume-entry">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-[11.5px] font-bold text-[#111820]">
                {education.credential}, {education.program}
              </p>
              <p className="text-[9.5px] font-semibold text-[#5a6673]">{education.grad}</p>
            </div>
            <p className="text-[9.5px] italic text-[#5a6673]">
              {education.school}, {education.location}
            </p>
            <ul className="mt-1 space-y-[3px]">
              <li className="flex gap-1.5 text-[10.5px] leading-[1.45] text-[#26313d]">
                <span className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#4a5866]" />
                <span>
                  <span className="font-bold">Capstone ranked #1 of 50+ projects</span> at the 2026
                  showcase, graded 97/100 in the final term.
                </span>
              </li>
              <li className="flex gap-1.5 text-[10.5px] leading-[1.45] text-[#26313d]">
                <span className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#4a5866]" />
                <span>
                  Coursework across full-stack development, databases, enterprise Java, .NET, iOS,
                  cloud-enabled networks, and computer and network security.
                </span>
              </li>
            </ul>
          </div>
        </Section>

        <Section title="Technical Skills">
          <dl className="space-y-[2px]">
            {skills.map((s) => (
              <div key={s.label} className="flex gap-2">
                <dt className="w-[105px] shrink-0 text-[10.5px] font-bold text-[#111820]">
                  {s.label}
                </dt>
                <dd className="flex-1 text-[10.5px] leading-[1.45] text-[#26313d]">{s.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Certifications">
          <p className="text-[10.5px] leading-[1.45] text-[#26313d]">{certificates.join(" · ")}</p>
        </Section>
      </article>
    </div>
  );
}
