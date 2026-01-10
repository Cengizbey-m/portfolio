# Portfolio — Muhammed Cengiz

Steam-inspired portfolio built with **Next.js (App Router) + TypeScript + Tailwind**.

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

Add your resume at:
- `public/resume.pdf`

Then visit:
- `/resume`

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
