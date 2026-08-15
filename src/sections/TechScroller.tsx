import { useRef, useEffect, useState, useCallback } from 'react';
import {
  FaJava, FaDocker, FaAws, FaGitAlt,
} from 'react-icons/fa';
import {
  SiSpringboot, SiPostgresql, SiMysql, SiRedis,
  SiKubernetes, SiApachekafka, SiMongodb, SiTypescript,
} from 'react-icons/si';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

// ─── Tech list ────────────────────────────────────────────────────────────────
interface TechItem {
  name: string;
  icon: ReactNode;
  color: string;
}

const TECH_LIST: TechItem[] = [
  { name: 'Java',        icon: <FaJava className="w-4 h-4" />,        color: '#f89820' },
  { name: 'Spring Boot', icon: <SiSpringboot className="w-4 h-4" />,  color: '#6db33f' },
  { name: 'PostgreSQL',  icon: <SiPostgresql className="w-4 h-4" />,  color: '#4169e1' },
  { name: 'MySQL',       icon: <SiMysql className="w-4 h-4" />,       color: '#4479A1' },
  { name: 'Redis',       icon: <SiRedis className="w-4 h-4" />,       color: '#dc382d' },
  { name: 'Docker',      icon: <FaDocker className="w-4 h-4" />,      color: '#0db7ed' },
  { name: 'Kubernetes',  icon: <SiKubernetes className="w-4 h-4" />,  color: '#326ce5' },
  { name: 'AWS',         icon: <FaAws className="w-4 h-4" />,         color: '#ff9900' },
  { name: 'Git',         icon: <FaGitAlt className="w-4 h-4" />,      color: '#f05032' },
  { name: 'Kafka',       icon: <SiApachekafka className="w-4 h-4" />, color: '#A5B4FC' },
  { name: 'MongoDB',     icon: <SiMongodb className="w-4 h-4" />,     color: '#47A248' },
  { name: 'TypeScript',  icon: <SiTypescript className="w-4 h-4" />,  color: '#3178C6' },
];

// ─── Single pill badge ────────────────────────────────────────────────────────
function TechPill({ item, isHovered, onHover, onLeave }: {
  item: TechItem;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="flex items-center gap-2 px-4 py-2 rounded-full shrink-0 cursor-default select-none
                 border transition-all duration-250"
      style={{
        background: isHovered ? `${item.color}18` : 'rgba(255,255,255,0.04)',
        borderColor: isHovered ? `${item.color}55` : 'rgba(255,255,255,0.08)',
        color: isHovered ? '#F1F1F4' : '#9CA3AF',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 4px 16px -4px ${item.color}40` : 'none',
      }}
    >
      <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
        {item.icon}
      </span>
      <span className="text-xs font-semibold whitespace-nowrap">{item.name}</span>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function TechScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // ── Auto-scroll marquee ──────────────────────────────────────────
  const startAutoScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (!isPausedRef.current && el.scrollLeft < el.scrollWidth - el.clientWidth) {
        el.scrollLeft += 0.8;
      } else if (!isPausedRef.current) {
        el.scrollLeft = 0; // loop
      }
      autoScrollRef.current = requestAnimationFrame(tick);
    };

    autoScrollRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [startAutoScroll]);

  // Pause on hover
  const pauseScroll = () => { isPausedRef.current = true; };
  const resumeScroll = () => { isPausedRef.current = false; };

  // ── Arrow scroll ─────────────────────────────────────────────────
  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  };

  // ── Arrow visibility ─────────────────────────────────────────────
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
    return () => el.removeEventListener('scroll', updateArrows);
  }, []);

  return (
    <section className="py-12 relative z-10">
      {/* Top divider */}
      <div
        className="h-px w-full mb-10"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)' }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#9CA3AF]">
            Technologies I Work With
          </span>
          {/* Accent dot */}
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: '#F5C76A', boxShadow: '0 0 6px 2px rgba(245,199,106,0.5)' }}
          />
        </div>

        {/* Scroller row */}
        <div className="relative flex items-center gap-3">
          {/* Left arrow */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                       border border-white/[0.08] bg-[#10151F]/70 backdrop-blur-sm
                       text-[#9CA3AF] hover:text-[#F1F1F4] hover:border-white/20
                       hover:bg-white/5 transition-all duration-200
                       disabled:opacity-30 disabled:pointer-events-none"
            style={{ opacity: canScrollLeft ? 1 : 0.25, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable track */}
          <div className="relative flex-1 overflow-hidden">
            {/* Left fade */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to right, #0A0A0A, transparent)',
                opacity: canScrollLeft ? 1 : 0,
              }}
            />
            {/* Right fade */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to left, #0A0A0A, transparent)',
                opacity: canScrollRight ? 1 : 0,
              }}
            />

            {/* Pills row */}
            <div
              ref={scrollRef}
              className="flex gap-2.5 overflow-x-auto py-2 scroll-smooth"
              onMouseEnter={pauseScroll}
              onMouseLeave={resumeScroll}
              onTouchStart={pauseScroll}
              onTouchEnd={resumeScroll}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                cursor: 'grab',
              }}
              // Drag-to-scroll
              onMouseDown={(e) => {
                const el = e.currentTarget;
                const startX = e.pageX - el.offsetLeft;
                const scrollStart = el.scrollLeft;
                el.style.cursor = 'grabbing';

                const onMove = (ev: MouseEvent) => {
                  const walk = (ev.pageX - el.offsetLeft - startX) * 1.2;
                  el.scrollLeft = scrollStart - walk;
                };
                const onUp = () => {
                  el.style.cursor = 'grab';
                  window.removeEventListener('mousemove', onMove);
                  window.removeEventListener('mouseup', onUp);
                };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
              }}
            >
              {/* Duplicate list for seamless loop feel */}
              {[...TECH_LIST, ...TECH_LIST].map((item, i) => (
                <TechPill
                  key={`${item.name}-${i}`}
                  item={item}
                  isHovered={hoveredIdx === i}
                  onHover={() => setHoveredIdx(i)}
                  onLeave={() => setHoveredIdx(null)}
                />
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                       border border-white/[0.08] bg-[#10151F]/70 backdrop-blur-sm
                       text-[#9CA3AF] hover:text-[#F1F1F4] hover:border-white/20
                       hover:bg-white/5 transition-all duration-200"
            style={{ opacity: canScrollRight ? 1 : 0.25, pointerEvents: canScrollRight ? 'auto' : 'none' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="h-px w-full mt-10"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)' }}
      />
    </section>
  );
}
