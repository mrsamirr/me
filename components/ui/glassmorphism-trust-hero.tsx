"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ExternalLink,
  Code2,
  Cpu,
  GitBranch,
  Brain,
  Users,
  Send,
  CheckCircle2,
  CircleAlert,
  ChevronRight,
  Terminal,
  Layers,
  Star,
  Play,
  MoveUpRight,
  Briefcase,
  MapPin,
  Zap,
  Sparkles,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.243 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

// ── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Experience", "Skills", "Work", "Contact"];

const SKILLS = [
  {
    icon: Layers,
    title: "Frameworks & full-stack",
    desc: "Next.js and React up front, Node/Express and FastAPI behind — the whole loop from pixel to endpoint, shipped and maintained.",
    tags: ["Next.js", "React.js", "Node.js", "Express.js", "FastAPI", "Tailwind CSS"],
  },
  {
    icon: Code2,
    title: "Languages",
    desc: "TypeScript by default, Python when it fits, C++/Java when it counts. The language serves the problem — never the reverse.",
    tags: ["TypeScript", "JavaScript", "Python", "Java", "C/C++"],
  },
  {
    icon: Cpu,
    title: "Databases",
    desc: "Relational or document, I model it clean — PostgreSQL, MySQL, Mongo, Prisma. Fast queries, no surprises at scale.",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
  },
  {
    icon: Sparkles,
    title: "AI in products",
    desc: "LLMs wired into real apps, not notebook demos — the Claude API powering Aurora AI, UxDots, and Same UX. Prompt design, streaming, and Redis-cached responses.",
    tags: ["Claude API", "LLMs", "Prompt Engineering", "Redis"],
  },
  {
    icon: Terminal,
    title: "Tools & DevOps",
    desc: "Docker, Vercel, Cloudflare, Linux. Terminal-native — I ship reproducibly and debug where the logs actually live.",
    tags: ["Git", "Docker", "Vercel", "Cloudflare", "Postman", "Linux"],
  },
  {
    icon: GitBranch,
    title: "Git Version Control",
    desc: "Branches, rebases, clean history. Version control as a discipline — readable diffs, atomic commits, no force-push chaos.",
    tags: ["Git", "GitHub", "Collaboration"],
  },
  {
    icon: Users,
    title: "Project Management",
    desc: "Scoping features, managing repos, and keeping delivery moving — Agile cadence, code review, and shipping with a small team without stepping on each other.",
    tags: ["Agile", "Code Review", "Collaboration", "Leadership"],
  },
];

/** Infinite marquee — stack logos in /public/brands/ */
const HERO_TICKER: { name: string; logoSrc: string }[] = [
  { name: "Next.js", logoSrc: "/brands/nextjs.svg" },
  { name: "React", logoSrc: "/brands/react.svg" },
  { name: "Express", logoSrc: "/brands/express.svg" },
  { name: "TypeScript", logoSrc: "/brands/typescript.svg" },
  { name: "JavaScript", logoSrc: "/brands/javascript.svg" },
  { name: "PostgreSQL", logoSrc: "/brands/postgres.svg" },
  { name: "MongoDB", logoSrc: "/brands/mongo.svg" },
  { name: "Docker", logoSrc: "/brands/docker.svg" },
  { name: "Tailwind", logoSrc: "/brands/tailwind.svg" },
  { name: "Redis", logoSrc: "/brands/redis.svg" },
  { name: "Git", logoSrc: "/brands/git.svg" },
  { name: "Linux", logoSrc: "/brands/linux.svg" },
];

const PROJECTS = [
  {
    title: "Same UX",
    desc: "Prompt in, interface out. An AI engine that turns plain-English ideas into responsive UX — design at the speed of thought.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "shadcn"],
    href: "https://sameux.vercel.app/",
    icon: Sparkles,
  },
  {
    title: "Realtime Whiteboard (Miro Dev)",
    desc: "An infinite canvas a whole team draws on at once — sub-100ms sync on Liveblocks and Convex. No refresh, no lag.",
    tags: ["Next.js", "React", "TypeScript", "Liveblocks", "Convex", "Tailwind CSS"],
    href: "https://miro-dev-delta.vercel.app/",
    icon: Layers,
  },
  {
    title: "WhiteSpace",
    desc: "Writing, stripped to the essentials. A serverless blog platform on Cloudflare Workers — nothing between you and the words.",
    tags: ["React", "Cloudflare Workers", "Node.js", "PostgreSQL", "Tailwind CSS"],
    href: "https://white-space-five.vercel.app/",
    icon: Terminal,
  },
  {
    title: "Aurora AI",
    desc: "One chat box, every model. A unified AI assistant with Redis-cached responses that land before you finish reading.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Redis"],
    href: "https://auroramind.vercel.app/",
    icon: Cpu,
  },
];

const EXPERIENCE = [
  {
    company: "LookAround.in",
    role: "Backend Engineer Intern",
    type: "Internship",
    period: "Feb 2026 — Present",
    location: "Bengaluru (Remote)",
    companyUrls: [{ label: "lookaround.in", href: "https://lookaround.in/" }],
    highlights: [
      "Own core backend — API design, schema, and server logic across Node.js, Next.js 14, and PostgreSQL.",
      "efm.eirs.app — a 4-level approval engine with SLA escalation, role-based access, and S3-backed watermarked media.",
      "ai-cavalli.eirs.app — PIN-auth restaurant ops with per-role access for kitchen, admin, and customer, on Supabase.",
      "event.eirs.app — 20+ Prisma models, JWT, pooled connections, and audit-logged money movement. Production-ready.",
    ],
    achievements: [
      "Three apps shipped end-to-end on the eirs.app platform.",
      "Designed the RBAC and financial audit trail running live today.",
    ],
    tags: ["Node.js", "Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "AWS S3", "JWT", "RBAC"],
    note: "",
  },
  {
    company: "GrowthPurple Technologies",
    role: "SDE Intern",
    type: "Internship",
    period: "Jun 2025 — Oct 2025",
    location: "Remote",
    companyUrls: [{ label: "growthpurple.com", href: "https://growthpurple.com/" }],
    highlights: [
      "gstping.com — GST-deadline autopilot for Indian SMEs: Razorpay billing, Laravel scheduling, Twilio across SMS/email/WhatsApp.",
      "UxDots.io — natural-language-to-UX generation wired straight into the Claude API.",
    ],
    achievements: [
      "Two SaaS products taken from zero to production.",
    ],
    tags: ["Next.js", "Laravel", "Tailwind CSS", "Razorpay", "Twilio", "Claude API", "TypeScript"],
    note: "",
  },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

const Pill = ({ label }: { label: string }) => (
  <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 border-b border-zinc-700 pb-px">
    {label}
  </span>
);

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
    {children}
  </p>
);

// ── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  /* Duplicate once so translateX(-50%) loops the marquee seamlessly */
  const tickerTrack = [...HERO_TICKER, ...HERO_TICKER];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-zinc-950"
    >
      {/* Layered CSS background — grid + radial glow + grain */}
      <div className="absolute inset-0 z-0 hero-bg" aria-hidden>
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 hero-aurora" />
        <div className="absolute inset-0 hero-grain" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-32 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-8">
            <h1
              className="animate-fade-in delay-100 text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-medium tracking-tighter leading-[0.92]"
              style={{ animationFillMode: "both" }}
            >
              Hello, I&apos;m{" "}
              <span className="bg-gradient-to-br from-indigo-300 via-blue-400 to-sky-300 bg-clip-text text-transparent">
                Md Samer Ansari
              </span>
              <br />
              <span className="text-white">Full Stack Developer</span>
            </h1>

            <p
              className="animate-fade-in delay-200 max-w-lg text-lg text-zinc-300 leading-relaxed"
              style={{ animationFillMode: "both" }}
            >
              Backend Engineer Intern at LookAround.in, final-year CSE. I build backends that hold under load and products that actually ship.
            </p>
            <p
              className="animate-fade-in delay-200 max-w-xl text-[15px] text-zinc-500 leading-relaxed border-l border-white/10 pl-4"
              style={{ animationFillMode: "both" }}
            >
              Next.js and Node up front, FastAPI and Postgres behind — Docker, Vercel, and Cloudflare doing the shipping.
            </p>

            <div
              className="animate-fade-in delay-300 flex flex-col sm:flex-row gap-4"
              style={{ animationFillMode: "both" }}
            >
              <a
                href="/samer_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4" />
                View resume
              </a>
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20"
              >
                <Play className="w-4 h-4 fill-current" />
                View projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Social links */}
            <div
              className="animate-fade-in delay-400 flex flex-wrap items-center gap-5"
              style={{ animationFillMode: "both" }}
            >
              <span className="text-xs text-zinc-500 uppercase tracking-widest">
                Find me on
              </span>
              <div className="h-px flex-1 max-w-[40px] bg-white/10" />
              {[
                {
                  href: "https://github.com/mrsamirr",
                  Icon: GithubIcon,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/mrsamirr/",
                  Icon: LinkedinIcon,
                  label: "LinkedIn",
                },
                {
                  href: "https://twitter.com/imsamerr",
                  Icon: TwitterIcon,
                  label: "Twitter",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — glassmorphism stats card + marquee ticker card */}
          <div
            className="animate-fade-in delay-400 lg:col-span-5 space-y-6"
            style={{ animationFillMode: "both" }}
          >
            {/* Stats card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
              <div className="pointer-events-none absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Currently</div>
                      <div className="text-sm font-medium text-white">Backend Engineer Intern @ LookAround</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono   text-zinc-600">v26.05</span>
                </div>

                <div className="h-px w-full bg-white/[0.08]" />

                <div className="space-y-2">
                  {[
                    { label: "Frontend", detail: "React · Next.js · Tailwind CSS" },
                    { label: "Backend",  detail: "Node.js · Express · FastAPI" },
                    { label: "Data & Ops", detail: "PostgreSQL · MongoDB · Docker" },
                  ].map(({ label, detail }) => (
                    <div key={label} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3.5 py-2.5 border border-white/[0.05]">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{label}</span>
                      <span className="text-[11px] text-zinc-300" style={{ fontFamily: "ui-monospace, 'Cascadia Code', monospace" }}>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    ACTIVE
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                    OPEN TO WORK
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee ticker card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur-xl">
              <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400">
                Stack &amp; tools I use
              </h3>
              <div
                className="relative overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                }}
              >
                <div
                  className="animate-marquee flex gap-12 whitespace-nowrap px-4"
                  style={{ width: "max-content", flexShrink: 0 }}
                >
                  {tickerTrack.map((item, i) => (
                    <div
                      key={`${item.name}-${i}`}
                      className="group flex items-center gap-2 opacity-60 transition-all hover:opacity-100 hover:scale-105 cursor-default"
                      style={{ flexShrink: 0 }}
                    >
                      <img
                        src={item.logoSrc}
                        alt=""
                        aria-hidden
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0 grayscale brightness-150 transition group-hover:grayscale-0 group-hover:brightness-100"
                      />
                      <span className="text-lg font-bold text-white tracking-tight">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STATS BAND ────────────────────────────────────────────────────────────────

const STATS = [
  { value: "3", label: "Apps in production" },
  { value: "6+", label: "Projects shipped" },
  { value: "2", label: "Engineering internships" },
  { value: "300+", label: "LeetCode problems solved" },
];

function Stats() {
  return (
    <section className="relative border-t border-white/[0.06] px-6 py-14 lg:px-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
        {STATS.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="bg-gradient-to-br from-indigo-300 via-blue-300 to-sky-300 bg-clip-text text-4xl font-semibold tracking-tighter text-transparent sm:text-5xl">
              {value}
            </span>
            <span className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── OBJECTIVE ─────────────────────────────────────────────────────────────────

const EXPERTISE_TAGS = [
  "Next.js", "React", "Node.js", "Express",
  "FastAPI", "TypeScript", "JavaScript", "Python",
  "PostgreSQL", "MySQL", "MongoDB", "Prisma",
  "Docker", "Vercel", "Cloudflare", "Linux",
];

const SPEC_ROWS = [
  { key: "role",      val: "Full Stack Developer"                  },
  { key: "intern",    val: "Backend Engineer @ LookAround.in"      },
  { key: "stack",     val: "Next.js · Node.js · PostgreSQL"        },
  { key: "building",  val: "production apps & AI-powered platforms"},
  { key: "available", val: "true"                                   },
];

function Objective() {
  return (
    <section
      id="objective"
      className="relative py-24 px-6 lg:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Vertical rule accent — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.04]"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl">
        <SectionEyebrow>Career Objective</SectionEyebrow>

        {/* Main two-col layout */}
        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">

          {/* LEFT — statement text, 3/5 width */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Large quote-style statement */}
            <div className="relative pl-5 border-l-2 border-white/20">
              <p className="text-2xl sm:text-3xl font-medium text-white leading-[1.35] tracking-tight">
                I build both ends —{" "}
                <span className="text-zinc-400">
                  interfaces people reach for
                </span>{" "}
                and backends that hold their nerve at 3 AM.
              </p>
            </div>

            <div className="space-y-3 text-[15px] leading-relaxed text-zinc-400 max-w-lg">
              <p>
                Curiosity first, craft second. Clean APIs, crisp UIs, and apps that survive contact with real users — Next.js, Node, Express, FastAPI over PostgreSQL, Prisma, and Mongo.
              </p>
              <p>
                <span className="text-zinc-300">Docker, Vercel, Cloudflare, Linux.</span>
                {" "}Terminal-native and reproducible — I&apos;d rather ship it than describe it.
              </p>
              <p>
                Now{" "}
                <span className="text-white">Backend Engineer Intern @ LookAround.in</span>
                , building the eirs.app platform. Before that,{" "}
                <span className="text-white">SDE Intern @ GrowthPurple</span>
                . Final-year CSE — open to full-stack roles.
              </p>
            </div>

            {/* Expertise tags — styled like inline <Tag /> elements */}
            <div className="flex flex-wrap gap-2 pt-2">
              {EXPERTISE_TAGS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-zinc-400 before:content-['<'] before:text-zinc-700 after:content-['/>'] after:text-zinc-700 hover:text-white hover:before:text-zinc-500 hover:after:text-zinc-500 transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — monospace spec list, 2/5 width */}
          <div
            className="lg:col-span-2 self-start"
            style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace" }}
          >
            {/* Mini header */}
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-4">
              // samer.config.ts
            </p>

            <div className="space-y-0">
              {/* Opening brace */}
              <div className="text-[12px] text-zinc-500 pb-1">export default {"{"}</div>

              {SPEC_ROWS.map(({ key, val }) => (
                <div
                  key={key}
                  className="obj-line group flex items-baseline gap-0 text-[12px] leading-7 pl-4"
                >
                  <span className="text-sky-400 shrink-0">{key}</span>
                  <span className="text-zinc-600 shrink-0">:&nbsp;</span>
                  <span
                    className={
                      val === "true"
                        ? "text-emerald-400"
                        : key === "role"
                        ? "text-white font-medium"
                        : "text-zinc-300"
                    }
                  >
                    {val === "true" ? val : `"${val}"`}
                  </span>
                  <span className="text-zinc-700 shrink-0">,</span>
                </div>
              ))}

              {/* Closing brace */}
              <div className="text-[12px] text-zinc-500 pt-1">{"}"}</div>
            </div>

            {/* Thin divider + status */}
            <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] text-zinc-500 uppercase tracking-widest">
                Final-year CSE · Open to roles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT / COMMIT-LOG ───────────────────────────────────────────────────────

const COMMITS = [
  { hash: "e1c7b3a", type: "feat",     msg: "backend @ LookAround.in — shipped efm, ai-cavalli & event on eirs.app" },
  { hash: "b2d83f5", type: "feat",     msg: "SDE @ GrowthPurple — gstping.com & UxDots.io, zero to prod" },
  { hash: "c82d77e", type: "feat",     msg: "nights & weekends — Miro Dev, WhiteSpace, Aurora AI" },
  { hash: "d4f1e09", type: "refactor", msg: "went deep on Next.js, Node, Prisma & Postgres" },
  { hash: "0e6a912", type: "init",     msg: "init: B.Tech CSE @ Asansol Engineering College" },
];

const TYPE_COLOR: Record<string, string> = {
  feat:     "text-emerald-400",
  refactor: "text-sky-400",
  fix:      "text-indigo-400",
  init:     "text-zinc-500",
};

function ProfilePhoto() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative shrink-0">
      {/* Gradient ring glow */}
      <div
        className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-br from-indigo-500/30 via-blue-500/20 to-sky-500/30 blur-lg"
        aria-hidden
      />
      <div className="relative h-56 w-56 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] sm:h-64 sm:w-64">
        {!errored ? (
          // Drop your photo at /public/profile.jpg (or change this src).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/profile.jpg"
            alt="Md Samer Ansari"
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center px-4">
            <span className="text-4xl font-semibold tracking-tight text-white">
              SA
            </span>
            <span className="text-[11px] leading-tight text-zinc-500">
              Add your photo at
              <br />
              <span className="text-zinc-400">/public/profile.jpg</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">

        {/* Two-col header */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>About</SectionEyebrow>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter text-white leading-none">
              git log --author=Samer
            </h2>
          </div>
          <p className="text-sm text-zinc-500 sm:text-right max-w-xs">
            Commit history of what matters. Newest first.
          </p>
        </div>

        {/* Intro — photo + brief */}
        <div className="mb-14 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
          <ProfilePhoto />
          <div className="space-y-4">
            <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed">
              I&apos;m <span className="font-medium text-white">Samer</span> — a
              backend-leaning full-stack developer who likes the unglamorous
              parts: APIs that don&apos;t fall over, queries that stay fast at
              2&nbsp;a.m., and deploys that just work.
            </p>
            <p className="text-[15px] text-zinc-400 leading-relaxed">
              Backend Engineer Intern at{" "}
              <span className="text-zinc-200">LookAround.in</span> and final-year
              CSE. I&apos;ve taken two SaaS products from an empty repo to
              production with Next.js, Node, and FastAPI over PostgreSQL — Docker,
              Vercel, and Cloudflare doing the shipping. Curiosity first, craft
              second.
            </p>
          </div>
        </div>

        {/* Terminal log */}
        <div
          className="rounded-2xl border border-white/[0.07] bg-zinc-950/80 overflow-hidden"
          style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace" }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="ml-4 text-[11px] text-zinc-600 cursor-blink">
              ~/md-samer-ansari — zsh
            </span>
          </div>

          {/* Prompt line */}
          <div className="px-5 pt-4 pb-2 text-[12px] text-zinc-500">
            <span className="text-emerald-400">samer</span>
            <span className="text-zinc-600">@</span>
            <span className="text-sky-400">portfolio</span>
            <span className="text-zinc-600"> % </span>
            <span className="text-white">git log --oneline --all</span>
          </div>

          {/* Commit rows */}
          <div className="px-5 pb-5 space-y-0.5">
            {COMMITS.map(({ hash, type, msg }) => (
              <div key={hash} className="commit-row flex items-baseline gap-3 py-1.5 border-b border-white/[0.03] last:border-0 group">
                <span className="shrink-0 text-[11px] text-indigo-500/70 font-medium w-14">{hash}</span>
                <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider w-14 ${TYPE_COLOR[type] ?? "text-zinc-500"}`}>
                  {type}
                </span>
                <span className="text-[13px] text-zinc-300 leading-snug group-hover:text-white transition-colors">
                  {msg}
                </span>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Experience</SectionEyebrow>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter text-white leading-[1]">
              Where I&apos;ve worked
            </h2>
          </div>
          <p className="max-w-xs text-sm text-zinc-500 sm:text-right">
Where I earned my reps — shipping real products.
          </p>
        </div>

        {/* Experience cards */}
        <div className="space-y-6">
        {EXPERIENCE.map((exp) => (
        <div key={exp.company} className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-indigo-400/[0.04] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-sky-400/[0.04] blur-3xl" aria-hidden />

          <div className="relative z-10 p-8 sm:p-10">

            {/* Header row */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between mb-8">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/10">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white leading-snug">
                    {exp.role}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    {exp.companyUrls.length > 0 ? (
                      exp.companyUrls.map(({ label, href }, i) => (
                        <React.Fragment key={href}>
                          {i > 0 && <span className="text-zinc-600 text-sm">/</span>}
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                          >
                            {label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </React.Fragment>
                      ))
                    ) : (
                      <span className="text-sm font-medium text-indigo-400">{exp.company}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {exp.period}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400">
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Two-col body */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* Responsibilities */}
              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                  Responsibilities
                </p>
                <ul className="space-y-2.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-zinc-400">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500/60" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                  Notable Achievements
                </p>
                <ul className="space-y-2.5">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-zinc-400">
                      <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400/70 fill-indigo-400/40" />
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Intern note */}
                {exp.note && (
                  <p
                    className="mt-6 text-[11px] italic text-zinc-600 border-l border-white/[0.08] pl-3"
                    style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace" }}
                  >
                    // {exp.note}
                  </p>
                )}
              </div>
            </div>

            {/* Tech tags */}
            <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-wrap gap-2">
              {exp.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>
        </div>
        ))}
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────

function Skills() {
  const [active, setActive] = useState(0);
  const cur = SKILLS[active];
  const ActiveIcon = cur.icon;

  return (
    <section id="skills" className="relative py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Skill-Set</SectionEyebrow>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter text-white leading-[1]">
              What I work with
            </h2>
          </div>
          <p className="max-w-xs text-sm text-zinc-500 sm:text-right">
            Agentic tooling first, then stacks and shipping—Cursor, MCP, production AI, the usual web/mobile depth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left rail — selectable index */}
          <ul className="lg:col-span-5 border-y border-white/[0.06] divide-y divide-white/[0.06]">
            {SKILLS.map(({ icon: Icon, title }, i) => {
              const on = i === active;
              return (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center gap-4 py-4 text-left transition-colors ${
                      on ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono tabular-nums w-7 transition-colors ${
                        on ? "text-indigo-400" : "text-zinc-700"
                      }`}
                      style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-sm font-medium tracking-tight">{title}</span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 transition-all ${
                        on ? "opacity-100 translate-x-0 text-white" : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right pane — active skill detail */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
            <div
              key={active}
              className="skill-detail relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-400/[0.04] blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/10">
                    <ActiveIcon className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] text-zinc-600"
                    style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace" }}
                  >
                    {String(active + 1).padStart(2, "0")} / {String(SKILLS.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-2xl font-medium tracking-tight text-white mb-3">
                  {cur.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400 mb-7">{cur.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {cur.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WORK ─────────────────────────────────────────────────────────────────────

function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="relative py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Selected work</SectionEyebrow>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter text-white leading-[1]">
              Things I&apos;ve shipped
            </h2>
          </div>
          <a
            href="https://github.com/mrsamirr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            All projects on GitHub
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Accordion — one row expanded at a time */}
        <div className="border-t border-white/[0.06]">
          {PROJECTS.map(({ title, desc, tags, href, icon: Icon }, i) => {
            const on = i === active;
            return (
              <div
                key={title}
                onClick={() => setActive(i)}
                className={`group relative cursor-pointer border-b border-white/[0.06] ${
                  on ? "py-8" : "py-5"
                }`}
              >
                {/* Active accent line */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-px bg-indigo-400 ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="flex items-center gap-5 sm:gap-6 pl-4">
                  <span
                    className={`w-8 text-[11px] font-mono tabular-nums ${
                      on ? "text-indigo-400" : "text-zinc-700"
                    }`}
                    style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      on ? "text-white" : "text-zinc-600"
                    }`}
                  />
                  <h3
                    className={`flex-1 font-medium tracking-tight ${
                      on
                        ? "text-2xl sm:text-3xl text-white"
                        : "text-base sm:text-lg text-zinc-400"
                    }`}
                  >
                    {title}
                  </h3>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`shrink-0 inline-flex items-center gap-1.5 text-xs hover:text-white ${
                      on ? "text-white" : "text-zinc-600"
                    }`}
                  >
                    Visit
                    <MoveUpRight className="w-3 h-3" />
                  </a>
                </div>

                {on && (
                  <div className="mt-5 grid grid-cols-1 gap-5 pl-4 sm:grid-cols-3 sm:gap-8 sm:pl-[68px]">
                    <p className="sm:col-span-2 text-sm leading-relaxed text-zinc-400 max-w-xl">
                      {desc}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end content-start">
                      {tags.map((t) => (
                        <Pill key={t} label={t} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/mrsamirr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <GithubIcon className="w-4 h-4" />
            View more on GitHub
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ── GIT GRAPH ─────────────────────────────────────────────────────────────────

function GitGraph() {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [thisYear, setThisYear] = useState<number | null>(null);
  const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [chartRes, statsRes] = await Promise.all([
          fetch("/api/github-chart"),
          fetch("/api/github-contributions"),
        ]);
        if (!cancelled && chartRes.ok) {
          setSvgMarkup(await chartRes.text());
        }
        if (!cancelled && statsRes.ok) {
          const data = (await statsRes.json()) as {
            thisYear: number | null;
            year: string | null;
          };
          setThisYear(data.thisYear);
          setYear(data.year);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative py-16 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Activity</SectionEyebrow>
            <h2 className="text-2xl font-medium tracking-tighter text-white">
              GitHub contributions
            </h2>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="max-w-[260px] text-[13px] leading-snug text-zinc-400 sm:text-right">
              Committing{' '}
              <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-blue-300 bg-clip-text font-medium text-transparent">
                day &amp; night
              </span>
              {' '}— small commits, steady momentum.{' '}
              <span className="text-zinc-600 italic">Each brighter cell is another day of shipping.</span>
            </p>
            <a
              href="https://github.com/mrsamirr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              github.com/mrsamirr
              <MoveUpRight className="w-3 h-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-zinc-950 overflow-hidden p-4 sm:p-6">
          {svgMarkup ? (
            <div
              className="github-contrib-chart"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          ) : (
            <div className="h-[104px] w-full animate-pulse rounded bg-white/[0.04]" />
          )}
          {thisYear != null && year != null && (
            <p className="mt-3 text-right text-[13px] leading-snug text-zinc-400">
              {thisYear.toLocaleString()} contributions in {year}
            </p>
          )}
        </div>

        {/* Pinned repos strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "samdotdev",        lang: "TypeScript",  href: "https://github.com/mrsamirr/samdotdev"        },
            { name: "miro-dev",         lang: "TypeScript",  href: "https://github.com/mrsamirr/miro-dev"         },
            { name: "WhiteSpace",       lang: "TypeScript",  href: "https://github.com/mrsamirr/WhiteSpace"       },
            { name: "ask-this-website", lang: "TypeScript",  href: "https://github.com/mrsamirr/ask-this-website" },
            { name: "cms",              lang: "TypeScript",  href: "https://github.com/mrsamirr/cms"              },
            { name: "job-board",        lang: "TypeScript",  href: "https://github.com/mrsamirr/job-board"        },
          ].map(({ name, lang, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-white/[0.06] rounded-lg px-4 py-3 transition-colors hover:border-white/[0.14] hover:bg-white/[0.02]"
              style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace" }}
            >
              <div>
                <div className="text-[12px] text-zinc-300 group-hover:text-white transition-colors">{name}</div>
                <div className="text-[10px] text-zinc-600 mt-0.5">{lang}</div>
              </div>
              <MoveUpRight className="w-3 h-3 text-zinc-700 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    if (status !== "sent" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), 8000);
    return () => clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    // Set NEXT_PUBLIC_FORMSPREE_ID in .env.local — accepts either the bare
    // form ID (e.g. "xqerlalj") or the full Formspree endpoint URL.
    const raw = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";
    const formId = raw.replace(/^https?:\/\/formspree\.io\/f\//, "");
    if (formId === "YOUR_FORM_ID" || !formId) {
      console.warn(
        "Formspree not configured — set NEXT_PUBLIC_FORMSPREE_ID in .env.local"
      );
      setStatus("error");
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Contact</SectionEyebrow>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter text-white leading-[1]">
              Let&apos;s build something
            </h2>
          </div>
          <p className="max-w-xs text-sm text-zinc-500 sm:text-right">
            Open to roles, freelance, and interesting collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">

          {/* Form — left 3 cols */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-3">
            {status === "sent" && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-green-500/25 bg-green-500/10 px-4 py-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-green-100">
                    Message sent!
                  </p>
                  <p className="mt-0.5 text-xs text-green-200/70">
                    Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3.5"
              >
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="text-sm font-medium text-red-100">
                    Couldn&apos;t send your message
                  </p>
                  <p className="mt-0.5 text-xs text-red-200/70">
                    Please try again in a moment, or email me directly via the links on the right.
                  </p>
                </div>
              </div>
            )}
            {status === "sending" && (
              <div
                role="status"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
              >
                <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <p className="text-sm text-zinc-300">Sending your message…</p>
              </div>
            )}

            {/* Bordered form area */}
            <div className="border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.08]">

              {/* Email row */}
              <div className="flex items-center gap-4 px-5 py-4 focus-within:bg-white/[0.02] transition-colors">
                <label className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600 w-16">
                  From
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-700 outline-none"
                />
              </div>

              {/* Message row */}
              <div className="flex items-start gap-4 px-5 py-4 focus-within:bg-white/[0.02] transition-colors">
                <label className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600 w-16 pt-0.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me what you're building or just say hi…"
                  className="flex-1 resize-none bg-transparent text-sm text-white placeholder-zinc-700 outline-none leading-relaxed"
                />
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.015]">
                <span
                  className={`text-[11px] tabular-nums ${
                    status === "sent"
                      ? "text-green-400/90"
                      : status === "error"
                      ? "text-red-400/90"
                      : "text-zinc-500"
                  }`}
                >
                  {status === "sent"
                    ? "Message delivered"
                    : status === "error"
                    ? "Send failed — try again"
                    : status === "sending"
                    ? "Sending…"
                    : "Reply within 24 h"}
                </span>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    "Sending…"
                  ) : status === "sent" ? (
                    <>
                      Send another
                      <Send className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Socials — right 2 cols */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-10">
            <div className="space-y-4">
              {[
                { href: "mailto:mdsameransari45@gmail.com",         label: "Email",      sub: "mdsameransari45@gmail.com", Icon: Mail       },
                { href: "https://github.com/mrsamirr",              label: "GitHub",     sub: "github.com/mrsamirr", Icon: GithubIcon   },
                { href: "https://www.linkedin.com/in/mrsamirr/",    label: "LinkedIn",   sub: "in/mrsamirr",           Icon: LinkedinIcon  },
                { href: "https://x.com/imsamerr",                   label: "X / Twitter",sub: "@imsamerr",             Icon: TwitterIcon   },
                { href: "https://leetcode.com/mrsamirr/",           label: "LeetCode",   sub: "mrsamirr",              Icon: Code2         },
              ].map(({ href, label, sub, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/[0.06] pb-4 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-600 transition-colors group-hover:text-white" />
                    <div>
                      <div className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                        {label}
                      </div>
                      <div className="text-[10px] text-zinc-600">{sub}</div>
                    </div>
                  </div>
                  <MoveUpRight className="w-3.5 h-3.5 text-zinc-700 transition-all group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>

            <p className="text-xs text-zinc-700">
              © {new Date().getFullYear()} Md Samer Ansari
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial =
      stored === "light" || stored === "dark"
        ? stored
        : document.documentElement.classList.contains("light")
        ? "light"
        : "dark";
    setTheme(initial);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
    root.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-xl bg-zinc-950/70 border-b border-white/[0.06]">
      <a
        href="#home"
        onClick={() => setOpen(false)}
        className="text-sm font-semibold tracking-tight text-white hover:text-zinc-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 rounded-sm"
      >
        Md Samer Ansari
      </a>

      {/* Desktop nav */}
      <ul className="hidden sm:flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider text-zinc-400 transition-colors hover:text-white hover:bg-white/[0.06]"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Right cluster: theme toggle + Hire me chip */}
      <div className="hidden sm:flex items-center gap-2">
        <ThemeToggle />
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/10"
        >
          Hire me
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* Mobile: theme toggle + hamburger */}
      <div className="flex items-center gap-2 sm:hidden">
        <ThemeToggle />
        <button
          className="flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
        <span className={`h-px w-5 bg-white transition-all ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`h-px w-5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-white transition-all ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 border-b border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-2 sm:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div className="relative w-full bg-zinc-950 text-white overflow-x-hidden font-sans">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.7s ease-out forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        html { scroll-behavior: smooth; }

        /* ── Hero background layers ── */
        .hero-bg { background: radial-gradient(ellipse at 70% 20%, #0d1330 0%, #05070f 65%); }
        @keyframes auroraDrift {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(-3%, 2%, 0) scale(1.08); }
        }
        .hero-aurora {
          background:
            radial-gradient(40% 50% at 20% 30%, rgba(56, 189, 248, 0.10), transparent 70%),
            radial-gradient(45% 45% at 85% 70%, rgba(59, 130, 246, 0.09), transparent 70%),
            radial-gradient(35% 40% at 50% 50%, rgba(99, 102, 241, 0.07), transparent 70%);
          animation: auroraDrift 18s ease-in-out infinite;
          filter: blur(40px);
        }
        .hero-glow {
          background:
            radial-gradient(circle at 78% 28%, rgba(56, 189, 248, 0.14), transparent 45%),
            radial-gradient(circle at 18% 82%, rgba(59, 130, 246, 0.10), transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.07), transparent 55%);
          filter: blur(2px);
        }
        @keyframes detailFade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .skill-detail { animation: detailFade 0.3s ease-out; }

        .hero-grain {
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        input:-webkit-autofill,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #09090b inset !important;
          -webkit-text-fill-color: #fff !important;
        }

        /* ── About / commit-log section ── */
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .cursor-blink::after {
          content: '▋';
          margin-left: 2px;
          animation: cursorBlink 1s step-start infinite;
          color: #4ade80;
        }

        @keyframes commitReveal {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .commit-row {
          opacity: 0;
          animation: commitReveal 0.4s ease-out forwards;
        }
        .commit-row:nth-child(1)  { animation-delay: 0.1s; }
        .commit-row:nth-child(2)  { animation-delay: 0.3s; }
        .commit-row:nth-child(3)  { animation-delay: 0.5s; }
        .commit-row:nth-child(4)  { animation-delay: 0.7s; }
        .commit-row:nth-child(5)  { animation-delay: 0.9s; }

        /* ── Objective section ── */
        @keyframes lineIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .obj-line {
          opacity: 0;
          animation: lineIn 0.35s ease-out forwards;
        }
        .obj-line:nth-child(1)  { animation-delay: 0.05s; }
        .obj-line:nth-child(2)  { animation-delay: 0.10s; }
        .obj-line:nth-child(3)  { animation-delay: 0.15s; }
        .obj-line:nth-child(4)  { animation-delay: 0.20s; }
        .obj-line:nth-child(5)  { animation-delay: 0.25s; }
        .obj-line:nth-child(6)  { animation-delay: 0.30s; }
        .obj-line:nth-child(7)  { animation-delay: 0.35s; }
        .obj-line:nth-child(8)  { animation-delay: 0.40s; }
        .obj-line:nth-child(9)  { animation-delay: 0.45s; }
        .obj-line:nth-child(10) { animation-delay: 0.50s; }
        .obj-line:nth-child(11) { animation-delay: 0.55s; }
        .obj-line:nth-child(12) { animation-delay: 0.60s; }
        .obj-line:nth-child(13) { animation-delay: 0.65s; }
        .obj-line:nth-child(14) { animation-delay: 0.70s; }
        .obj-line:nth-child(15) { animation-delay: 0.75s; }
        .obj-line:nth-child(16) { animation-delay: 0.80s; }
        .obj-line:nth-child(17) { animation-delay: 0.85s; }
        .obj-line:nth-child(18) { animation-delay: 0.90s; }
        .obj-line:nth-child(19) { animation-delay: 0.95s; }
        .obj-line:nth-child(20) { animation-delay: 1.00s; }

        /* Contribution heatmap — colours set server-side, no filter */
        .github-contrib-chart {
          width: 100%;
          overflow-x: auto;
        }
        .github-contrib-chart svg {
          display: block !important;
          width: 100% !important;
          min-width: 480px;
          height: auto !important;
        }
      `}</style>

      <Navbar />
      <Hero />
      <Stats />
      <Objective />
      <About />
      <Experience />
      <Skills />
      <Work />
      <GitGraph />
      <Contact />
    </div>
  );
}
