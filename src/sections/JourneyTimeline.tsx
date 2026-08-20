import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timeline } from '@/data/timeline';

// ── How many px each stacked card is offset downward ─────────────────────────
const STACK_OFFSET = 18; // px shift per card when stacked behind
const CARD_TOP_BASE = 80; // px from top of viewport where cards stick

// ── Single stacking card ──────────────────────────────────────────────────────
function StackCard({
  event,
  index,
  total,
  containerRef,
}: {
  event: typeof timeline[number];
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Each card scrolls within the outer container
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
    container: undefined,
    layoutEffect: false,
  });

  // Slide up from below → settle → stay (next card will cover it)
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  // Sticky top increases slightly per card so they stack like an album
  const stickyTop = CARD_TOP_BASE + index * STACK_OFFSET;
  // Cards further back get slightly smaller scale
  const stackScale = 1 - (total - 1 - index) * 0.018;

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: `${stickyTop}px`, zIndex: index + 1, marginBottom: '24px' }}
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="w-full rounded-2xl overflow-hidden cursor-default"
        whileHover={{ scale: stackScale + 0.008, transition: { duration: 0.2 } }}
        initial={{ transformOrigin: 'top center' }}
      >
        {/* Card container */}
        <div
          className="relative flex flex-col gap-4 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(14,18,27,0.82)',
            backdropFilter: 'blur(24px)',
            border: `1px solid ${event.color}28`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px ${event.color}14`,
          }}
        >
          {/* Colored top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(to right, transparent, ${event.color}, transparent)` }}
          />

          {/* Optional image */}
          {event.image && (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.85) saturate(1.1)' }}
              />
              {/* Gradient overlay on image */}
              <div
                className="absolute inset-0 h-48"
                style={{ background: `linear-gradient(to bottom, transparent 50%, rgba(14,18,27,0.9) 100%)` }}
              />
            </div>
          )}

          {/* Card body */}
          <div className="flex flex-col gap-4 p-6 pt-5">
            {/* Icon + Year row */}
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{
                  background: `${event.color}15`,
                  border: `1.5px solid ${event.color}35`,
                }}
              >
                {event.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border tracking-widest w-fit"
                  style={{
                    color: event.color,
                    background: `${event.color}10`,
                    borderColor: `${event.color}30`,
                  }}
                >
                  {event.year}
                </span>
                {event.current && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 ml-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Currently Active
                  </span>
                )}
              </div>
            </div>

            {/* Title + subtitle */}
            <div>
              <h3 className="text-xl font-black text-[#F1F1F4] leading-snug">{event.title}</h3>
              <p className="text-[13px] font-semibold mt-1" style={{ color: event.color }}>
                {event.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-[13px] text-[#9CA3AF] leading-relaxed">{event.description}</p>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: `rgba(255,255,255,0.06)` }} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1 rounded-full border"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#9CA3AF',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Corner glow accent */}
          <div
            className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${event.color}12 0%, transparent 70%)`,
              transform: 'translate(30%, 30%)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-24 w-full relative z-10">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6">

        {/* Section heading */}
        <div className="text-center mb-20">
          <span className="section-label">MY JOURNEY</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1F1F4] mt-2">
            From First Line to{' '}
            <span className="gradient-text">Production Systems</span>
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-3 max-w-lg mx-auto leading-relaxed">
            A chronological map of how I grew from curious beginner to backend engineer.
          </p>
        </div>

        {/* ── Stacking cards container ── */}
        <div ref={containerRef} className="relative flex flex-col">
          {/* Extra top padding so first card enters smoothly */}
          <div className="h-4" />
          {timeline.map((event, idx) => (
            <StackCard
              key={event.id}
              event={event}
              index={idx}
              total={timeline.length}
              containerRef={containerRef}
            />
          ))}
          {/* Spacer at bottom so last card is fully visible */}
          <div className="h-32" />
        </div>

      </div>
    </section>
  );
}
