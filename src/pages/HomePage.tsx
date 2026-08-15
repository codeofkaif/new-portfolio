import { PageWrapper } from '@/components/PageWrapper';
import { HeroSection } from '@/sections/HeroSection';
import { StatsRow } from '@/sections/StatsRow';
import { FeaturedProjects } from '@/sections/FeaturedProjects';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { TechScroller } from '@/sections/TechScroller';
import { LearningSection } from '@/sections/LearningSection';
import { ContactSection } from '@/sections/ContactSection';

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <StatsRow />
      <FeaturedProjects />
      <ExperienceSection />
      <SkillsSection />
      <TechScroller />
      <LearningSection />
      <ContactSection />
    </PageWrapper>
  );
}
