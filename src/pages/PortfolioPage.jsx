import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useScrollRevealProgress } from '../hooks/useScrollParallax';
import { About_Data, getWhatsAppLink, shortFormVideosData, longFormVideosData, motionDesignVideos, corporateProductVideos, doctorVideos, youtubeVideos } from '../utils/data';

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO PAGE — PRODUCTION-LEVEL LUXURY
   Category-based showcase · Editorial layout · Hover zoom
   Always-visible info bars · Ambient effects · In-tab playback
   ═══════════════════════════════════════════════════════════ */

const categoryData = [
  { key: 'short', tag: 'Short Form', items: shortFormVideosData, type: 'short' },
  { key: 'long', tag: 'Long Form', items: longFormVideosData, type: 'long' },
  { key: 'motion', tag: 'Motion Design', items: motionDesignVideos, type: 'long' },
  { key: 'corporate', tag: 'Corporate', items: corporateProductVideos, type: 'long' },
  { key: 'doctor', tag: 'Doctor', items: doctorVideos, type: 'short' },
  { key: 'youtube', tag: 'YouTube', items: youtubeVideos, type: 'long' },
];

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
   LAZY IMAGE — Blur-up + hover zoom
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
   PHILOSOPHY — Scroll-driven opacity
   ═══════════════════════════════════════ */

const PhilosophySection = () => {
  const { sectionRef, contentRef } = useScrollRevealProgress();

  return (
    <section
      ref={sectionRef}
      className="min-h-[60vh] flex items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }}
      />

      <div
        ref={contentRef}
        className="container-luxury text-center max-w-4xl mx-auto relative z-10"
      >
        <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">03</span>
        <p className="text-[1.4rem] md:text-[2rem] lg:text-[2.5rem] font-light leading-[1.3] tracking-tight text-white/70">
          Every frame tells a story.
          <br />
          <span className="text-primary/80 font-normal">Here are ours.</span>
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   WORK CARD — Luxury production card
   Always-visible info · Hover zoom · In-tab play
   ═══════════════════════════════════════ */

const WorkCard = ({ work, index, type = 'short' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isShort = type === 'short';

  return (
    <div
      className={`block w-full ${isShort ? 'aspect-[9/16]' : 'aspect-video'} rounded-sm overflow-hidden relative
        border border-white/[0.04]
        ${!isPlaying ? 'hover:border-primary/20 hover:shadow-[0_0_40px_-8px_rgba(15,157,248,0.12)]' : ''}
        transition-all duration-500`}
    >
      {!isPlaying ? (
        <button onClick={() => setIsPlaying(true)} className="w-full h-full relative group text-left">
          <LazyImage
            src={work.thumbnail}
            alt={`${work.client} — ${work.title}`}
            className="w-full h-full"
          />

          {/* Always-visible bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-3 md:p-4 z-10">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[0.5rem] font-mono text-primary/50 block leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[0.6rem] md:text-[0.7rem] text-white/55 mt-1 leading-tight">
                  {work.client}
                </p>
              </div>
              {/* Play indicator */}
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center
                group-hover:border-primary/30 group-hover:bg-primary/[0.08] transition-all duration-300 backdrop-blur-sm">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/40 ml-0.5 group-hover:text-white/80 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[5]" />
        </button>
      ) : (
        <iframe
          src={`${work.link}?autoplay=1`}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`${work.client} — ${work.title}`}
        />
      )}
    </div>
  );
};

/* ═══════════════════════════════════════
   CATEGORY HEADER — Editorial style
   ═══════════════════════════════════════ */

const CategoryHeader = ({ index, name, count }) => (
  <div className="flex items-baseline justify-between border-b border-white/[0.05] pb-6 mb-8">
    <div className="flex items-center gap-5">
      <span className="text-[0.6rem] font-mono text-primary/35 tracking-widest">
        {String(index).padStart(2, '0')}
      </span>
      <div className="w-6 h-px bg-white/[0.08]" />
      <h3 className="text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem] text-white font-light tracking-tight">
        {name}
      </h3>
    </div>
    <span className="text-[0.55rem] font-mono text-white/20">
      {count} {count === 1 ? 'work' : 'works'}
    </span>
  </div>
);

/* ═══════════════════════════════════════
   MAIN PORTFOLIO PAGE
   ═══════════════════════════════════════ */

const PortfolioPage = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (key) => {
    setExpandedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020e2b' }}>
      <ScrollProgressBar />

      {/* ═══════════ 01 — HERO ═══════════ */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(15, 157, 248, 0.06) 0%, transparent 60%)' }} />
        <div className="grain-overlay" />

        {/* Ambient orb */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="ambient-orb ambient-orb-1 -top-48 left-1/4" />
        </div>

        {/* Background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none select-none">
          <span
            className="text-[14rem] md:text-[22rem] lg:text-[28rem] font-bold leading-none block"
            style={{
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.02)',
            }}
          >
            KV
          </span>
        </div>

        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-10">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">01</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">Portfolio</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-[2.2rem] md:text-display lg:text-display-lg text-white max-w-4xl leading-tight mb-8">
              Our <span className="text-primary">selected</span> works
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-body-lg text-white/55 max-w-2xl leading-relaxed mb-10">
              A curated collection of our finest video productions — from short-form social content
              to long-form brand narratives that captivate and convert.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex items-center gap-6">
              <a href={getWhatsAppLink('Hi KV Media Works! I saw your portfolio and want to start a project.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Start a project
              </a>
              <a href="#works" className="text-caption text-white/40 tracking-wide inline-flex items-center gap-3 hover:text-primary/60 transition-colors">
                <span className="w-8 h-px bg-white/[0.08]" />
                Browse work
              </a>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020e2b] to-transparent z-10" />
      </section>

      {/* ═══════════ 02 — SHOWREEL ═══════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#031539' }}>
        <div className="section-edge-light" />

        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-16">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">02</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">Showreel</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-12 max-w-2xl">
              Our best work,
              <br />
              <span className="text-white/40">in motion.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-5xl mx-auto">
              <div className="vimeo-container rounded-sm overflow-hidden border border-white/[0.06]">
                <iframe
                  src="https://player.vimeo.com/video/1162083158?h=&title=0&byline=0&portrait=0&color=0f9df8&loop=1&autopause=0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="KV Media Works Showreel"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ 03 — PHILOSOPHY ═══════════ */}
      <PhilosophySection />

      {/* ═══════════ 04 — ALL CATEGORIES ═══════════ */}
      <section id="works" className="relative overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        <div className="section-edge-light" />

        {/* Ambient orbs for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="ambient-orb ambient-orb-2 top-[20%] -right-32" />
          <div className="ambient-orb ambient-orb-3 top-[60%] -left-32" />
        </div>

        <div className="container-luxury relative z-10 py-24 lg:py-32">
          {/* Section header */}
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-16">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">04</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">The Work</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug max-w-xl mb-20">
              Crafted with precision.
              <br />
              <span className="text-white/40">Category by category.</span>
            </h2>
          </ScrollReveal>

          {/* ——————————— CATEGORY SECTIONS ——————————— */}
          {categoryData.map((section, si) => {
            const isExpanded = expandedCategories[section.key];
            const displayItems = isExpanded ? section.items : section.items.slice(0, 4);
            const hasMore = section.items.length > 4;

            return (
              <div key={section.key} className="mb-20 last:mb-0">
                <ScrollReveal>
                  <CategoryHeader
                    index={si + 1}
                    name={section.tag}
                    count={section.items.length}
                  />
                </ScrollReveal>

                <div className={`grid ${
                  section.type === 'short'
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                } gap-3 md:gap-4`}>
                  {displayItems.map((work, i) => (
                    <ScrollReveal key={`${section.key}-${i}`} delay={Math.min(i * 60, 300)}>
                      <WorkCard
                        work={work}
                        index={i}
                        type={section.type}
                      />
                    </ScrollReveal>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => toggleCategory(section.key)}
                      className="px-8 py-3 text-[0.7rem] uppercase tracking-[0.15em] border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300 rounded-sm"
                    >
                      {isExpanded ? 'Show less' : `See more works`}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ 05 — CTA ═══════════ */}
      <section className="relative py-28 lg:py-40 overflow-hidden" style={{ backgroundColor: '#041633' }}>
        <div className="grain-overlay" />
        <div className="section-edge-light" />

        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }}
        />

        <div className="container-luxury relative z-10">
          <ScrollReveal duration={1.6}>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">05</span>

              <h2 className="text-[1.8rem] md:text-display-sm lg:text-display text-white leading-tight mb-6">
                Like what you see?
              </h2>

              <p className="text-body-lg text-white/50 mb-10 max-w-xl mx-auto">
                Let's create something extraordinary for your brand.
              </p>

              <div className="w-10 h-px bg-primary/25 mx-auto mb-10" />

              <a href={getWhatsAppLink('Hi KV Media Works! I loved your portfolio and would like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Start Your Project
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default PortfolioPage;
