import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { blogPosts } from '@/data/blog';
import { profile } from '@/data/profile';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import type { ReactNode } from 'react';

// ─── Markdown renderers ───────────────────────────────────────────────────────
const mdComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="text-2xl font-extrabold text-[#F1F1F4] mt-8 mb-4 leading-snug">{children}</h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="text-lg font-bold text-[#F1F1F4] mt-7 mb-3 leading-snug border-b border-white/[0.06] pb-2">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="text-[15px] font-bold text-[#F1F1F4] mt-5 mb-2">{children}</h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-[13px] text-[#9CA3AF] leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-4 space-y-1.5 list-none">{children}</ul>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="flex items-start gap-2 text-[13px] text-[#9CA3AF]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0 mt-1.5" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote
      className="my-4 pl-4 py-3 rounded-r-xl text-[13px] text-[#9CA3AF] italic border-l-2 border-[#F5C76A]"
      style={{ background: 'rgba(245,199,106,0.06)' }}
    >
      {children}
    </blockquote>
  ),
  code: ({ inline, children }: { inline?: boolean; children?: ReactNode }) =>
    inline ? (
      <code
        className="px-1.5 py-0.5 rounded text-[12px] font-mono"
        style={{ background: 'rgba(139,92,246,0.15)', color: '#A78BFA' }}
      >
        {children}
      </code>
    ) : (
      <pre
        className="my-4 p-4 rounded-xl text-[11.5px] font-mono leading-relaxed overflow-x-auto"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)', color: '#CBD5E1' }}
      >
        <code>{children}</code>
      </pre>
    ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="overflow-x-auto my-5">
      <table className="w-full text-[12px] font-mono border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="text-left py-2 px-3 text-[#9CA3AF] font-bold border-b border-white/[0.1] bg-white/[0.03]">{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="py-2 px-3 text-[#6B7280] border-b border-white/[0.05]">{children}</td>
  ),
  hr: () => <hr className="my-6 border-white/[0.06]" />,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-bold text-[#F1F1F4]">{children}</strong>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a href={href} className="text-[#8B5CF6] hover:underline">{children}</a>
  ),
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageWrapper>
        <Section>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold gradient-text mb-4">Post Not Found</h1>
            <p className="text-[#9CA3AF] mb-8">This article doesn't exist yet. Check back soon!</p>
            <Link to="/blog" className="btn-primary">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </Section>
      </PageWrapper>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <PageWrapper>
      <Section>
        <div className="max-w-3xl mx-auto pt-6">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#F1F1F4] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All Posts
          </Link>

          {/* Accent header strip */}
          <div
            className="h-1 w-24 rounded-full mb-6"
            style={{ background: post.coverColor }}
          />

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7280] mb-4 font-mono">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min read</span>
              <span>{formatDate(post.date)}</span>
              <span>by {profile.name}</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight"
              style={{ color: '#F1F1F4' }}
            >
              {post.title}
            </h1>
            <p className="text-[14px] text-[#9CA3AF] leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  <Tag className="w-2.5 h-2.5" /> {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <article
            className="rounded-2xl p-6 mb-10"
            style={{
              background: 'rgba(16,21,31,0.55)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <ReactMarkdown components={mdComponents as object}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Author footer */}
          <div
            className="flex items-center gap-4 rounded-2xl p-5 mb-10"
            style={{
              background: 'rgba(16,21,31,0.55)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black shrink-0 select-none"
              style={{ background: 'linear-gradient(135deg,#F5C76A,#EAB308)', color: '#07070A' }}
            >
              {profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="font-bold text-[#F1F1F4] text-sm">{profile.name}</p>
              <p className="text-[11px] text-[#6B7280]">{profile.role} · {profile.location}</p>
            </div>
          </div>

          {/* More posts */}
          {otherPosts.length > 0 && (
            <div>
              <p className="text-[12px] font-mono font-semibold text-[#6B7280] uppercase tracking-wider mb-4">More Posts</p>
              <div className="space-y-3">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="flex items-center gap-3 rounded-xl p-4 group transition-all duration-200"
                    style={{
                      background: 'rgba(16,21,31,0.45)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.coverColor}35`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                  >
                    <div
                      className="w-1 rounded-full shrink-0 self-stretch"
                      style={{ background: p.coverColor, minHeight: 32 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#F1F1F4] group-hover:text-white transition-colors truncate">{p.title}</p>
                      <p className="text-[10px] text-[#6B7280] font-mono mt-0.5">{p.readingTime} min · {formatDate(p.date)}</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-[#4B5563] group-hover:text-[#9CA3AF] rotate-180 shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </PageWrapper>
  );
}
