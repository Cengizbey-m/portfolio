# Portfolio — Muhammed Cengiz

Steam-inspired developer portfolio built with **Next.js (App Router) + TypeScript + Tailwind**.
Recruiter-first profile, a project "library", a hire-me "store", and a browser arcade.

## Site map

| Route | What it is |
| --- | --- |
| `/` | Profile — hero with links/resume, featured project, projects, skills, about, comments |
| `/library` | Steam-style catalog of projects + mini-games (master/detail) |
| `/library/arcade` | Arcade hub — 6 mini-games |
| `/library/arcade/{snake,subnet,whack,match,shipit,echo}` | Individual games |
| `/store` | "Hire me" — Steam store page |
| `/projects/[slug]` | Project case studies (MDX) |
| `/resume`, `/contact`, `/about` | Resume PDF, contact form, full bio |

`/community` and `/projects` redirect into the profile and library respectively.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn-style UI primitives (`Button`, `Badge`, `Card`)
- Framer Motion (subtle animations)
- MDX (`/content/projects/*.mdx`) + Mermaid diagrams
- Optional email: Server Actions + Resend
- Optional analytics: Vercel Analytics

## Getting started

Install:

```bash
npm install
```

Run dev:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## Where to edit content

### Your info (name, role, links, availability)
- `data/profile.ts` — name, role, tagline, status, links (GitHub/LinkedIn/email/resume), education, featured project
- `data/cv.ts` — bio paragraphs, education + coursework, certificates, timeline
- `data/skills.ts` — skill groups (shown as the profile "Skills" panel) + top-skills chips
- `data/reviews.ts` — testimonials shown as profile "Comments"

### Avatar / banner / background
- `public/steam/avatar.jpg`, `public/steam/banner.jpg`
- Background video is desktop-only (mobile gets a light gradient): `data/profile.ts → background`

### Projects list

Edit metadata in:
- `data/projects.ts`

### Case studies (MDX)

Edit MDX files in:
- `content/projects/thetripman.mdx`
- `content/projects/capstone-ai-finance.mdx`
- `content/projects/formally-prototype.mdx`

To add a new project:
- Add a project entry in `data/projects.ts` (unique `slug`)
- Add a matching MDX file: `content/projects/<slug>.mdx`

### Resume PDF

The resume is not a hand-made PDF. It is generated from source:

- Content lives in `data/resume.ts`
- Layout lives in `components/resume/ResumeDocument.tsx`
- `/resume/print` renders the bare sheet, `/resume` embeds `public/resume.pdf`

To regenerate `public/resume.pdf` after editing content, run the dev server and
print the print view headlessly:

```bash
chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=public/resume.pdf http://localhost:3000/resume/print
```

Any Chromium works (`msedge` is fine). `--no-pdf-header-footer` is required, or
the browser stamps a date, URL, and page number onto the sheet.

Two things to preserve when editing:

- **Sizes are in points, not pixels.** A printed page is measured in points, so
  `9.2pt` puts 9.2pt on paper regardless of pixel ratio. `T` at the top of
  `ResumeDocument.tsx` is the single tuning knob for density.
- **The sheet must stay on one page.** Check it before regenerating: open
  `/resume/print` and compare the sheet height to A4 (1123px at 96dpi).

  ```js
  const h = document.querySelector('.resume-sheet').getBoundingClientRect().height;
  console.log((h / (297 / 25.4 * 96) * 100).toFixed(1) + '% of A4');
  ```

  Aim for 96–98%. At 100% a one-line reflow silently spills onto page two.

## Contact form (Resend)

The contact form sends email via Resend if you configure environment variables.

Local: create `.env.local`

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=your.email@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Production (Vercel): Project → Settings → Environment Variables → add the same keys.

## Deploy to Vercel

1. Push this repo to GitHub
2. In Vercel, click **New Project** → import the repo
3. Set Environment Variables (optional):
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://your-domain.com`)
   - Resend vars if you want the form to send email
4. Deploy

## Notes (client confidentiality)

For client work like **TheTripMan**, keep production code private and only include safe screenshots and high-level architecture notes.
