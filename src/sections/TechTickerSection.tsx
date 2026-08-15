import type { ReactNode } from 'react';
import {
  FaJava, FaDocker, FaAws,
} from 'react-icons/fa';
import {
  SiSpringboot, SiMysql, SiPostgresql,
  SiRedis, SiKubernetes, SiApachekafka,
} from 'react-icons/si';
import { Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

interface TickerItem { name: string; icon: ReactNode; color: string; active?: boolean; activeColor?: string; }

const TICKER_ITEMS: TickerItem[] = [
  { name: 'Backend', icon: <SiSpringboot className="w-3.5 h-3.5" />, color: '#F5C76A', active: true, activeColor: '#F5C76A' },
  { name: 'Spring Boot', icon: <SiSpringboot className="w-3.5 h-3.5" />, color: '#6db33f' },
  { name: 'Java', icon: <FaJava className="w-3.5 h-3.5" />, color: '#f89820' },
  { name: 'PostgreSQL', icon: <SiPostgresql className="w-3.5 h-3.5" />, color: '#4169e1' },
  { name: 'Redis', icon: <SiRedis className="w-3.5 h-3.5" />, color: '#dc382d' },
  { name: 'Kafka', icon: <SiApachekafka className="w-3.5 h-3.5" />, color: '#F1F1F4' },
  { name: 'Docker', icon: <FaDocker className="w-3.5 h-3.5" />, color: '#0db7ed' },
  { name: 'Kubernetes', icon: <SiKubernetes className="w-3.5 h-3.5" />, color: '#326ce5' },
  { name: 'AWS', icon: <FaAws className="w-3.5 h-3.5" />, color: '#ff9900' },
  { name: 'AI / ML', icon: <Cpu className="w-3.5 h-3.5" />, color: '#F5C76A', active: true, activeColor: '#F5C76A' },
  { name: 'LangChain', icon: <Cpu className="w-3.5 h-3.5" />, color: '#1C3C3C' },
  { name: 'OpenAI API', icon: <Cpu className="w-3.5 h-3.5" />, color: '#10a37f' },
  { name: 'RAG', icon: <Cpu className="w-3.5 h-3.5" />, color: '#F5C76A' },
  { name: 'Vector DB', icon: <SiMysql className="w-3.5 h-3.5" />, color: '#F5C76A' },
  { name: 'Hugging Face', icon: <Cpu className="w-3.5 h-3.5" />, color: '#FFD21E' },
];

export function TechTickerSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="py-6 relative">
      {/* Top border */}
      <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center gap-3">
          {/* Left arrow */}
          <button
            className="shrink-0 w-8 h-8 rounded-full bg-[#0F0F14] border border-white/[0.08] text-[#9CA3AF] hover:text-[#F1F1F4] flex items-center justify-center hover:border-white/20 transition-all z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Marquee track */}
          <div className="relative flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-[#07070A] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-[#07070A] to-transparent" />

            <div className="flex gap-2 animate-marquee hover:[animation-play-state:paused] py-1">
              {doubled.map((item, i) => {
                const isActive = item.active;
                return (
                  <div
                    key={`${item.name}-${i}`}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shrink-0 cursor-default transition-all duration-200 text-xs font-semibold border"
                    style={
                      isActive
                        ? {
                            background: `${item.activeColor}20`,
                            borderColor: `${item.activeColor}50`,
                            color: item.activeColor,
                          }
                        : {
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.07)',
                            color: '#9CA3AF',
                          }
                    }
                  >
                    <span style={{ color: isActive ? item.activeColor : item.color }}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            className="shrink-0 w-8 h-8 rounded-full bg-[#0F0F14] border border-white/[0.08] text-[#9CA3AF] hover:text-[#F1F1F4] flex items-center justify-center hover:border-white/20 transition-all z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="h-px w-full mt-4" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />
    </section>
  );
}
