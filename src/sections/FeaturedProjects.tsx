import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { fadeUpItem, staggerContainer } from '@/lib/motionVariants';

// ─── Status badge styles ───────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Ongoing:       { bg: 'rgba(245,199,106,0.12)', text: '#F5C76A',  border: 'rgba(245,199,106,0.3)' },
  Completed:     { bg: 'rgba(34,197,94,0.12)',   text: '#4ADE80',  border: 'rgba(34,197,94,0.3)'   },
  'In Progress': { bg: 'rgba(99,102,241,0.12)',  text: '#818CF8',  border: 'rgba(99,102,241,0.3)'  },
};

// ─── Single Project Card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES['In Progress'];

  return (
    <motion.div
      variants={fadeUpItem}
      className="group flex flex-col rounded-2xl overflow-hidden h-full cursor-default"
      style={{
        background: 'rgba(16,21,31,0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      whileHover={{
        y: -6,
        borderColor: `${statusStyle.text}35`,
        boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${statusStyle.text}18`,
      }}
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'brightness(0.82) saturate(1.1)' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(10,12,20,0.88) 100%)' }}
        />
        {/* Color accent bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${statusStyle.text}70, transparent)` }}
        />

        {/* Status badge on image */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[9px] font-bold px-2.5 py-1 rounded-full border tracking-widest uppercase"
            style={{
              background: statusStyle.bg,
              color: statusStyle.text,
              borderColor: statusStyle.border,
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.status}
          </span>
        </div>

        {/* GitHub icon on image top-right */}
        <div className="absolute top-3 right-3 flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/30 transition-all backdrop-blur-sm"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/30 transition-all backdrop-blur-sm"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Title */}
        <h3 className="text-[15px] font-black text-[#F1F1F4] leading-tight tracking-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-[#9CA3AF] leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.09)',
                color: '#9CA3AF',
              }}
            >
              {t}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="text-[10px] text-[#6B7280] self-center">+{project.techStack.length - 5}</span>
          )}
        </div>

        {/* Details link */}
        <Link
          to={`/projects/${project.slug}`}
          className="flex items-center gap-1 text-[11px] font-semibold self-end group/link"
          style={{ color: statusStyle.text }}
        >
          Details
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function FeaturedProjects() {
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUpItem} className="section-label">PORTFOLIO</motion.span>
          <motion.h2
            variants={fadeUpItem}
            className="text-3xl md:text-4xl font-extrabold text-[#F1F1F4] mt-2"
          >
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            variants={fadeUpItem}
            className="text-sm text-[#9CA3AF] mt-3 max-w-lg mx-auto leading-relaxed"
          >
            Explore software systems, APIs, and web applications built with modern engineering practices.
          </motion.p>
        </motion.div>

        {/* ── 3-card grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </motion.div>

        {/* ── View All link ── */}
        <motion.div
          variants={fadeUpItem}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold
                       border border-white/10 bg-white/[0.04] text-[#F1F1F4]
                       hover:border-[#F5C76A]/40 hover:bg-[#F5C76A]/[0.07] hover:text-[#F5C76A]
                       transition-all duration-300 group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
