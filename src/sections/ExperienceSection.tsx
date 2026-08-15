import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { Download, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { profile } from '@/data/profile';
import { Briefcase, Building, Code2 } from 'lucide-react';

const TIMELINE_ITEMS = [
  {
    id: 'backend-dev',
    period: 'Jan 2024 – Present',
    role: 'Backend Developer',
    company: 'ByteTech Solutions',
    color: '#8B5CF6',
    icon: <Briefcase className="w-4 h-4" />,
    bullets: [
      'Building scalable REST APIs',
      'Implementing microservices',
      'Working with Spring Boot, PostgreSQL & Redis',
    ],
  },
  {
    id: 'sde-intern',
    period: 'Aug 2023 – Dec 2023',
    role: 'Software Developer Intern',
    company: 'CodeSoft Labs',
    color: '#3B82F6',
    icon: <Building className="w-4 h-4" />,
    bullets: [
      'Developed and optimized backend modules',
      'Integrated APIs and third-party services',
      'Collaborated in agile team',
    ],
  },
  {
    id: 'java-intern',
    period: 'Jan 2023 – Jul 2023',
    role: 'Java Developer Intern',
    company: 'TechnoHacks EduTech',
    color: '#A855F7',
    icon: <Code2 className="w-4 h-4" />,
    bullets: [
      'Built core Java applications',
      'Learned OOP, Collections, Exception Handling',
      'Improved problem-solving & DSA skills',
    ],
  },
  {
    id: 'oss',
    period: '2022 – 2023',
    role: 'Open Source Contributor',
    company: 'GitHub',
    color: '#EC4899',
    icon: <FaGithub className="w-4 h-4" />,
    bullets: [
      'Contributed to open source projects',
      'Fixed bugs and improved documentation',
      'Collaborated with global developer community',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 w-full border-b border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Top section: Title & View All */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <motion.div variants={fadeUpItem} className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
                <span className="text-[11px] font-medium text-[#8B5CF6] tracking-widest uppercase">EXPERIENCE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1F1F4] leading-tight mb-3">
                My Journey So Far
              </h2>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6 max-w-sm">
                A timeline of my professional journey, internships, and impactful contributions.
              </p>
              <a href={profile.resumeLink} download
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-white/[0.12] bg-transparent hover:bg-white/5 hover:border-white/20 text-[#F1F1F4] text-sm font-semibold transition-all duration-200">
                <span>Download Resume</span>
                <Download className="w-4 h-4 text-[#9CA3AF]" />
              </a>
            </motion.div>
            
            <motion.div variants={fadeUpItem} className="shrink-0 hidden lg:block">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.10] bg-transparent hover:bg-white/5 text-[#F1F1F4] text-xs font-medium transition-all duration-200">
                <span>View All Experience</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Cards & Timeline */}
          <motion.div variants={fadeUpItem} className="relative">
            {/* Horizontal Timeline Rail */}
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#EC4899] shadow-[0_0_15px_rgba(139,92,246,0.5)] z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
              {TIMELINE_ITEMS.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex w-4 h-4 rounded-full bg-[#F1F1F4] border-[3px] border-[#0A0A0A] shadow-[0_0_12px_#F1F1F4] mb-8" />
                  
                  {/* Card */}
                  <div className="bg-transparent border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.14] transition-all duration-300 group w-full h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="text-[10px] font-mono text-white/50 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full inline-block mb-3">
                          {item.period}
                        </div>
                        <h3 className="text-[14px] font-bold text-[#F1F1F4] leading-snug group-hover:text-white transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-[12px] font-semibold mt-1" style={{ color: item.color }}>
                          {item.company}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                        {item.icon}
                      </div>
                    </div>
                    
                    <ul className="mt-4 space-y-2.5 flex-1">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-[#9CA3AF]">
                          <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
