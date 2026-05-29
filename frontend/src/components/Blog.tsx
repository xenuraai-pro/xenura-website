import { ArrowRight, Clock, Tag, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/content/blogPosts';

const Blog = () => (
  <section id="blog" className="relative py-12 sm:py-14 lg:py-16 section-gradient-1 overflow-hidden">
    <div className="container-custom">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-orange-400"/><span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Insights & Resources</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">Get the insights you need</h2>
          <p className="text-slate-400 text-base mt-2 max-w-xl">Guides, case studies, and playbooks to support every step of your digital journey.</p>
        </div>
        <Link to="/blog/ai-first-development-strategy-2025" className="btn-secondary inline-flex items-center gap-2 text-sm whitespace-nowrap self-start sm:self-auto py-2.5 px-5 rounded-xl">
          Explore all resources <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
          <div key={i} className="glass-card rounded-2xl overflow-hidden flex flex-col scroll-reveal">
            <div className="overflow-hidden">{post.thumb}</div>
            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${post.categoryClass}`}>
                  <Tag className="w-2.5 h-2.5" />
                  {post.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3"/>{post.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-orange-400 transition-colors">{post.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs text-slate-500">{post.date}</span>
                <Link to={post.slug} className="flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:gap-2.5 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
