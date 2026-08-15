import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Play, User } from 'lucide-react';
import { FaJava, FaAws, FaGithub } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiDocker, SiKubernetes, SiRedis, SiMysql } from 'react-icons/si';
import { Section } from '@/components/Section';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { profile } from '@/data/profile';
import { AIChatBox } from '@/components/AIChatBox';
import { knowledgeBase } from '@/data/knowledge';

const HERO_TECH = [
  { icon: FaJava, label: 'Java', color: '#f89820' },
  { icon: SiSpringboot, label: 'Spring Boot', color: '#6db33f' },
  { icon: FaAws, label: 'AWS', color: '#ff9900' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169e1' },
  { icon: SiMysql, label: 'MySQL', color: '#4479a1' },
  { icon: SiRedis, label: 'Redis', color: '#dc382d' },
  { icon: SiDocker, label: 'Docker', color: '#0db7ed' },
  { icon: SiKubernetes, label: 'Kubernetes', color: '#326ce5' },
];

/* Floating code-particle layer */
const PARTICLES = [
  { text: '@RestController', x: '5%',  top: '70%', dur: 20, delay: 0   },
  { text: 'SELECT * FROM',   x: '12%', top: '55%', dur: 17, delay: 3   },
  { text: 'jwt.verify()',    x: '75%', top: '80%', dur: 22, delay: 1.5 },
  { text: '@Service',        x: '85%', top: '60%', dur: 16, delay: 5   },
  { text: 'Redis.set()',     x: '60%', top: '75%', dur: 19, delay: 2.5 },
  { text: 'POST /api/v1',   x: '30%', top: '85%', dur: 24, delay: 0.5 },
  { text: 'new Thread()',   x: '45%', top: '65%', dur: 21, delay: 4   },
  { text: '.stream()',      x: '90%', top: '45%', dur: 18, delay: 6   },
];

function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hero-particle"
          style={{
            left: p.x,
            top: p.top,
            ['--dur' as string]: `${p.dur}s`,
            ['--delay' as string]: `${p.delay}s`,
          } as React.CSSProperties}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}

/* Floating orb icon badges around the photo */
function FloatingOrb({
  symbol,
  className,
  delay = 0,
  floatDuration = 4,
}: {
  symbol: string;
  className?: string;
  delay?: number;
  floatDuration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute w-12 h-12 rounded-full bg-[#1A1A1E]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center text-[#9CA3AF] font-mono text-xs font-bold ${className ?? ''}`}
    >
      {symbol}
    </motion.div>
  );
}

function ProfilePhoto() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="relative w-full flex justify-center items-center select-none">
      {/* Outer circular arc — subtle white */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[380px] h-[380px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-[#F5C76A]/30"
      />

      {/* Glow blob behind photo */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-[#F5C76A]/20 blur-[80px] pointer-events-none" />

      {/* Photo — tall portrait, no circle clip */}
      <div className="relative z-10 w-[260px] md:w-[310px] overflow-hidden rounded-3xl shadow-2xl border border-white/[0.05]">
        {!imgErr ? (
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full object-cover object-top"
            style={{ aspectRatio: '3/4' }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1E] to-[#111113] border border-white/[0.08]"
            style={{ aspectRatio: '3/4' }}
          >
            <User className="w-24 h-24 text-[#9CA3AF]" />
            <span className="text-[#9CA3AF] text-sm mt-3 font-mono">{profile.name}</span>
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#07070A] via-[#07070A]/80 to-transparent" />
      </div>

      {/* Floating code orbs */}
      <FloatingOrb symbol="</>" className="-top-6 left-4 md:left-0" delay={0} floatDuration={4} />
      <FloatingOrb symbol="{}" className="top-10 -left-8 md:-left-14" delay={0.6} floatDuration={5} />
      <FloatingOrb symbol="☁" className="bottom-16 -left-6 md:-left-10 text-lg" delay={0.9} floatDuration={5.5} />

      {/* AI Brain orb (top right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute top-0 -right-6 md:-right-14 w-14 h-14 rounded-full bg-[#1A1A1E]/90 border border-[#8B5CF6]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center"
      >
        <span className="text-xl">🧠</span>
      </motion.div>

      {/* Database orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        className="absolute top-1/3 -right-8 md:-right-16 w-12 h-12 rounded-full bg-[#1A1A1E]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center text-lg"
      >
        🗄️
      </motion.div>
    </div>
  );
}

/* AI Assistant Card — real chat wired to knowledgeBase */
function AIAssistantCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="w-[260px] shadow-2xl"
    >
      <AIChatBox
        context={knowledgeBase}
        placeholder="Ask about skills, projects…"
        compact
      />
    </motion.div>
  );
}

/* Live Code Preview Card */
function LiveCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="bg-transparent border border-white/[0.09] rounded-2xl overflow-hidden w-[240px] shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.06]">
        <span className="text-[11px] font-semibold text-[#F1F1F4]">Live Code Preview</span>
        <div className="flex items-center gap-1.5 bg-transparent rounded-lg px-2 py-0.5 border border-white/[0.07]">
          <span className="text-[10px] text-[#9CA3AF]">Java</span>
          <span className="text-[#9CA3AF] text-[8px]">▼</span>
        </div>
      </div>
      <div className="px-3.5 py-3 font-mono text-[9.5px] leading-relaxed">
        <div className="flex gap-2.5">
          <div className="flex flex-col gap-0.5 text-[#9CA3AF]/30 text-right w-3 shrink-0 select-none">
            {[1,2,3,4,5,6,7,8,9].map(n => <span key={n}>{n}</span>)}
          </div>
          <div className="flex flex-col gap-0.5">
            <div><span className="text-purple-400">@RestController</span></div>
            <div><span className="text-purple-400">@RequestMapping</span>(<span className="text-[#F5C76A]">&quot;/api/v1/hello&quot;</span>)</div>
            <div><span className="text-blue-400">public class </span><span className="text-green-400">HelloController</span> &#123;</div>
            <div></div>
            <div className="pl-3"><span className="text-purple-400">@GetMapping</span></div>
            <div className="pl-3"><span className="text-blue-400">public </span><span className="text-green-400">ResponseEntity&lt;String&gt; </span><span className="text-[#F5C76A]">hello</span>() &#123;</div>
            <div className="pl-6"><span className="text-blue-400">return </span><span className="text-green-400">ResponseEntity</span>.<span className="text-[#F5C76A]">ok</span>(</div>
            <div className="pl-8"><span className="text-[#F5C76A]">&quot;Hello, I&apos;m Kaif Khan!&quot;</span></div>
            <div className="pl-3">); &#125;</div>
          </div>
        </div>
      </div>
      <div className="px-3.5 py-2 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[9px] text-[#9CA3AF] font-mono">Ln 6, Col 34</span>
        <button className="w-6 h-6 rounded-lg bg-[#F5C76A]/10 border border-[#F5C76A]/20 flex items-center justify-center text-[#F5C76A] hover:bg-[#F5C76A]/20 transition-colors">
          <Play className="w-2.5 h-2.5 fill-[#F5C76A]" />
        </button>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <Section
      id="hero"
      spacing="tight"
      className="min-h-[calc(100vh-60px)] flex items-center relative overflow-hidden pt-6 pb-0"
    >
      {/* Background particles + mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="hero-mesh absolute top-0 left-0 w-full h-full opacity-40"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,158,11,0.12), transparent)',
          }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#F5C76A]/5 blur-[150px]" />
        <HeroParticles />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-8 lg:gap-6 items-start">

        {/* ── LEFT: Copy ── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col justify-center pt-8 lg:pt-14 pb-8"
        >
          {/* Available badge */}
          <motion.div variants={fadeUpItem} className="mb-5">
            <span className="badge-status">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUpItem}
            className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight mb-5 text-[#F1F1F4]"
          >
            Building Advanced
            <br />
            <span className="gradient-text">Soft</span>
            <span className="text-[#F1F1F4]">ware</span>
            {' '}& <span className="gradient-text-purple">AI</span>
            <br />
            Powered Solutions
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUpItem}
            className="text-sm text-[#9CA3AF] leading-relaxed mb-8 max-w-md"
          >
            Software Developer specializing in building scalable backend systems, AI agents, and cloud-based solutions that solve real-world problems.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUpItem} className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="/projects"
              className="btn-primary px-6 py-2.5 flex items-center gap-2 text-white"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={profile.resumeLink}
              download
              className="btn-outline-accent px-6 py-2.5 bg-transparent border-white/[0.15] text-[#F1F1F4] flex items-center gap-2"
            >
              <span>Download Resume</span>
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Tech Stack row */}
          <motion.div variants={fadeUpItem}>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9CA3AF] mb-3">
              TECH STACK
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {HERO_TECH.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  title={label}
                  className="w-10 h-10 rounded-xl bg-transparent border border-white/[0.08] flex items-center justify-center hover:border-white/20 hover:bg-white/5 hover:scale-105 transition-all duration-200"
                >
                  <Icon className="w-[18px] h-[18px]" style={{ color }} />
                </div>
              ))}
              <div className="w-10 h-10 rounded-xl bg-transparent border border-white/[0.08] flex items-center justify-center text-[#9CA3AF] text-sm font-bold hover:border-white/20 transition-all">
                ···
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── CENTER: Photo ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="hidden lg:flex justify-center items-end self-end relative pt-10"
          style={{ minWidth: '300px' }}
        >
          <ProfilePhoto />
        </motion.div>

        {/* ── RIGHT: Floating UI cards ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="hidden xl:flex flex-col gap-4 pt-10 self-start"
        >
          <AIAssistantCard />
          <LiveCodeCard />
          {/* GitHub stat mini */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="bg-transparent border border-white/[0.09] rounded-2xl p-3.5 w-[240px] flex items-center gap-3 shadow-xl backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-xl bg-transparent border border-white/10 flex items-center justify-center text-[#F1F1F4]">
              <FaGithub className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F1F1F4]">1.2K+ GitHub Contributions</p>
              <p className="text-[10px] text-[#9CA3AF]">Active open source dev</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
