import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { Mail, Copy, CheckCheck, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '@/data/profile';

const SOCIALS = [
  { icon: FaGithub, href: profile.socials.github, label: 'GitHub' },
  { icon: FaLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
] as const;

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact" className="relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#F5C76A]/5 blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <motion.div variants={fadeUpItem} className="mb-8">
          <p className="section-label">Let&apos;s Talk</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F1F1F4] mb-2">
            Get In{' '}
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[#9CA3AF] leading-relaxed text-sm">
            I&apos;m actively looking for{' '}
            <span className="text-[#F5C76A] font-semibold">Software Developer Internship</span>{' '}
            opportunities. Whether you have a role in mind or just want to connect — reach out!
          </p>
        </motion.div>

        <motion.a
          variants={fadeUpItem}
          href={`mailto:${profile.socials.email}`}
          id="contact-email-btn"
          className="btn-primary px-8 py-3 text-sm mx-auto w-fit mb-5 inline-flex"
        >
          <Mail className="w-4 h-4" />
          Say Hello
          <ArrowRight className="w-4 h-4" />
        </motion.a>

        <motion.div variants={fadeUpItem} className="flex items-center justify-center gap-2 mb-8">
          <code className="text-sm font-mono text-[#9CA3AF] bg-[#0F0F14] px-3 py-1.5 rounded-lg border border-white/[0.07]">
            {profile.socials.email}
          </code>
          <button onClick={copyEmail} aria-label="Copy email"
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#F5C76A] hover:bg-[#F5C76A]/10 transition-all">
            {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </motion.div>

        <motion.div variants={fadeUpItem} className="flex justify-center gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="btn-ghost px-4 py-2.5">
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
