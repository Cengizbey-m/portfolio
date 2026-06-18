import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SteamShell } from "@/components/steam/SteamShell";

function normalizeSiteUrl(input?: string) {
  const raw = (input ?? "").trim();
  if (!raw) return "http://localhost:3000";
  // Vercel users often set this as "my-site.vercel.app" (no scheme). Normalize it.
  const withScheme = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    // Ensure it's a valid absolute URL
    return new URL(withScheme).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammed Cengiz — Full-Stack Developer",
    template: "%s · Muhammed Cengiz",
  },
  description:
    "Muhammed Cengiz — full-stack developer with a networking background. Shipped client work, hackathon wins, and capstone AI. Building with Next.js, TypeScript, and Python. Open to co-op / internship roles.",
  keywords: [
    "Muhammed Cengiz",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Software Developer",
    "Networking",
    "Portfolio",
    "Co-op",
    "Internship",
  ],
  authors: [{ name: "Muhammed Cengiz" }],
  creator: "Muhammed Cengiz",
  openGraph: {
    type: "website",
    title: "Muhammed Cengiz — Full-Stack Developer",
    description:
      "Full-stack developer with a networking background. Shipped client work, hackathon wins, and capstone AI. Open to co-op / internship roles.",
    url: SITE_URL,
    siteName: "Muhammed Cengiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Cengiz — Full-Stack Developer",
    description:
      "Full-stack developer with a networking background. Open to co-op / internship roles.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SteamShell>{children}</SteamShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
