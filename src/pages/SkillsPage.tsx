import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { TechRadar } from '@/sections/TechRadar';

export default function SkillsPage() {
  return (
    <PageWrapper>
      <Section id="skills-page" spacing="default">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {/* Page heading */}
          <motion.div variants={fadeUpItem} className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="section-label">TECHNICAL COMPETENCY</span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Skills &amp; <span className="gradient-text">Technologies</span>
            </h1>
            <p className="text-[#9CA3AF] text-sm md:text-base leading-relaxed">
              A visual breakdown of languages, frameworks, databases, and CS fundamentals —
              each with an estimated proficiency level based on real project experience.
            </p>
          </motion.div>

          {/* TechRadar chart + legend */}
          <TechRadar />
        </motion.div>
      </Section>
    </PageWrapper>
  );
}
