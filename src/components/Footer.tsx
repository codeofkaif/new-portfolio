import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '@/data/profile';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0F0F14]/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1E] border border-white/[0.10] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-1 left-1 w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-[#F5C76A]/60 rounded-tl-sm" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-[#F5C76A]/60 rounded-br-sm" />
              <span className="text-[#F1F1F4] font-extrabold text-base z-10">K</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-sm text-[#F1F1F4] tracking-widest uppercase">
                {profile.name.replace('Md. ', '').toUpperCase()}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">{profile.role}</span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-[#F1F1F4] hover:border-white/20 transition-all">
              <FaGithub className="w-4 h-4" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-[#F1F1F4] hover:border-white/20 transition-all">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${profile.socials.email}`} aria-label="Email"
              className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-[#F1F1F4] hover:border-white/20 transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#9CA3AF]">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
