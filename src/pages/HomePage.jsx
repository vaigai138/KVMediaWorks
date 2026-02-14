import { useEffect, useState, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useScrollRevealProgress, useSmoothParallax, useHorizontalScroll } from '../hooks/useScrollParallax';
import { useCountUp } from '../hooks/useCountUp';
import { About_Data, WorksDataShorts, WorksDataLong } from '../utils/data';
import { servicesData } from '../utils/servicesData';
import { blogsData } from '../utils/blogsData';
import { testimonialsData } from '../utils/testimonialsData';

/* ═══════════════════════════════════════════════════════════
   HOME PAGE — PERFORMANCE-OPTIMIZED
   Ref-based scroll animations · Idle rAF detection
   Reduced paint layers · Lazy images · Code-split ready
   ═══════════════════════════════════════════════════════════ */

const HomePage = () => {
  const [overlayDone, setOverlayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOverlayDone(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  const allWorks = [...WorksDataShorts, ...WorksDataLong];
  const previewServices = servicesData.slice(0, 6);
  const previewTestimonials = testimonialsData.slice(0, 3);
  const previewBlogs = blogsData.slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020e2b' }}>
      {!overlayDone && <div className="cinematic-overlay" />}

      <ScrollProgressBar />
      <HeroSection />
      <MarqueeStrip />
      <PhilosophySection />
      <StatsSection />
      <HorizontalPortfolio works={allWorks} />
      <ServicesSection services={previewServices} />
      <ProcessSection />
      <ShowreelSection />
      <BlogSection blogs={previewBlogs} />
      <BrandStrip />
      <TestimonialsSection testimonials={previewTestimonials} />
      <CTASection />
    </div>
  );
};

/* ═══════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════ */

const ScrollProgressBar = memo(() => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? scrollTop / docHeight : 0;
          bar.style.transform = `scaleX(${progress})`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress-bar" />;
});

/* ═══════════════════════════════════════
   SPLIT TEXT — Per-character animation
   ═══════════════════════════════════════ */

const SplitText = ({ text, baseDelay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

/* ═══════════════════════════════════════
   LAZY IMAGE — Blur-up loading
   ═══════════════════════════════════════ */

const LazyImage = ({ src, alt, className = '' }) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 image-shimmer" />}
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover image-blur-up ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          decoding="async"
        />
      )}
    </div>
  );
};

/* ═══════════════════════════════════════
   01 — HERO
   Split-text character reveal + smooth lerp parallax
   ═══════════════════════════════════════ */

const HeroSection = () => {
  const parallaxRef = useSmoothParallax(0.3, 700);

  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      {/* Background — subtle radial glow, no heavy blurs */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(15, 157, 248, 0.06) 0%, transparent 60%)' }} />
      <div className="grain-overlay" />

      {/* Single ambient orb — hero only needs one */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="ambient-orb ambient-orb-1 -top-48 left-1/4" />
      </div>

      {/* Background watermark — giant "KV" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none select-none">
        <span
          className="text-[18rem] md:text-[28rem] lg:text-[36rem] font-bold leading-none block"
          style={{
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)',
          }}
        >
          KV
        </span>
      </div>

      <div
        ref={parallaxRef}
        className="container-luxury relative z-10 w-full"
      >
        <div className="hero-line hero-line-1">
          <div className="flex items-center gap-6 mb-14">
            <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">01</span>
            <div className="w-12 h-px bg-primary/20" />
          </div>
        </div>

        <div className="hero-line hero-line-2">
          <h1 className="text-[2.8rem] md:text-[4.5rem] lg:text-[6.5rem] font-semibold leading-[0.92] tracking-[-0.03em] text-white">
            <SplitText text="We Transform" baseDelay={2.0} />
          </h1>
        </div>

        <div className="hero-line hero-line-3">
          <span className="text-[2.8rem] md:text-[4.5rem] lg:text-[6.5rem] font-semibold leading-[0.92] tracking-[-0.03em] text-primary block">
            <SplitText text="your clips into Art !" baseDelay={2.6} />
          </span>
        </div>

        <div className="hero-line hero-line-4">
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-body text-white/50 max-w-sm leading-relaxed">
              KV Media Works — Premium video production studio
              crafting visual narratives for brands that demand more.
            </p>
            <div className="flex items-center gap-8">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/30 hidden md:block">
                Edit &middot; Color &middot; Motion &middot; Story
              </p>
              <Link to="/contact" className="btn-primary">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hero-line hero-line-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-white/10" />
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/20">Scroll</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020e2b] to-transparent z-10" />
    </section>
  );
};

/* ═══════════════════════════════════════
   — MARQUEE STRIP
   ═══════════════════════════════════════ */

const marqueeItems = [
  'Video Editing',
  'Color Grading',
  'Motion Graphics',
  'Sound Design',
  'Visual Effects',
  'Brand Films',
  'Reels & Shorts',
  'Corporate Videos',
  'Music Videos',
  'Podcast Production',
];

const MarqueeStrip = memo(() => {
  return (
    <section className="relative py-8 border-y border-white/[0.04] overflow-hidden" style={{ backgroundColor: '#031539' }}>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-8 px-8">
              <span className="text-[0.8rem] md:text-[0.9rem] uppercase tracking-[0.2em] text-white/15 whitespace-nowrap font-light">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════
   02 — PHILOSOPHY
   Ref-based scroll reveal — zero React re-renders
   ═══════════════════════════════════════ */

const PhilosophySection = () => {
  const { sectionRef, contentRef } = useScrollRevealProgress();

  return (
    <section
      ref={sectionRef}
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle radial glow — no animated orbs here */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }}
      />

      <div
        ref={contentRef}
        className="container-luxury text-center max-w-4xl mx-auto relative z-10"
      >
        <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">02</span>
        <p className="text-[1.6rem] md:text-[2.4rem] lg:text-[3rem] font-light leading-[1.3] tracking-tight text-white/70">
          Not just editing.
          <br />
          <span className="text-primary/80 font-normal">Directing attention.</span>
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   03 — STATS
   ═══════════════════════════════════════ */

const StatItem = ({ number, suffix, label }) => {
  const { ref, count } = useCountUp(number, 2200);

  return (
    <div ref={ref} className="text-center">
      <div className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-none tracking-tight text-white">
        {count}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/50 mt-4">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#031539' }}>
      <div className="section-edge-light" />

      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-16">
            <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">03</span>
            <div className="w-8 h-px bg-primary/20" />
            <p className="overline-text">In Numbers</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          <ScrollReveal delay={0}>
            <StatItem number={100} suffix="+" label="Projects Delivered" />
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <StatItem number={15} suffix="+" label="Clients Worldwide" />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <StatItem number={3} suffix="+" label="Years of Craft" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   04 — HORIZONTAL SCROLL PORTFOLIO
   ═══════════════════════════════════════ */

const workLabels = [
  'Beardo — Short 1', 'Beardo — Short 2', 'Beardo — Short 3',
  'Beardo — Short 4', 'Beardo — Short 5',
  'Brand Film — Beardo', 'Brand Film — Nivea', 'Brand Film — Nishka',
  'Brand Film — Corporate', 'Brand Film — Promo', 'Brand Film — Featured',
];

const HorizontalPortfolio = ({ works }) => {
  const { sectionRef, trackRef, progress } = useHorizontalScroll();

  if (!works || works.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${Math.max(300, works.length * 28)}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        {/* Single orb for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="ambient-orb ambient-orb-2 top-1/4 -left-32" />
        </div>

        <div className="section-edge-light" />

        {/* Section label */}
        <div className="absolute top-8 left-6 md:left-12 z-20 flex items-center gap-6">
          <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">04</span>
          <div className="w-8 h-px bg-primary/20" />
          <p className="overline-text text-primary/60">Selected Work</p>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-20">
          <div className="h-px bg-white/[0.04] relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary/30"
              style={{ width: `${progress * 100}%`, transition: 'width 0.2s ease-out' }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-[0.6rem] font-mono text-white/30">
              {String(Math.round(progress * works.length)).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
            </span>
            <Link
              to="/portfolio"
              className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40 hover:text-primary/60 transition-colors"
            >
              View all work →
            </Link>
          </div>
        </div>

        {/* Horizontal scrolling track */}
        <div
          ref={trackRef}
          className="flex items-center gap-5 md:gap-7 pl-6 md:pl-12 pr-[50vw]"
        >
          {works.map((work, i) => (
            <a
              key={i}
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-[260px] md:w-[340px] lg:w-[400px] aspect-[3/4] bg-surface/50 border border-white/[0.03] overflow-hidden relative hover:border-primary/20 transition-colors duration-300"
            >
              <LazyImage
                src={work.image_path}
                alt={workLabels[i] || `Project ${i + 1}`}
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent z-10">
                <span className="text-[0.6rem] font-mono text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[0.7rem] text-white/60 mt-1 truncate">
                  {workLabels[i] || `Project ${i + 1}`}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-[#020e2b] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#020e2b] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   05 — SERVICES
   ═══════════════════════════════════════ */

const ServicesSection = ({ services }) => {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#031539' }}>
      <div className="section-edge-light" />

      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-20">
            <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">05</span>
            <div className="w-8 h-px bg-primary/20" />
            <p className="overline-text">The Craft</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-16 max-w-2xl">
            Precision meets creativity.
            <br />
            <span className="text-white/40">Every format. Every platform.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 80} duration={1}>
              <Link to="/services" className="block border-t border-white/[0.04] py-8 md:py-12 group hover:bg-white/[0.01] transition-colors duration-300">
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-[0.65rem] font-mono text-primary/30">{service.id}</span>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="text-[1.15rem] md:text-heading text-white font-medium tracking-tight group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-7 md:col-start-6">
                    <p className="text-body text-white/50 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
          <div className="border-t border-white/[0.04]" />
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-14">
            <Link
              to="/services"
              className="text-caption text-primary/60 tracking-wide inline-flex items-center gap-3 hover:text-primary transition-colors"
            >
              <span className="w-8 h-px bg-primary/30" />
              All services
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   06 — PROCESS / HOW WE WORK
   ═══════════════════════════════════════ */

const processSteps = [
  {
    id: '01',
    title: 'Discovery',
    description: 'We dive into your vision — understanding your brand, audience, and goals to create a clear creative direction.',
  },
  {
    id: '02',
    title: 'Production',
    description: 'Our editors shape your raw footage into a cohesive narrative with precision cuts, color grading, and motion design.',
  },
  {
    id: '03',
    title: 'Delivery',
    description: 'Final review, revisions, and delivery in all required formats — optimized for every platform your content lives on.',
  },
];

const ProcessSection = memo(() => {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: '#041633' }}>
      <div className="section-edge-light" />
      <div className="grain-overlay" />

      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-20">
            <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">06</span>
            <div className="w-8 h-px bg-primary/20" />
            <p className="overline-text">Process</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-20 max-w-xl">
            How we bring
            <br />
            <span className="text-primary/80">your story to life.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.id} delay={index * 200} duration={1.4}>
              <div className="relative">
                <span className="text-[4rem] md:text-[5rem] font-bold leading-none text-white/[0.03] block mb-6">
                  {step.id}
                </span>
                <h3 className="text-heading text-white font-medium tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-body text-white/50 leading-relaxed">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-6 w-12 h-px bg-white/[0.04]" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════
   07 — SHOWREEL
   ═══════════════════════════════════════ */

const ShowreelSection = memo(() => {
  return (
    <section className="relative">
      <div
        className="min-h-[70vh] md:min-h-[80vh] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: '#010a1e' }}
      >
        <div className="grain-overlay" />

        {/* Static radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }}
        />

        <div className="relative z-10 text-center">
          <ScrollReveal duration={1.6}>
            <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-12">07</span>
          </ScrollReveal>

          <ScrollReveal delay={200} duration={1.6}>
            <Link
              to="/portfolio"
              className="inline-flex flex-col items-center gap-6 group"
              aria-label="View our portfolio"
            >
              <div className="inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm group-hover:border-primary/30 group-hover:bg-primary/[0.04] transition-all duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white/70 ml-1 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-[0.7rem] uppercase tracking-[0.25em] text-white/30 group-hover:text-white/50 transition-colors">
                View our portfolio
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════
   08 — BLOG / JOURNAL
   ═══════════════════════════════════════ */

const BlogSection = ({ blogs }) => {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#031539' }}>
      <div className="section-edge-light" />

      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-20">
            <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">08</span>
            <div className="w-8 h-px bg-primary/20" />
            <p className="overline-text">Journal</p>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {blogs.map((blog, index) => (
            <ScrollReveal key={blog.id} delay={index * 100} duration={1.2}>
              <Link to="/blog" className="block border-t border-white/[0.04] py-8 md:py-12 group hover:bg-white/[0.01] transition-colors duration-300">
                <article>
                  <div className="grid grid-cols-12 gap-4 md:gap-8">
                    <div className="col-span-12 md:col-span-3">
                      <span className="text-overline text-primary/50 block mb-1">{blog.category}</span>
                      <span className="text-[0.65rem] font-mono text-white/30">{blog.date}</span>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <h3 className="text-subheading md:text-heading text-white leading-snug group-hover:text-primary transition-colors duration-300">
                        {blog.title}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <p className="text-body text-white/45 leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
          <div className="border-t border-white/[0.04]" />
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-14">
            <Link
              to="/blog"
              className="text-caption text-primary/60 tracking-wide inline-flex items-center gap-3 hover:text-primary transition-colors"
            >
              <span className="w-8 h-px bg-primary/30" />
              All articles
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   — BRAND STRIP
   ═══════════════════════════════════════ */

const brandNames = ['Beardo', 'Local Brands', 'Content Creators', 'YouTubers', 'Podcasters', 'Startups'];

const BrandStrip = memo(() => {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/20 text-center mb-12">
            Trusted by creators & brands
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brandNames.map((name, i) => (
              <span
                key={i}
                className="text-[1rem] md:text-[1.2rem] font-light tracking-[0.05em] text-white/20 uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════
   09 — TESTIMONIALS
   ═══════════════════════════════════════ */

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: '#041633' }}>
      <div className="section-edge-light" />

      {/* Single subtle orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="ambient-orb ambient-orb-2 top-1/3 -left-32 opacity-30" />
      </div>

      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-20">
            <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">09</span>
            <div className="w-8 h-px bg-primary/20" />
            <p className="overline-text">Trusted By</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.id} delay={index * 150} duration={1.4}>
              <div>
                <p className="text-body-lg text-white/50 leading-[2] mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-white/15" />
                  <div>
                    <p className="text-caption text-white/60 font-medium">{t.name}</p>
                    <p className="text-[0.65rem] text-white/35 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link
              to="/testimonials"
              className="text-caption text-primary/60 tracking-wide inline-flex items-center gap-3 hover:text-primary transition-colors"
            >
              <span className="w-8 h-px bg-primary/30" />
              All testimonials
            </Link>
            <a
              href={`https://wa.me/${About_Data.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi KV Media Works! I would like to share my experience working with you.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-white/35 tracking-wide inline-flex items-center gap-3 hover:text-white/60 transition-colors"
            >
              <span className="w-8 h-px bg-white/[0.08]" />
              Share your experience
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   10 — CTA
   ═══════════════════════════════════════ */

const CTASection = () => {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
      <div className="grain-overlay" />

      {/* Simple radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }}
      />

      <div className="container-luxury relative z-10">
        <ScrollReveal duration={1.6}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">10</span>

            <h2 className="text-[1.8rem] md:text-display-sm lg:text-display text-white leading-tight mb-8">
              Your next story
              <br />
              <span className="text-primary">starts here.</span>
            </h2>

            <div className="w-10 h-px bg-primary/25 mx-auto mb-10" />

            <Link to="/contact" className="btn-primary">
              Start a project
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HomePage;
