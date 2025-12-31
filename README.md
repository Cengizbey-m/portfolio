# Portfolio — Muhammed “Cengiz” Cengiz

Production-quality portfolio site built with **Next.js (App Router) + TypeScript + Tailwind**.

Goals:
- Load fast and feel modern
- Clear case studies that are easy to understand quickly
- Case studies with **MDX + Mermaid** architecture diagrams
- Optional **House Mode** (fast SVG navigation)

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

## House Mode

There’s a toggle in the header:
- Default OFF for a clean recruiter view
- When ON, shows a fast SVG “house map” linking to Projects/About/Skills/Certificates/Contact

## Contact form (optional Resend)

The form works if you configure env vars.

Local `.env.local` (or Vercel Project Settings → Environment Variables):

```bash
RESEND_API_KEY=your_key_here
CONTACT_TO_EMAIL=your.email@example.com
# Optional:
CONTACT_FROM_EMAIL=portfolio@your-domain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

If Resend isn’t configured, the page still provides a **mailto** link.

## Deploy to Vercel

1. Push this repo to GitHub
2. In Vercel, click **New Project** → import the repo
3. Set Environment Variables (optional):
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://your-domain.com`)
   - Resend vars if you want the form to send email
4. Deploy

## Notes (client confidentiality)

For client work like **TheTripMan**, keep production code private.
This portfolio is set up to show:
- safe screenshots (no confidential data)
- architecture + security considerations
- a public demo/prototype repo link (dummy data)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
