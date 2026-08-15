import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/PageWrapper';
import { Section } from '@/components/Section';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { blogPosts } from '@/data/blog';
import { profile } from '@/data/profile';
import { formatDate } from '@/lib/utils';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <PageWrapper>
      <Section id="blog-page" spacing="default">
        <motion.div variants={staggerContainer} initial="initial" animate="animate">

          {/* Heading */}
          <motion.div variants={fadeUpItem} className="text-center mb-14 pt-4">
            <span className="section-label">WRITING</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
              Dev <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-[#9CA3AF] mt-3 max-w-xl mx-auto leading-relaxed text-sm">
              Thoughts on backend engineering, Spring Security, AI, and the craft of writing
              clean code — by{' '}
              <span className="text-[#F1F1F4] font-semibold">{profile.shortName}</span>.
            </p>
          </motion.div>

          {/* Featured post (first) */}
          {blogPosts[0] && (
            <motion.div variants={fadeUpItem} className="max-w-3xl mx-auto mb-8">
              <Link
                to={`/blog/${blogPosts[0].slug}`}
                className="group block rounded-3xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(16,21,31,0.55)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${blogPosts[0].coverColor}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                {/* Accent header strip */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(to right, ${blogPosts[0].coverColor}, ${blogPosts[0].coverColor}44)` }}
                />
                <div className="p-7">
                  <div className="flex items-center gap-3 text-[11px] text-[#6B7280] mb-4 font-mono">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: `${blogPosts[0].coverColor}18`, color: blogPosts[0].coverColor }}
                    >
                      Featured
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blogPosts[0].readingTime} min read
                    </span>
                    <span>{formatDate(blogPosts[0].date)}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-[#F1F1F4] mb-2 group-hover:text-white transition-colors leading-snug">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {blogPosts[0].tags.map((tag) => (
                        <span key={tag} className="tag text-[10px]">
                          <Tag className="w-2 h-2" /> {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[12px] font-semibold shrink-0"
                          style={{ color: blogPosts[0].coverColor }}>
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Remaining posts */}
          <div className="max-w-3xl mx-auto space-y-4">
            {blogPosts.slice(1).map((post) => (
              <motion.article key={post.slug} variants={fadeUpItem}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 rounded-2xl p-5 transition-all duration-200"
                  style={{
                    background: 'rgba(16,21,31,0.45)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${post.coverColor}35`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  {/* Color dot */}
                  <div
                    className="w-1.5 rounded-full shrink-0 mt-1 self-stretch"
                    style={{ background: post.coverColor, minHeight: 40 }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-[10px] text-[#6B7280] mb-1.5 font-mono">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h2 className="text-[14px] font-bold text-[#F1F1F4] group-hover:text-white transition-colors leading-snug mb-1">
                      {post.title}
                    </h2>
                    <p className="text-[12px] text-[#9CA3AF] leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag text-[10px]"><Tag className="w-2 h-2" /> {tag}</span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#9CA3AF] shrink-0 mt-2 transition-colors" />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Section>
    </PageWrapper>
  );
}
