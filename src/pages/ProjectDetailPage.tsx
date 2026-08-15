import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { ArrowLeft, ExternalLink, MessageSquare } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { AIChatBox } from '@/components/AIChatBox';
import { projectContext } from '@/data/knowledge';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageWrapper>
        <Section>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4 gradient-text">Project Not Found</h1>
            <p className="text-text-muted mb-8">
              That project doesn&apos;t exist yet. Check back soon!
            </p>
            <Link to="/#projects" className="btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </Section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Section>
        <div className="max-w-3xl mx-auto pt-8">
          {/* Back link */}
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-text-muted
                       hover:text-text transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <FaGithub className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </header>

          {/* Detail sections */}
          {[
            { label: 'Problem', body: project.problem },
            { label: 'Architecture', body: project.architecture },
            { label: 'Challenges', body: project.challenges },
            { label: 'Performance', body: project.performance },
            { label: 'Lessons', body: project.lessons },
          ].map(({ label, body }) => (
            <div key={label} className="card mb-6">
              <h2 className="text-lg font-semibold text-[#F1F1F4] mb-3">{label}</h2>
              <p className="text-[#9CA3AF] leading-relaxed text-sm">{body}</p>
            </div>
          ))}

          {/* ── Ask about this project ── */}
          <div className="mt-10 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
              <h2 className="text-sm font-bold text-[#F1F1F4]">Ask about this project</h2>
              <span className="text-[10px] text-[#4B5563] font-mono ml-auto">
                {/* Real answers via POST /api/ask-ai → Spring Boot → Anthropic */}
                AI-powered · scoped to {project.title}
              </span>
            </div>
            <AIChatBox
              context={projectContext(project.slug)}
              placeholder={`e.g. "Why did you use Redis in ${project.title}?"`}
            />
          </div>

          {/* Author credit */}
          <p className="text-xs text-text-muted font-mono text-center">
            Built by{' '}
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {profile.name}
            </a>
          </p>
        </div>
      </Section>
    </PageWrapper>
  );
}
