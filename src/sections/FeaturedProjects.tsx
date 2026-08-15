import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ExternalLink,
  ArrowRight, Play, Terminal,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';

// ─── Lightweight syntax highlighter ──────────────────────────────────────────
const JAVA_KEYWORDS = [
  'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
  'new', 'return', 'if', 'else', 'final', 'static', 'void', 'null', 'true', 'false',
  'import', 'package', 'throws', 'throw', 'try', 'catch', 'finally',
  'this', 'super', 'instanceof', 'for', 'while', 'do', 'break', 'continue',
  'ResponseEntity', 'HttpStatus', 'String', 'Long', 'URI', 'List',
];

const PYTHON_KEYWORDS = [
  'def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif',
  'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None',
  'async', 'await', 'with', 'as', 'try', 'except', 'finally', 'raise',
  'pass', 'lambda', 'yield', 'global', 'nonlocal', 'del',
];

type TokenType = 'keyword' | 'string' | 'annotation' | 'comment' | 'number' | 'plain';

interface Token { type: TokenType; value: string }

function tokenizeLine(line: string, lang: 'java' | 'python'): Token[] {
  const tokens: Token[] = [];
  let remaining = line;
  const keywords = lang === 'java' ? JAVA_KEYWORDS : PYTHON_KEYWORDS;

  while (remaining.length > 0) {
    // Comment
    const commentChar = lang === 'java' ? '//' : '#';
    if (remaining.startsWith(commentChar)) {
      tokens.push({ type: 'comment', value: remaining });
      break;
    }

    // String (double or single-quoted, simplified)
    const strMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/);
    if (strMatch) {
      tokens.push({ type: 'string', value: strMatch[1] });
      remaining = remaining.slice(strMatch[1].length);
      continue;
    }

    // Annotation (Java @... / Python @decorator)
    const annMatch = remaining.match(/^(@[\w.]+)/);
    if (annMatch) {
      tokens.push({ type: 'annotation', value: annMatch[1] });
      remaining = remaining.slice(annMatch[1].length);
      continue;
    }

    // Number
    const numMatch = remaining.match(/^(\d+\.?\d*)/);
    if (numMatch) {
      tokens.push({ type: 'number', value: numMatch[1] });
      remaining = remaining.slice(numMatch[1].length);
      continue;
    }

    // Word (keyword or plain)
    const wordMatch = remaining.match(/^([A-Za-z_]\w*)/);
    if (wordMatch) {
      const word = wordMatch[1];
      const isKeyword = keywords.includes(word);
      tokens.push({ type: isKeyword ? 'keyword' : 'plain', value: word });
      remaining = remaining.slice(word.length);
      continue;
    }

    // Consume one character as plain
    tokens.push({ type: 'plain', value: remaining[0] });
    remaining = remaining.slice(1);
  }
  return tokens;
}

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword:    '#8B5CF6', // violet
  string:     '#86EFAC', // green
  annotation: '#F5C76A', // yellow/accent
  comment:    '#4B5563', // muted gray
  number:     '#38BDF8', // sky
  plain:      '#CBD5E1', // light slate
};

function SyntaxLine({ line, lang }: { line: string; lang: 'java' | 'python' }) {
  const tokens = tokenizeLine(line, lang);
  return (
    <span>
      {tokens.map((t, i) => (
        <span key={i} style={{ color: TOKEN_COLORS[t.type] }}>
          {t.value}
        </span>
      ))}
    </span>
  );
}

// ─── Toast component ──────────────────────────────────────────────────────────
function RunToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-12 right-3 z-30 flex items-center gap-2
                     px-3 py-2 rounded-xl border border-emerald-500/30
                     bg-[#0A1F14]/90 backdrop-blur-sm text-emerald-400 text-xs font-mono"
        >
          <Terminal className="w-3 h-3" />
          <span>Build successful · 0 errors, 0 warnings</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Code Editor Panel ────────────────────────────────────────────────────────
function CodeEditorPanel({ project }: { project: typeof projects[number] }) {
  const lines = project.codeSnippet.split('\n');
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRun = () => {
    setToastVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToastVisible(false), 2800);
  };

  const statusLabel = project.codeLanguage === 'java' ? 'Java' : 'Python';
  const mockLine = Math.floor(lines.length / 2) + 3;

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: 'rgba(8, 10, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
      >
        {/* Traffic-light dots */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] font-mono text-[#6B7280] tracking-wide flex-1 text-center">
          Code Preview
        </span>
        <span className="text-[10px] font-mono text-[#4B5563]">
          {statusLabel === 'Java' ? 'Controller.java' : 'router.py'}
        </span>
      </div>

      {/* Code area — scrollable */}
      <div className="flex-1 overflow-auto py-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    {/* Line number */}
                    <td
                      className="pr-4 pl-4 text-right text-[11px] font-mono select-none shrink-0 w-10"
                      style={{ color: '#374151', verticalAlign: 'top', paddingTop: '1px', paddingBottom: '1px' }}
                    >
                      {i + 1}
                    </td>
                    {/* Code */}
                    <td
                      className="pr-6 text-[11.5px] font-mono leading-relaxed whitespace-pre"
                      style={{ color: '#CBD5E1', verticalAlign: 'top', paddingTop: '1px', paddingBottom: '1px' }}
                    >
                      <SyntaxLine line={line} lang={project.codeLanguage} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div
        className="relative flex items-center justify-between px-4 py-2 border-t shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}
      >
        {/* Left: language + cursor */}
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded"
            style={{
              background: project.codeLanguage === 'java' ? 'rgba(139,92,246,0.18)' : 'rgba(245,199,106,0.15)',
              color: project.codeLanguage === 'java' ? '#A78BFA' : '#F5C76A',
              border: `1px solid ${project.codeLanguage === 'java' ? 'rgba(139,92,246,0.3)' : 'rgba(245,199,106,0.25)'}`,
            }}
          >
            {statusLabel}
          </span>
          <span className="text-[10px] font-mono text-[#4B5563]">
            Ln {mockLine}, Col 4
          </span>
        </div>

        {/* Right: Run Code button */}
        <RunToast visible={toastVisible} />
        <button
          onClick={handleRun}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold
                     transition-all duration-200 active:scale-95 hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, #F5C76A, #EAB308)',
            color: '#07070A',
            boxShadow: '0 0 14px rgba(245,199,106,0.3)',
          }}
        >
          <Play className="w-2.5 h-2.5" />
          Run Code
        </button>
      </div>
    </div>
  );
}

// ─── Project Thumbnail / Mockup ───────────────────────────────────────────────
const MOCKUP_ACCENTS = ['#F5C76A', '#8B5CF6', '#22D3EE'] as const;
const MOCKUP_LABELS = [
  { bars: ['#F5C76A', '#EAB308', '#F5C76A'], metric: 'Projects · 12', sub: 'Active' },
  { bars: ['#8B5CF6', '#6366F1', '#8B5CF6'], metric: 'API calls · 4.2K', sub: '/hour' },
  { bars: ['#22D3EE', '#0891B2', '#22D3EE'], metric: 'Threats · 0', sub: 'Blocked' },
] as const;

function ProjectMockup({ index }: { index: number }) {
  const accent = MOCKUP_ACCENTS[index % MOCKUP_ACCENTS.length];
  const meta = MOCKUP_LABELS[index % MOCKUP_LABELS.length];

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden relative flex flex-col gap-3 p-4"
      style={{
        background: 'rgba(8,10,18,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        minHeight: 200,
      }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] mx-2" />
        <div className="w-12 h-4 rounded bg-white/[0.05] border border-white/[0.06]" />
      </div>

      {/* Metric chips */}
      <div className="grid grid-cols-3 gap-2">
        {['Tasks', 'Progress', 'Status'].map((label, i) => (
          <div
            key={label}
            className="rounded-lg p-2 border border-white/[0.05]"
            style={{ background: `${meta.bars[i]}10` }}
          >
            <p className="text-[8px] text-[#6B7280] mb-0.5">{label}</p>
            <p className="text-[10px] font-bold" style={{ color: meta.bars[i] }}>
              {['12', '86%', 'Active'][i]}
            </p>
          </div>
        ))}
      </div>

      {/* SVG chart */}
      <div className="flex-1 rounded-lg overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <svg className="w-full h-full" viewBox="0 0 240 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,65 C40,55 60,70 90,40 S140,15 170,28 S210,45 240,20 L240,80 L0,80 Z"
            fill={`url(#grad-${index})`}
          />
          <path
            d="M0,65 C40,55 60,70 90,40 S140,15 170,28 S210,45 240,20"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
        </svg>
        <div className="absolute bottom-2 right-2 text-right">
          <p className="text-[9px] font-bold" style={{ color: accent }}>{meta.metric}</p>
          <p className="text-[8px] text-[#4B5563]">{meta.sub}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Ongoing:     { bg: 'rgba(245,199,106,0.12)', text: '#F5C76A',  border: 'rgba(245,199,106,0.3)' },
  Completed:   { bg: 'rgba(34,197,94,0.12)',   text: '#4ADE80',  border: 'rgba(34,197,94,0.3)' },
  'In Progress': { bg: 'rgba(99,102,241,0.12)',  text: '#818CF8',  border: 'rgba(99,102,241,0.3)' },
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function FeaturedProjects() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const prev = () => go(Math.max(0, active - 1));
  const next = () => go(Math.min(projects.length - 1, active + 1));

  const project = projects[active];
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES['In Progress'];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[600px]">

          {/* ══ LEFT PANEL ══════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-5">

            {/* Heading row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[15px] font-bold text-[#F1F1F4] tracking-tight">
                  Featured Projects
                </h2>
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: '#F5C76A', boxShadow: '0 0 8px 2px rgba(245,199,106,0.45)' }}
                />
              </div>
              <Link
                to="/projects"
                className="flex items-center gap-1 text-[11px] font-semibold text-[#9CA3AF]
                           hover:text-[#F5C76A] transition-colors group"
              >
                View All Projects
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Card wrapper */}
            <div
              className="flex-1 flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(16,21,31,0.55)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col h-full"
                >
                  {/* Mockup thumbnail */}
                  <div className="relative p-4 pb-0">
                    <div className="h-52">
                      <ProjectMockup index={active} />
                    </div>

                    {/* Arrow buttons over thumbnail */}
                    <div className="absolute inset-x-4 bottom-2 flex justify-between pointer-events-none">
                      <button
                        onClick={prev}
                        disabled={active === 0}
                        className="pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center
                                   border border-white/[0.12] bg-[#0A0A0A]/80 backdrop-blur-sm
                                   text-[#9CA3AF] hover:text-[#F1F1F4] hover:border-white/25
                                   disabled:opacity-25 transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        disabled={active === projects.length - 1}
                        className="pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center
                                   border border-white/[0.12] bg-[#0A0A0A]/80 backdrop-blur-sm
                                   text-[#9CA3AF] hover:text-[#F1F1F4] hover:border-white/25
                                   disabled:opacity-25 transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-4 p-5 flex-1">
                    {/* Title + status */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-black text-[#F1F1F4] leading-tight tracking-tight">
                        {project.title}
                      </h3>
                      <span
                        className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border tracking-wide"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.text,
                          borderColor: statusStyle.border,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* 2-line description */}
                    <p className="text-[12px] text-[#9CA3AF] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech badge pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'rgba(255,255,255,0.09)',
                            color: '#9CA3AF',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Pagination dots + Next button row */}
                    <div className="flex items-center justify-between">
                      {/* Dots */}
                      <div className="flex items-center gap-2">
                        {projects.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => go(i)}
                            className="rounded-full transition-all duration-300"
                            style={{
                              width: active === i ? 20 : 6,
                              height: 6,
                              background: active === i ? '#F5C76A' : 'rgba(255,255,255,0.18)',
                            }}
                          />
                        ))}
                      </div>

                      {/* Circular gradient next button */}
                      <motion.button
                        onClick={next}
                        disabled={active === projects.length - 1}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.93 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center
                                   font-bold text-[#07070A] disabled:opacity-30 transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #F5C76A, #EAB308)',
                          boxShadow: '0 0 18px rgba(245,199,106,0.35)',
                        }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                                     hover:opacity-90 transition-all active:scale-95"
                          style={{
                            background: 'linear-gradient(135deg, #F5C76A, #EAB308)',
                            color: '#07070A',
                            boxShadow: '0 0 14px rgba(245,199,106,0.28)',
                          }}
                        >
                          Live Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold opacity-35 cursor-not-allowed border border-white/[0.08] text-[#9CA3AF]">
                          Live Demo <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold
                                     border border-white/[0.1] bg-white/[0.04] text-[#F1F1F4]
                                     hover:border-white/25 hover:bg-white/[0.08] transition-all"
                        >
                          GitHub <FaGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ══ RIGHT PANEL — Code Editor ════════════════════════════════════ */}
          <div className="flex flex-col">
            <CodeEditorPanel project={project} />
          </div>
        </div>
      </div>
    </section>
  );
}
