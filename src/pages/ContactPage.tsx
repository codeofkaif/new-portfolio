import { useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { profile } from '@/data/profile';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import {
  Mail, Copy, CheckCheck, Download,
  Calendar, ExternalLink, MapPin, Zap,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { AIChatBox } from '@/components/AIChatBox';
import { knowledgeBase } from '@/data/knowledge';

// ── Social card ───────────────────────────────────────────────────────────────
interface SocialCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  accent: string;
  description: string;
}

function SocialCard({ icon, label, value, href, accent, description }: SocialCardProps) {
  return (
    <motion.a
      variants={fadeUpItem}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex items-start gap-4 rounded-2xl p-5 cursor-pointer group"
      style={{
        background: 'rgba(16,21,31,0.55)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.25s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent}40`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}15`, border: `1px solid ${accent}35` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] mb-0.5">{label}</p>
        <p className="text-[13px] font-bold text-[#F1F1F4] truncate group-hover:text-white">{value}</p>
        <p className="text-[11px] text-[#9CA3AF] mt-0.5">{description}</p>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-[#4B5563] group-hover:text-[#9CA3AF] shrink-0 mt-1 transition-colors" />
    </motion.a>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageWrapper>
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#F2B93A]/4 blur-[130px]" />
      </div>

      <Section id="contact-page" spacing="default" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto space-y-14"
        >
          {/* ── Heading ── */}
          <motion.div variants={fadeUpItem} className="text-center space-y-4">
            <span className="section-label">CONTACT</span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Let's Build Something{' '}
              <span className="gradient-text">Great Together</span>
            </h1>
            <p className="text-[#9CA3AF] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              I'm actively seeking a{' '}
              <span className="text-[#F5C76A] font-semibold">Software Developer Internship</span>.
              Whether you have a role, a project idea, or just want to connect — I'd love to hear from you.
            </p>

            {/* Status chip */}
            <div className="flex justify-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[12px] font-semibold"
                style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.3)', color: '#34D399' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <MapPin className="w-3 h-3" />
                {profile.location} · {profile.status}
              </div>
            </div>
          </motion.div>

          {/* ── Two-col: socials + chat ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT: contact links */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {/* Email copy row */}
              <motion.div
                variants={fadeUpItem}
                className="flex items-center gap-3 rounded-2xl p-4"
                style={{
                  background: 'rgba(16,21,31,0.55)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(245,199,106,0.2)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(245,199,106,0.12)', border: '1px solid rgba(245,199,106,0.3)' }}
                >
                  <Mail className="w-4.5 h-4.5 text-[#F5C76A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">Email</p>
                  <code className="text-[13px] font-mono font-bold text-[#F1F1F4] truncate block">
                    {profile.socials.email}
                  </code>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copyEmail}
                    aria-label="Copy email"
                    className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F5C76A] hover:bg-[#F5C76A]/10 transition-all"
                  >
                    {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`mailto:${profile.socials.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg,#F5C76A,#EAB308)', color: '#07070A' }}
                  >
                    <Mail className="w-3 h-3" /> Say Hello
                  </a>
                </div>
              </motion.div>

              <SocialCard
                icon={<FaLinkedin className="w-5 h-5" />}
                label="LinkedIn"
                value={profile.socials.linkedin.replace('https://linkedin.com/in/', '@')}
                href={profile.socials.linkedin}
                accent="#0A66C2"
                description="Connect professionally · View experience"
              />

              <SocialCard
                icon={<FaGithub className="w-5 h-5" />}
                label="GitHub"
                value={profile.socials.github.replace('https://github.com/', '@')}
                href={profile.socials.github}
                accent="#9CA3AF"
                description="1.2K+ contributions · View open source work"
              />

              {/* Action row */}
              <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Book a Meeting */}
                <a
                  href="https://calendly.com" // TODO: Replace with real Calendly link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border border-white/[0.12] text-[#F1F1F4] hover:bg-white/5 hover:border-white/25 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                  Book a Meeting
                </a>
                {/* Download Resume */}
                <a
                  href={profile.resumeLink}
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#F5C76A,#EAB308)', color: '#07070A', boxShadow: '0 0 18px rgba(245,199,106,0.3)' }}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT: AI chat */}
            <motion.div variants={fadeUpItem} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#F5C76A]" />
                <p className="text-[12px] font-semibold text-[#9CA3AF]">
                  Or chat with my AI assistant — it knows everything about me
                </p>
              </div>
              <div className="flex-1">
                <AIChatBox
                  context={knowledgeBase}
                  placeholder="Any questions before reaching out?"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </PageWrapper>
  );
}
