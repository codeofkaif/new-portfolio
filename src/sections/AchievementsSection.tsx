import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { Trophy, Star, Code2, Brain, Award, Zap, Target, BookOpen } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    id: 'leetcode',
    icon: <Code2 className="w-5 h-5" />,
    color: '#F5C76A',
    value: '280+',
    label: 'LeetCode Problems',
    sub: 'DSA & Algorithms Solved',
    category: 'Coding',
  },
  {
    id: 'github',
    icon: <Zap className="w-5 h-5" />,
    color: '#4ADE80',
    value: '1,247',
    label: 'GitHub Contributions',
    sub: 'Commits, PRs & Reviews',
    category: 'Open Source',
  },
  {
    id: 'projects',
    icon: <Trophy className="w-5 h-5" />,
    color: '#8B5CF6',
    value: '25+',
    label: 'Projects Shipped',
    sub: 'Full Stack Applications',
    category: 'Portfolio',
  },
  {
    id: 'ai-program',
    icon: <Brain className="w-5 h-5" />,
    color: '#A78BFA',
    value: '90 hrs',
    label: 'AI & Data Science',
    sub: 'GRAS Intensive Program',
    category: 'Certification',
  },
  {
    id: 'btech',
    icon: <BookOpen className="w-5 h-5" />,
    color: '#22D3EE',
    value: '7th Sem',
    label: 'B.Tech CSE',
    sub: 'BBDU · May 2027',
    category: 'Education',
  },
  {
    id: 'adil',
    icon: <Star className="w-5 h-5" />,
    color: '#FB923C',
    value: 'Live',
    label: 'ADIL CONSTRUCTIONS',
    sub: 'Production App Deployed',
    category: 'Achievement',
  },
  {
    id: 'apis',
    icon: <Target className="w-5 h-5" />,
    color: '#F472B6',
    value: '10+',
    label: 'REST APIs Built',
    sub: 'Spring Boot Production APIs',
    category: 'Backend',
  },
  {
    id: 'years',
    icon: <Award className="w-5 h-5" />,
    color: '#34D399',
    value: '3+ yrs',
    label: 'Coding Journey',
    sub: 'Consistent Learning',
    category: 'Experience',
  },
];

export function AchievementsSection() {
  return (
    <section className="py-16 md:py-20 w-full relative z-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUpItem} className="section-label">MILESTONES</motion.span>
          <motion.h2
            variants={fadeUpItem}
            className="text-3xl md:text-4xl font-extrabold text-[#F1F1F4] mt-2"
          >
            My{' '}
            <span className="gradient-text">Achievements</span>
          </motion.h2>
          <motion.p
            variants={fadeUpItem}
            className="text-sm text-[#9CA3AF] mt-3 max-w-lg mx-auto leading-relaxed"
          >
            Milestones, certifications, and outcomes from my coding journey so far.
          </motion.p>
        </motion.div>

        {/* Achievement cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {ACHIEVEMENTS.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUpItem}
              className="group relative flex flex-col gap-3 rounded-2xl p-5 cursor-default overflow-hidden"
              style={{
                background: 'rgba(16,21,31,0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              whileHover={{
                y: -5,
                borderColor: `${item.color}40`,
                boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${item.color}15`,
              }}
              transition={{ duration: 0.25 }}
            >
              {/* Background glow */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)` }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-4 right-4 h-px rounded-full"
                style={{ background: `linear-gradient(to right, transparent, ${item.color}60, transparent)` }}
              />

              {/* Category badge */}
              <span
                className="text-[9px] font-bold tracking-widest uppercase w-fit px-2 py-0.5 rounded-full border"
                style={{
                  color: item.color,
                  background: `${item.color}12`,
                  borderColor: `${item.color}30`,
                }}
              >
                {item.category}
              </span>

              {/* Icon + value row */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${item.color}15`,
                    border: `1.5px solid ${item.color}35`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-2xl font-black leading-none"
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
              </div>

              {/* Label + sub */}
              <div>
                <p className="text-[13px] font-bold text-[#F1F1F4] leading-snug">{item.label}</p>
                <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
