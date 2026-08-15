import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ArrowRight, Menu, X } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';
import { profile } from '@/data/profile';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Learning', path: '/learning' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const scrolled = useScrolled(20);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getActiveLabel = () => {
    const current = NAV_ITEMS.find(
      (item) => item.path !== '/' && location.pathname.startsWith(item.path)
    );
    if (current) return current.label;
    if (location.pathname === '/') return 'Home';
    return 'Home';
  };

  const activeLabel = getActiveLabel();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_ITEMS)[number]
  ) => {
    setMobileOpen(false);
    if (location.pathname === '/' && item.path === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#07070A]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/50'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4">
          {/* Logo: K monogram + Name + subtitle */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-transparent border border-white/[0.12] flex items-center justify-center group-hover:border-white/25 transition-all duration-200 relative overflow-hidden">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-[2px] border-l-[2px] border-[#F5C76A]/70 rounded-tl-sm" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-[2px] border-r-[2px] border-[#F5C76A]/70 rounded-br-sm" />
              <span className="text-[#F1F1F4] font-extrabold text-lg select-none z-10">K</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-extrabold text-[15px] text-[#F1F1F4] tracking-wider uppercase leading-tight group-hover:text-[#F5C76A] transition-colors">
                {profile.name.replace('Md. ', '').toUpperCase()}
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-medium tracking-wide leading-tight">
                {profile.role}
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeLabel === item.label;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors duration-200',
                    isActive
                      ? 'text-[#F1F1F4]'
                      : 'text-[#9CA3AF] hover:text-[#F1F1F4]'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5C76A]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              className="p-2 rounded-full border border-white/[0.08] bg-transparent hover:text-[#F1F1F4] hover:border-white/20 transition-all duration-200 text-[#9CA3AF]"
              aria-label="Settings"
            >
              <Sun className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (location.pathname === '/') {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/contact');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 ml-2 rounded-full border border-white/[0.15] bg-transparent hover:bg-white/5 hover:border-white/25 text-[#F1F1F4] text-[13px] font-semibold transition-all duration-200"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-[#9CA3AF] bg-white/5 border border-white/[0.08]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#07070A]/97 backdrop-blur-2xl border-b border-white/[0.07] lg:hidden py-4 px-6 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeLabel === item.label;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[#F5C76A]/10 text-[#F5C76A] border border-[#F5C76A]/25'
                        : 'text-[#9CA3AF] hover:text-[#F1F1F4] hover:bg-white/5'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-1 border-t border-white/[0.07]">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate('/contact');
                  }}
                  className="btn-outline-accent w-full justify-center py-2.5 text-sm"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
