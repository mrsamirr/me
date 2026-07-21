import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mrsamirr.vercel.app";

const siteTitle = "Md Samer Ansari — Full Stack Developer";
const siteDescription =
  "Backend Engineer Intern at LookAround.in and final-year CSE. I build backends that hold under load and full-stack products that ship — Next.js, Node, Express, FastAPI, PostgreSQL. Open to full-stack roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Md Samer Ansari",
  },
  description: siteDescription,
  keywords: [
    "Md Samer Ansari",
    "mrsamirr",
    "full stack developer",
    "React",
    "Next.js",
    "Laravel",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Md Samer Ansari" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Md Samer Ansari",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
