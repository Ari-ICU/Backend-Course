"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, CheckCircle, XCircle,
  Braces, Cpu, Network, BookOpen, HelpCircle, GitCompare, ListOrdered,
  Code2, Terminal, Play, Layout, Settings, Eye, Sparkles,
  RotateCcw, Monitor, Shield, Database, Smartphone, ArrowLeft
} from 'lucide-react';
import BackendInteractiveWorkspace from './backend-interactive-workspace';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DiagramNode { label: string; desc: string; color: string; }
export interface QuizOption  { text: string; correct: boolean; explanation: string; }
export interface CompareItem { name: string; badge?: string; badgeColor?: string; points: string[]; }
export interface TimelineStep { step: string; title: string; desc: string; color?: string; }

export interface Slide {
  title: string;
  subtitle: string;
  content: string;
  type: 'concept' | 'code' | 'diagram' | 'hero' | 'quiz' | 'compare' | 'timeline';
  icon: React.ElementType;
  codeSnippet?: string;
  language?: 'php' | 'ts' | 'js' | 'bash';
  codeFileName?: string;
  htmlSnippet?: string;
  cssSnippet?: string;
  syntax?: string;
  id?: string;
  keyPoints?: string[];
  diagramNodes?: DiagramNode[];
  question?: string;
  options?: QuizOption[];
  callout?: string;
  compareItems?: CompareItem[];
  timelineSteps?: TimelineStep[];
  accent?: string;
}

// ─── Syntax highlighter ───────────────────────────────────────────────────────
function highlight(line: string): React.ReactNode[] {
  const rules: { regex: RegExp; cls: string }[] = [
    { regex: /(#\[.*?\])/g,                                                                        cls: 'h-attr' },
    { regex: /(\/\/.*|#(?!\[).*|\/\*[\s\S]*?\*\/)/g,                                              cls: 'h-comment' },
    { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,                         cls: 'tok-value' },
    { regex: /\b(declare|strict_types|namespace|use|class|interface|trait|enum|abstract|final|readonly|extends|implements|new|return|fn|function|match|throw|try|catch|finally|if|else|elseif|foreach|for|while|echo|print|yield|static|public|protected|private|const|case|default|break|continue|null|true|false|async|await|import|from|export)\b/g, cls: 'h-kw' },
    { regex: /\b(string|int|float|bool|array|void|never|mixed|self|parent|iterable|callable|object)\b/g, cls: 'h-type' },
    { regex: /(\$[a-zA-Z_][a-zA-Z0-9_]*)/g,                                                       cls: 'h-var' },
    { regex: /\b(\d+(\.\d+)?)\b/g,                                                                cls: 'h-num' },
    { regex: /([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,                                               cls: 'h-fn' },
    { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g,                                                         cls: 'h-class' },
  ];
  type Seg = { s: number; e: number; cls: string };
  const segs: Seg[] = [];
  for (const { regex, cls } of rules) {
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(line)) !== null) {
      const s = m.index, e = m.index + m[0].length;
      if (!segs.some(x => s < x.e && e > x.s)) segs.push({ s, e, cls });
    }
  }
  segs.sort((a, b) => a.s - b.s);
  const out: React.ReactNode[] = [];
  let cur = 0;
  for (const { s, e, cls } of segs) {
    if (s > cur) out.push(line.slice(cur, s));
    out.push(<span key={s} className={cls}>{line.slice(s, e)}</span>);
    cur = e;
  }
  if (cur < line.length) out.push(line.slice(cur));
  return out;
}

// ─── Components ───────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<string, React.ElementType> = {
  concept: BookOpen, code: Code2, diagram: Network,
  hero: Cpu, quiz: HelpCircle, compare: GitCompare, timeline: ListOrdered,
};

function GutterLines({ count }: { count: number }) {
  return (
    <div className="t-gutter">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="t-ln">{i + 1}</div>
      ))}
    </div>
  );
}

// ─── Shell Component ─────────────────────────────────────────────────────────

export default function BackendGenericSlides({
  lessonTitle = 'Backend Engineering',
  slides = [],
}: {
  lessonTitle?: string;
  slides?: Slide[];
}) {
  const [cur, setCur] = useState(0);
  const [showKey, setShowKey] = useState(false);
  const [codes, setCodes] = useState<string[]>(slides.map(s => s.codeSnippet || ''));
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [dir, setDir] = useState(1);

  useEffect(() => {
    setCodes(slides.map(s => s.codeSnippet || ''));
  }, [slides]);

  const slide = slides[cur];
  const accent = slide?.accent || (slide?.type === 'hero' ? '#f59e0b' : slide?.type === 'code' ? '#60a5fa' : slide?.type === 'quiz' ? '#f472b6' : '#8b5cf6');

  const goTo = useCallback((idx: number) => {
    setDir(idx > cur ? 1 : -1);
    setCur(idx);
    setViewMode('visual');
  }, [cur]);

  const next = () => cur < slides.length - 1 && goTo(cur + 1);
  const prev = () => cur > 0 && goTo(cur - 1);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { next(); setShowKey(true); setTimeout(() => setShowKey(false), 800); }
      if (e.key === 'ArrowLeft')  { prev(); setShowKey(true); setTimeout(() => setShowKey(false), 800); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [cur, slides.length]);

  if (!slides.length) return null;

  const currentCode = codes[cur] || '';
  const updateCode = (val: string) => {
    const nextCodeArr = [...codes];
    nextCodeArr[cur] = val;
    setCodes(nextCodeArr);
  };

  const progress = ((cur + 1) / slides.length) * 100;
  const TypeIcon = TYPE_ICONS[slide.type] || BookOpen;

  return (
    <main
      className="min-h-screen text-white flex flex-col overflow-hidden relative"
      style={{ background: '#080c14', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{CSS}</style>

      {/* Dynamic Glows inspired by HTML lesson */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${accent}15 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${accent}08 0%, transparent 50%)`,
        }}
      />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 70%)' }} />

      {/* ── HEADER ── */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/8 bg-black/40 backdrop-blur-2xl flex-none">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20" style={{ background: `${accent}15` }}>
            <TypeIcon className="w-5 h-5" style={{ color: accent }} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">Backend Masterclass</p>
            <p className="text-sm font-bold text-white tracking-tight">{lessonTitle}</p>
          </div>
        </div>

        <div className="flex-1 mx-12 hidden md:block max-w-xl">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ background: `linear-gradient(90deg, ${accent}, ${accent}aa)` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black px-3 py-1.5 rounded-full border bg-black/20 backdrop-blur-sm" style={{ color: accent, borderColor: `${accent}40` }}>
            {slide.type.toUpperCase()}
          </span>
          <span className="text-xs font-mono font-bold text-zinc-500 tabular-nums">{cur + 1}<span className="text-zinc-800"> / {slides.length}</span></span>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="relative z-20 flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
        {/* Left Panel: Content (Balanced 50/50 split) */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={cur}
            custom={dir}
            initial={{ x: dir * 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="flex-none lg:w-1/2 flex flex-col justify-between p-8 lg:p-14 lg:border-r border-white/8 overflow-y-auto bg-black/10"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="text-5xl font-black text-white/5 font-mono leading-none flex-none">
                  {String(cur + 1).padStart(2, '0')}
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] text-white tracking-tighter">{slide.title}</h1>
                  <p className="text-xl text-white font-bold mt-2 leading-snug">{slide.subtitle}</p>
                </div>
              </div>

              <div className="w-16 h-1 rounded-full" style={{ background: accent }} />

              <div className="space-y-6">
                {slide.syntax && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal size={12} className="text-emerald-400" />
                      <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">Formal Syntax Reference</span>
                    </div>
                    <code className="text-lg font-mono text-emerald-100 font-bold block leading-relaxed tracking-tight">
                      {slide.syntax}
                    </code>
                  </motion.div>
                )}
                
                <p className="text-xl lg:text-2xl text-white leading-relaxed font-medium">{slide.content}</p>
              </div>

              {slide.keyPoints && (
                <div className="space-y-5 pt-4">
                  {slide.keyPoints.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-5"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-none mt-1 shadow-sm">
                        <CheckCircle className="w-4 h-4" style={{ color: accent }} />
                      </div>
                      <p className="text-lg lg:text-xl text-white font-medium leading-relaxed">{pt}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {slide.callout && (
                <div className="p-5 rounded-2xl border flex gap-4 bg-white/[0.02]" style={{ borderColor: `${accent}20` }}>
                  <Sparkles className="w-6 h-6 flex-none" style={{ color: accent }} />
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">{slide.callout}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mt-12 lg:mt-0">
              <button
                onClick={prev}
                disabled={cur === 0}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 disabled:opacity-20 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="flex-1 py-4 px-6 rounded-xl font-black text-sm active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/40"
                style={{ background: accent, color: '#000' }}
              >
                {cur === slides.length - 1 ? 'RESTART MODULE' : 'NEXT SESSION'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Panel: Visual / Interactive */}
        <div className="flex-1 flex flex-col p-6 lg:p-10 overflow-hidden relative">
          <AnimatePresence mode="wait">
             <motion.div
                key={`${slide.type}-${cur}`}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col overflow-hidden"
             >
                <RightPanel slide={slide} accent={accent} code={currentCode} onUpdateCode={updateCode} />
             </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Nav Dots */}
      <footer className="relative z-40 flex justify-center items-center gap-2.5 py-4 border-t border-white/8 bg-black/40 backdrop-blur-2xl flex-none">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={s.title}
            className="transition-all duration-500 rounded-full cursor-pointer hover:bg-white/40"
            style={{
              width: i === cur ? 32 : 10,
              height: 10,
              background: i === cur ? accent : 'rgba(255,255,255,0.15)',
              boxShadow: i === cur ? `0 0 15px ${accent}40` : 'none'
            }}
          />
        ))}
      </footer>

      {/* Keyboard Hint */}
      <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-2xl bg-black border border-white/10 text-zinc-500 text-xs font-bold transition-all duration-300 pointer-events-none ${showKey ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <kbd className="px-2 py-1 bg-white/10 rounded border border-white/10 text-white">←</kbd>
        <kbd className="px-2 py-1 bg-white/10 rounded border border-white/10 text-white">→</kbd>
        <span>Use arrow keys to navigate</span>
      </div>
    </main>
  );
}

// ─── Sub-components for Right Panel ─────────────────────────────────────────

function RightPanel({ slide, accent, code, onUpdateCode }: { slide: Slide; accent: string; code: string; onUpdateCode: (v: string) => void }) {
  switch (slide.type) {
    case 'hero':
      return <HeroVisual icon={slide.icon} accent={accent} />;
    case 'code':
      return (
        <BackendInteractiveWorkspace
          code={code}
          onUpdateCode={onUpdateCode}
          language={slide.language}
          fileName={slide.codeFileName}
          htmlSnippet={slide.htmlSnippet}
          cssSnippet={slide.cssSnippet}
          accent={accent}
        />
      );
    case 'diagram':
      return <DiagramVisual nodes={slide.diagramNodes || []} accent={accent} />;
    case 'quiz':
      return <QuizVisual question={slide.question || slide.title} options={slide.options || []} accent={accent} />;
    case 'compare':
      return <CompareVisual items={slide.compareItems || []} accent={accent} />;
    case 'timeline':
      return <TimelineVisual steps={slide.timelineSteps || []} accent={accent} />;
    default:
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="w-40 h-40 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center mb-10 relative z-10 backdrop-blur-3xl shadow-2xl">
              <slide.icon size={80} strokeWidth={1} style={{ color: accent }} className="opacity-80" />
              <div className="absolute inset-0 rounded-full bg-white/5 animate-ping opacity-20 pointer-events-none" />
           </div>
           <h3 className="text-3xl font-black text-white/50 mb-4 tracking-widest uppercase">{slide.type}</h3>
           <p className="text-white/30 font-medium max-w-sm leading-relaxed italic">Interactive Visualization Mode</p>
        </div>
      );
  }
}

function HeroVisual({ icon: Icon = Cpu, accent }: { icon?: React.ElementType; accent: string }) {
  return (
    <div className="flex-1 flex items-center justify-center relative">
       <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-[400px] h-[400px] rounded-full border border-white/5 animate-pulse" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/10" />
       </div>
       <motion.div
         initial={{ scale: 0.5, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="w-48 h-48 rounded-[40px] bg-black/40 border border-white/10 backdrop-blur-2xl flex items-center justify-center relative z-10 shadow-3xl shadow-black"
       >
         <Icon className="w-24 h-24" style={{ color: accent }} strokeWidth={1} />
       </motion.div>
    </div>
  );
}

function CodeVisual({ slide, accent, code, onUpdateCode }: { slide: Slide; accent: string; code: string; onUpdateCode: (v: string) => void }) {
  const [ran, setRan] = useState(false);
  const [view, setView] = useState<'code' | 'html' | 'css' | 'output' | 'preview'>(slide.htmlSnippet ? 'preview' : 'code');
  const [output, setOutput] = useState<{ lines: string[]; error: boolean }>({ lines: [], error: false });
  const [html, setHtml] = useState(slide.htmlSnippet || '');
  const [css, setCss] = useState(slide.cssSnippet || '');

  const lines = view === 'code' ? code.split('\n') : (view === 'html' ? html.split('\n') : css.split('\n'));
  const lang = slide.language || 'php';

  const runCode = () => {
    setRan(true);
    setView('output');
    // ... same simulator logic as before ...

    if (lang === 'php') {
      const logs: string[] = [];
      const cleanCode = code.replace(/<\?php|\?>/g, '').trim();
      const lines = cleanCode.split('\n');
      const vars: Record<string, any> = {};

      try {
        let i = 0;
        let skipBranch = false;
        let matchedBranch = false;

        while (i < lines.length) {
          const l = lines[i].trim();
          if (!l || l.startsWith('//') || l.startsWith('#') || l.startsWith('/*')) { i++; continue; }

          // Ternary Assignment: $x = $a ? 'y' : 'z';
          const ternaryMatch = l.match(/^\$([a-zA-Z_]+)\s*=\s*(.+?)\s*\?\s*(.+?)\s*:\s*(.+?)\s*;$/);
          if (ternaryMatch) {
            const [_, name, condStr, val1, val2] = ternaryMatch;
            let check = condStr.trim();
            Object.entries(vars).forEach(([v, val]) => check = check.replace(new RegExp(`\\$${v}\\b`, 'g'), JSON.stringify(val)));
            // eslint-disable-next-line no-eval
            vars[name] = eval(check) ? val1.trim().replace(/["']/g, '') : val2.trim().replace(/["']/g, '');
            i++; continue;
          }

          // Array assignment
          const arrMatch = l.match(/^\$([a-zA-Z_]+)\s*=\s*\[(.*)\];$/);
          if (arrMatch) {
            const arrStr = arrMatch[2].trim();
            if (arrStr.includes('=>')) {
              const obj: any = {};
              arrStr.split(',').forEach(p => { const [k,v] = p.split('=>').map(s => s.trim().replace(/["']/g, '')); if (k) obj[k]=v; });
              vars[arrMatch[1]] = obj;
            } else vars[arrMatch[1]] = arrStr.split(',').map(s => s.trim().replace(/["']/g, ''));
            i++; continue;
          }

          // Variable assignment (including Booleans)
          const assignMatch = l.match(/^\$([a-zA-Z_]+)\s*=\s*(.+);$/);
          if (assignMatch) {
            let val = assignMatch[2].trim().replace(/;$/, '');
            if (val === 'true') vars[assignMatch[1]] = true;
            else if (val === 'false') vars[assignMatch[1]] = false;
            else if (!isNaN(Number(val))) vars[assignMatch[1]] = Number(val);
            else vars[assignMatch[1]] = val.replace(/["']/g, '');
            i++; continue;
          }

          // IF / ELSE IF / ELSE logic
          const ifMatch = l.match(/^(if|elseif)\s*\((.*)\)\s*{$/);
          const elseMatch = l.match(/^else\s*{$/);

          if (ifMatch || elseMatch) {
            let shouldExecute = false;
            if (ifMatch) {
              if (matchedBranch) shouldExecute = false;
              else {
                let check = ifMatch[2].trim();
                Object.entries(vars).forEach(([v, val]) => check = check.replace(new RegExp(`\\$${v}\\b`, 'g'), JSON.stringify(val)));
                // eslint-disable-next-line no-eval
                try { shouldExecute = !!eval(check); } catch { shouldExecute = false; }
                if (shouldExecute) matchedBranch = true;
              }
            } else { // else
              shouldExecute = !matchedBranch;
            }

            // find block end
            let body: string[] = [], j = i + 1, depth = 1;
            while (j < lines.length) {
              const bl = lines[j].trim();
              if (bl.endsWith('{')) depth++;
              if (bl.startsWith('}')) depth--;
              if (depth === 0) break;
              body.push(lines[j]); j++;
            }

            if (shouldExecute) {
              body.forEach(bLine => {
                const b = bLine.trim();
                const eMatch = b.match(/^(echo|print)\s+(.+);$/);
                if (eMatch) {
                  let out = eMatch[2].trim();
                  Object.entries(vars).forEach(([v, val]) => out = out.replace(new RegExp(`\\$${v}\\b`, 'g'), val));
                  logs.push(out.replace(/["']/g, '').replace(/\. /g, '').replace(/ \./g, ''));
                }
              });
            }
            i = j;
            if (l.startsWith('} else') || l.endsWith('}')) matchedBranch = false; // reset for next IF sequence if fully done
            i++; continue;
          }

          // Reset matchedBranch if we encounter a non-conditional line
          if (!l.startsWith('}')) matchedBranch = false;

          // echo / print
          const echoMatch = l.match(/^(echo|print)\s+(.+);$/);
          if (echoMatch) {
            let out = echoMatch[2].trim();
            Object.entries(vars).forEach(([v, val]) => out = out.replace(new RegExp(`\\$${v}\\b`, 'g'), val));
            logs.push(out.replace(/["']/g, '').replace(/\. /g, '').replace(/ \./g, ''));
          }
          i++;
        }
        if (logs.length === 0) logs.push("// Script executed (No output generated)");
        setOutput({ lines: logs, error: false });
      } catch (err: any) { setOutput({ lines: ["▶ PHP Parse Error: " + err.message], error: true }); }
      return;
    }

    if (lang === 'bash') {
      setOutput({
        lines: [
          `admin@server:~$ ${code.trim().split('\n')[0]}`,
          `// Command sequence acknowledged.`,
          `✓ Success`,
        ],
        error: false
      });
      return;
    }
    try {
      const logs: string[] = [];
      const mockConsole = { log: (...args: any[]) => logs.push(args.join(' ')) };
      new Function('console', code.replace(/export |import /g, ''))(mockConsole);
      setOutput({ lines: logs.length ? logs : ['✓ Executed successfully (no output)'], error: false });
    } catch (e: any) {
      setOutput({ lines: [e.message], error: true });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
       {/* High-End Tab Toolbar */}
       <div className="px-6 py-3 bg-[#161b22] border-b border-white/8 flex items-center justify-between flex-none overflow-x-auto">
          <div className="flex items-center gap-3">
             <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                <button onClick={() => setView('code')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${view === 'code' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>
                  <Code2 size={12} /> PHP
                </button>
                {slide.htmlSnippet && (
                  <button onClick={() => setView('html')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${view === 'html' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>
                    <Layout size={12} /> HTML
                  </button>
                )}
                {slide.cssSnippet && (
                  <button onClick={() => setView('css')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${view === 'css' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>
                    <Settings size={12} /> CSS
                  </button>
                )}
                <button onClick={() => setView('output')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${view === 'output' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>
                  <Terminal size={12} /> OUTPUT
                </button>
                {slide.htmlSnippet && (
                  <button onClick={() => setView('preview')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${view === 'preview' ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>
                    <Eye size={12} /> PREVIEW
                  </button>
                )}
             </div>
          </div>

          <button onClick={runCode} className="px-5 py-2 rounded-full font-black text-[10px] tracking-widest transition-all flex items-center gap-2 shadow-lg" style={{ background: accent, color: '#000' }}>
             <Play size={11} fill="currentColor" /> RUN SCRIPT
          </button>
       </div>

       <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
             {view === 'preview' ? (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white">
                   <div className="h-full w-full flex flex-col">
                      <div className="p-3 border-b border-zinc-200 flex items-center gap-2 bg-zinc-50">
                        <div className="flex gap-1.5 mr-4">
                           <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                           <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                           <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                        </div>
                        <div className="flex-1 bg-white border border-zinc-200 h-6 rounded-md text-[10px] flex items-center px-3 text-zinc-400 font-mono">
                           localhost:8000/register.php
                        </div>
                      </div>
                      <iframe
                        srcDoc={`
                          <html>
                            <head><style>${css}</style></head>
                            <body style="font-family: sans-serif; padding: 40px; color: #000;">${html}</body>
                          </html>
                        `}
                        className="flex-1 w-full border-none"
                      />
                   </div>
                </motion.div>
             ) : view === 'output' ? (
                <motion.div key="output" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-8 bg-black/20 overflow-auto scroll-smooth">
                   <div className="space-y-3">
                     {output.lines.map((l, i) => (
                       <div key={i} className="flex gap-4 group">
                         <span className="text-zinc-700 font-mono text-xs select-none w-4 text-right pt-0.5">{(i + 1)}</span>
                         <div className="font-mono text-sm tracking-tight leading-relaxed text-zinc-400 group-hover:text-emerald-400 transition-colors">
                           {l}
                         </div>
                       </div>
                     ))}
                   </div>
                </motion.div>
             ) : (
                <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex">
                   <div className="w-14 bg-black/30 border-r border-white/5 flex flex-col items-end pr-4 pt-8 select-none">
                      {lines.map((_, i: number) => <div key={i} className="text-[11px] font-mono text-zinc-700 leading-8">{i + 1}</div>)}
                   </div>
                   <div className="flex-1 relative bg-transparent">
                      <pre className="absolute inset-0 p-8 pointer-events-none font-mono text-sm leading-8 overflow-hidden whitespace-pre">
                         {lines.map((l: string, i: number) => <div key={i} className="min-h-[32px]">{highlight(l)}</div>)}
                      </pre>
                      <textarea
                        value={view === 'code' ? code : (view === 'html' ? html : css)}
                        onChange={(e) => view === 'code' ? onUpdateCode(e.target.value) : (view === 'html' ? setHtml(e.target.value) : setCss(e.target.value))}
                        className="absolute inset-0 w-full h-full p-8 bg-transparent text-transparent caret-blue-400 font-mono text-sm leading-8 outline-none resize-none overflow-auto"
                        spellCheck={false}
                        wrap="off"
                      />
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
}

function DiagramVisual({ nodes, accent }: { nodes: DiagramNode[]; accent: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/20 rounded-[40px] border border-white/5 overflow-x-auto">
       <div className="flex items-center gap-0">
          {nodes.map((node, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="w-44 p-6 rounded-3xl bg-zinc-900 border-2 border-white/5 flex flex-col gap-3 relative shadow-xl hover:border-white/20 transition-all group"
                style={{ '--accent': node.color } as any}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ background: node.color }} />
                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">LAYER {i + 1}</div>
                <div className="text-md font-black text-white">{node.label}</div>
                <div className="text-xs text-zinc-500 font-medium leading-relaxed">{node.desc}</div>
              </motion.div>
              {i < nodes.length - 1 && (
                <div className="w-12 h-0.5 bg-white/10 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-white/10" />
                </div>
              )}
            </React.Fragment>
          ))}
       </div>
    </div>
  );
}

function QuizVisual({ question, options, accent }: { question: string; options: QuizOption[]; accent: string }) {
  const [sel, setSel] = useState<number | null>(null);
  const done = sel !== null;

  return (
    <div className="flex-1 flex flex-col justify-center gap-8 max-w-2xl mx-auto px-6">
       <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
             <HelpCircle className="w-5 h-5 text-pink-400" />
          </div>
          <h3 className="text-2xl font-black text-white leading-tight">{question}</h3>
       </div>

       <div className="grid gap-3">
          {options.map((opt, i) => {
            const isSel = sel === i;
            const isCorrect = opt.correct;
            return (
              <button
                key={i}
                onClick={() => !done && setSel(i)}
                className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between text-left group active:scale-[0.98] ${
                  !done
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10'
                      : isSel
                        ? 'bg-red-500/10 border-red-500/40 text-red-400'
                        : 'opacity-30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-xs ${
                    !done ? 'bg-black/40 border-white/10 group-hover:border-white/30' : isCorrect ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-red-500/20 border-red-500/40'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-base font-bold">{opt.text}</span>
                </div>
                {done && isCorrect && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                {done && isSel && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
              </button>
            );
          })}
       </div>

       <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border flex gap-4 ${options[sel!].correct ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}
            >
               <BookOpen className="w-6 h-6 flex-none" style={{ color: options[sel!].correct ? '#10b981' : '#f43f5e' }} />
               <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                  <strong className="text-white">{options[sel!].correct ? 'Spot on!' : 'Not quite.'}</strong> {options[sel!].explanation}
               </p>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
}

function CompareVisual({ items, accent }: { items: CompareItem[]; accent: string }) {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
       <div className="grid lg:grid-cols-2 gap-6 w-full max-w-4xl">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[32px] bg-white/5 border border-white/10 overflow-hidden flex flex-col shadow-2xl"
            >
               <div className="px-8 py-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
                  <h4 className="text-xl font-black text-white tracking-tight">{item.name}</h4>
                  {item.badge && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border" style={{ background: `${item.badgeColor || '#8b5cf6'}15`, color: item.badgeColor || '#8b5cf6', borderColor: `${item.badgeColor || '#8b5cf6'}30` }}>
                      {item.badge}
                    </span>
                  )}
               </div>
               <div className="p-8 space-y-4">
                  {item.points.map((pt, j) => (
                    <div key={j} className="flex gap-4">
                       <div className="w-2 h-2 rounded-full mt-2 flex-none" style={{ background: accent }} />
                       <p className="text-base text-zinc-400 font-medium leading-relaxed">{pt}</p>
                    </div>
                  ))}
               </div>
            </motion.div>
          ))}
       </div>
    </div>
  );
}

function TimelineVisual({ steps, accent }: { steps: TimelineStep[]; accent: string }) {
  return (
    <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 overflow-y-auto">
       <div className="relative space-y-12">
          <div className="absolute left-6 top-4 bottom-4 w-1 bg-white/5 rounded-full" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-10 relative group"
            >
               <div
                 className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white relative z-10 shadow-lg transition-transform group-hover:scale-110"
                 style={{ background: step.color || accent, boxShadow: `0 8px 16px ${(step.color || accent)}40` }}
               >
                 {step.step}
               </div>
               <div className="space-y-2 pt-1 border-b border-white/5 pb-8 flex-1">
                  <h4 className="text-xl font-black text-white tracking-tight">{step.title}</h4>
                  <p className="text-base text-zinc-400 font-medium leading-relaxed max-w-lg">{step.desc}</p>
               </div>
            </motion.div>
          ))}
       </div>
    </div>
  );
}

const CSS = `
/* Premium Typography & Global Resets */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=JetBrains+Mono:wght@500&display=swap');

::selection { background: rgba(242,184,64,0.15); color: #fff; }

h1, .s-title { 
  font-family: 'Playfair Display', serif; 
  font-weight: 800; 
  letter-spacing: -0.01em; 
  cursor: default; 
  color: #fff;
}
p, div, span, label { font-family: 'Inter', sans-serif; color: #fff; }

.s-eyebrow {
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 900;
  font-size: 10px;
  color: rgba(255,255,255,0.4);
}

/* Code Editor Tokens (Matched to reference) */
.h-kw      { color: #c678dd; font-weight: 700; } /* echo, foreach... */
.h-var     { color: #e06c75; font-weight: 500; } /* $variables */
.tok-value { color: #98c379; } /* strings */
.h-num     { color: #d19a66; } /* numbers */
.h-comment { color: #5c6370; font-style: italic; }
.h-fn      { color: #61afef; } /* functions */
.h-class   { color: #e5c07b; } /* Classes */
.h-type    { color: #e5c07b; } /* types */
.h-attr    { color: #d19a66; }

/* Terminal Layout Tweaks */
.t-gutter { border-right: 1px solid rgba(255,255,255,0.05); }
.t-active-tab { background: rgba(255,255,255,0.1); color: #fff; }
.t-run-btn { background: #61afef; color: #000; font-weight: 900; }

/* Custom Scrollbars */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }

/* Glass Effects */
.glass { background: rgba(0,0,0,0.4); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }

/* Animation Utils */
.anim-float { animation: float 6s ease-in-out infinite; }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Slide Specific Layouts */
.s-code textarea { tab-size: 4; }

/* Prism-like highlight layer for textarea */
.h-layer {
  position: absolute;
  top: 0; left: 0;
  pointer-events: none;
  white-space: pre-wrap;
  word-wrap: break-word;
}
`;