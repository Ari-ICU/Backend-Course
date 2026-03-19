"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookOpen, Code, Database, Zap, Palette, Server,
  Star, HardDrive, CheckCircle2, Clock, ArrowRight,
  ChevronRight, Layers, Globe, Terminal, GitBranch,
  MousePointer2, ArrowLeft, Search, RotateCcw, Lock,
  Layout, RefreshCw, Sparkles, Rocket,
  Grid, Send, Shield, Trophy,
} from "lucide-react";

/* ─── MODULE DATA ────────────────────────────────────────────────── */
interface Module {
  href: string;
  num: string;
  label: string;
  tag: string;
  description: string;
  color: string;
  dimColor: string;
  icon: React.ElementType;
  weeks: string;
  lessons: number;
  skills: string[];
  lessonsList: string[];
}

const modules: Module[] = [
  // PURE PHP MASTERY (01-12)
  {
    href: "/courses/backend/lessons/php?chapter=intro",
    num: "01", label: "PHP Intro", tag: "Week 1",
    description: "Foundations: Setup (Herd/XAMPP), syntax, variables, and data types.",
    color: "#10b981", dimColor: "rgba(16,185,129,0.12)", icon: Code,
    weeks: "Week 1", lessons: 6, skills: ["Setup", "Syntax", "Variables", "Types"],
    lessonsList: ["Herd/XAMPP", "Echo", "Variables", "Datatypes", "Operators", "Constants"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=logic",
    num: "02", label: "Control Flow", tag: "Week 2",
    description: "Decision making: If-else, switch-case, and modern loops.",
    color: "#6366f1", dimColor: "rgba(99,102,241,0.12)", icon: Terminal,
    weeks: "Week 2", lessons: 4, skills: ["Logic", "Loops", "Branching"],
    lessonsList: ["If/Else", "Switch", "For/While", "Foreach"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=functions",
    num: "03", label: "Func & Arrays", tag: "Week 3",
    description: "Data orchestration: Custom functions and complex array structures.",
    color: "#06b6d4", dimColor: "rgba(6,182,212,0.12)", icon: Grid,
    weeks: "Week 3", lessons: 5, skills: ["DRY", "Functions", "Assoc Arrays"],
    lessonsList: ["Definitions", "Built-ins", "Assoc Arrays", "Multi-dim", "Sorting"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=forms",
    num: "04", label: "Form Handling", tag: "Week 4",
    description: "User interaction: Secure GET/POST, validation, and sanitization.",
    color: "#f59e0b", dimColor: "rgba(245,158,11,0.12)", icon: Send,
    weeks: "Week 4", lessons: 4, skills: ["POST/GET", "Validation", "Sanitary"],
    lessonsList: ["Superglobals", "Handling", "Validation", "Hygiene"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=files",
    num: "05", label: "File Handling", tag: "Week 5",
    description: "Persistence: Reading, writing, and secure file uploads.",
    color: "#f97316", dimColor: "rgba(249,115,22,0.12)", icon: HardDrive,
    weeks: "Week 5", lessons: 3, skills: ["FS Systems", "Uploads", "Logging"],
    lessonsList: ["fopen/fclose", "Reading", "Writing", "Uploads"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=state",
    num: "06", label: "State Mgmt", tag: "Week 6",
    description: "User Context: Mastering Sessions and Cookies for authentication.",
    color: "#f43f5e", dimColor: "rgba(244,63,94,0.12)", icon: Lock,
    weeks: "Week 6", lessons: 3, skills: ["Sessions", "Cookies", "Auth"],
    lessonsList: ["Session Start", "Cookie Set", "Simple Auth"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=mysql",
    num: "07", label: "MySQL & CRUD", tag: "Week 7",
    description: "Database Core: Connecting to MySQL using PDO and full CRUD.",
    color: "#3b82f6", dimColor: "rgba(59,130,246,0.12)", icon: Database,
    weeks: "Week 7", lessons: 5, skills: ["PDO", "MySQL", "Queries"],
    lessonsList: ["Connect", "PDO Methods", "Insert", "Select", "Delete"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=oop",
    num: "08", label: "OOP Foundations", tag: "Week 8",
    description: "Architecture: Classes, objects, inheritance, and traits.",
    color: "#a855f7", dimColor: "rgba(168,85,247,0.12)", icon: Layers,
    weeks: "Week 8", lessons: 5, skills: ["Classes", "Inheritance", "Interfaces"],
    lessonsList: ["Classes", "Constructors", "Inheritance", "Traits", "Interfaces"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=security",
    num: "09", label: "Security Ops", tag: "Week 9",
    description: "Defensive Coding: Preventing SQLi, XSS, and CSRF attacks.",
    color: "#ec4899", dimColor: "rgba(236,72,153,0.12)", icon: Shield,
    weeks: "Week 9", lessons: 3, skills: ["Prepared Stmt", "Hashing", "XSS Env"],
    lessonsList: ["Protect Logic", "Hasing PW", "Input Clean"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=advanced",
    num: "10", label: "Advanced PHP", tag: "Week 10",
    description: "Beyond Basics: Regex, AJAX, JSON, and Exception handling.",
    color: "#14b8a6", dimColor: "rgba(20,184,166,0.12)", icon: RefreshCw,
    weeks: "Week 10", lessons: 4, skills: ["AJAX", "JSON", "Exceptions"],
    lessonsList: ["Regex", "AJAX Fetch", "API Logic", "Try/Catch"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=mvc",
    num: "11", label: "MVC Patterns", tag: "Week 11",
    description: "Structured Apps: Transitioning to Model-View-Controller.",
    color: "#f97316", dimColor: "rgba(249,115,22,0.12)", icon: Layout,
    weeks: "Week 11", lessons: 3, skills: ["MVC", "Router", "Logic Separation"],
    lessonsList: ["Patterns", "Architecture", "Framwork Prep"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=project",
    num: "12", label: "Project Lab", tag: "Week 12",
    description: "Capestone: Building a full-stack PHP/MySQL application.",
    color: "#10b981", dimColor: "rgba(16,185,129,0.12)", icon: Trophy,
    weeks: "Week 12", lessons: 5, skills: ["Portfolio", "Systems", "Production"],
    lessonsList: ["Project Init", "DB Design", "UI Linking", "Go Live"]
  },

  // LARAVEL MASTERY (13-23)
  {
    href: "/courses/backend/lessons/laravel?chapter=setup",
    num: "13", label: "Laravel Setup", tag: "Week 13",
    description: "Ecosystem: Herd, Sail, Composer, and directory structure.",
    color: "#f43f5e", dimColor: "rgba(244,63,94,0.12)", icon: HardDrive,
    weeks: "Week 13", lessons: 3, skills: ["Herd/Sail", "Artisan"],
    lessonsList: ["Install", "Structure", "Config"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=routing",
    num: "14", label: "Routing & Ctrl", tag: "Week 14",
    description: "Handling requests, URL parameters, and controller logic.",
    color: "#f97316", dimColor: "rgba(249,115,22,0.12)", icon: Globe,
    weeks: "Week 14", lessons: 3, skills: ["Routes", "Controllers"],
    lessonsList: ["Routing", "Requests", "Params"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=blade",
    num: "15", label: "Blade Engine", tag: "Week 15",
    description: "Layouts, components, and template inheritance logic.",
    color: "#22c55e", dimColor: "rgba(34,197,94,0.12)", icon: Layout,
    weeks: "Week 15", lessons: 2, skills: ["Directives", "Inheritance"],
    lessonsList: ["Syntax", "Components"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=database",
    num: "16", label: "DB & Eloquent", tag: "Week 16",
    description: "Migrations, models, seeding, and DB relationships.",
    color: "#06b6d4", dimColor: "rgba(6,182,212,0.12)", icon: Database,
    weeks: "Week 16", lessons: 3, skills: ["Migrations", "Eloquent"],
    lessonsList: ["Schema", "ORM", "Relates"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=forms",
    num: "17", label: "Forms & Vali", tag: "Week 17",
    description: "Secure data submissions and validation logic.",
    color: "#eab308", dimColor: "rgba(234,179,8,0.12)", icon: Search,
    weeks: "Week 17", lessons: 3, skills: ["CSRF", "Validation"],
    lessonsList: ["POST", "Rules", "Old Data"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=auth",
    num: "18", label: "Auth & Security", tag: "Week 18",
    description: "Logins, Hashing, Middleware, and Authorization.",
    color: "#a855f7", dimColor: "rgba(168,85,247,0.12)", icon: Lock,
    weeks: "Week 18", lessons: 3, skills: ["Breeze", "Gates"],
    lessonsList: ["Breeze", "Auth", "Access"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=crud",
    num: "19", label: "CRUD Ops", tag: "Week 19",
    description: "Building full Create, Read, Update, Delete systems.",
    color: "#ec4899", dimColor: "rgba(236,72,153,0.12)", icon: Zap,
    weeks: "Week 19", lessons: 5, skills: ["CRUD", "UI Flow"],
    lessonsList: ["Index", "Store", "Destroy"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=advanced",
    num: "20", label: "Advanced", tag: "Week 20",
    description: "Storage, sessions, caching, and background queues.",
    color: "#3b82f6", dimColor: "rgba(59,130,246,0.12)", icon: Clock,
    weeks: "Week 20", lessons: 4, skills: ["Storage", "Queues"],
    lessonsList: ["S3", "Jobs", "Cache"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=api",
    num: "21", label: "API & Sanctum", tag: "Week 21",
    description: "RESTful API development with Sanctum token auth.",
    color: "#10b981", dimColor: "rgba(16,185,129,0.12)", icon: RefreshCw,
    weeks: "Week 21", lessons: 3, skills: ["JSON", "Tokens"],
    lessonsList: ["Sanctum", "Resources"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=frontend",
    num: "22", label: "Frontend", tag: "Week 22",
    description: "Modern styling with Tailwind CSS and Vite.",
    color: "#fbbf24", dimColor: "rgba(251,191,36,0.12)", icon: Sparkles,
    weeks: "Week 22", lessons: 2, skills: ["Vite", "Tailwind"],
    lessonsList: ["Config", "Bundling"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=deploy",
    num: "23", label: "Deployment", tag: "Week 23",
    description: "Deploying applications with Forge or Cloud.",
    color: "#8b5cf6", dimColor: "rgba(139,92,246,0.12)", icon: Rocket,
    weeks: "Week 23", lessons: 2, skills: ["Forge", "CI/CD"],
    lessonsList: ["Forge", "Live"]
  }
];

const totalLessons = modules.reduce((s, m) => s + m.lessons, 0);

/* ─── MODULE CARD ────────────────────────────────────────────────── */
function ModuleCard({ mod, isLeft }: { mod: Module; isLeft: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = mod.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={mod.href} className="block">
        <div
          className="relative rounded-3xl border overflow-hidden"
          style={{
            background: hovered
              ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, ${mod.dimColor} 100%)`
              : 'rgba(255,255,255,0.02)',
            borderColor: hovered ? `${mod.color}55` : 'rgba(255,255,255,0.07)',
            boxShadow: hovered ? `0 0 40px ${mod.color}15, 0 0 0 1px ${mod.color}25` : 'none',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'all 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-400"
            style={{
              background: `linear-gradient(90deg, transparent, ${mod.color}, transparent)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border"
                  style={{ borderColor: `${mod.color}45`, background: mod.dimColor, color: mod.color }}
                >
                  {mod.num}
                </div>
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: mod.color, borderColor: `${mod.color}35`, background: `${mod.color}08` }}
                >
                  {mod.tag}
                </span>
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: mod.dimColor,
                  transform: hovered ? 'rotate(8deg) scale(1.08)' : 'rotate(0deg) scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <Icon className="w-5 h-5" style={{ color: mod.color }} />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-black tracking-tight text-white mb-1.5">{mod.label}</h3>
            <p className="text-sm text-white/30 leading-relaxed mb-4 font-light">{mod.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {mod.skills.map(skill => (
                <span
                  key={skill}
                  className="text-[9px] font-bold px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)' }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-white/20 font-mono">
                <span>{mod.weeks}</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span>{mod.lessons} lessons</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
                style={{ color: mod.color, gap: hovered ? '10px' : '6px', transition: 'gap 0.3s' }}
              >
                Start Module <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── SPINE NODE (centre column) ─────────────────────────────────── */
function SpineNode({ mod }: { mod: Module }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 240, damping: 22, delay: 0.15 }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-xs font-black"
        style={{
          borderColor: `${mod.color}50`,
          background: `${mod.color}10`,
          color: mod.color,
          boxShadow: `0 0 20px ${mod.color}20`,
        }}
      >
        {mod.num}
      </div>
    </motion.div>
  );
}

/* ─── SVG CONNECTOR ──────────────────────────────────────────────── */
function Connector({ from, to, toRight }: { from: string; to: string; toRight: boolean }) {
  return (
    <div className="flex justify-center h-12 items-center">
      <svg width="320" height="48" viewBox="0 0 320 48" fill="none">
        <defs>
          <linearGradient id={`cg-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={from} stopOpacity="0.5" />
            <stop offset="100%" stopColor={to} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {toRight ? (
          <>
            <path
              d="M 40 8 Q 160 8 160 24 Q 160 40 280 40"
              stroke={`url(#cg-${from}-${to})`}
              strokeWidth="1.5"
              strokeDasharray="7 5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="280" cy="40" r="3" fill={to} opacity="0.7" />
          </>
        ) : (
          <>
            <path
              d="M 280 8 Q 160 8 160 24 Q 160 40 40 40"
              stroke={`url(#cg-${from}-${to})`}
              strokeWidth="1.5"
              strokeDasharray="7 5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="40" cy="40" r="3" fill={to} opacity="0.7" />
          </>
        )}
      </svg>
    </div>
  );
}

export default function BackendRoadmap() {
  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-emerald-500/25 overflow-x-hidden">
      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-15%] w-[55%] h-[55%] bg-emerald-700/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-blue-700/5 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <main className="max-w-5xl mx-auto px-6 py-20 md:py-28 relative z-10">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Specialties
        </Link>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
          className="mb-20 space-y-7"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/6 text-emerald-400 text-[10px] font-black uppercase tracking-[0.22em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Backend Engineer Roadmap · 3-Month Mastery
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.86] italic">
              Roadmap to be a Backend Engineer
              <br />
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.12)', color: 'transparent' }}>with PHP & Laravel</span>
            </h1>
            <p className="text-base text-white/28 leading-relaxed max-w-xl font-light">
              A 23-week comprehensive journey from foundations to scalable e-commerce APIs.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              { label: '60 Lessons',              Icon: BookOpen, color: '#10b981' },
              { label: '23 Weeks',                Icon: Clock,    color: '#3b82f6' },
              { label: '23 Modules',               Icon: CheckCircle2, color: '#a855f7' },
              { label: 'PHP + Laravel',           Icon: Terminal, color: '#fb923c' },
            ].map(s => (
              <div
                key={s.label}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold"
                style={{
                  borderColor: `${s.color}22`,
                  background: `${s.color}07`,
                  color: `${s.color}bb`,
                }}
              >
                <s.Icon className="w-3.5 h-3.5" />
                {s.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── ZIGZAG ROADMAP ── */}
        <div className="relative max-w-4xl mx-auto mt-20">
          <div className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 hidden md:block pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 8%, rgba(255,255,255,0.05) 92%, transparent)' }} />

          <div className="space-y-0">
            {modules.map((mod, i) => {
              const isLeft = i % 2 === 0;
              const nextMod = modules[i + 1];

              return (
                <div key={mod.num}>
                  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-6 items-center">
                    <div>{isLeft ? <ModuleCard mod={mod} isLeft={true} /> : null}</div>
                    <div className="hidden md:flex justify-center"><SpineNode mod={mod} /></div>
                    <div>{!isLeft ? <ModuleCard mod={mod} isLeft={false} /> : null}</div>
                    <div className="md:hidden col-span-3"><ModuleCard mod={mod} isLeft={true} /></div>
                  </div>
                  {nextMod && (
                    <div className="hidden md:block">
                      <Connector from={mod.color} to={nextMod.color} toRight={isLeft} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── PROJECTS SECTION ── */}
        <div className="mt-40 max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 px-4 py-2 rounded-full border border-emerald-500/15 bg-emerald-500/5">
              Practical Application
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter text-center max-w-2xl leading-[1.1]">
              Common Project-Based Learning
            </h2>
            <p className="text-white/30 text-center mt-6 text-lg font-light max-w-xl">
              Apply your Laravel skills by building three production-ready industry projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "CMS Engine", desc: "Building a Content Management System with full versioning and multi-user roles.", icon: Layout, accent: "#10b981" },
              { title: "Job Platform", desc: "Developing a Job Board or Portfolio platform with filtering and search.", icon: Search, accent: "#3b82f6" },
              { title: "RESTful API", desc: "Creating a secure REST API for a mobile application with Sanctum auth.", icon: RefreshCw, accent: "#a855f7" }
            ].map((proj, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/10" style={{ background: `${proj.accent}12` }}>
                    <proj.icon className="w-6 h-6" style={{ color: proj.accent }} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 tracking-tight">{proj.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed font-light">{proj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-black text-white/18 uppercase tracking-[0.2em]">Format</span>
              <span className="text-sm font-bold text-white/38">Interactive Masterclass</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-black text-white/18 uppercase tracking-[0.2em]">Level</span>
              <span className="text-sm font-bold text-white/38">Beginner to Senior</span>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Course Complete Verification
          </div>
        </footer>
      </main>
    </div>
  );
}
