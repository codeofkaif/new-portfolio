import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Star, Trophy, Users } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { profile } from '@/data/profile';
import { useCountUp } from '@/hooks/useCountUp';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';

// ─── Per-card design config ───────────────────────────────────────────────────
const CARD_META = [
  {
    icon: FaGithub,
    chipBg: 'rgba(156,163,175,0.15)',
    chipBorder: 'rgba(156,163,175,0.25)',
    iconColor: '#D1D5DB',
    accent: '#9CA3AF',
    sparkData: [40, 90, 120, 200, 280, 410, 550, 700, 850, 1050, 1150, 1247],
  },
  {
    icon: Code2,
    chipBg: 'rgba(139,92,246,0.15)',
    chipBorder: 'rgba(139,92,246,0.30)',
    iconColor: '#A78BFA',
    accent: '#8B5CF6',
    sparkData: [2, 4, 6, 9, 12, 15, 18, 20, 22, 23, 24, 25],
  },
  {
    icon: Star,
    chipBg: 'rgba(245,199,106,0.12)',
    chipBorder: 'rgba(245,199,106,0.30)',
    iconColor: '#F5C76A',
    accent: '#F5C76A',
    sparkData: [10, 30, 60, 90, 120, 160, 200, 230, 250, 265, 275, 280],
  },
  {
    icon: Trophy,
    chipBg: 'rgba(34,211,238,0.12)',
    chipBorder: 'rgba(34,211,238,0.30)',
    iconColor: '#22D3EE',
    accent: '#22D3EE',
    sparkData: [0.5, 1, 1.5, 2, 2.5, 2.8, 3, 3, 3, 3, 3, 3],
  },
  {
    icon: Users,
    chipBg: 'rgba(244,114,182,0.12)',
    chipBorder: 'rgba(244,114,182,0.30)',
    iconColor: '#F472B6',
    accent: '#F472B6',
    sparkData: [1, 2, 3, 5, 7, 10, 12, 14, 16, 17, 18, 19],
  },
] as const;

// ─── Single animated counter ──────────────────────────────────────────────────
function Counter({
  value,
  suffix,
  accent,
  enabled,
}: {
  value: number;
  suffix: string;
  accent: string;
  enabled: boolean;
}) {
  const count = useCountUp({ target: value, duration: 1600, enabled });
  return (
    <span
      className="text-3xl font-black tabular-nums tracking-tight leading-none"
      style={{ color: accent }}
    >
      {count}
      <span className="text-xl font-bold">{suffix}</span>
    </span>
  );
}

// ─── Sparkline component ──────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: readonly number[]; color: string }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div className="w-20 h-10 shrink-0 opacity-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Single stat card ─────────────────────────────────────────────────────────
function StatCard({
  stat,
  meta,
  index,
}: {
  stat: (typeof profile.stats)[number];
  meta: (typeof CARD_META)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // IntersectionObserver to fire counter once
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setupObserver = (node: HTMLDivElement | null) => {
    if (!node) return;
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observerRef.current.observe(node);
  };

  const Icon = meta.icon;

  return (
    <motion.div
      ref={setupObserver}
      variants={fadeUpItem}
      custom={index}
      whileHover={{ y: -6, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative flex flex-col gap-4 rounded-2xl p-5 overflow-hidden cursor-default"
      style={{
        background: 'rgba(16,21,31,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: `0 0 0 0 ${meta.accent}00, inset 0 1px 0 rgba(255,255,255,0.05)`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${meta.accent}40`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 28px -4px ${meta.accent}30, inset 0 1px 0 rgba(255,255,255,0.07)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${meta.accent}00, inset 0 1px 0 rgba(255,255,255,0.05)`;
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${meta.accent}60, transparent)` }}
      />

      {/* Header row: icon chip + sparkline */}
      <div className="flex items-start justify-between gap-2">
        {/* Icon chip */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: meta.chipBg,
            border: `1px solid ${meta.chipBorder}`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: meta.iconColor }} />
        </div>

        {/* Sparkline tucked to top-right */}
        <Sparkline data={meta.sparkData} color={meta.accent} />
      </div>

      {/* Label (above number) */}
      <p className="text-[11px] font-semibold tracking-wider uppercase text-[#6B7280]">
        {stat.label}
      </p>

      {/* Big animated number */}
      <Counter value={stat.value} suffix={stat.suffix} accent={meta.accent} enabled={inView} />

      {/* Sub-label */}
      <p className="text-[11px] text-[#4B5563] font-medium">{stat.sub}</p>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function StatsRow() {
  return (
    <section className="py-10 w-full relative z-20">
      {/* Neon top divider */}
      <div
        className="h-px w-full mb-8"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(245,199,106,0.18), transparent)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {profile.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} meta={CARD_META[i]} index={i} />
          ))}
        </motion.div>
      </div>

      {/* Neon bottom divider */}
      <div
        className="h-px w-full mt-8"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(245,199,106,0.18), transparent)',
        }}
      />
    </section>
  );
}
