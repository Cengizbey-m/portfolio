import { Github, Linkedin, Mail, FileText, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Contact",
  description: "Get in touch — email, LinkedIn, or the form. Replies within a day.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <p className="eyebrow">Get in touch</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Contact</h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-[hsl(var(--steam-green))]" />
          Open to co-op / internship roles · usually replies within a day.
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-2">
        <a href={`mailto:${profile.links.email}`} className="link-pill h-11 justify-start">
          <Mail className="h-4 w-4 text-[hsl(var(--steam-link))]" /> {profile.links.email}
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="link-pill h-11 justify-start">
          <Linkedin className="h-4 w-4 text-[hsl(var(--steam-link))]" /> LinkedIn
        </a>
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="link-pill h-11 justify-start">
          <Github className="h-4 w-4 text-[hsl(var(--steam-link))]" /> GitHub
        </a>
        <a href={profile.links.resumePdf} target="_blank" rel="noreferrer" className="link-pill h-11 justify-start">
          <FileText className="h-4 w-4 text-[hsl(var(--steam-link))]" /> Resume (PDF)
        </a>
      </div>

      <ContactForm />
    </div>
  );
}
