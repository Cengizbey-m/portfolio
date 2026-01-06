import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Contact",
  description: "Email + LinkedIn + optional form.",
};

export default function ContactPage() {
  const email = "muhammedcengiz2778@gmail.com";
  const linkedin =
    "https://www.linkedin.com/in/muhammed-cengiz-005aa0278/?locale=en_US";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="Contact"
            description="Best: email or LinkedIn. Form works if Resend is configured."
          />
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            <Button asChild className="normal-case tracking-normal font-medium">
              <a href={`mailto:${email}`}>Email</a>
            </Button>
            <Button
              variant="secondary"
              asChild
              className="normal-case tracking-normal font-medium"
            >
              <a href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>

          <ContactForm />

          <p className="text-xs text-muted-foreground">
            Note: update your email anywhere you prefer recruiters to contact you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


