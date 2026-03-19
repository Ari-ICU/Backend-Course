"use client";

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Terminal, Eye, Play, Layout, Palette,
  RotateCcw, Copy, Check, AlertTriangle, CheckCircle2,
  ChevronRight, FileCode, Globe, Maximize2,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface WorkspaceProps {
  /** PHP / JS / TS / bash source */
  code: string;
  onUpdateCode?: (v: string) => void;
  language?: 'php' | 'js' | 'ts' | 'bash';
  fileName?: string;
  /** If provided, HTML tab appears */
  htmlSnippet?: string;
  /** If provided, CSS tab appears */
  cssSnippet?: string;
  /** Accent colour for Run button */
  accent?: string;
}

type Tab = 'php' | 'html' | 'css' | 'output' | 'preview';

// ─── Syntax highlighter ───────────────────────────────────────────────────────
function tokenize(line: string, lang: string): React.ReactNode[] {
  const isHTML = lang === 'html';
  const isCSS  = lang === 'css';

  if (isHTML) {
    // minimal HTML highlighting
    const parts: { s: number; e: number; cls: string }[] = [];
    const rules = [
      { regex: /(&lt;!--[\s\S]*?--&gt;)/g, cls: 'h-comment' },
      { regex: /(&lt;\/?[a-zA-Z][a-zA-Z0-9-]*)/g, cls: 'h-tag' },
      { regex: /([a-zA-Z-]+=)/g, cls: 'h-attr-name' },
      { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, cls: 'h-str' },
      { regex: /(&gt;|&lt;|\/&gt;)/g, cls: 'h-tag' },
    ];
    const escaped = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // just do a simple regex pass on raw line
    return simpleTokenize(line, [
      { regex: /(<\/?[a-zA-Z][a-zA-Z0-9-]*)/g, cls: 'h-tag' },
      { regex: /([a-zA-Z-]+=)/g, cls: 'h-attr-name' },
      { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, cls: 'h-str' },
      { regex: /(<!--[\s\S]*?-->)/g, cls: 'h-comment' },
      { regex: /(>|<|\/?>)/g, cls: 'h-tag-bracket' },
    ]);
  }

  if (isCSS) {
    return simpleTokenize(line, [
      { regex: /(\/\*[\s\S]*?\*\/)/g, cls: 'h-comment' },
      { regex: /([.#][a-zA-Z_-][a-zA-Z0-9_-]*)/g, cls: 'h-selector' },
      { regex: /([a-zA-Z-]+)\s*(?=:)/g, cls: 'h-prop' },
      { regex: /(:[\s]*)([^;{]+)/g, cls: 'h-value' },
      { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, cls: 'h-str' },
      { regex: /(#[0-9a-fA-F]{3,8})/g, cls: 'h-color' },
      { regex: /\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms)?)\b/g, cls: 'h-num' },
    ]);
  }

  // PHP / JS / TS / bash
  return simpleTokenize(line, [
    { regex: /(#\[.*?\])/g, cls: 'h-attr' },
    { regex: /(\/\/.*|#(?!\[).*)/g, cls: 'h-comment' },
    { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, cls: 'h-str' },
    { regex: /\b(declare|strict_types|namespace|use|class|interface|trait|enum|abstract|final|readonly|extends|implements|new|return|fn|function|match|throw|try|catch|finally|if|else|elseif|foreach|for|while|echo|print|yield|static|public|protected|private|const|case|default|break|continue|null|true|false|async|await|import|from|export|const|let|var|typeof|instanceof|of|in)\b/g, cls: 'h-kw' },
    { regex: /\b(string|int|float|bool|array|void|never|mixed|self|parent|iterable|callable|object|number|boolean|any|unknown)\b/g, cls: 'h-type' },
    { regex: /(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, cls: 'h-var' },
    { regex: /\b(\d+(\.\d+)?)\b/g, cls: 'h-num' },
    { regex: /([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, cls: 'h-fn' },
    { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, cls: 'h-class' },
  ]);
}

function simpleTokenize(
  line: string,
  rules: { regex: RegExp; cls: string }[]
): React.ReactNode[] {
  const segs: { s: number; e: number; cls: string }[] = [];
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

// ─── Editor pane ─────────────────────────────────────────────────────────────
function Editor({
  value,
  onChange,
  lang,
}: {
  value: string;
  onChange: (v: string) => void;
  lang: string;
}) {
  const taRef  = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lines  = value.split('\n');

  const syncScroll = () => {
    if (taRef.current && preRef.current) {
      preRef.current.scrollTop  = taRef.current.scrollTop;
      preRef.current.scrollLeft = taRef.current.scrollLeft;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const { selectionStart: ss, selectionEnd: se } = ta;
      const next = value.slice(0, ss) + '    ' + value.slice(se);
      onChange(next);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = ss + 4; });
    }
    // auto-close brackets
    const pairs: Record<string, string> = { '{': '}', '(': ')', '[': ']', '"': '"', "'": "'" };
    if (pairs[e.key] && !e.ctrlKey && !e.metaKey) {
      const ta = e.currentTarget;
      const { selectionStart: ss, selectionEnd: se } = ta;
      if (ss === se) {
        e.preventDefault();
        const next = value.slice(0, ss) + e.key + pairs[e.key] + value.slice(se);
        onChange(next);
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = ss + 1; });
      }
    }
  };

  return (
    <div className="ed-root">
      {/* gutter */}
      <div className="ed-gutter" aria-hidden>
        {lines.map((_, i) => (
          <div key={i} className="ed-ln">{i + 1}</div>
        ))}
      </div>
      {/* inner: highlight layer + textarea */}
      <div className="ed-inner">
        <pre ref={preRef} className="ed-highlight" aria-hidden>
          {lines.map((l, i) => (
            <div key={i} className="ed-row">{tokenize(l, lang)}</div>
          ))}
          {/* extra line keeps height synced */}
          <div className="ed-row">&nbsp;</div>
        </pre>
        <textarea
          ref={taRef}
          className="ed-textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label={`${lang} editor`}
        />
      </div>
    </div>
  );
}

// ─── PHP Interpreter (best-effort simulation) ─────────────────────────────────
function runPhp(src: string): { lines: string[]; error: boolean } {
  const clean = src.replace(/<\?php/g, '').replace(/\?>/g, '').trim();
  const srcLines = clean.split('\n');
  const vars: Record<string, unknown> = {};
  const logs: string[] = [];

  const evalExpr = (expr: string): unknown => {
    expr = expr.trim().replace(/;$/, '');
    // string concat
    if (expr.includes(' . ')) {
      return expr.split(' . ').map(evalExpr).join('');
    }
    // variable
    if (expr.startsWith('$')) {
      const name = expr.slice(1).replace(/[^a-zA-Z0-9_]/g, '');
      return vars[name] ?? '';
    }
    // string literal
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    // number
    if (/^-?\d+(\.\d+)?$/.test(expr)) return parseFloat(expr);
    if (expr === 'true')  return true;
    if (expr === 'false') return false;
    if (expr === 'null')  return null;
    // array()
    if (expr.startsWith('[') || expr.startsWith('array(')) return [];
    // arithmetic
    try { return Function(`"use strict"; return (${expr})`)(); } catch { return expr; }
  };

  try {
    for (let i = 0; i < srcLines.length; i++) {
      const raw = srcLines[i];
      const l = raw.trim();
      if (!l || l.startsWith('//') || l.startsWith('#') || l.startsWith('use ') || l.startsWith('namespace ') || l.startsWith('declare(')) continue;

      // assignment: $var = expr;
      const assign = l.match(/^\$([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+?);?$/);
      if (assign) { vars[assign[1]] = evalExpr(assign[2]); continue; }

      // echo / print
      const echoM = l.match(/^(?:echo|print)\s+([\s\S]+?);?$/);
      if (echoM) {
        const result = evalExpr(echoM[1]);
        logs.push(String(result ?? ''));
        continue;
      }

      // var_dump / print_r
      const dumpM = l.match(/^(?:var_dump|print_r|var_export)\((.+?)\);?$/);
      if (dumpM) {
        const result = evalExpr(dumpM[1]);
        logs.push(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result));
        continue;
      }

      // class / function / control-flow — skip body lines
    }
    return { lines: logs.length ? logs : ['// Script executed — no output'], error: false };
  } catch (err: unknown) {
    return { lines: [(err as Error).message], error: true };
  }
}

// ─── JS / TS Runner ───────────────────────────────────────────────────────────
function runJs(src: string): { lines: string[]; error: boolean } {
  const logs: string[] = [];
  const fakeConsole = {
    log:   (...a: unknown[]) => logs.push(a.map(x => (typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x))).join(' ')),
    warn:  (...a: unknown[]) => logs.push('⚠  ' + a.join(' ')),
    error: (...a: unknown[]) => logs.push('✖  ' + a.join(' ')),
    info:  (...a: unknown[]) => logs.push('ℹ  ' + a.join(' ')),
    table: (d: unknown) => logs.push(JSON.stringify(d, null, 2)),
  };
  try {
    // strip TS annotations for eval
    const runnable = src
      .replace(/:\s*(string|number|boolean|void|any|unknown|never|null|undefined|[A-Z][A-Za-z<>\[\]|,?\s]+)\b/g, '')
      .replace(/^(import|export default|export)\s.+$/gm, '')
      .replace(/<[A-Z][A-Za-z]*(\[\])?>/g, '');
    // eslint-disable-next-line no-new-func
    new Function('console', runnable)(fakeConsole);
    return { lines: logs.length ? logs : ['✓ Ran with no output'], error: false };
  } catch (err: unknown) {
    return { lines: [(err as Error).message], error: true };
  }
}

// ─── Preview iframe builder ───────────────────────────────────────────────────
function buildPreviewDoc(html: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; margin: 0; padding: 32px; background: #fff; color: #111; line-height: 1.6; }
  ${css}
</style>
</head>
<body>${html}</body>
</html>`;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BackendInteractiveWorkspace({
  code: initialCode,
  onUpdateCode,
  language = 'php',
  fileName,
  htmlSnippet = '',
  cssSnippet = '',
  accent = '#f2b840',
}: WorkspaceProps) {
  const derivedFileName = fileName ?? `index.${language === 'ts' ? 'ts' : language === 'js' ? 'js' : language === 'bash' ? 'sh' : 'php'}`;

  const [phpCode, setPhpCode]   = useState(initialCode);
  const [html, setHtml]         = useState(htmlSnippet);
  const [css, setCss]           = useState(cssSnippet);
  const [activeTab, setActiveTab] = useState<Tab>(htmlSnippet ? 'preview' : 'php');
  const [output, setOutput]     = useState<{ lines: string[]; error: boolean } | null>(null);
  const [running, setRunning]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const hasHtml = htmlSnippet !== '' || html !== '';
  const hasCss  = cssSnippet !== '' || css !== '';

  // propagate code changes upward
  useEffect(() => { onUpdateCode?.(phpCode); }, [phpCode]);

  // re-render preview whenever html/css change
  useEffect(() => {
    if (activeTab === 'preview') setPreviewKey(k => k + 1);
  }, [html, css]);

  const run = useCallback(() => {
    setRunning(true);
    setActiveTab('output');
    setTimeout(() => {
      let result: { lines: string[]; error: boolean };
      if (language === 'php')       result = runPhp(phpCode);
      else if (language === 'bash') result = { lines: ['// Bash runs server-side — preview only.'], error: false };
      else                          result = runJs(phpCode);
      setOutput(result);
      setRunning(false);
    }, 220); // small delay for "feel"
  }, [phpCode, language]);

  const reset = useCallback(() => {
    setPhpCode(initialCode);
    setHtml(htmlSnippet);
    setCss(cssSnippet);
    setOutput(null);
    setActiveTab(htmlSnippet ? 'preview' : 'php');
  }, [initialCode, htmlSnippet, cssSnippet]);

  const copy = useCallback(() => {
    const src = activeTab === 'html' ? html : activeTab === 'css' ? css : phpCode;
    navigator.clipboard.writeText(src).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }, [activeTab, html, css, phpCode]);

  // ── Tab definitions ──
  const tabs: { id: Tab; label: string; icon: any; show: boolean }[] = [
    { id: 'php' as Tab,     label: language.toUpperCase(), icon: FileCode, show: true },
    { id: 'html' as Tab,    label: 'HTML',    icon: Layout,    show: hasHtml },
    { id: 'css' as Tab,     label: 'CSS',     icon: Palette,   show: hasCss  },
    { id: 'output' as Tab,  label: 'Output',  icon: Terminal,  show: true    },
    { id: 'preview' as Tab, label: 'Preview', icon: Globe,     show: hasHtml },
  ].filter(t => t.show);

  // ── Current editor source ──
  const editorSrc = activeTab === 'html' ? html : activeTab === 'css' ? css : phpCode;
  const editorLang = activeTab === 'html' ? 'html' : activeTab === 'css' ? 'css' : language;
  const handleEditorChange = (v: string) => {
    if (activeTab === 'html')    setHtml(v);
    else if (activeTab === 'css') setCss(v);
    else                          setPhpCode(v);
  };

  const isEditor = activeTab === 'php' || activeTab === 'html' || activeTab === 'css';

  return (
    <div className={WS_STYLES}>
      <style>{CSS_RULES}</style>

      {/* ── Tab bar ── */}
      <div className="ws-bar">
        <div className="ws-tabs">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`ws-tab ${activeTab === id ? 'ws-tab--on' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={13} />
              <span>{label}</span>
              {id === 'output' && output && !output.error && <span className="ws-dot ws-dot--ok" />}
              {id === 'output' && output?.error && <span className="ws-dot ws-dot--err" />}
            </button>
          ))}
        </div>

        <div className="ws-actions">
          <button className="ws-btn ws-btn--ghost ws-btn--icon" onClick={reset} title="Reset to original">
            <RotateCcw size={14} />
          </button>
          <button className="ws-btn ws-btn--ghost ws-btn--icon" onClick={copy} title="Copy current tab">
            {copied ? <Check size={14} className="ws-copied" /> : <Copy size={14} />}
          </button>
          <button className="ws-btn ws-btn--run" onClick={run} style={{ '--ac': accent } as React.CSSProperties}>
            {running
              ? <span className="ws-spinner" />
              : <Play size={13} fill="currentColor" />}
            <span>Run</span>
          </button>
        </div>
      </div>

      {/* ── File name strip ── */}
      <div className="ws-file-strip">
        <span className="ws-file-name">
          {activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'styles.css' : derivedFileName}
        </span>
        {isEditor && <span className="ws-editable-badge">EDITABLE</span>}
      </div>

      {/* ── Main content ── */}
      <div className="ws-body">
        <AnimatePresence mode="wait">

          {/* Editor tabs */}
          {isEditor && (
            <motion.div key={activeTab} className="ws-pane"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}>
              <Editor value={editorSrc} onChange={handleEditorChange} lang={editorLang} />
            </motion.div>
          )}

          {/* Output tab */}
          {activeTab === 'output' && (
            <motion.div key="output" className="ws-pane ws-output"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}>
              {running && (
                <div className="ws-running">
                  <span className="ws-spinner ws-spinner--lg" />
                  <span>Running…</span>
                </div>
              )}
              {!running && !output && (
                <div className="ws-empty">
                  <Play size={32} className="ws-empty-icon" />
                  <p>Press <strong>Run</strong> to execute the code</p>
                </div>
              )}
              {!running && output && (
                <div className="ws-output-inner">
                  <div className={`ws-output-status ${output.error ? 'wos--err' : 'wos--ok'}`}>
                    {output.error
                      ? <><AlertTriangle size={14} /> Error</>
                      : <><CheckCircle2 size={14} /> Success</>}
                  </div>
                  <pre className="ws-out-pre">
                    {output.lines.map((l, i) => (
                      <div key={i} className={`ws-out-line ${output.error ? 'wol--err' : ''}`}>
                        <span className="ws-out-num">{i + 1}</span>
                        <span className="ws-out-text">{l || '\u00a0'}</span>
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </motion.div>
          )}

          {/* Preview tab — browser chrome + iframe */}
          {activeTab === 'preview' && (
            <motion.div key="preview" className="ws-pane ws-preview-pane"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}>
              {/* Browser chrome */}
              <div className="browser-chrome">
                <div className="bc-dots">
                  <span className="bc-dot bc-r" /><span className="bc-dot bc-y" /><span className="bc-dot bc-g" />
                </div>
                <div className="bc-bar">
                  <span className="bc-lock">🔒</span>
                  <span className="bc-url">localhost:3000/{derivedFileName}</span>
                </div>
                <button className="bc-reload" onClick={() => setPreviewKey(k => k + 1)} title="Reload preview">
                  <RotateCcw size={12} />
                </button>
              </div>
              {/* iframe */}
              <iframe
                key={previewKey}
                ref={iframeRef}
                className="preview-iframe"
                srcDoc={buildPreviewDoc(html, css)}
                sandbox="allow-scripts"
                title="Preview"
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Wrapper classname ────────────────────────────────────────────────────────
const WS_STYLES = 'ws-root';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS_RULES = `
/* workspace root */
.ws-root {
  display: flex; flex-direction: column;
  background: #0c0f16; border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  height: 100%; min-height: 520px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6);
}

/* ── tab bar ── */
.ws-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; gap: 12px;
  background: #10141d; border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.ws-tabs { display: flex; gap: 2px; }
.ws-tab {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 8px; border: none;
  font-family: inherit; font-size: 12px; font-weight: 600;
  letter-spacing: 0.04em; cursor: pointer;
  color: rgba(255,255,255,0.38); background: transparent;
  transition: color .15s, background .15s;
}
.ws-tab:hover { color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.04); }
.ws-tab--on { color: #f0ede8; background: rgba(255,255,255,0.09); }
.ws-dot { width: 6px; height: 6px; border-radius: 50%; }
.ws-dot--ok  { background: #3ecf8e; }
.ws-dot--err { background: #f06878; }

/* ── action buttons ── */
.ws-actions { display: flex; align-items: center; gap: 8px; }
.ws-btn {
  display: flex; align-items: center; gap: 6px;
  font-family: inherit; font-size: 13px; font-weight: 700;
  border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer; transition: all .15s;
}
.ws-btn--ghost {
  padding: 7px 10px; background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.45);
}
.ws-btn--ghost:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); }
.ws-btn--icon { padding: 7px; }
.ws-copied { color: #3ecf8e; }
.ws-btn--run {
  padding: 8px 18px; border: none;
  background: var(--ac, #f2b840); color: #0c0f16;
  border-radius: 8px; letter-spacing: 0.05em;
}
.ws-btn--run:hover { filter: brightness(1.1); transform: translateY(-1px); }
.ws-btn--run:active { transform: scale(0.97); }

/* ── file strip ── */
.ws-file-strip {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 18px;
  background: #090c12; border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}
.ws-file-name {
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 12px; color: rgba(255,255,255,0.3);
}
.ws-editable-badge {
  font-size: 9px; font-weight: 800; letter-spacing: 0.18em;
  padding: 2px 8px; border-radius: 4px;
  color: #f2b840; background: rgba(242,184,64,0.1);
  border: 1px solid rgba(242,184,64,0.25);
}

/* ── body ── */
.ws-body { flex: 1; overflow: hidden; position: relative; }
.ws-pane { position: absolute; inset: 0; overflow: hidden; }

/* ── EDITOR ── */
.ed-root {
  display: flex; height: 100%; overflow: hidden;
  background: #090c12;
}
.ed-gutter {
  padding: 16px 0; min-width: 52px;
  border-right: 1px solid rgba(255,255,255,0.05);
  background: rgba(0,0,0,0.3);
  flex-shrink: 0; user-select: none;
  overflow: hidden;
  display: flex; flex-direction: column;
}
.ed-ln {
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 13px; line-height: 1.9;
  color: rgba(255,255,255,0.2);
  text-align: right; padding: 0 14px;
}
.ed-inner { flex: 1; position: relative; overflow: hidden; }
.ed-highlight {
  position: absolute; inset: 0;
  margin: 0; padding: 16px 20px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 14px; line-height: 1.9;
  color: #cdd5e0; white-space: pre; overflow: hidden;
  pointer-events: none; user-select: none;
  tab-size: 4;
}
.ed-row { display: block; min-height: 1.9em; }
.ed-textarea {
  position: absolute; inset: 0;
  padding: 16px 20px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 14px; line-height: 1.9;
  color: transparent; caret-color: #f2b840;
  background: transparent; border: none; outline: none;
  resize: none; overflow: auto; white-space: pre;
  tab-size: 4; -moz-tab-size: 4; width: 100%; height: 100%;
}
.ed-textarea::selection { background: rgba(242,184,64,0.16); }

/* ── SYNTAX TOKENS ── */
.h-kw       { color: #d19af0; font-weight: 600; }
.h-type     { color: #7fdbca; }
.h-var      { color: #f47d86; }
.h-str      { color: #b8e08a; }
.h-comment  { color: #4a5568; font-style: italic; }
.h-num      { color: #f5a06a; }
.h-fn       { color: #7abaff; }
.h-class    { color: #ffd07a; }
.h-attr     { color: #7ad4ff; }
/* HTML */
.h-tag      { color: #f47d86; }
.h-tag-bracket { color: rgba(255,255,255,0.35); }
.h-attr-name { color: #7abaff; }
/* CSS */
.h-selector { color: #f47d86; }
.h-prop     { color: #7abaff; }
.h-value    { color: #b8e08a; }
.h-color    { color: #ffd07a; }

/* ── OUTPUT ── */
.ws-output  { background: #080b10; display: flex; flex-direction: column; }
.ws-running, .ws-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px;
  color: rgba(255,255,255,0.3); font-size: 14px;
}
.ws-empty-icon { opacity: 0.25; }
.ws-output-inner { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.ws-output-status {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; font-size: 12px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0;
}
.wos--ok  { color: #3ecf8e; background: rgba(62,207,142,0.06); }
.wos--err { color: #f06878; background: rgba(240,104,120,0.06); }
.ws-out-pre { margin: 0; padding: 16px 0; overflow-y: auto; flex: 1; }
.ws-out-line {
  display: flex; align-items: flex-start; gap: 0;
  padding: 3px 0; min-height: 1.8em;
}
.ws-out-num {
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 12px; color: rgba(255,255,255,0.18);
  min-width: 52px; text-align: right; padding-right: 16px;
  flex-shrink: 0; user-select: none; line-height: 1.8;
}
.ws-out-text {
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 14px; line-height: 1.8; color: #3ecf8e;
  white-space: pre-wrap; word-break: break-all; padding-right: 20px;
}
.wol--err .ws-out-text { color: #f06878; }

/* ── PREVIEW ── */
.ws-preview-pane { display: flex; flex-direction: column; background: #fff; }
.browser-chrome {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 14px;
  background: #f1f3f5; border-bottom: 1px solid #d8dde4;
  flex-shrink: 0;
}
.bc-dots  { display: flex; gap: 5px; flex-shrink: 0; }
.bc-dot   { width: 12px; height: 12px; border-radius: 50%; }
.bc-r { background: #ff5f57; } .bc-y { background: #febc2e; } .bc-g { background: #28c840; }
.bc-bar {
  flex: 1; display: flex; align-items: center; gap: 6px;
  background: #fff; border: 1px solid #d0d5db;
  border-radius: 6px; padding: 4px 12px;
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 12px; color: #6b7280;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}
.bc-lock { font-size: 11px; }
.bc-url  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bc-reload {
  width: 26px; height: 26px; border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.1); background: rgba(0,0,0,0.04);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #6b7280; flex-shrink: 0;
  transition: background .15s;
}
.bc-reload:hover { background: rgba(0,0,0,0.08); }
.preview-iframe { flex: 1; width: 100%; border: none; }

/* ── spinner ── */
.ws-spinner {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  border-top-color: currentColor;
  animation: ws-spin 0.7s linear infinite;
  display: inline-block;
}
.ws-spinner--lg { width: 28px; height: 28px; border-width: 3px; }
@keyframes ws-spin { to { transform: rotate(360deg); } }
`;