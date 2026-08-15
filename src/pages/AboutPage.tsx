import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { profile } from '@/data/profile';
import {
  GraduationCap, BookOpen, Award, MapPin,
  Download, Briefcase, ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { JourneyTimeline } from '@/sections/JourneyTimeline';
import { Link } from 'react-router-dom';

// ── Portrait / photo treatment ────────────────────────────────────────────────
function Portrait() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className="absolute w-52 h-52 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,199,106,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Rotating accent border */}
      <motion.div
        className="absolute w-44 h-44 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #F5C76A, #8B5CF6, #22D3EE, #F5C76A)',
          padding: 2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      {/* Photo or fallback initials */}
      <div
        className="relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center z-10"
        style={{
          background: 'rgba(16,21,31,0.9)',
          border: '3px solid rgba(16,21,31,1)',
        }}
      >
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            // Fallback: hide img and show initials
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Initials fallback (visible behind img) */}
        <span className="absolute text-3xl font-black gradient-text select-none pointer-events-none">
          {profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </span>
      </div>

      {/* Status badge */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap z-20"
        style={{
          background: 'rgba(16,21,31,0.95)',
          border: '1px solid rgba(52,211,153,0.35)',
          color: '#34D399',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 20px rgba(52,211,153,0.18)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Open to Internship
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <PageWrapper>
      {/* ── Hero row: portrait + bio ── */}
      <Section id="about" spacing="default">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-14"
        >
          {/* Top label */}
          <motion.div variants={fadeUpItem} className="text-center">
            <span className="section-label">GET TO KNOW ME</span>
          </motion.div>

          {/* Portrait + bio two-col */}
          <motion.div
            variants={fadeUpItem}
            className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 items-center max-w-5xl mx-auto"
          >
            {/* Portrait */}
            <div className="flex justify-center lg:justify-start">
              <Portrait />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F1F1F4] mb-1">
                  {profile.name}
                </h1>
                <p className="text-sm font-mono font-semibold text-[#F5C76A] tracking-wider uppercase">
                  {profile.role}
                </p>
              </div>

              {/* Full bio paragraph */}
              <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                {profile.tagline} I'm currently in my{' '}
                <span className="text-[#F1F1F4] font-semibold">{profile.education.semester}</span>{' '}
                at{' '}
                <span className="text-[#F1F1F4] font-semibold">{profile.education.university}</span>,
                pursuing a{' '}
                <span className="text-[#F1F1F4] font-semibold">{profile.education.degree}</span>{' '}
                (expected graduation:{' '}
                <span className="text-[#F5C76A] font-semibold">{profile.education.expectedGraduation}</span>).
                Alongside my degree, I've been deepening my AI expertise through{' '}
                <span className="text-[#F1F1F4] font-semibold">{profile.learning[0]}</span>
              </p>

              {/* Currently status */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{
                  background: 'rgba(52,211,153,0.07)',
                  borderColor: 'rgba(52,211,153,0.25)',
                }}
              >
                <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">Currently</p>
                  <p className="text-[13px] font-semibold text-emerald-400">{profile.status}</p>
                </div>
              </div>

              {/* Location + actions */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </div>

                <div className="flex items-center gap-2 ml-auto lg:ml-0">
                  <a
                    href={profile.resumeLink}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold
                               transition-all duration-200 active:scale-95 hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #F5C76A, #EAB308)',
                      color: '#07070A',
                      boxShadow: '0 0 16px rgba(245,199,106,0.3)',
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Resume
                  </a>
                  <Link
                    to="/skills"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border
                               border-white/[0.10] bg-white/[0.04] text-[#F1F1F4]
                               hover:border-white/25 hover:bg-white/[0.08] transition-all"
                  >
                    Skills <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Info cards row ── */}
          <motion.div
            variants={fadeUpItem}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto w-full"
          >
            {/* Education card */}
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{
                background: 'rgba(16,21,31,0.55)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}
                >
                  <GraduationCap className="w-4 h-4 text-[#A78BFA]" />
                </div>
                <h3 className="text-[14px] font-bold text-[#F1F1F4]">Education</h3>
              </div>
              <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'rgba(139,92,246,0.35)' }}>
                <p className="text-[13px] font-semibold text-[#F1F1F4]">{profile.education.degree}</p>
                <p className="text-[12px] text-[#A78BFA] font-medium">{profile.education.university}</p>
                <p className="text-[11px] text-[#6B7280] font-mono">
                  {profile.education.semester} · Expected {profile.education.expectedGraduation}
                </p>
              </div>
            </div>

            {/* Learning card */}
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{
                background: 'rgba(16,21,31,0.55)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(245,199,106,0.10)', border: '1px solid rgba(245,199,106,0.25)' }}
                >
                  <BookOpen className="w-4 h-4 text-[#F5C76A]" />
                </div>
                <h3 className="text-[14px] font-bold text-[#F1F1F4]">Special Training</h3>
              </div>
              <ul className="space-y-2.5">
                {profile.learning.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Award className="w-3.5 h-3.5 text-[#F5C76A] shrink-0 mt-0.5" />
                    <span className="text-[12px] text-[#9CA3AF] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Journey Timeline ── */}
      <JourneyTimeline />
    </PageWrapper>
  );
}
