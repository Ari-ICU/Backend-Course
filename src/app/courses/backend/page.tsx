"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookOpen, Code, Database, Zap, Palette, Server,
  Star, HardDrive, CheckCircle2, Clock, ArrowRight,
  ChevronRight, Layers, Globe, Terminal, GitBranch,
  MousePointer2, ArrowLeft, Search, RotateCcw, Lock,
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
  {
    href: "/courses/backend/lessons/php?chapter=intro",
    num: "01",
    label: "Intro & Environment",
    tag: "Week 1",
    description: "Get your PHP and IDE environment setup perfectly for maximum DX.",
    color: "#10b981",
    dimColor: "rgba(16,185,129,0.12)",
    icon: Code,
    weeks: "Week 1",
    lessons: 5,
    skills: ["IDE Setup", "Local Server", "echo", "Variables", "Mix HTML"],
    lessonsList: ["VS Code Tools", "PHP In HTML", "Output", "Syntax", "Basics"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=data",
    num: "02",
    label: "Data Types & Structures",
    tag: "Week 2",
    description: "Understand variables, types, operators and arrays natively in PHP.",
    color: "#6366f1",
    dimColor: "rgba(99,102,241,0.12)",
    icon: Database,
    weeks: "Week 2",
    lessons: 4,
    skills: ["Var Types", "Math Logic", "Arrays", "Assoc Arrays", "Keys"],
    lessonsList: ["Dynamic Types", "Operators", "Indexes", "Dictionaries", "Nesting"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=logic",
    num: "03",
    label: "Logic & Control",
    tag: "Week 3",
    description: "Build logic trees and condition evaluations with modern precision.",
    color: "#06b6d4",
    dimColor: "rgba(6,182,212,0.12)",
    icon: Terminal,
    weeks: "Week 3",
    lessons: 4,
    skills: ["If / Else", "Strict Checks", "And / Or", "Switch", "Match"],
    lessonsList: ["Conditionals", "Comparisons", "Security Checks", "Auth Logic", "Multiple Paths"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=loops",
    num: "04",
    label: "Loops & Functions",
    tag: "Week 4",
    description: "Avoid repetition natively with loops and DRY functions.",
    color: "#f59e0b",
    dimColor: "rgba(245,158,11,0.12)",
    icon: RotateCcw,
    weeks: "Week 4",
    lessons: 4,
    skills: ["Foreach", "While", "For", "Functions", "Scope", "Returns"],
    lessonsList: ["Foreach array", "Counters", "DRY code", "Parameters", "Data Returns"]
  },
  {
    href: "/courses/backend/lessons/php?chapter=oop",
    num: "05",
    label: "OOP Foundations",
    tag: "Week 5",
    description: "Write classes, constructors and objects as the bridge to Laravel.",
    color: "#f97316",
    dimColor: "rgba(249,115,22,0.12)",
    icon: Layers,
    weeks: "Week 5",
    lessons: 4,
    skills: ["Classes", "Methods", "Public/Private", "$this", "Constructors"],
    lessonsList: ["Classes", "Object Instances", "Methods", "Init Params", "Final Exam"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=setup",
    num: "06",
    label: "Laravel Setup",
    tag: "Week 6",
    description: "Getting up and running with Composer, Artisan, and understanding the core Laravel structure.",
    color: "#f43f5e",
    dimColor: "rgba(244,63,94,0.12)",
    icon: HardDrive,
    weeks: "Week 6",
    lessons: 3,
    skills: ["Composer", "Artisan CLI", "Folder Structure", ".env Config", "Serve"],
    lessonsList: ["Install Laravel", "Project Map", "Environment Variables", "Serve App", "Storage"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=routing",
    num: "07",
    label: "Routing Engine",
    tag: "Week 7",
    description: "Connect URLs to your logic. Master static, dynamic, and grouped routes with ease.",
    color: "#eab308",
    dimColor: "rgba(234,179,8,0.12)",
    icon: Globe,
    weeks: "Week 7",
    lessons: 3,
    skills: ["Web Routes", "Closures", "Route Params", "Model Binding", "Grouping"],
    lessonsList: ["Basic Routes", "JSON Responses", "Route Parameters", "Route Groups", "Named Routes"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=controllers",
    num: "08",
    label: "Controllers & Vali",
    tag: "Week 8",
    description: "Build robust backend logic with MVC Resource controllers, Form Requests, and Validation.",
    color: "#22c55e",
    dimColor: "rgba(34,197,94,0.12)",
    icon: Search,
    weeks: "Week 8",
    lessons: 3,
    skills: ["MVC", "Make:Controller", "Requests", "JSON output", "Validation"],
    lessonsList: ["Create Controller", "Resource Routes", "Request Object", "Response Types", "Form validation"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=blade",
    num: "09",
    label: "Blade Templating",
    tag: "Week 9",
    description: "Construct scalable user interfaces using Laravel's native, powerful Blade engine.",
    color: "#14b8a6",
    dimColor: "rgba(20,184,166,0.12)",
    icon: Palette,
    weeks: "Week 9",
    lessons: 2,
    skills: ["Blade Syntax", "Directives", "Layouts", "Components", "Props"],
    lessonsList: ["Echo Variables", "Conditional Logic", "Blade Loops", "Layout Extending", "X-Components"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=eloquent",
    num: "10",
    label: "Database Eloquent",
    tag: "Week 10",
    description: "Schema as code. Dive deep into Migrations, Eloquent CRUD, and Model Relationships.",
    color: "#06b6d4",
    dimColor: "rgba(6,182,212,0.12)",
    icon: Database,
    weeks: "Week 10",
    lessons: 3,
    skills: ["Migrations", "Schema", "Eloquent", "CRUD", "Relationships"],
    lessonsList: ["Create Tables", "Foreign Keys", "Model Classes", "Eager Loading", "Mass Assignment"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=auth",
    num: "11",
    label: "Auth, API & Deploy",
    tag: "Week 11",
    description: "Secure your endpoints using Sanctum, sculpt JSON with API Resources, and deploy.",
    color: "#8b5cf6",
    dimColor: "rgba(139,92,246,0.12)",
    icon: Lock,
    weeks: "Week 11",
    lessons: 3,
    skills: ["Sanctum Auth", "Tokens", "API Resources", "Optimization", "Deployment"],
    lessonsList: ["Sanctum Setup", "Login Endpoint", "Bearer Tokens", "API Formatting", "Production Deploy"]
  },
  {
    href: "/courses/backend/lessons/laravel?chapter=queues",
    num: "12",
    label: "Queues & Async",
    tag: "Week 12",
    description: "Scale your application by moving heavy processing to the background with Queues.",
    color: "#ec4899",
    dimColor: "rgba(236,72,153,0.12)",
    icon: Zap,
    weeks: "Week 12",
    lessons: 2,
    skills: ["Job Classes", "Queue Workers", "Async Processing", "Supervisor", "Redis"],
    lessonsList: ["Why Queues?", "Database Driver", "Creating Jobs", "Dispatching", "Running Workers"]
  }];

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
              A 12-week comprehensive journey from foundations to scalable e-commerce APIs.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              { label: '60 Lessons',              Icon: BookOpen, color: '#10b981' },
              { label: '12 Weeks',                Icon: Clock,    color: '#3b82f6' },
              { label: '12 Modules',               Icon: CheckCircle2, color: '#a855f7' },
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
