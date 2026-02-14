import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useScrollRevealProgress } from '../hooks/useScrollParallax';
import { BeardoShorts, NiveaShorts, NishkaShorts, VivinShorts, BusinessShorts, DivyaRavirajShorts, AdvertisementShorts, SantoUKShorts, StockInkShorts } from '../utils/moreworks/shorts/shorts';
import { BeardoLong, NiveaLong } from '../utils/moreworks/longs/longs';

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO PAGE — PRODUCTION-LEVEL LUXURY
   Client-by-client showcase · Editorial layout · Hover zoom
   Always-visible info bars · Ambient effects · Bento grids
   ═══════════════════════════════════════════════════════════ */

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'shorts', label: 'Short Form' },
  { id: 'long', label: 'Long Form' },
];

const shortFormClients = [
  { name: 'Beardo', items: BeardoShorts, tag: 'Brand' },
  { name: 'Nivea', items: NiveaShorts, tag: 'Brand' },
  { name: 'Nishka', items: NishkaShorts, tag: 'Brand' },
  { name: 'Vivin', items: VivinShorts, tag: 'Brand' },
  { name: 'Divya Raviraj', items: DivyaRavirajShorts, tag: 'Creator' },
  { name: 'Advertisement', items: AdvertisementShorts, tag: 'Ads' },
  { name: 'Santo UK', items: SantoUKShorts, tag: 'Creator' },
  { name: 'Stock Ink', items: StockInkShorts, tag: 'Brand' },
  { name: 'Business', items: BusinessShorts, tag: 'Corporate' },
];

const longFormClients = [
  { name: 'Beardo', items: BeardoLong, tag: 'Brand' },
  { name: 'Nivea', items: NiveaLong, tag: 'Brand' },
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
   Always-visible info · Hover zoom · Glow
   ═══════════════════════════════════════ */

const WorkCard = ({ work, index, clientName, type = 'short', featured = false }) => {
  const isShort = type === 'short';

  return (
    <a
      href={work.videoLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`block ${isShort ? 'aspect-[9/16]' : 'aspect-video'} rounded-sm overflow-hidden relative group
        border border-white/[0.04]
        hover:border-primary/20
        transition-all duration-500
        hover:shadow-[0_0_40px_-8px_rgba(15,157,248,0.12)]`}
    >
      <LazyImage
        src={work.coverImage}
        alt={`${clientName} — ${work.id}`}
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
              {clientName}
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

      {/* Hover overlay — subtle vignette intensifies */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[5]" />
    </a>
  );
};

/* ═══════════════════════════════════════
   CLIENT HEADER — Editorial style
   ═══════════════════════════════════════ */

const ClientHeader = ({ index, name, count, tag }) => (
  <div className="flex items-baseline justify-between border-b border-white/[0.05] pb-6 mb-8">
    <div className="flex items-center gap-5">
      <span className="text-[0.6rem] font-mono text-primary/35 tracking-widest">
        {String(index).padStart(2, '0')}
      </span>
      <div className="w-6 h-px bg-white/[0.08]" />
      <h3 className="text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem] text-white font-light tracking-tight">
        {name}
      </h3>
      <span className="text-[0.55rem] uppercase tracking-[0.15em] text-primary/30 font-medium hidden md:block">
        {tag}
      </span>
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedClients, setExpandedClients] = useState({});

  const toggleClient = (key) => {
    setExpandedClients(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showShorts = activeCategory !== 'long';
  const showLongs = activeCategory !== 'shorts';

  // In "all" view, show 4 per client. In filtered view, show 6 initially.
  const getVisibleItems = (client, key) => {
    const isExpanded = expandedClients[key];
    if (isExpanded) return client.items;
    const limit = activeCategory === 'all' ? 4 : 6;
    return client.items.slice(0, limit);
  };

  const getLimit = () => (activeCategory === 'all' ? 4 : 6);

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
              <Link to="/contact" className="btn-primary">
                Start a project
              </Link>
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
                  src="https://player.vimeo.com/video/1162083158?h=&title=0&byline=0&portrait=0&color=0f9df8"
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

      {/* ═══════════ 04 — CLIENT SHOWCASE ═══════════ */}
      <section id="works" className="relative overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        <div className="section-edge-light" />

        {/* Ambient orbs for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="ambient-orb ambient-orb-2 top-[20%] -right-32" />
          <div className="ambient-orb ambient-orb-3 top-[60%] -left-32" />
        </div>

        <div className="container-luxury relative z-10 py-24 lg:py-32">
          {/* Section header + filter */}
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-16">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">04</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">The Work</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
              <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug max-w-xl">
                Crafted with precision.
                <br />
                <span className="text-white/40">Client by client.</span>
              </h2>

              {/* Filter tabs */}
              <div className="flex items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setExpandedClients({});
                    }}
                    className={`px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.15em] border transition-all duration-300 rounded-sm ${
                      activeCategory === cat.id
                        ? 'bg-primary/10 border-primary/30 text-white'
                        : 'bg-transparent border-white/[0.06] text-white/35 hover:text-white/60 hover:border-white/[0.12]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ——————————— SHORT FORM CLIENTS ——————————— */}
          {showShorts && (
            <div className="mb-16">
              {activeCategory !== 'all' && (
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-14">
                    <div className="w-10 h-px bg-primary/20" />
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/30 font-medium">Short Form Content</span>
                    <div className="flex-1 h-px bg-white/[0.03]" />
                  </div>
                </ScrollReveal>
              )}

              {shortFormClients.map((client, ci) => {
                const key = `short-${client.name}`;
                const visible = getVisibleItems(client, key);
                const hasMore = client.items.length > getLimit();
                const isExpanded = expandedClients[key];

                return (
                  <ScrollReveal key={key} delay={Math.min(ci * 80, 300)}>
                    <div className="mb-16 last:mb-0">
                      <ClientHeader
                        index={ci + 1}
                        name={client.name}
                        count={client.items.length}
                        tag={client.tag}
                      />

                      {/* Bento grid — 4 cols on desktop */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {visible.map((work, i) => (
                          <WorkCard
                            key={`${key}-${i}`}
                            work={work}
                            index={i}
                            clientName={client.name}
                            type="short"
                          />
                        ))}
                      </div>

                      {/* Expand / collapse */}
                      {hasMore && (
                        <div className="mt-6 flex justify-center">
                          <button
                            onClick={() => toggleClient(key)}
                            className="text-[0.65rem] uppercase tracking-[0.15em] text-white/30 inline-flex items-center gap-4 hover:text-primary/60 transition-colors duration-300 py-3"
                          >
                            <span className="w-8 h-px bg-white/[0.06]" />
                            {isExpanded
                              ? 'Show less'
                              : `View all ${client.items.length} works`
                            }
                            <span className="w-8 h-px bg-white/[0.06]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* ——————————— LONG FORM CLIENTS ——————————— */}
          {showLongs && (
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-14">
                  <div className="w-10 h-px bg-primary/20" />
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/30 font-medium">Long Form Content</span>
                  <div className="flex-1 h-px bg-white/[0.03]" />
                </div>
              </ScrollReveal>

              {longFormClients.map((client, ci) => {
                const key = `long-${client.name}`;

                return (
                  <ScrollReveal key={key} delay={Math.min(ci * 100, 200)}>
                    <div className="mb-16 last:mb-0">
                      <ClientHeader
                        index={ci + 1}
                        name={client.name}
                        count={client.items.length}
                        tag={client.tag}
                      />

                      {/* 2-col grid for landscape cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {client.items.map((work, i) => (
                          <WorkCard
                            key={`${key}-${i}`}
                            work={work}
                            index={i}
                            clientName={client.name}
                            type="long"
                          />
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
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

              <Link to="/contact" className="btn-primary">
                Start Your Project
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
