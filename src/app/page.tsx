"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Code, Database, Zap, Palette, Server, Star,
  HardDrive, ArrowRight, CheckCircle2, Clock,
} from "lucide-react";

/* ─── MODULE DATA ────────────────────────────────────────────────── */
interface Module {
  href: string;
  label: string;
  num: string;
  tag: string;
  description: string;
  accent: string;
  icon: React.ElementType;
  weeks: string;
  lessons: number;
}

const modules: Module[] = [
  {
    href: "/lessons/html",
    num: "01",
    label: "HTML5 Essentials",
    tag: "Foundation",
    description: "Master semantic structure, forms, accessibility, and the building blocks every web page needs.",
    accent: "blue",
    icon: Code,
    weeks: "Week 1",
    lessons: 12,
  },
  {
    href: "/lessons/css",
    num: "02",
    label: "CSS Mastery",
    tag: "Styling",
    description: "Make it beautiful. Flexbox, Grid, animations, media queries, and modern design systems.",
    accent: "purple",
    icon: Palette,
    weeks: "Weeks 2–3",
    lessons: 16,
  },
  {
    href: "/lessons/js",
    num: "03",
    label: "JavaScript",
    tag: "Interactivity",
    description: "Bring pages to life. Variables, DOM, async/await, and the full power of ES6+ syntax.",
    accent: "yellow",
    icon: Zap,
    weeks: "Weeks 4–6",
    lessons: 24,
  },
  {
    href: "/lessons/react",
    num: "04",
    label: "React Mastery",
    tag: "Components",
    description: "Modern professional UI. Components, props, state, hooks, context, and the ecosystem.",
    accent: "green",
    icon: BookOpen,
    weeks: "Weeks 7–10",
    lessons: 37,
  },
  {
    href: "/lessons/nextjs",
    num: "05",
    label: "Next.js 15",
    tag: "Optional",
    description: "Server Components, App Router, Server Actions, and full-stack architecture. (Overview module)",
    accent: "rose",
    icon: Server,
    weeks: "Weeks 11–12",
    lessons: 13,
  },
  {
    href: "/lessons/backend-db",
    num: "06",
    label: "PHP & Laravel",
    tag: "Backend",
    description: "PHP fundamentals, Laravel framework, Eloquent ORM, Sanctum auth, and production deployment.",
    accent: "emerald",
    icon: Server,
    weeks: "Weeks 13–14",
    lessons: 31,
  },
  {
    href: "/lessons/db",
    num: "07",
    label: "MongoDB & Mongoose",
    tag: "Database",
    description: "Atlas, schemas, CRUD, aggregation pipelines, references, indexing, and NoSQL architecture.",
    accent: "teal",
    icon: HardDrive,
    weeks: "Weeks 15–16",
    lessons: 35,
  },
];

/* ─── ACCENT MAP ─────────────────────────────────────────────────── */
const accentMap: Record<string, {
  border: string; bg: string; icon: string; tag: string;
  glow: string; bar: string;
}> = {
  blue:    { border: "hover:border-blue-500/40",    bg: "bg-blue-500/15",    icon: "text-blue-400",    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",    glow: "rgba(59,130,246,0.12)",  bar: "#3b82f6" },
  purple:  { border: "hover:border-purple-500/40",  bg: "bg-purple-500/15",  icon: "text-purple-400",  tag: "bg-purple-500/10 text-purple-400 border-purple-500/20",glow: "rgba(168,85,247,0.12)", bar: "#a855f7" },
  yellow:  { border: "hover:border-yellow-400/40",  bg: "bg-yellow-400/15",  icon: "text-yellow-400",  tag: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20", glow: "rgba(250,204,21,0.12)", bar: "#facc15" },
  green:   { border: "hover:border-green-500/40",   bg: "bg-green-500/15",   icon: "text-green-400",   tag: "bg-green-500/10 text-green-400 border-green-500/20",   glow: "rgba(34,197,94,0.12)",  bar: "#22c55e" },
  rose:    { border: "hover:border-rose-500/40",    bg: "bg-rose-500/15",    icon: "text-rose-400",    tag: "bg-rose-500/10 text-rose-400 border-rose-500/20",      glow: "rgba(244,63,94,0.12)",  bar: "#f43f5e" },
  emerald: { border: "hover:border-emerald-500/40", bg: "bg-emerald-500/15", icon: "text-emerald-400", tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",glow:"rgba(16,185,129,0.12)",bar:"#10b981" },
  teal:    { border: "hover:border-teal-500/40",    bg: "bg-teal-500/15",    icon: "text-teal-400",    tag: "bg-teal-500/10 text-teal-400 border-teal-500/20",      glow: "rgba(20,184,166,0.12)", bar: "#14b8a6" },
};

const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0);

/* ─── ANIMATION VARIANTS ─────────────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 20 } },
};

/* ─── MODULE CARD ────────────────────────────────────────────────── */
function ModuleCard({ mod, idx }: { mod: Module; idx: number }) {
  const a = accentMap[mod.accent];
  const Icon = mod.icon;

  return (
    <motion.div variants={item}>
      <Link href={mod.href} className="group block h-full">
        <div
          className={`relative h-full flex flex-col p-7 rounded-3xl bg-white/[0.03] border border-white/8 ${a.border} transition-all duration-400 overflow-hidden hover:-translate-y-1`}
          style={{ transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s' }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 80% 80%, ${a.glow} 0%, transparent 70%)` }}
          />

          {/* Top row */}
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div className={`w-12 h-12 rounded-2xl ${a.bg} border border-white/8 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300`}>
              <Icon className={`w-6 h-6 ${a.icon}`} />
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">{mod.weeks}</div>
              <div className="text-[10px] font-medium text-white/30 mt-0.5">{mod.lessons} slides</div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${a.tag}`}>
                {mod.tag}
              </span>
              <span className="text-[10px] font-black text-white/20 font-mono">{mod.num}</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-white leading-tight">{mod.label}</h3>
            <p className="text-sm text-white/35 font-light leading-relaxed">{mod.description}</p>
          </div>

          {/* CTA */}
          <div className={`mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest ${a.icon} relative z-10 group-hover:gap-3 transition-all duration-300`}>
            Begin Module
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          {/* Bottom accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${a.bar}, transparent)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── STAT PILL ──────────────────────────────────────────────────── */
function StatPill({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</span>
      <span className={`text-sm font-bold ${color ?? 'text-white/50'}`}>{value}</span>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div
      className="min-h-screen bg-[#080c14] text-white selection:bg-blue-500/30 overflow-x-hidden"
      style={{ fontFamily: "'Inter','DM Sans',system-ui,sans-serif" }}
    >
      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-blue-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/8 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="mb-24 max-w-3xl space-y-7"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" />
            Modern Full-Stack Roadmap
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            The Path to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400">
              Mastery.
            </span>
          </h1>

          <p className="text-lg text-white/35 leading-relaxed font-light max-w-2xl">
            A precision-engineered curriculum designed for a{" "}
            <span className="text-white font-semibold">4-month journey</span>.
            Balanced at{" "}
            <span className="text-blue-400 font-bold">1 hour / day, Mon–Fri</span>{" "}
            to take you from curious beginner to professional engineer.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-black text-sm">
              <Zap className="w-4 h-4 fill-current" />
              {totalLessons}+ Slides
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 font-bold text-sm hover:bg-white/8 transition-colors">
              <Clock className="w-4 h-4 text-white/40" />
              16-Week Roadmap
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              {modules.length} Active Modules
            </div>
          </div>
        </motion.div>

        {/* ── MODULE GRID ── */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">
              Learning Sequence
            </h2>
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-mono text-white/20">{modules.length} modules</span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {modules.map((mod, idx) => (
              <ModuleCard key={mod.href} mod={mod} idx={idx} />
            ))}
          </motion.div>
        </div>

        {/* ── FOOTER ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-8 flex-wrap justify-center md:justify-start">
            <StatPill label="Weekly Pace" value="5 Hours / Week" />
            <div className="w-px h-8 bg-white/5 hidden md:block" />
            <StatPill label="Total Slides" value={`${totalLessons}+ Lessons`} />
            <div className="w-px h-8 bg-white/5 hidden md:block" />
            <StatPill label="Duration" value="~16 Weeks" />
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Beta Access
          </div>
        </motion.footer>

      </main>
    </div>
  );
}