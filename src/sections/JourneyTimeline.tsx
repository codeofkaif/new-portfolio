import { motion } from 'framer-motion';
import { timeline } from '@/data/timeline';
import { fadeUpItem } from '@/lib/motionVariants';
import { ChevronDown } from 'lucide-react';

// ── Single timeline card ──────────────────────────────────────────────────────
function TimelineCard({ event }: { event: typeof timeline[number] }) {
  return (
    <motion.div
      variants={fadeUpItem}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-60px' }}
      className="relative flex flex-col gap-3 rounded-2xl p-5 cursor-default transition-all duration-300 text-left items-start w-full"
      style={{
        background: 'rgba(16,21,31,0.55)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      whileHover={{ y: -4, borderColor: `${event.color}40` }}
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${event.color}70, transparent)` }}
      />

      {/* Icon chip + year row */}
      <div className="flex items-center gap-2.5 flex-row">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
          style={{
            background: `${event.color}18`,
            border: `1px solid ${event.color}40`,
          }}
        >
          {event.icon}
        </div>
        <span
          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border tracking-widest"
          style={{
            color: event.color,
            background: `${event.color}12`,
            borderColor: `${event.color}35`,
          }}
        >
          {event.year}
        </span>
        {event.current && (
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <h3 className="text-[15px] font-black text-[#F1F1F4] leading-snug">{event.title}</h3>
        <p className="text-[11px] font-semibold mt-0.5" style={{ color: event.color }}>
          {event.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-[12px] text-[#9CA3AF] leading-relaxed">{event.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.09)',
              color: '#9CA3AF',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Arrow between cards ───────────────────────────────────────────────────────
function ArrowDivider({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-0 py-1"
    >
      {/* Vertical line */}
      <div
        className="w-px h-6"
        style={{ background: `linear-gradient(to bottom, ${color}60, ${color}20)` }}
      />
      {/* Chevron arrow */}
      <ChevronDown
        className="w-5 h-5 -mt-1"
        style={{ color: `${color}90` }}
        strokeWidth={2.5}
      />
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function JourneyTimeline() {
  return (
    <section className="py-16 md:py-24 w-full relative z-10">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6">

        {/* Section heading */}
        <div className="text-center mb-14">
          <span className="section-label">MY JOURNEY</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1F1F4] mt-2">
            From First Line to{' '}
            <span className="gradient-text">Production Systems</span>
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-3 max-w-lg mx-auto leading-relaxed">
            A chronological map of how I grew from curious beginner to backend engineer.
          </p>
        </div>

        {/* ── Centered single-column cards with arrows ── */}
        <div className="flex flex-col items-center">
          {timeline.map((event, idx) => (
            <div key={event.id} className="w-full flex flex-col items-center">
              <TimelineCard event={event} />
              {idx < timeline.length - 1 && (
                <ArrowDivider color={event.color} />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
