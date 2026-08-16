import { Mail, Linkedin, Github, MapPin, BadgeCheck } from "lucide-react";
import { profile } from "@/data/profile";
import { education, certificates } from "@/data/cv";
import { resumeSummary, experience, sideProjects, skills } from "@/data/resume";

/**
 * The resume itself, as a single sheet of paper.
 *
 * This is the source the PDF is generated from (headless print of
 * /resume/print), which is why it uses fixed ink colours rather than theme
 * tokens: it must look identical on paper regardless of the site theme.
 */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-[9px] first:mt-0">
      <h2 className="mb-1 border-b border-[#b9c0c9] pb-[1px] text-[9px] font-bold uppercase tracking-[0.15em] text-[#1a2733]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Role({ title, org, location, period, bullets, tech }: (typeof experience)[number]) {
  return (
    <div className="resume-entry mb-[7px] last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <p className="text-[10px] font-bold leading-tight text-[#111820]">
          {title}
          <span className="font-normal text-[#3c4956]"> · {org}</span>
        </p>
        <p className="text-[8.5px] font-semibold text-[#5a6673]">{period}</p>
      </div>
      <p className="text-[8.5px] italic leading-tight text-[#5a6673]">{location}</p>
      <ul className="mt-[3px] space-y-[2px]">
        {bullets.map((b) => (
          <li key={b} className="flex gap-[5px] text-[9px] leading-[1.38] text-[#26313d]">
            <span className="mt-[5px] h-[2.5px] w-[2.5px] shrink-0 rounded-full bg-[#4a5866]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {tech ? (
        <p className="mt-[3px] text-[8.5px] leading-[1.35] text-[#4a5866]">
          <span className="font-bold text-[#26313d]">Tech:</span> {tech}
        </p>
      ) : null}
    </div>
  );
}

export function ResumeDocument() {
  return (
    <article className="resume-sheet mx-auto w-full bg-white px-[0.5in] py-[0.42in] text-[#26313d]">
      <header className="border-b-2 border-[#1a2733] pb-[7px]">
        <h1 className="text-[21px] font-bold leading-none tracking-tight text-[#111820]">
          {profile.realName}
        </h1>
        <p className="mt-[3px] text-[10.5px] font-semibold tracking-wide text-[#2f6fb5]">
          {profile.role}
        </p>

        <div className="mt-[5px] flex flex-wrap items-center gap-x-[9px] gap-y-[2px] text-[8.5px] text-[#26313d]">
          <a href={`mailto:${profile.links.email}`} className="inline-flex items-center gap-1">
            <Mail className="h-[9px] w-[9px] text-[#2f6fb5]" />
            {profile.links.email}
          </a>
          <span className="text-[#b9c0c9]">|</span>
          <a href={profile.links.linkedin} className="inline-flex items-center gap-1">
            <Linkedin className="h-[9px] w-[9px] text-[#2f6fb5]" />
            linkedin.com/in/muhammed-cengiz
          </a>
          <span className="text-[#b9c0c9]">|</span>
          <a href={profile.links.github} className="inline-flex items-center gap-1">
            <Github className="h-[9px] w-[9px] text-[#2f6fb5]" />
            github.com/Cengizbey-m
          </a>
          <span className="text-[#b9c0c9]">|</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-[9px] w-[9px] text-[#2f6fb5]" />
            Greater Toronto Area, Canada
          </span>
          <span className="text-[#b9c0c9]">|</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#1d7a44]">
            <BadgeCheck className="h-[9px] w-[9px]" />
            Canadian Permanent Resident
          </span>
        </div>
      </header>

      <Section title="Summary">
        <p className="text-[9px] leading-[1.42] text-[#26313d]">{resumeSummary}</p>
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
          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
            <p className="text-[10px] font-bold leading-tight text-[#111820]">
              {education.credential}, {education.program}
            </p>
            <p className="text-[8.5px] font-semibold text-[#5a6673]">{education.grad}</p>
          </div>
          <p className="text-[8.5px] italic leading-tight text-[#5a6673]">
            {education.school}, {education.location}
          </p>
          <ul className="mt-[3px]">
            <li className="flex gap-[5px] text-[9px] leading-[1.38] text-[#26313d]">
              <span className="mt-[5px] h-[2.5px] w-[2.5px] shrink-0 rounded-full bg-[#4a5866]" />
              <span>
                <span className="font-bold">Capstone ranked #1 of 50+ projects</span> at the 2026
                showcase, graded 97/100. Coursework across full-stack development, databases,
                enterprise Java, .NET, iOS, cloud-enabled networks, and network security.
              </span>
            </li>
          </ul>
        </div>
      </Section>

      <Section title="Technical Skills">
        <dl className="space-y-[1px]">
          {skills.map((s) => (
            <div key={s.label} className="flex gap-2">
              <dt className="w-[92px] shrink-0 text-[9px] font-bold text-[#111820]">{s.label}</dt>
              <dd className="flex-1 text-[9px] leading-[1.38] text-[#26313d]">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Certifications">
        <p className="text-[9px] leading-[1.38] text-[#26313d]">{certificates.join(" · ")}</p>
      </Section>
    </article>
  );
}
