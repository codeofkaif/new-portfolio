import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { projects } from '@/data/projects';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';

const STATUS_COLOR: Record<string, string> = {
  Ongoing:      '#F5C76A',
  Completed:    '#4ADE80',
  'In Progress': '#818CF8',
};

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <Section id="projects-page" spacing="default">
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-10">
          <motion.div variants={fadeUpItem} className="text-center space-y-3">
            <span className="section-label">PORTFOLIO</span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-[#9CA3AF] text-base md:text-lg max-w-xl mx-auto">
              Explore software systems, APIs, and web applications built with modern engineering practices.
            </p>
          </motion.div>

          <motion.div variants={fadeUpItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.slug} className="card flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono uppercase tracking-wider font-semibold"
                      style={{ color: STATUS_COLOR[project.status] ?? '#9CA3AF' }}
                    >
                      {project.status}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9CA3AF] hover:text-[#8B5CF6] transition-colors p-1"
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9CA3AF] hover:text-[#8B5CF6] transition-colors p-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <Link to={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold text-[#F1F1F4] group-hover:text-[#8B5CF6] transition-colors">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#8B5CF6]/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tag) => (
                      <span key={tag} className="tag text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-[#8B5CF6] hover:underline shrink-0 ml-2"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Section>
    </PageWrapper>
  );
}
