import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Lock, Zap } from 'lucide-react';
import { endpoints, METHOD_COLORS, type ApiEndpoint } from '@/data/endpoints';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';

// ─── JSON colour highlighter ──────────────────────────────────────────────────
function JsonHighlight({ json }: { json: string }) {
  const html = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // strings (values)
    .replace(/"([^"]+)":\s*"([^"]*)"/g,
      '<span style="color:#A78BFA">"$1"</span>: <span style="color:#86EFAC">"$2"</span>')
    // keys with number / bool / null values
    .replace(/"([^"]+)":\s*([\d.]+|true|false|null)/g,
      '<span style="color:#A78BFA">"$1"</span>: <span style="color:#F5C76A">$2</span>')
    // remaining string-only keys
    .replace(/"([^"<>]+)"/g, '<span style="color:#A78BFA">"$1"</span>');

  return (
    <pre
      className="text-[11px] font-mono leading-relaxed text-[#CBD5E1] overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── Tab type ────────────────────────────────────────────────────────────────
type Tab = 'response' | 'request' | 'headers' | 'params';

// ─── Single endpoint row ──────────────────────────────────────────────────────
function EndpointRow({ ep }: { ep: ApiEndpoint }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('response');
  const mc = METHOD_COLORS[ep.method];

  const TABS: { key: Tab; label: string; show: boolean }[] = [
    { key: 'response', label: 'Response',       show: true },
    { key: 'request',  label: 'Request Body',   show: !!ep.requestBody },
    { key: 'headers',  label: 'Headers',        show: true },
    { key: 'params',   label: `Params (${ep.params?.length ?? 0})`, show: true },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-colors duration-200"
      style={{
        background: 'rgba(16,21,31,0.55)',
        backdropFilter: 'blur(16px)',
        borderColor: open ? mc.border : 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Summary row */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left group"
        onClick={() => setOpen((o) => !o)}
      >
        {/* Method badge */}
        <span
          className="text-[10px] font-black px-2.5 py-1 rounded-lg shrink-0 min-w-[46px] text-center tracking-wider"
          style={{ background: mc.bg, color: mc.text, border: `1px solid ${mc.border}` }}
        >
          {ep.method}
        </span>

        {/* Path */}
        <code className="text-[13px] font-mono text-[#F1F1F4] flex-1 group-hover:text-white transition-colors truncate">
          {ep.path}
        </code>

        {/* Summary */}
        <span className="text-[11px] text-[#9CA3AF] hidden sm:block shrink-0 mr-2">{ep.summary}</span>

        {/* Status badge */}
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{
            background: ep.responseStatus === 200 ? 'rgba(34,197,94,0.12)' : 'rgba(34,211,238,0.12)',
            color: ep.responseStatus === 200 ? '#4ADE80' : '#22D3EE',
          }}
        >
          {ep.responseStatus}
        </span>

        {/* Chevron */}
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </motion.div>
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/[0.06] pt-3">
              {/* Description */}
              <p className="text-[12px] text-[#9CA3AF] mb-4 leading-relaxed">{ep.description}</p>

              {/* Tabs */}
              <div className="flex gap-1 mb-3 border-b border-white/[0.06] pb-2">
                {TABS.filter((t) => t.show).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold transition-all"
                    style={
                      tab === t.key
                        ? { background: mc.bg, color: mc.text }
                        : { color: '#6B7280' }
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div
                className="rounded-xl p-3 overflow-auto max-h-64"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {tab === 'response' && <JsonHighlight json={ep.responseExample} />}

                {tab === 'request' && ep.requestBody && (
                  <JsonHighlight json={ep.requestBody} />
                )}

                {tab === 'headers' && (
                  <table className="w-full text-[11px] font-mono">
                    <tbody>
                      {Object.entries(ep.requestHeaders).map(([k, v]) => (
                        <tr key={k} className="border-b border-white/[0.04]">
                          <td className="py-1.5 pr-4 text-[#A78BFA] whitespace-nowrap">{k}</td>
                          <td className="py-1.5 text-[#86EFAC] break-all">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {tab === 'params' && (
                  ep.params && ep.params.length > 0 ? (
                    <table className="w-full text-[11px] font-mono">
                      <thead>
                        <tr className="text-[#6B7280] border-b border-white/[0.06]">
                          <th className="py-1.5 text-left pr-3">Name</th>
                          <th className="py-1.5 text-left pr-3">In</th>
                          <th className="py-1.5 text-left pr-3">Type</th>
                          <th className="py-1.5 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ep.params.map((p) => (
                          <tr key={p.name} className="border-b border-white/[0.04]">
                            <td className="py-1.5 pr-3 text-[#F5C76A] whitespace-nowrap">
                              {p.name}{p.required && <span className="text-red-400 ml-0.5">*</span>}
                            </td>
                            <td className="py-1.5 pr-3 text-[#9CA3AF]">{p.in}</td>
                            <td className="py-1.5 pr-3 text-[#22D3EE]">{p.type}</td>
                            <td className="py-1.5 text-[#6B7280]">{p.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-[#4B5563] text-[11px]">No parameters</p>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tag group ────────────────────────────────────────────────────────────────
function TagGroup({ tag, eps }: { tag: string; eps: ApiEndpoint[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 mb-3 group"
      >
        <motion.div animate={{ rotate: open ? 0 : -90 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
        </motion.div>
        <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider">{tag}</span>
        <span className="text-[10px] text-[#4B5563]">({eps.length})</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="space-y-2 overflow-hidden"
          >
            {eps.map((ep) => <EndpointRow key={ep.id} ep={ep} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ApiExplorer() {
  const tags = [...new Set(endpoints.map((e) => e.tag))];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-40px' }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUpItem} className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)' }}
          >
            <Zap className="w-4 h-4 text-[#22D3EE]" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#F1F1F4]">Hospital Management API</h3>
            <p className="text-[11px] text-[#6B7280] font-mono">v1 · Spring Boot · Base URL: /api/v1</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
          <Lock className="w-3 h-3" />
          JWT Bearer Auth
        </div>
      </motion.div>

      {/* Endpoint groups */}
      <motion.div variants={fadeUpItem} className="space-y-6">
        {tags.map((tag) => (
          <TagGroup
            key={tag}
            tag={tag}
            eps={endpoints.filter((e) => e.tag === tag)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
