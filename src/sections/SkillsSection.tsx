import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaJava, FaPython, FaDocker, FaAws, FaGithub } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiMysql, SiRedis, SiMongodb } from 'react-icons/si';
import { Code2, Database, Server, Cloud } from 'lucide-react';
import type { ReactNode } from 'react';

interface Skill { name: string; icon: ReactNode; percent: number; color?: string; }
interface Category { title: string; icon: ReactNode; skills: Skill[]; }

const CATEGORIES: Category[] = [
  {
    title: 'Languages',
    icon: <Code2 className="w-4 h-4 text-[#8B5CF6]" />,
    skills: [
      { name: 'Java', icon: <FaJava className="w-4 h-4 text-[#f89820]" />, percent: 90 },
      { name: 'Python', icon: <FaPython className="w-4 h-4 text-[#ffd43b]" />, percent: 75 },
      { name: 'SQL', icon: <Database className="w-4 h-4 text-[#F1F1F4]" />, percent: 80 },
      { name: 'JavaScript (ES6+)', icon: <span className="w-4 h-4 bg-[#f7df1e] text-black text-[9px] font-bold flex items-center justify-center rounded-sm">JS</span>, percent: 70 },
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="w-4 h-4 text-[#3B82F6]" />,
    skills: [
      { name: 'Spring Boot', icon: <SiSpringboot className="w-4 h-4 text-[#6db33f]" />, percent: 90 },
      { name: 'Spring Security', icon: <SiSpringboot className="w-4 h-4 text-[#6db33f]" />, percent: 85 },
      { name: 'RESTful APIs', icon: <Server className="w-4 h-4 text-[#3B82F6]" />, percent: 90 },
      { name: 'Microservices', icon: <Server className="w-4 h-4 text-[#10B981]" />, percent: 75 },
    ],
  },
  {
    title: 'Databases',
    icon: <Database className="w-4 h-4 text-[#A855F7]" />,
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="w-4 h-4 text-[#4169e1]" />, percent: 85 },
      { name: 'MySQL', icon: <SiMysql className="w-4 h-4 text-[#4479a1]" />, percent: 80 },
      { name: 'Redis', icon: <SiRedis className="w-4 h-4 text-[#dc382d]" />, percent: 75 },
      { name: 'MongoDB', icon: <SiMongodb className="w-4 h-4 text-[#47a248]" />, percent: 60 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: <Cloud className="w-4 h-4 text-[#EC4899]" />,
    skills: [
      { name: 'Docker', icon: <FaDocker className="w-4 h-4 text-[#0db7ed]" />, percent: 80 },
      { name: 'Git & GitHub', icon: <FaGithub className="w-4 h-4 text-white" />, percent: 90 },
      { name: 'AWS (Basics)', icon: <FaAws className="w-4 h-4 text-[#ff9900]" />, percent: 65 },
      { name: 'Postman', icon: <span className="w-4 h-4 rounded-full bg-[#FF6C37]" />, percent: 85 },
    ],
  },
];

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-3">
          {skill.icon}
          <span className="text-[11px] font-semibold text-[#F1F1F4]">{skill.name}</span>
        </div>
        <span className="text-[10px] text-[#9CA3AF] font-medium">{skill.percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]"
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 w-full border-b border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
            <motion.div variants={fadeUpItem} className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
                <span className="text-[11px] font-medium text-[#8B5CF6] tracking-widest uppercase">TECH SKILLS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1F1F4] leading-tight mb-4">
                Tech Stack
              </h2>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-8 max-w-[260px]">
                Technologies I work with to build scalable, efficient and modern applications.
              </p>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.12] bg-transparent hover:bg-white/5 hover:border-white/20 text-[#F1F1F4] text-sm font-semibold transition-all duration-200">
                <span>Browse Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUpItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {CATEGORIES.map((cat) => (
                <div key={cat.title}>
                  <div className="flex items-center gap-2 mb-6 border-b border-white/[0.06] pb-3">
                    {cat.icon}
                    <h3 className="text-[14px] font-bold text-[#F1F1F4]">{cat.title}</h3>
                  </div>
                  <div className="space-y-5">
                    {cat.skills.map((skill) => <SkillBar key={skill.name} skill={skill} />)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
