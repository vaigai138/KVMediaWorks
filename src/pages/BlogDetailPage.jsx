import { useParams, Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { blogsData } from '../utils/blogsData';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[8rem] md:text-[12rem] font-bold leading-none text-white/[0.04]">404</p>
          <h1 className="text-display-sm text-white -mt-8 mb-4">Article not found</h1>
          <p className="text-body text-white/50 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Simple markdown-to-JSX renderer for blog content
  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Heading 3 (###)
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-subheading text-white mt-10 mb-4">
            {line.slice(4)}
          </h3>
        );
      }
      // Heading 2 (##)
      else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-heading text-white mt-12 mb-6">
            {line.slice(3)}
          </h2>
        );
      }
      // Unordered list item
      else if (line.startsWith('- **')) {
        const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          elements.push(
            <li key={i} className="text-body text-white/55 leading-relaxed ml-6 mb-2">
              <strong className="text-white/70">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}
            </li>
          );
        } else {
          elements.push(
            <li key={i} className="text-body text-white/55 leading-relaxed ml-6 mb-2">
              {line.slice(2)}
            </li>
          );
        }
      }
      else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="text-body text-white/55 leading-relaxed ml-6 mb-2">
            {line.slice(2)}
          </li>
        );
      }
      // Ordered list item
      else if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*[—–-]*\s*(.*)/);
        if (match) {
          elements.push(
            <li key={i} className="text-body text-white/55 leading-relaxed ml-6 mb-2 list-decimal">
              <strong className="text-white/70">{match[1]}</strong>{match[2] ? ` — ${match[2]}` : ''}
            </li>
          );
        } else {
          elements.push(
            <li key={i} className="text-body text-white/55 leading-relaxed ml-6 mb-2 list-decimal">
              {line.replace(/^\d+\.\s/, '')}
            </li>
          );
        }
      }
      // Bold paragraph
      else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={i} className="text-body text-white/60 leading-relaxed mb-2 font-medium">
            {line.slice(2, -2)}
          </p>
        );
      }
      // Bold label with text
      else if (line.startsWith('**')) {
        const match = line.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          elements.push(
            <p key={i} className="text-body text-white/55 leading-relaxed mb-4">
              <strong className="text-white/70">{match[1]}:</strong> {match[2]}
            </p>
          );
        } else {
          elements.push(
            <p key={i} className="text-body text-white/55 leading-relaxed mb-4">{line.replace(/\*\*/g, '')}</p>
          );
        }
      }
      // Empty line
      else if (line.trim() === '') {
        // skip
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={i} className="text-body text-white/55 leading-relaxed mb-4">{line}</p>
        );
      }

      i++;
    }

    return elements;
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-luxury relative z-10 max-w-3xl">
          <ScrollReveal>
            <Link to="/blog" className="text-caption text-white/30 tracking-wide inline-flex items-center gap-3 hover:text-primary/60 transition-colors mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Blog
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex items-center gap-4 mb-6">
              <span className="overline-text">{blog.category}</span>
              <span className="text-overline text-white/20">{blog.readTime}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="text-display-sm md:text-display text-white mb-6 leading-snug">
              {blog.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-body-lg text-white/45 leading-relaxed mb-4">
              {blog.excerpt}
            </p>
            <p className="text-overline text-white/20">{blog.date}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Image */}
      {blog.image && (
        <section className="pb-8">
          <div className="container-luxury max-w-3xl">
            <ScrollReveal>
              <div className="aspect-[16/9] rounded-sm overflow-hidden border border-white/[0.04]">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" decoding="async" />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <div className="divider mb-12" />
            <article className="prose-luxury">
              {renderContent(blog.content)}
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-padding bg-surface/30">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link to="/blog" className="text-caption text-white/40 tracking-wide inline-flex items-center gap-3 hover:text-primary/60 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                All Articles
              </Link>
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

export default BlogDetailPage;
