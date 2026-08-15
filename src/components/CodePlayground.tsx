import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, X } from 'lucide-react';

// ─── Language configs ─────────────────────────────────────────────────────────
type Lang = 'java' | 'python' | 'sql';

const STARTER: Record<Lang, string> = {
  java: `@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello from Spring Boot!");
    }
}`,
  python: `from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}`,
  sql: `-- Hospital Management Query
SELECT
    p.id,
    p.name,
    p.age,
    COUNT(a.id) AS total_appointments
FROM patients p
LEFT JOIN appointments a ON a.patient_id = p.id
WHERE a.status = 'SCHEDULED'
GROUP BY p.id
ORDER BY total_appointments DESC
LIMIT 10;`,
};

const MOCK_OUTPUT: Record<Lang, string> = {
  java: `[INFO]  BUILD SUCCESS
[INFO]  Spring Boot 3.3.0 started
[INFO]  Tomcat started on port 8080
GET /api/v1/demo/hello → 200 OK
Response: "Hello from Spring Boot!"
Execution time: 4ms`,
  python: `INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
GET /hello → 200 OK
{"message": "Hello from FastAPI!"}`,
  sql: `Query executed successfully.
Rows returned: 10

 id │ name           │ age │ total_appointments
────┼────────────────┼─────┼───────────────────
  1 │ Aarav Sharma   │  32 │ 5
  2 │ Priya Mehta    │  27 │ 3
  4 │ Rahul Verma    │  45 │ 2
Execution time: 8ms`,
};

const LANG_COLORS: Record<Lang, { accent: string; label: string }> = {
  java:   { accent: '#f89820', label: 'Java 21' },
  python: { accent: '#ffd43b', label: 'Python 3.12' },
  sql:    { accent: '#38BDF8', label: 'PostgreSQL 16' },
};

// ─── Token highlighter (same engine as FeaturedProjects) ─────────────────────
const JAVA_KW   = ['public','class','return','void','new','private','static','import','interface','extends','implements','null','true','false','ResponseEntity','String'];
const PYTHON_KW = ['def','class','from','import','return','async','await','if','else','for','in','True','False','None'];
const SQL_KW    = ['SELECT','FROM','WHERE','JOIN','LEFT','ON','GROUP','BY','ORDER','LIMIT','COUNT','AS','AND','OR','NOT','DISTINCT','DESC','ASC'];

type TT = 'keyword' | 'string' | 'annotation' | 'comment' | 'number' | 'plain';

function tokenize(line: string, lang: Lang): { type: TT; val: string }[] {
  const kws = lang === 'java' ? JAVA_KW : lang === 'python' ? PYTHON_KW : SQL_KW;
  const commentChar = lang === 'python' ? '#' : lang === 'sql' ? '--' : '//';
  const tokens: { type: TT; val: string }[] = [];
  let rem = line;

  while (rem) {
    if (rem.startsWith(commentChar)) { tokens.push({ type: 'comment', val: rem }); break; }
    const str = rem.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/);
    if (str) { tokens.push({ type: 'string', val: str[1] }); rem = rem.slice(str[1].length); continue; }
    const ann = rem.match(/^(@[\w.]+)/);
    if (ann) { tokens.push({ type: 'annotation', val: ann[1] }); rem = rem.slice(ann[1].length); continue; }
    const num = rem.match(/^(\d+\.?\d*)/);
    if (num) { tokens.push({ type: 'number', val: num[1] }); rem = rem.slice(num[1].length); continue; }
    const word = rem.match(/^([A-Za-z_]\w*)/);
    if (word) {
      const isKw = kws.includes(word[1]) || kws.includes(word[1].toUpperCase());
      tokens.push({ type: isKw ? 'keyword' : 'plain', val: word[1] });
      rem = rem.slice(word[1].length); continue;
    }
    tokens.push({ type: 'plain', val: rem[0] }); rem = rem.slice(1);
  }
  return tokens;
}

const TC: Record<TT, string> = {
  keyword: '#8B5CF6', string: '#86EFAC', annotation: '#F5C76A',
  comment: '#4B5563', number: '#38BDF8', plain: '#CBD5E1',
};

// ─── Main component ───────────────────────────────────────────────────────────
export function CodePlayground() {
  const [lang, setLang] = useState<Lang>('java');
  const [code, setCode] = useState(STARTER.java);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLangChange = (l: Lang) => {
    setLang(l);
    setCode(STARTER[l]);
    setOutput(null);
  };

  const runCode = async () => {
    setRunning(true);
    setOutput(null);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    setOutput(MOCK_OUTPUT[lang]);
    setRunning(false);
  };

  const lines = code.split('\n');
  const accent = LANG_COLORS[lang].accent;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(8,10,18,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        minHeight: 380,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>

        {/* Lang selector */}
        <div className="flex items-center gap-1 ml-2">
          {(['java', 'python', 'sql'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
              style={
                lang === l
                  ? { background: `${LANG_COLORS[l].accent}20`, color: LANG_COLORS[l].accent, border: `1px solid ${LANG_COLORS[l].accent}40` }
                  : { color: '#4B5563', border: '1px solid transparent' }
              }
            >
              {LANG_COLORS[l].label}
            </button>
          ))}
        </div>

        {/* Run button */}
        <button
          onClick={runCode}
          disabled={running}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#07070A' }}
        >
          <Play className="w-3 h-3" />
          {running ? 'Running…' : 'Run Code'}
        </button>
      </div>

      {/* Editor area */}
      <div className="flex flex-1 overflow-hidden relative" style={{ minHeight: 220 }}>
        {/* Line numbers */}
        <div
          className="select-none px-3 py-3 text-right text-[11px] font-mono leading-relaxed shrink-0 w-10"
          style={{ color: '#374151', background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(255,255,255,0.05)' }}
        >
          {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>

        {/* Syntax-highlighted overlay (pointer-events none, sits behind textarea) */}
        <div className="absolute left-10 top-0 right-0 bottom-0 pointer-events-none overflow-hidden">
          <pre className="px-3 py-3 text-[11.5px] font-mono leading-relaxed whitespace-pre text-transparent">
            {lines.map((line, i) => (
              <div key={i}>
                {tokenize(line, lang).map((t, j) => (
                  <span key={j} style={{ color: TC[t.type] }}>{t.val}</span>
                ))}
                {'\n'}
              </div>
            ))}
          </pre>
        </div>

        {/* Editable textarea (transparent text, sits on top) */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 bg-transparent text-transparent caret-[#F5C76A] outline-none resize-none
                     px-3 py-3 text-[11.5px] font-mono leading-relaxed z-10"
          style={{ caretColor: accent }}
        />
      </div>

      {/* Output panel */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t overflow-hidden shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <div className="px-4 py-2.5" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-mono font-semibold text-emerald-400">Output</span>
                </div>
                <button onClick={() => setOutput(null)}>
                  <X className="w-3.5 h-3.5 text-[#4B5563] hover:text-[#9CA3AF]" />
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[#9CA3AF] leading-relaxed max-h-32 overflow-y-auto"
                   style={{ scrollbarWidth: 'thin' }}>
                {output}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
