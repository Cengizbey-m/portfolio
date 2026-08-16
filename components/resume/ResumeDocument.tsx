import { profile } from "@/data/profile";
import { education } from "@/data/cv";
import {
  resumeSummary,
  resumeContact,
  experience,
  sideProjects,
  skills,
  type ResumeRole,
} from "@/data/resume";

/**
 * The resume itself, as a single sheet of paper.
 *
 * This is the source the PDF is generated from (headless print of
 * /resume/print), so it uses fixed ink colours rather than theme tokens: it has
 * to look identical on paper no matter which theme the site is in.
 */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-[10px] first:mt-0">
      <h2 className="mb-[4px] border-b border-[#9aa3ad] pb-[2px] text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#14202b]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entry({ title, org, location, period, bullets }: ResumeRole) {
  return (
    <div className="resume-entry mb-[8px] last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <p className="text-[10.5px] font-bold leading-tight text-[#111820]">
          {title}
          {org ? <span className="font-normal text-[#394653]"> · {org}</span> : null}
        </p>
        <p className="shrink-0 text-[8.5px] font-semibold text-[#5a6673]">{period}</p>
      </div>
      {location ? (
        <p className="text-[8.5px] italic leading-snug text-[#5a6673]">{location}</p>
      ) : null}
      <ul className="mt-[3px] space-y-[2px]">
        {bullets.map((b) => (
          <li key={b} className="flex gap-[5px] text-[9.2px] leading-[1.4] text-[#232e39]">
            <span className="mt-[5px] h-[2.5px] w-[2.5px] shrink-0 rounded-full bg-[#4a5866]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResumeDocument() {
  return (
    <article className="resume-sheet mx-auto w-full bg-white px-[0.52in] py-[0.44in] text-[#232e39]">
      {/* Header. Everything a recruiter needs to contact him, on one screen. */}
      <header className="pb-[8px] text-center">
        <h1 className="text-[22px] font-bold uppercase leading-none tracking-[0.06em] text-[#111820]">
          {profile.realName}
        </h1>
        <p className="mt-[4px] text-[11px] font-semibold tracking-wide text-[#2f6fb5]">
          {profile.role}
        </p>
        <p className="mt-[5px] text-[8.8px] leading-[1.5] text-[#232e39]">
          {resumeContact.location} · {resumeContact.phone} · {profile.links.email}
        </p>
        <p className="text-[8.8px] leading-[1.5] text-[#232e39]">
          linkedin.com/in/muhammed-cengiz · github.com/Cengizbey-m · {resumeContact.website}
        </p>
        <p className="mt-[3px] text-[8.8px] font-semibold text-[#1d7a44]">
          Canadian Permanent Resident, authorized to work in Canada with no sponsorship required.
        </p>
      </header>

      <Section title="Summary">
        <p className="text-[9.2px] leading-[1.45] text-[#232e39]">{resumeSummary}</p>
      </Section>

      <Section title="Skills">
        <dl className="space-y-[1.5px]">
          {skills.map((s) => (
            <div key={s.label} className="flex gap-2">
              <dt className="w-[86px] shrink-0 text-[9.2px] font-bold text-[#111820]">{s.label}</dt>
              <dd className="flex-1 text-[9.2px] leading-[1.4] text-[#232e39]">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Experience">
        {experience.map((r) => (
          <Entry key={r.title + r.org} {...r} />
        ))}
      </Section>

      <Section title="Projects">
        {sideProjects.map((r) => (
          <Entry key={r.title} {...r} />
        ))}
      </Section>

      <Section title="Education">
        <div className="resume-entry">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
            <p className="text-[10.5px] font-bold leading-tight text-[#111820]">
              {education.school}
              <span className="font-normal text-[#394653]"> · {education.location}</span>
            </p>
            <p className="shrink-0 text-[8.5px] font-semibold text-[#5a6673]">{education.grad}</p>
          </div>
          <p className="mt-[1px] text-[9.2px] leading-[1.4] text-[#232e39]">
            {education.credentialFull}
          </p>
          <p className="mt-[2px] text-[8.8px] leading-[1.4] text-[#4a5866]">
            Selected coursework: AI &amp; Machine Learning, Cloud Systems, iOS Development, .NET/C#,
            Database Design, Computer &amp; Network Security, Linux/UNIX.
          </p>
        </div>
      </Section>
    </article>
  );
}
