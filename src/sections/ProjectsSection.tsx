import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/* ─── Dashboard mockup with green line chart ─── */
function ProjectMockup() {
  return (
    <div className="w-full h-full min-h-[200px] rounded-xl bg-[#0D0D0F] border border-white/[0.06] p-3 flex flex-col gap-2.5 relative overflow-hidden">
      {/* Top nav strip */}
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="w-16 h-1.5 bg-white/10 rounded-full" />
        <div className="ml-auto flex gap-1">
          <div className="w-8 h-1.5 bg-white/10 rounded-full" />
          <div className="w-8 h-1.5 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Mini stat widgets */}
      <div className="grid grid-cols-3 gap-1.5">
        {['1.4K', '98%', '$48K'].map((val, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-1.5 border border-white/[0.04]">
            <div className="text-[8px] text-[#9CA3AF] mb-0.5">Metric {i + 1}</div>
            <div className="text-[10px] font-bold text-[#F1F1F4]">{val}</div>
          </div>
        ))}
      </div>

      {/* Green line chart */}
      <div className="flex-1 bg-white/[0.03] rounded-lg border border-white/[0.04] overflow-hidden relative p-2 flex items-end">
        <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M0,50 C30,40 50,55 70,30 S110,10 140,20 S175,35 200,15 L200,60 L0,60 Z" fill="url(#greenGrad)" />
          <path d="M0,50 C30,40 50,55 70,30 S110,10 140,20 S175,35 200,15" fill="none" stroke="#22c55e" strokeWidth="2" />
        </svg>
        {/* Floating profile avatar stack */}
        <div className="absolute bottom-2 right-2 flex -space-x-1.5">
          {['#F5C76A','#F5C76A','#06B6D4'].map((c, i) => (
            <div key={i} className="w-5 h-5 rounded-full border border-[#0D0D0F] flex items-center justify-center text-[7px] font-bold text-white" style={{ background: c }}>
              {['M','P','A'][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── GitHub Activity Heatmap ─── */
function GitHubActivityCard() {
  // 7 rows × 11 cols of fake contribution cells
  const weeks = Array.from({ length: 11 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );
  const levels = ['bg-white/[0.04]', 'bg-[#F5C76A]/20', 'bg-[#F5C76A]/40', 'bg-[#F5C76A]/65', 'bg-[#F5C76A]'];
  const months = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];

  return (
    <div className="bg-transparent border border-white/[0.07] rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-bold text-[#F1F1F4]">GitHub Activity</h3>
      </div>
      <p className="text-xs text-[#9CA3AF] mb-4">522 contributions in the last year</p>

      {/* Month labels */}
      <div className="flex gap-0.5 mb-1 pl-0">
        {months.map((m) => (
          <span key={m} className="text-[7px] text-[#9CA3AF] w-4 shrink-0 text-center">{m}</span>
        ))}
      </div>

      {/* Heatmap grid — rows = days of week, cols = weeks */}
      <div className="flex gap-0.5 mb-4">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((level, di) => (
              <div
                key={di}
                className={`w-3.5 h-3.5 rounded-sm ${levels[level]}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Commits', value: '1.2K+' },
          { label: 'Repos', value: '42' },
          { label: 'Followers', value: '310' },
          { label: 'Following', value: '98' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-sm font-bold text-[#F1F1F4]">{s.value}</p>
            <p className="text-[9px] text-[#9CA3AF]">{s.label}</p>
          </div>
        ))}
      </div>

      <a
        href="https://github.com/codeofkaif"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-semibold text-[#9CA3AF] hover:text-[#F1F1F4] transition-colors"
      >
        <span>View GitHub Profile</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

/* ─── Experience Timeline Card ─── */
function ExperienceTimelineCard() {
  const items = [
    { period: '2024 – Present', role: 'Backend Developer', desc: 'Building scalable systems & AI solutions', color: '#F5C76A' },
    { period: '2023 – 2024', role: 'Full Stack Developer Intern', desc: 'Worked on multiple real-world projects', color: '#F5C76A' },
    { period: '2022 – 2023', role: 'DSA & Problem Solving', desc: 'Solved 280+ problems on LeetCode', color: '#6366F1' },
  ];

  return (
    <div className="bg-transparent border border-white/[0.07] rounded-2xl p-5 flex flex-col h-full">
      <h3 className="text-[13px] font-bold text-[#F1F1F4] mb-5">Experience Timeline</h3>

      <div className="flex flex-col gap-4 flex-1">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3">
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}80` }} />
              {i < items.length - 1 && (
                <div className="w-px flex-1 mt-1 bg-gradient-to-b from-white/10 to-transparent" />
              )}
            </div>
            {/* Content */}
            <div className="pb-2">
              <p className="text-[10px] font-mono font-semibold mb-0.5" style={{ color: item.color }}>{item.period}</p>
              <p className="text-sm font-bold text-[#F1F1F4] leading-snug">{item.role}</p>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Projects Section ─── */
export function ProjectsSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Section id="projects" spacing="default">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-4"
      >
        {/* Top 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4">

          {/* COL 1: Featured Project Card */}
          <motion.div
            variants={fadeUpItem}
            className="bg-transparent border border-white/[0.07] rounded-2xl p-5 flex flex-col hover:border-white/[0.12] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-bold text-[#F1F1F4]">Featured Project</h3>
                <span className="w-2 h-2 rounded-full bg-[#F5C76A]" />
              </div>
              <Link
                to="/projects"
                className="text-[10px] text-[#9CA3AF] hover:text-[#F1F1F4] transition-colors flex items-center gap-1"
              >
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Mockup preview */}
            <div className="flex-1 mb-4">
              <ProjectMockup />
            </div>

            {/* Project info */}
            <div>
              <h4 className="text-sm font-bold text-[#F1F1F4] mb-1.5">Hospital Management System</h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed mb-3">
                A comprehensive system built with Spring Boot for managing hospital operations, appointments, doctors, patients and billing.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Spring Boot', 'PostgreSQL', 'Redis', 'Docker'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/[0.08] text-[#9CA3AF]">{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5C76A] text-[#07070A] text-xs font-bold hover:opacity-90 transition-all"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href="https://github.com/codeofkaif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-xs font-semibold text-[#F1F1F4] hover:border-white/20 transition-all"
                >
                  <span>GitHub</span>
                  <FaGithub className="w-3 h-3" />
                </a>
              </div>

              {/* Carousel dots */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
                <div className="flex gap-1.5">
                  <button onClick={() => setActiveSlide((p) => Math.max(0, p - 1))} className="p-1 rounded-lg text-[#9CA3AF] hover:text-[#F1F1F4] bg-white/5 border border-white/[0.06]">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setActiveSlide((p) => Math.min(3, p + 1))} className="p-1 rounded-lg text-[#9CA3AF] hover:text-[#F1F1F4] bg-white/5 border border-white/[0.06]">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === i ? 'w-4 bg-[#F5C76A]' : 'w-1.5 bg-white/20'}`} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* COL 2: GitHub Activity */}
          <motion.div variants={fadeUpItem}>
            <GitHubActivityCard />
          </motion.div>

          {/* COL 3: Experience Timeline */}
          <motion.div variants={fadeUpItem}>
            <ExperienceTimelineCard />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
