import type { Metadata, Viewport } from "next";
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
  creator: "Md Samer Ansari",
  manifest: "/metadata/site.webmanifest",
  icons: {
    icon: [
      { url: "/metadata/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/metadata/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/metadata/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/metadata/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Md Samer Ansari",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/metadata/og.png",
        width: 1200,
        height: 630,
        alt: "Md Samer Ansari — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@imsamerr",
    images: ["/metadata/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <script
          // Apply saved theme before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
