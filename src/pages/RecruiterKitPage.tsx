import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import {
  Download, ExternalLink, Code2, Briefcase,
  Star, GitBranch, Calendar, Users, GraduationCap,
  Server, FileText, Rocket,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// ── Kit card ──────────────────────────────────────────────────────────────────
interface KitCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  accent: string;
  action: React.ReactNode;
}

function KitCard({ icon, label, description, accent, action }: KitCardProps) {
  return (
    <motion.div
      variants={fadeUpItem}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex flex-col gap-4 rounded-2xl p-5 cursor-default"
      style={{
        background: 'rgba(16,21,31,0.55)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${accent}55, transparent)` }}
      />
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}15`, border: `1px solid ${accent}35` }}
        >
          <span style={{ color: accent }}>{icon}</span>
        </div>
        <div>
          <p className="text-[13px] font-bold text-[#F1F1F4]">{label}</p>
          <p className="text-[11px] text-[#6B7280]">{description}</p>
        </div>
      </div>
      <div className="mt-auto">{action}</div>
    </motion.div>
  );
}

// ── Stat mini ─────────────────────────────────────────────────────────────────
function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xl font-black" style={{ color }}>{value}</span>
      <span className="text-[10px] text-[#6B7280] font-mono">{label}</span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function RecruiterKitPage() {
  const featured = projects.filter((p) => p.status !== 'In Progress').slice(0, 2);

  return (
    <PageWrapper>
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#F2B93A]/4 blur-[150px]" />
      </div>

      <Section id="recruiter-kit" spacing="default" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* ── Hero banner ── */}
          <motion.div
            variants={fadeUpItem}
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
            style={{
              background: 'rgba(16,21,31,0.7)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#F5C76A]/8 blur-[100px]" />
              <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-[#8B5CF6]/8 blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1 space-y-4">
                <span className="section-label">RECRUITER KIT</span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F1F1F4]">
                  {profile.name}
                </h1>
                <p className="text-sm font-mono font-semibold text-[#F5C76A] tracking-wider uppercase">
                  {profile.role} · Seeking Internship
                </p>
                <p className="text-[13px] text-[#9CA3AF] leading-relaxed max-w-md">
                  {profile.tagline}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.techStack.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#9CA3AF' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div
                className="grid grid-cols-2 gap-6 shrink-0 p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <StatPill value="1.2K+" label="GH Contributions" color="#9CA3AF" />
                <StatPill value="25+"   label="Projects"          color="#8B5CF6" />
                <StatPill value="280+"  label="LeetCode"          color="#F5C76A" />
                <StatPill value="3+"    label="Yrs Learning"      color="#22D3EE" />
              </div>
            </div>
          </motion.div>

          {/* ── Education + Status ── */}
          <motion.div variants={fadeUpItem} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-5 flex items-start gap-4"
              style={{ background: 'rgba(16,21,31,0.55)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <GraduationCap className="w-4 h-4 text-[#A78BFA]" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] mb-1">Education</p>
                <p className="text-[13px] font-bold text-[#F1F1F4]">{profile.education.degree}</p>
                <p className="text-[11px] text-[#A78BFA]">{profile.education.university}</p>
                <p className="text-[10px] font-mono text-[#6B7280] mt-0.5">{profile.education.semester} · Grad {profile.education.expectedGraduation}</p>
              </div>
            </div>
            <div
              className="rounded-2xl p-5 flex items-start gap-4"
              style={{ background: 'rgba(16,21,31,0.55)', backdropFilter: 'blur(20px)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <Rocket className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] mb-1">Current Status</p>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[13px] font-bold text-emerald-400">{profile.status}</p>
                </div>
                <p className="text-[10px] font-mono text-[#6B7280]">{profile.location}</p>
              </div>
            </div>
          </motion.div>

          {/* ── Kit cards grid ── */}
          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <KitCard
              icon={<FileText className="w-5 h-5" />}
              label="Resume / CV"
              description="Full résumé · PDF download"
              accent="#F5C76A"
              action={
                <a
                  href={profile.resumeLink}
                  download
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#F5C76A,#EAB308)', color: '#07070A' }}
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              }
            />
            <KitCard
              icon={<Code2 className="w-5 h-5" />}
              label="Skills & Stack"
              description="Proficiency radar chart"
              accent="#8B5CF6"
              action={
                <Link
                  to="/skills"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/[0.12] text-[#F1F1F4] hover:bg-white/5 transition-all"
                >
                  <Code2 className="w-3.5 h-3.5" /> View Skills
                </Link>
              }
            />
            <KitCard
              icon={<Briefcase className="w-5 h-5" />}
              label="Projects"
              description="3 real production projects"
              accent="#22D3EE"
              action={
                <Link
                  to="/projects"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/[0.12] text-[#F1F1F4] hover:bg-white/5 transition-all"
                >
                  <Briefcase className="w-3.5 h-3.5" /> Browse Projects
                </Link>
              }
            />
            <KitCard
              icon={<Star className="w-5 h-5" />}
              label="Achievements"
              description="280+ LeetCode · 1.2K GH"
              accent="#F472B6"
              action={
                <Link
                  to="/about"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/[0.12] text-[#F1F1F4] hover:bg-white/5 transition-all"
                >
                  <Star className="w-3.5 h-3.5" /> View Journey
                </Link>
              }
            />
            <KitCard
              icon={<Server className="w-5 h-5" />}
              label="Architecture"
              description="System design deep-dives"
              accent="#FB923C"
              action={
                <Link
                  to={`/projects/${projects[1]?.slug ?? 'hospital-management-api'}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/[0.12] text-[#F1F1F4] hover:bg-white/5 transition-all"
                >
                  <Server className="w-3.5 h-3.5" /> Case Study
                </Link>
              }
            />
            <KitCard
              icon={<FaGithub className="w-5 h-5" />}
              label="GitHub"
              description="Source code & contributions"
              accent="#9CA3AF"
              action={
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/[0.12] text-[#F1F1F4] hover:bg-white/5 transition-all"
                >
                  <GitBranch className="w-3.5 h-3.5" /> Open GitHub
                </a>
              }
            />
            <KitCard
              icon={<FaLinkedin className="w-5 h-5" />}
              label="LinkedIn"
              description="Professional profile"
              accent="#0A66C2"
              action={
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/[0.12] text-[#F1F1F4] hover:bg-white/5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Connect
                </a>
              }
            />
            <KitCard
              icon={<Calendar className="w-5 h-5" />}
              label="Schedule Interview"
              description="Pick a time that works"
              accent="#34D399"
              action={
                <a
                  href="https://calendly.com" // TODO: Replace with real Calendly link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.35)', color: '#34D399' }}
                >
                  <Calendar className="w-3.5 h-3.5" /> Book a Slot
                </a>
              }
            />
          </motion.div>

          {/* ── Featured project snapshots ── */}
          <motion.div variants={fadeUpItem} className="space-y-4">
            <h2 className="text-[13px] font-bold text-[#F1F1F4] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F5C76A]" />
              Highlighted Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="group rounded-2xl p-5 transition-all duration-200 hover:border-white/[0.14]"
                  style={{ background: 'rgba(16,21,31,0.55)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-[13px] font-black text-[#F1F1F4] group-hover:text-[#F5C76A] transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0"
                      style={{
                        background: p.status === 'Completed' ? 'rgba(34,197,94,0.12)' : 'rgba(245,199,106,0.12)',
                        color: p.status === 'Completed' ? '#4ADE80' : '#F5C76A',
                        borderColor: p.status === 'Completed' ? 'rgba(34,197,94,0.3)' : 'rgba(245,199,106,0.3)',
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#6B7280' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ── CTA strip ── */}
          <motion.div
            variants={fadeUpItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 border-t border-white/[0.06]"
          >
            <p className="text-[13px] text-[#9CA3AF]">Ready to chat?</p>
            <a
              href={`mailto:${profile.socials.email}`}
              className="btn-primary px-8 py-3 text-sm"
            >
              Get In Touch
            </a>
            <Link to="/contact" className="btn-ghost px-6 py-2.5 text-sm">
              Contact Page →
            </Link>
          </motion.div>
        </motion.div>
      </Section>
    </PageWrapper>
  );
}
