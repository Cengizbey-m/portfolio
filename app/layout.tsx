import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SteamShell } from "@/components/steam/SteamShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Cengiz — Full‑stack Developer (SDNE @ Sheridan)",
    template: "%s | Cengiz",
  },
  description:
    "Portfolio for Muhammed Cengiz — SDNE student at Sheridan College (Oakville/GTA). Projects across full‑stack web, AI/ML prototyping, networking, security, and databases.",
  openGraph: {
    type: "website",
    title: "Cengiz — Full‑stack Developer (SDNE @ Sheridan)",
    description:
      "Portfolio with projects across web, AI/ML, networking, security, and databases.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    siteName: "Cengiz Portfolio",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Cengiz Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cengiz — Full‑stack Developer (SDNE @ Sheridan)",
    description:
      "Portfolio with projects across web, AI/ML, networking, security, and databases.",
    images: ["/og.svg"],
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
