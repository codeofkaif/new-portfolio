import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TerminalMode } from '@/components/TerminalMode';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import SkillsPage from '@/pages/SkillsPage';
import ExperiencePage from '@/pages/ExperiencePage';
import LearningPage from '@/pages/LearningPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ContactPage from '@/pages/ContactPage';
import RecruiterKitPage from '@/pages/RecruiterKitPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/recruiter" element={<RecruiterKitPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
        {/* Global terminal overlay — Ctrl+` to toggle */}
        <TerminalMode />
      </div>
    </BrowserRouter>
  );
}

