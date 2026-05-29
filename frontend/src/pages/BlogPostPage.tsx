import { ArrowLeft, ArrowRight, Clock, Tag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getBlogPostBySlug } from '@/content/blogPosts';

type BlogPostPageProps = {
  slug: string;
};

const BlogPostPage = ({ slug }: BlogPostPageProps) => {
  const post = getBlogPostBySlug(slug);
  const relatedPosts = ['/blog/ai-first-development-strategy-2025', '/blog/cloud-microservices-operational-overhead', '/blog/zero-trust-security-guide']
    .filter(nextSlug => nextSlug !== slug)
    .map(nextSlug => getBlogPostBySlug(nextSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        {!post ? (
          <section className="container-custom py-20 sm:py-24 lg:py-28">
            <div className="max-w-xl mx-auto text-center glass-card rounded-3xl p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-400 mb-3 font-semibold">Blog post not found</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--theme-text-strong)' }}>That article does not exist.</h1>
              <p className="mb-8" style={{ color: 'var(--theme-text-muted)' }}>Use the blog index to open one of the available Xenura insights articles.</p>
              <Link to="/#blog" className="btn-primary inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to insights
              </Link>
            </div>
          </section>
        ) : (
          <section className="container-custom py-8 sm:py-10 lg:py-12">
            <article className="mx-auto max-w-4xl glass-card rounded-[28px] overflow-hidden shadow-2xl shadow-slate-900/8">
              <div className="relative overflow-hidden border-b border-[var(--theme-glass-border)]" style={{ background: 'var(--theme-section-1)' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(127,74,223,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,107,53,0.08),transparent_24%)]" />
                <div className="relative p-5 sm:p-6 lg:p-7">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs sm:text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold" style={{ borderColor: 'var(--theme-glass-border)', background: 'rgba(255,255,255,0.6)', color: 'var(--theme-text-strong)' }}>
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 tracking-tight" style={{ color: 'var(--theme-text-strong)' }}>{post.title}</h1>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-orange-500 font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    Xenura Insights
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-[var(--theme-glass-border)] shadow-lg max-h-[280px]">
                    {post.thumb}
                  </div>
                  <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--theme-text-muted)' }}>{post.excerpt}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8">
                    <div className="grid sm:grid-cols-3 gap-3 mb-7">
                  {post.heroStats.map(stat => (
                        <div key={stat} className="rounded-2xl border px-4 py-3 text-xs sm:text-sm font-semibold" style={{ borderColor: 'var(--theme-glass-border)', color: 'var(--theme-text-strong)', background: 'rgba(255,255,255,0.5)' }}>
                      {stat}
                    </div>
                  ))}
                </div>

                <div className="space-y-7">
                  {post.sections.map(section => (
                    <section key={section.heading ?? section.body} className="space-y-3">
                      {section.heading ? <h2 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: 'var(--theme-text-strong)' }}>{section.heading}</h2> : null}
                      <p className="text-sm sm:text-base leading-7" style={{ color: 'var(--theme-text-muted)' }}>{section.body}</p>
                      {section.bullets ? (
                        <ul className="grid sm:grid-cols-2 gap-2.5">
                          {section.bullets.map(item => (
                            <li key={item} className="rounded-xl border px-4 py-3 text-xs sm:text-sm leading-relaxed" style={{ borderColor: 'var(--theme-glass-border)', color: 'var(--theme-text-strong)', background: 'rgba(255,255,255,0.35)' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--theme-glass-border)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-orange-400 font-semibold mb-1">Continue reading</p>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--theme-text-muted)' }}>Move to another article or jump back to the homepage blog feed.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {relatedPosts.map(nextPost => nextPost ? (
                        <Link
                          key={nextPost.slug}
                          to={nextPost.slug}
                          className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
                          style={{ borderColor: 'var(--theme-glass-border)', color: 'var(--theme-text-strong)', background: 'rgba(255,255,255,0.48)' }}
                        >
                          {nextPost.title.length > 28 ? `${nextPost.title.slice(0, 28)}...` : nextPost.title}
                          <ArrowRight className="w-4 h-4 text-orange-400" />
                        </Link>
                      ) : null)}
                      <Link to="/#blog" className="btn-primary inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to insights
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
