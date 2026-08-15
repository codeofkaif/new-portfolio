import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { Code2, GraduationCap, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { Sparkline } from '@/components/Sparkline';

const STAT_CONFIG: {
  label: string;
  icon: ReactNode;
  value: string | number;
  suffix: string;
  sub: string;
  sparkData: number[];
  sparkColor: string;
}[] = [
  {
    label: 'DSA Problems Solved',
    icon: <Code2 className="w-5 h-5 text-[#9CA3AF]" />,
    value: 280,
    suffix: '+',
    sub: 'DSA Problems Solved',
    sparkData: [5, 12, 10, 20, 30, 45, 60, 80, 100, 150, 200, 280],
    sparkColor: '#F5C76A',
  },
  {
    label: 'Projects Completed',
    icon: <span className="text-xl">📁</span>,
    value: 25,
    suffix: '+',
    sub: 'Projects Completed',
    sparkData: [1, 2, 3, 5, 8, 12, 15, 18, 21, 23, 24, 25],
    sparkColor: '#F5C76A',
  },
  {
    label: 'Years of Learning',
    icon: <GraduationCap className="w-5 h-5 text-[#9CA3AF]" />,
    value: 3,
    suffix: '+',
    sub: 'Years of Learning',
    sparkData: [10, 20, 25, 40, 50, 60, 75, 85, 95, 105, 115, 120],
    sparkColor: '#F5C76A',
  },
  {
    label: 'GitHub Contributions',
    icon: <FaGithub className="w-5 h-5 text-[#9CA3AF]" />,
    value: '1.2',
    suffix: 'K+',
    sub: 'GitHub Contributions',
    sparkData: [10, 20, 30, 60, 80, 110, 150, 220, 280, 310, 380, 420],
    sparkColor: '#8B5CF6',
  },
  {
    label: 'Happy Clients',
    icon: <Users className="w-5 h-5 text-[#9CA3AF]" />,
    value: 19,
    suffix: '+',
    sub: 'Happy Clients',
    sparkData: [0, 1, 2, 3, 5, 7, 9, 12, 14, 16, 18, 19],
    sparkColor: '#3B82F6',
  },
];

function AnimatedCounter({ value, suffix }: { value: string | number; suffix: string }) {
  return (
    <span className="text-2xl font-bold text-[#F1F1F4] tabular-nums tracking-tight">
      {value}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-8 w-full border-b border-white/[0.05] relative z-20 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {STAT_CONFIG.map((stat) => (
            <motion.div key={stat.label} variants={fadeUpItem} className="stat-card">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div>
                  <p className="text-[11px] text-[#9CA3AF] font-medium mb-3">
                    {stat.sub}
                  </p>
                  <div className="h-6 w-full">
                    <Sparkline data={stat.sparkData} color={stat.sparkColor} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
