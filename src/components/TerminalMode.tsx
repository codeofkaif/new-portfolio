import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

// ─── Command registry ─────────────────────────────────────────────────────────
type CmdHandler = () => string | string[];

const toLines = (s: string | string[]) => Array.isArray(s) ? s : s.split('\n');

const COMMANDS: Record<string, CmdHandler> = {
  help: () => [
    '┌─ Available Commands ──────────────────────────────────┐',
    '│  about      — Bio, education, status                  │',
    '│  projects   — List all projects                       │',
    '│  skills     — Tech stack and proficiency              │',
    '│  contact    — Email, GitHub, LinkedIn                 │',
    '│  resume     — Download link                          │',
    '│  clear      — Clear terminal                         │',
    '│  exit       — Close terminal                         │',
    '└───────────────────────────────────────────────────────┘',
  ],

  about: () => [
    `  Name     : ${profile.name}`,
    `  Role     : ${profile.role}`,
    `  Location : ${profile.location}`,
    `  Status   : ${profile.status}`,
    `  Edu      : ${profile.education.degree}`,
    `             ${profile.education.university}`,
    `             ${profile.education.semester} · Expected ${profile.education.expectedGraduation}`,
    `  Bio      : ${profile.tagline}`,
  ],

  projects: () =>
    projects.flatMap((p, i) => [
      `  [${i + 1}] ${p.title}  (${p.status})`,
      `      Stack : ${p.techStack.slice(0, 4).join(', ')}`,
      `      ${p.description}`,
      '',
    ]),

  skills: () => [
    '  Languages : Java (92%) · Python (75%) · SQL (82%) · TypeScript (70%)',
    '  Backend   : Spring Boot (90%) · Spring Security (85%) · REST APIs (92%)',
    '  Databases : PostgreSQL (86%) · MySQL (82%) · Redis (76%) · MongoDB (60%)',
    '  DevOps    : Docker (80%) · Git (92%) · Kubernetes (58%) · AWS (62%)',
    '  Frontend  : React (74%) · HTML (85%) · CSS (78%)',
    '  CS        : DSA (80%) · OS (72%) · DBMS (78%)',
  ],

  contact: () => [
    `  Email    : ${profile.socials.email}`,
    `  GitHub   : ${profile.socials.github}`,
    `  LinkedIn : ${profile.socials.linkedin}`,
  ],

  resume: () => [
    `  Resume available at: ${window.location.origin}${profile.resumeLink}`,
    '  Open in browser or right-click → Save As to download.',
  ],
};

// ─── Line type ────────────────────────────────────────────────────────────────
interface TermLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

let lineId = 0;

// ─── Main component ───────────────────────────────────────────────────────────
export function TerminalMode() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TermLine[]>([
    { id: lineId++, type: 'system', text: `Kaif's Portfolio Terminal v1.0.0` },
    { id: lineId++, type: 'system', text: `Type 'help' to see available commands.` },
    { id: lineId++, type: 'system', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Ctrl+` toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLines = useCallback((newLines: TermLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const handleSubmit = useCallback(() => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    // Echo input
    const inputLine: TermLine = { id: lineId++, type: 'input', text: cmd };

    // Update history
    setHistory((h) => [cmd, ...h.slice(0, 49)]);
    setHistIdx(-1);
    setInput('');

    if (cmd === 'clear') {
      setLines([{ id: lineId++, type: 'system', text: 'Terminal cleared. Type \'help\' for commands.' }]);
      return;
    }

    if (cmd === 'exit') {
      addLines([inputLine]);
      setTimeout(() => setOpen(false), 300);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const output = toLines(handler());
      addLines([
        inputLine,
        ...output.map((t) => ({ id: lineId++, type: 'output' as const, text: t })),
        { id: lineId++, type: 'output', text: '' },
      ]);
    } else {
      addLines([
        inputLine,
        { id: lineId++, type: 'error', text: `Command not found: '${cmd}'. Type 'help' for available commands.` },
        { id: lineId++, type: 'output', text: '' },
      ]);
    }
  }, [input, addLines]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { handleSubmit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  const LINE_STYLES: Record<string, string> = {
    input:  '#F5C76A',
    output: '#9CA3AF',
    error:  '#F87171',
    system: '#4ADE80',
  };

  return (
    <>
      {/* Keyboard hint — bottom right */}
      <div
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                   text-[10px] font-mono text-[#4B5563] border border-white/[0.06] bg-[#05070A]/80
                   backdrop-blur-sm select-none pointer-events-none"
      >
        <kbd className="px-1 py-0.5 rounded bg-white/5 text-[9px] font-bold">Ctrl</kbd>
        +
        <kbd className="px-1 py-0.5 rounded bg-white/5 text-[9px] font-bold">`</kbd>
        Terminal
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: 'rgba(2,4,8,0.97)', backdropFilter: 'blur(8px)' }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-3 px-4 py-2.5 border-b shrink-0"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex gap-1.5">
                <button onClick={() => setOpen(false)} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-125" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-[12px] font-mono text-[#6B7280] flex-1 text-center">
                kaif@portfolio — bash
              </span>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-[#4B5563] hover:text-[#9CA3AF]" />
              </button>
            </div>

            {/* Output area */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[13px]"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.06) transparent' }}
            >
              {lines.map((line) => (
                <div key={line.id} className="leading-relaxed">
                  {line.type === 'input' ? (
                    <span>
                      <span style={{ color: '#4ADE80' }}>kaif@portfolio</span>
                      <span style={{ color: '#6B7280' }}>:~$ </span>
                      <span style={{ color: '#F5C76A' }}>{line.text}</span>
                    </span>
                  ) : (
                    <span style={{ color: LINE_STYLES[line.type] }}>{line.text}&nbsp;</span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t shrink-0 font-mono text-[13px]"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <span style={{ color: '#4ADE80' }}>kaif@portfolio</span>
              <span style={{ color: '#6B7280' }}>:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none caret-[#F5C76A]"
                style={{ color: '#F5C76A' }}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="animate-pulse text-[#F5C76A] select-none">█</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
