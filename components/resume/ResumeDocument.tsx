import { profile } from "@/data/profile";
import { education } from "@/data/cv";
import {
  resumeSummary,
  resumeContact,
  experience,
  sideProjects,
  skills,
  certifications,
  type ResumeRole,
} from "@/data/resume";

/**
 * The resume, as one A4 sheet.
 *
 * Built for an ATS parser first: single column, no icons, no graphics, no
 * colour, standard section names, and real text rather than anything drawn.
 * Hierarchy comes from weight and size only, which is also what survives when a
 * parser strips styling entirely.
 *
 * This is the source the PDF is generated from (headless print of
 * /resume/print), so it uses fixed values rather than theme tokens.
 */

const FONT = 'Arial, "Helvetica Neue", Helvetica, sans-serif';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-[11px]">
      <h2 className="border-b border-black pb-[2px] text-[10px] font-bold uppercase tracking-[0.1em] text-black">
        {title}
      </h2>
      <div className="mt-[5px]">{children}</div>
    </section>
  );
}

function Entry({ title, org, tech, location, period, links, bullets }: ResumeRole) {
  return (
    <div className="resume-entry mb-[9px] last:mb-0">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[10.5px] font-bold leading-snug text-black">
          {title}
          {org ? <span className="font-normal"> | {org}</span> : null}
        </p>
        <p className="shrink-0 text-[9.5px] font-bold text-black">{period}</p>
      </div>

      {tech || location || links?.length ? (
        <p className="mt-[1px] text-[9px] leading-snug text-[#333333]">
          {tech ? <span className="italic">{tech}</span> : null}
          {location ? <span className="italic">{location}</span> : null}
          {links?.length ? (
            <>
              {tech || location ? " | " : null}
              {links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 ? " | " : null}
                  <a href={l.href} className="font-bold text-black underline">
                    {l.label}
                  </a>
                </span>
              ))}
            </>
          ) : null}
        </p>
      ) : null}

      <ul className="mt-[3px] list-disc pl-[13px] marker:text-black">
        {bullets.map((b) => (
          <li key={b} className="text-[9.5px] leading-[1.42] text-black">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResumeDocument() {
  return (
    <article
      className="resume-sheet mx-auto w-full max-w-[210mm] bg-white px-[15mm] py-[13mm] text-black"
      style={{ fontFamily: FONT }}
    >
      {/* Contact block. Plain text so a parser reads every field. */}
      <header className="text-center">
        <h1 className="text-[23px] font-bold uppercase leading-none tracking-[0.04em] text-black">
          {profile.realName}
        </h1>
        <p className="mt-[4px] text-[11.5px] font-bold uppercase tracking-[0.14em] text-black">
          {profile.role}
        </p>
        <p className="mt-[5px] text-[9.5px] leading-[1.5] text-black">
          {resumeContact.location} | {resumeContact.phone} | {profile.links.email}
        </p>
        <p className="text-[9.5px] leading-[1.5] text-black">
          <a href={profile.links.linkedin} className="underline">
            {resumeContact.linkedin}
          </a>
          {" | "}
          <a href={profile.links.github} className="underline">
            {resumeContact.github}
          </a>
          {" | "}
          <a href={`https://${resumeContact.website}`} className="underline">
            {resumeContact.website}
          </a>
        </p>
        <p className="mt-[3px] text-[9.5px] font-bold leading-snug text-black">
          Canadian Permanent Resident. Authorized to work in Canada with no sponsorship required.
        </p>
      </header>

      <Section title="Summary">
        <p className="text-[9.5px] leading-[1.45] text-black">{resumeSummary}</p>
      </Section>

      <Section title="Technical Skills">
        <dl className="space-y-[2px]">
          {skills.map((s) => (
            <div key={s.label} className="flex gap-2">
              <dt className="w-[118px] shrink-0 text-[9.5px] font-bold text-black">{s.label}</dt>
              <dd className="flex-1 text-[9.5px] leading-[1.42] text-black">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Work Experience">
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
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[10.5px] font-bold leading-snug text-black">
              {education.school}
              <span className="font-normal"> | {education.location}</span>
            </p>
            <p className="shrink-0 text-[9.5px] font-bold text-black">{education.grad}</p>
          </div>
          <p className="mt-[1px] text-[9.5px] leading-[1.42] text-black">
            {education.credentialFull}
          </p>
          <p className="mt-[1px] text-[9px] leading-[1.42] text-[#333333]">
            Relevant coursework: AI &amp; Machine Learning, Cloud Systems, iOS Development, .NET/C#,
            Database Design, Enterprise Java, Computer &amp; Network Security, Linux/UNIX.
          </p>
        </div>
      </Section>

      <Section title="Certifications">
        <p className="text-[9.5px] leading-[1.42] text-black">{certifications}</p>
      </Section>
    </article>
  );
}
