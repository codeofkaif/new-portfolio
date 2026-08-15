import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { askAI } from '@/lib/aiClient';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

// ─── Single message bubble ────────────────────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={
          isUser
            ? { background: 'rgba(245,199,106,0.18)', border: '1px solid rgba(245,199,106,0.35)' }
            : { background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.35)' }
        }
      >
        {isUser
          ? <User className="w-3 h-3 text-[#F5C76A]" />
          : <Bot className="w-3 h-3 text-[#A78BFA]" />
        }
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[82%] px-3 py-2 rounded-2xl text-[12px] leading-relaxed ${
          msg.error ? 'text-red-400' : isUser ? 'text-[#F1F1F4]' : 'text-[#D1D5DB]'
        }`}
        style={
          isUser
            ? {
                background: 'rgba(245,199,106,0.12)',
                border: '1px solid rgba(245,199,106,0.2)',
              }
            : msg.error
            ? {
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
              }
            : {
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }
        }
      >
        {msg.error && (
          <AlertCircle className="w-3 h-3 inline mr-1.5 text-red-400 shrink-0" />
        )}
        {msg.content}
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-2 items-start"
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.35)' }}
      >
        <Bot className="w-3 h-3 text-[#A78BFA]" />
      </div>
      <div
        className="flex items-center gap-1 px-3 py-2.5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {[0, 0.15, 0.3].map((d, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: d }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main AIChatBox ───────────────────────────────────────────────────────────
interface AIChatBoxProps {
  /** Plain-text context injected as the system prompt */
  context: string;
  /** Placeholder question shown in the input */
  placeholder?: string;
  /** Compact mode for sidebar / inline usage */
  compact?: boolean;
}

export function AIChatBox({
  context,
  placeholder = 'Ask me anything…',
  compact = false,
}: AIChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "Hi! I'm Kaif's AI assistant. Ask me about his skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    const q = input.trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: q,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const { answer, error } = await askAI(q, context);
    const aiMsg: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: error ? `Sorry, something went wrong: ${error}` : answer,
      error: !!error,
    };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
    inputRef.current?.focus();
  };

  // Suggested starter questions
  const SUGGESTIONS = [
    'What tech stack do you use?',
    'Tell me about Hospital API',
    'Are you open to internships?',
    'How did you use Redis?',
  ];

  return (
    <div
      className={`flex flex-col rounded-2xl overflow-hidden ${compact ? 'h-72' : 'h-96'}`}
      style={{
        background: 'rgba(8,10,18,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.35)' }}
        >
          <Bot className="w-3.5 h-3.5 text-[#A78BFA]" />
        </div>
        <span className="text-[12px] font-semibold text-[#F1F1F4]">AI Assistant</span>
        <span className="flex items-center gap-1 ml-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-medium">Online</span>
        </span>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.06) transparent' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <Bubble key={msg.id} msg={msg} />
          ))}
          {loading && <TypingIndicator key="typing" />}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips — show only when empty (just init msg) */}
      {messages.length === 1 && !loading && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setInput(s); inputRef.current?.focus(); }}
              className="text-[10px] px-2.5 py-1 rounded-full border transition-all duration-150 hover:border-[#F5C76A]/50 hover:text-[#F5C76A]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: '#6B7280',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <form
        onSubmit={send}
        className="flex items-center gap-2 px-3 py-2.5 border-t shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="flex-1 bg-transparent text-[12px] text-[#F1F1F4] placeholder-[#4B5563]
                     outline-none font-mono disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                     transition-all duration-200 active:scale-90 disabled:opacity-30"
          style={{
            background: 'linear-gradient(135deg, #F5C76A, #EAB308)',
            boxShadow: input.trim() ? '0 0 12px rgba(245,199,106,0.3)' : 'none',
          }}
        >
          {loading
            ? <Loader2 className="w-3.5 h-3.5 text-[#07070A] animate-spin" />
            : <Send className="w-3.5 h-3.5 text-[#07070A]" />
          }
        </button>
      </form>
    </div>
  );
}
