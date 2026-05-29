import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { fetchPublishedBlogs } from '../utils/blogApi';
import SEO, { SITE_URL, SITE_NAME } from '../components/SEO';

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
};

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedBlogs().then((list) => {
      setBlogs(list);
      setLoading(false);
    });
  }, []);

  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Journal`,
    url: `${SITE_URL}/blog`,
    description: 'Insights on video production, post-production techniques, and brand storytelling.',
    blogPost: blogs.map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      description: b.excerpt,
      datePublished: b.publishedAt,
      url: `${SITE_URL}/blog/${b.slug}`,
      author: { '@type': 'Organization', name: SITE_NAME },
    })),
  };

  return (
    <div className="bg-background min-h-screen">
      <SEO
        title="Blog"
        path="/blog"
        description="Insights & perspectives on video production, post-production techniques, brand storytelling, and the evolving landscape of visual content — from the KV Media Works team."
        keywords="video editing blog, video production tips, color grading guide, motion graphics, short form content strategy, post production techniques"
        jsonLd={blogJsonLd}
      />
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <p className="overline-text mb-6">Blog</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-sm md:text-display text-white max-w-3xl mb-8">
              Insights & <span className="text-primary">perspectives</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body-lg text-white/45 max-w-2xl leading-relaxed">
              Thoughts on video production, post-production techniques, brand storytelling,
              and the evolving landscape of visual content.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {loading ? (
        <section className="pb-32">
          <div className="container-luxury flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </section>
      ) : blogs.length === 0 ? (
        <section className="pb-32">
          <div className="container-luxury text-center py-20">
            <p className="text-body text-white/40">No articles published yet. Check back soon.</p>
          </div>
        </section>
      ) : (
        <>
          {/* ═══════════ FEATURED ARTICLE ═══════════ */}
          <section className="pb-20">
            <div className="container-luxury">
              <ScrollReveal>
                <Link to={`/blog/${featuredBlog.slug}`} className="block group">
                  <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center card-luxury p-8 md:p-12">
                    <div className="aspect-[16/10] rounded-sm bg-surface border border-white/[0.04] overflow-hidden flex items-center justify-center group-hover:border-primary/20 transition-colors duration-300">
                      {featuredBlog.coverImage ? (
                        <img src={featuredBlog.coverImage} alt={featuredBlog.title} className="w-full h-full object-cover" decoding="async" />
                      ) : (
                        <span className="text-white/[0.05] text-[8rem] font-bold leading-none">01</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="overline-text">{featuredBlog.category}</span>
                        <span className="text-overline text-white/20">{formatDate(featuredBlog.publishedAt)}</span>
                      </div>
                      <h2 className="text-heading md:text-display-sm text-white mb-6 leading-snug group-hover:text-primary transition-colors duration-300">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-body text-white/40 leading-relaxed mb-6">
                        {featuredBlog.excerpt}
                      </p>
                      <span className="text-caption text-primary/50 group-hover:text-primary transition-colors">Read article →</span>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* ═══════════ ARTICLES GRID ═══════════ */}
          {remainingBlogs.length > 0 && (
            <section className="section-padding bg-surface/30">
              <div className="container-luxury">
                <ScrollReveal>
                  <h2 className="text-heading text-white mb-12">All Articles</h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingBlogs.map((blog, index) => (
                    <ScrollReveal key={blog.slug} delay={index * 80}>
                      <Link to={`/blog/${blog.slug}`} className="block group h-full">
                        <article className="h-full">
                          <div className="aspect-[16/9] rounded-sm bg-surface border border-white/[0.04] mb-6 overflow-hidden flex items-center justify-center group-hover:border-primary/20 transition-colors duration-300">
                            {blog.coverImage ? (
                              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" decoding="async" />
                            ) : (
                              <span className="text-white/[0.05] text-[5rem] font-bold leading-none">
                                {String(index + 2).padStart(2, '0')}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="overline-text">{blog.category}</span>
                            <span className="text-overline text-white/20">{formatDate(blog.publishedAt)}</span>
                          </div>
                          <h3 className="text-subheading text-white mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                            {blog.title}
                          </h3>
                          <p className="text-body text-white/35 line-clamp-3 mb-4">
                            {blog.excerpt}
                          </p>
                        </article>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ═══════════ NEWSLETTER CTA ═══════════ */}
      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="overline-text mb-4">Stay Updated</p>
              <h2 className="text-display-sm text-white mb-6">
                Follow us for the latest
              </h2>
              <p className="text-body text-white/40 mb-10">
                Follow us on Instagram for behind-the-scenes content, tips, and our latest work.
              </p>
              <a
                href="https://www.instagram.com/kv_mediaworks/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Follow on Instagram
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
