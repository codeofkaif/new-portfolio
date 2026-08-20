import { motion } from 'framer-motion';
import { timeline } from '@/data/timeline';
import { fadeUpItem } from '@/lib/motionVariants';

// ── Single timeline card ──────────────────────────────────────────────────────
function TimelineCard({ event, side }: {
  event: typeof timeline[number];
  side: 'left' | 'right';
}) {
  return (
    <motion.div
      variants={fadeUpItem}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-60px' }}
      className={`
        relative flex flex-col gap-3 rounded-2xl p-5 cursor-default
        transition-all duration-300
        ${side === 'left' ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start'}
        text-left items-start
      `}
      style={{
        background: 'rgba(16,21,31,0.55)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      whileHover={{ y: -4, borderColor: `${event.color}40` }}
    >
      {/* Accent top line */}
      <div
        className={`absolute top-0 h-px rounded-full ${side === 'left' ? 'right-6 left-16' : 'left-6 right-16'}`}
        style={{ background: `linear-gradient(to ${side === 'left' ? 'left' : 'right'}, transparent, ${event.color}70)` }}
      />

      {/* Icon chip + year row */}
      <div className={`flex items-center gap-2.5 ${side === 'left' ? 'lg:flex-row-reverse' : 'flex-row'} flex-row`}>
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
      <div className={`flex flex-wrap gap-1.5 ${side === 'left' ? 'lg:justify-end' : ''}`}>
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

// ── Main export ───────────────────────────────────────────────────────────────
export function JourneyTimeline() {
  return (
    <section className="py-16 md:py-24 w-full relative z-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

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

        {/* ── Desktop: alternating two-column. Mobile: single column centered ── */}
        <div className="relative">

          {/* Center spine — desktop only */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,199,106,0.3) 10%, rgba(139,92,246,0.3) 50%, rgba(34,211,238,0.3) 90%, transparent)' }}
          />

          <div className="flex flex-col gap-10 lg:gap-0 items-center lg:items-stretch">
            {timeline.map((event, idx) => {
              const side: 'left' | 'right' = idx % 2 === 0 ? 'right' : 'left';

              return (
                <div
                  key={event.id}
                  className={`
                    w-full relative lg:grid lg:grid-cols-2 lg:gap-12 items-center
                    ${idx !== 0 ? 'lg:-mt-2' : ''}
                  `}
                >
                  {/* Left cell */}
                  <div className={`hidden lg:block ${side === 'right' ? '' : 'order-2'}`}>
                    {side === 'left' && <TimelineCard event={event} side="left" />}
                  </div>

                  {/* Center dot — desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                      className="w-4 h-4 rounded-full border-2 border-[#0A0A0A]"
                      style={{
                        background: event.color,
                        boxShadow: `0 0 14px 3px ${event.color}60`,
                      }}
                    />
                  </div>

                  {/* Right cell */}
                  <div className={`hidden lg:block ${side === 'left' ? '' : 'order-2'}`}>
                    {side === 'right' && <TimelineCard event={event} side="right" />}
                  </div>

                  {/* Mobile: centered card with dot */}
                  <div className="lg:hidden w-full max-w-xl mx-auto flex items-start gap-4">
                    {/* Vertical dot + line */}
                    <div className="flex flex-col items-center shrink-0 pt-1">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: event.color, boxShadow: `0 0 8px 2px ${event.color}60` }}
                      />
                      {idx < timeline.length - 1 && (
                        <div className="w-px flex-1 mt-1 min-h-[60px]" style={{ background: `linear-gradient(to bottom, ${event.color}50, transparent)` }} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <TimelineCard event={event} side="right" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
