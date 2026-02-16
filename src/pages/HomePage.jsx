import { useEffect, useState, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useScrollRevealProgress, useSmoothParallax, useHorizontalScroll } from '../hooks/useScrollParallax';
import { useCountUp } from '../hooks/useCountUp';
import { About_Data, getWhatsAppLink, homePortfolioData, videoTestimonialsData } from '../utils/data';
import { servicesData } from '../utils/servicesData';
import { blogsData } from '../utils/blogsData';

const HomePage = () => {
  const [overlayDone, setOverlayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOverlayDone(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  // Curated home portfolio — Santu, InkCharts, Bolt Digitech
  const homePortfolioWorks = homePortfolioData;

  const previewServices = servicesData.slice(0, 6);
  const previewBlogs = blogsData.slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020e2b' }}>
      {!overlayDone && <div className="cinematic-overlay" />}
      <ScrollProgressBar />
      <HeroSection />
      <MarqueeStrip />
      <PhilosophySection />
      <StatsSection />
      <HorizontalPortfolio works={homePortfolioWorks} />
      <ServicesSection services={previewServices} />
      <ProcessSection />
      <ShowreelSection />
      <BlogSection blogs={previewBlogs} />
      <BrandStrip />
      <VideoTestimonialSection />
      <CTASection />
    </div>
  );
};

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

const SplitText = ({ text, baseDelay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span key={i} className="split-char" style={{ animationDelay: `${baseDelay + i * 0.04}s` }} aria-hidden="true">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const LazyImage = ({ src, alt, className = '' }) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } }, { rootMargin: '300px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 image-shimmer" />}
      {inView && <img src={src} alt={alt} className={`w-full h-full object-cover image-blur-up ${loaded ? 'loaded' : ''}`} onLoad={() => setLoaded(true)} decoding="async" />}
    </div>
  );
};

/* ═══════════ 01 — HERO ═══════════ */
const HeroSection = () => {
  const parallaxRef = useSmoothParallax(0.3, 700);
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(15, 157, 248, 0.06) 0%, transparent 60%)' }} />
      <div className="grain-overlay" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="ambient-orb ambient-orb-1 -top-48 left-1/4" /></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none select-none">
        <span className="text-[18rem] md:text-[28rem] lg:text-[36rem] font-bold leading-none block" style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)' }}>KV</span>
      </div>
      <div ref={parallaxRef} className="container-luxury relative z-10 w-full">
        <div className="hero-line hero-line-1"><div className="flex items-center gap-6 mb-14"><span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">01</span><div className="w-12 h-px bg-primary/20" /></div></div>
        <div className="hero-line hero-line-2"><h1 className="text-[2.8rem] md:text-[4.5rem] lg:text-[6.5rem] font-semibold leading-[0.92] tracking-[-0.03em] text-white"><SplitText text="We Transform" baseDelay={2.0} /></h1></div>
        <div className="hero-line hero-line-3"><span className="text-[2.8rem] md:text-[4.5rem] lg:text-[6.5rem] font-semibold leading-[0.92] tracking-[-0.03em] text-primary block"><SplitText text="your clips into Art !" baseDelay={2.6} /></span></div>
        <div className="hero-line hero-line-4">
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-body text-white/50 max-w-sm leading-relaxed">KV Media Works — Premium video production studio crafting visual narratives for brands that demand more.</p>
            <div className="flex items-center gap-8">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/30 hidden md:block">Edit &middot; Color &middot; Motion &middot; Story</p>
              <a href={getWhatsAppLink('Hi KV Media Works! I want to start a new project.')} target="_blank" rel="noopener noreferrer" className="btn-primary">Start a project</a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hero-line hero-line-4"><div className="flex flex-col items-center gap-3"><div className="w-px h-14 bg-gradient-to-b from-transparent to-white/10" /><p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/20">Scroll</p></div></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020e2b] to-transparent z-10" />
    </section>
  );
};

/* ═══════════ MARQUEE ═══════════ */
const marqueeItems = ['Video Editing','Color Grading','Motion Graphics','Sound Design','Visual Effects','Brand Films','Reels & Shorts','Corporate Videos','Music Videos','Podcast Production'];
const MarqueeStrip = memo(() => (
  <section className="relative py-8 border-y border-white/[0.04] overflow-hidden" style={{ backgroundColor: '#031539' }}>
    <div className="marquee-container"><div className="marquee-track">
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-8 px-8"><span className="text-[0.8rem] md:text-[0.9rem] uppercase tracking-[0.2em] text-white/15 whitespace-nowrap font-light">{item}</span><span className="w-1.5 h-1.5 rounded-full bg-primary/20 flex-shrink-0" /></span>
      ))}
    </div></div>
  </section>
));

/* ═══════════ 02 — PHILOSOPHY ═══════════ */
const PhilosophySection = () => {
  const { sectionRef, contentRef } = useScrollRevealProgress();
  return (
    <section ref={sectionRef} className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }} />
      <div ref={contentRef} className="container-luxury text-center max-w-4xl mx-auto relative z-10">
        <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">02</span>
        <p className="text-[1.6rem] md:text-[2.4rem] lg:text-[3rem] font-light leading-[1.3] tracking-tight text-white/70">Not just editing.<br /><span className="text-primary/80 font-normal">Directing attention.</span></p>
      </div>
    </section>
  );
};

/* ═══════════ 03 — STATS ═══════════ */
const StatItem = ({ number, suffix, label }) => {
  const { ref, count } = useCountUp(number, 2200);
  return (
    <div ref={ref} className="text-center">
      <div className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-none tracking-tight text-white">{count}<span className="text-primary">{suffix}</span></div>
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/50 mt-4">{label}</p>
    </div>
  );
};

const StatsSection = () => (
  <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#031539' }}>
    <div className="section-edge-light" />
    <div className="container-luxury relative z-10">
      <ScrollReveal><div className="flex items-center gap-6 mb-16"><span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">03</span><div className="w-8 h-px bg-primary/20" /><p className="overline-text">In Numbers</p></div></ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        <ScrollReveal delay={0}><StatItem number={700} suffix="+" label="Videos Delivered" /></ScrollReveal>
        <ScrollReveal delay={150}><StatItem number={65} suffix="+" label="Clients Worldwide" /></ScrollReveal>
        <ScrollReveal delay={300}><StatItem number={3} suffix="+" label="Years of Craft" /></ScrollReveal>
      </div>
    </div>
  </section>
);

/* ═══════════ INLINE PLAY CARD (for horizontal portfolio) ═══════════ */
const InlinePlayCard = ({ work, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="flex-shrink-0 w-[260px] md:w-[340px] lg:w-[400px] aspect-[3/4] bg-surface/50 border border-white/[0.03] overflow-hidden relative rounded-sm">
      {!isPlaying ? (
        <button onClick={() => setIsPlaying(true)} className="w-full h-full relative group text-left">
          <LazyImage src={work.thumbnail} alt={`${work.client} — ${work.title}`} className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent z-10">
            <span className="text-[0.6rem] font-mono text-white/40">{String(index + 1).padStart(2, '0')}</span>
            <p className="text-[0.7rem] text-white/60 mt-1 truncate">{work.client} — {work.title}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[6]">
            <div className="w-14 h-14 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </button>
      ) : (
        <iframe src={`${work.link}?autoplay=1`} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`${work.client} — ${work.title}`} />
      )}
    </div>
  );
};

/* ═══════════ 04 — HORIZONTAL PORTFOLIO ═══════════ */
const HorizontalPortfolio = ({ works }) => {
  const { sectionRef, trackRef, progress } = useHorizontalScroll();
  if (!works || works.length === 0) return null;
  return (
    <section ref={sectionRef} className="relative" style={{ height: `${Math.max(300, works.length * 28)}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="ambient-orb ambient-orb-2 top-1/4 -left-32" /></div>
        <div className="section-edge-light" />
        <div className="absolute top-8 left-6 md:left-12 z-20 flex items-center gap-6"><span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">04</span><div className="w-8 h-px bg-primary/20" /><p className="overline-text text-primary/60">Selected Work</p></div>
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-20">
          <div className="h-px bg-white/[0.04] relative"><div className="absolute top-0 left-0 h-full bg-primary/30" style={{ width: `${progress * 100}%`, transition: 'width 0.2s ease-out' }} /></div>
          <div className="flex justify-between mt-3">
            <span className="text-[0.6rem] font-mono text-white/30">{String(Math.round(progress * works.length)).padStart(2, '0')} / {String(works.length).padStart(2, '0')}</span>
            <Link to="/portfolio" className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40 hover:text-primary/60 transition-colors">View all work →</Link>
          </div>
        </div>
        <div ref={trackRef} className="flex items-center gap-5 md:gap-7 pl-6 md:pl-12 pr-[50vw]">
          {works.map((work, i) => (
            <InlinePlayCard key={i} work={work} index={i} />
          ))}
        </div>
        <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-[#020e2b] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#020e2b] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

/* ═══════════ 05 — SERVICES ═══════════ */
const ServicesSection = ({ services }) => (
  <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#031539' }}>
    <div className="section-edge-light" />
    <div className="container-luxury relative z-10">
      <ScrollReveal><div className="flex items-center gap-6 mb-20"><span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">05</span><div className="w-8 h-px bg-primary/20" /><p className="overline-text">The Craft</p></div></ScrollReveal>
      <ScrollReveal delay={100}><h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-16 max-w-2xl">Precision meets creativity.<br /><span className="text-white/40">Every format. Every platform.</span></h2></ScrollReveal>
      <div className="space-y-0">
        {services.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 80} duration={1}>
            <Link to="/services" className="block border-t border-white/[0.04] py-8 md:py-12 group hover:bg-white/[0.01] transition-colors duration-300">
              <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
                <div className="col-span-2 md:col-span-1"><span className="text-[0.65rem] font-mono text-primary/30">{service.id}</span></div>
                <div className="col-span-10 md:col-span-4"><h3 className="text-[1.15rem] md:text-heading text-white font-medium tracking-tight group-hover:text-primary transition-colors duration-300">{service.title}</h3></div>
                <div className="col-span-12 md:col-span-7 md:col-start-6"><p className="text-body text-white/50 leading-relaxed max-w-lg">{service.description}</p></div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
        <div className="border-t border-white/[0.04]" />
      </div>
      <ScrollReveal delay={200}><div className="mt-14"><Link to="/services" className="text-caption text-primary/60 tracking-wide inline-flex items-center gap-3 hover:text-primary transition-colors"><span className="w-8 h-px bg-primary/30" />All services</Link></div></ScrollReveal>
    </div>
  </section>
);

/* ═══════════ 06 — PROCESS ═══════════ */
const processSteps = [
  { id: '01', title: 'Discovery', description: 'We dive into your vision — understanding your brand, audience, and goals to create a clear creative direction.' },
  { id: '02', title: 'Production', description: 'Our editors shape your raw footage into a cohesive narrative with precision cuts, color grading, and motion design.' },
  { id: '03', title: 'Delivery', description: 'Final review, revisions, and delivery in all required formats — optimized for every platform your content lives on.' },
];

const ProcessSection = memo(() => (
  <section className="relative py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: '#041633' }}>
    <div className="section-edge-light" /><div className="grain-overlay" />
    <div className="container-luxury relative z-10">
      <ScrollReveal><div className="flex items-center gap-6 mb-20"><span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">06</span><div className="w-8 h-px bg-primary/20" /><p className="overline-text">Process</p></div></ScrollReveal>
      <ScrollReveal delay={100}><h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-20 max-w-xl">How we bring<br /><span className="text-primary/80">your story to life.</span></h2></ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {processSteps.map((step, index) => (
          <ScrollReveal key={step.id} delay={index * 200} duration={1.4}>
            <div className="relative">
              <span className="text-[4rem] md:text-[5rem] font-bold leading-none text-white/[0.03] block mb-6">{step.id}</span>
              <h3 className="text-heading text-white font-medium tracking-tight mb-4">{step.title}</h3>
              <p className="text-body text-white/50 leading-relaxed">{step.description}</p>
              {index < processSteps.length - 1 && <div className="hidden md:block absolute top-8 -right-6 w-12 h-px bg-white/[0.04]" />}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
));

/* ═══════════ 07 — SHOWREEL ═══════════ */
const ShowreelSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className="relative">
      <div className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#010a1e' }}>
        <div className="grain-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }} />
        <div className="container-luxury relative z-10">
          <ScrollReveal duration={1.6}><span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-12 text-center">07</span></ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-[1.4rem] md:text-display-sm text-white leading-snug text-center mb-12">
              Our <span className="text-primary/80">Showreel</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200} duration={1.6}>
            <div className="max-w-5xl mx-auto">
              {!isPlaying ? (
                <button onClick={() => setIsPlaying(true)} className="w-full group relative block">
                  <div className="aspect-video rounded-sm overflow-hidden border border-white/[0.06] relative bg-gradient-to-br from-[#0a1e3d] to-[#020e2b]">
                    {/* Decorative top line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent z-10" />
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                      <span className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-bold leading-none text-white/[0.03] select-none tracking-widest">SHOWREEL</span>
                      <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm group-hover:border-primary/30 group-hover:bg-primary/[0.06] transition-all duration-500">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-white/60 ml-1 group-hover:text-primary transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/25 group-hover:text-white/50 transition-colors duration-300">Click to play</span>
                    </div>
                    {/* Decorative bottom line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent z-10" />
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/[0.06]" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/[0.06]" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/[0.06]" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/[0.06]" />
                  </div>
                </button>
              ) : (
                <div className="aspect-video rounded-sm overflow-hidden border border-white/[0.06]">
                  <iframe
                    src="https://player.vimeo.com/video/1162083158?h=&title=0&byline=0&portrait=0&color=0f9df8&autoplay=1&loop=1"
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="KV Media Works Showreel"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

/* ═══════════ 08 — BLOG ═══════════ */
const BlogSection = ({ blogs }) => (
  <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#031539' }}>
    <div className="section-edge-light" />
    <div className="container-luxury relative z-10">
      <ScrollReveal><div className="flex items-center gap-6 mb-20"><span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">08</span><div className="w-8 h-px bg-primary/20" /><p className="overline-text">Journal</p></div></ScrollReveal>
      <div className="space-y-0">
        {blogs.map((blog, index) => (
          <ScrollReveal key={blog.id} delay={index * 100} duration={1.2}>
            <Link to={`/blog/${blog.slug}`} className="block border-t border-white/[0.04] py-8 md:py-12 group hover:bg-white/[0.01] transition-colors duration-300">
              <article><div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-3"><span className="text-overline text-primary/50 block mb-1">{blog.category}</span><span className="text-[0.65rem] font-mono text-white/30">{blog.date}</span></div>
                <div className="col-span-12 md:col-span-5"><h3 className="text-subheading md:text-heading text-white leading-snug group-hover:text-primary transition-colors duration-300">{blog.title}</h3></div>
                <div className="col-span-12 md:col-span-4"><p className="text-body text-white/45 leading-relaxed line-clamp-3">{blog.excerpt}</p></div>
              </div></article>
            </Link>
          </ScrollReveal>
        ))}
        <div className="border-t border-white/[0.04]" />
      </div>
      <ScrollReveal delay={200}><div className="mt-14"><Link to="/blog" className="text-caption text-primary/60 tracking-wide inline-flex items-center gap-3 hover:text-primary transition-colors"><span className="w-8 h-px bg-primary/30" />All articles</Link></div></ScrollReveal>
    </div>
  </section>
);

/* ═══════════ BRAND STRIP ═══════════ */
const brandNames = ['Beardo', 'Santu', 'Melby', 'Bolt Digitech', 'Botfolio', 'CookIT', 'InkCharts'];
const BrandStrip = memo(() => (
  <section className="relative py-16 lg:py-20 overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
    <div className="container-luxury relative z-10">
      <ScrollReveal><p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/20 text-center mb-12">Trusted by creators & brands</p></ScrollReveal>
      <ScrollReveal delay={200}><div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {brandNames.map((name, i) => <span key={i} className="text-[1rem] md:text-[1.2rem] font-light tracking-[0.05em] text-white/20 uppercase">{name}</span>)}
      </div></ScrollReveal>
    </div>
  </section>
));

/* ═══════════ 09 — VIDEO TESTIMONIAL (Left-Right Layout) ═══════════ */
const VideoTestimonialSection = () => {
  const testimonial = videoTestimonialsData[0];
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: '#041633' }}>
      <div className="section-edge-light" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="ambient-orb ambient-orb-2 top-1/3 -left-32 opacity-30" /></div>
      <div className="container-luxury relative z-10">
        <ScrollReveal><div className="flex items-center gap-6 mb-20"><span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">09</span><div className="w-8 h-px bg-primary/20" /><p className="overline-text">Client Story</p></div></ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Instagram Video Card (compact) */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-[280px] sm:max-w-[300px]">
                <div className="border border-white/[0.08] rounded-sm overflow-hidden" style={{ backgroundColor: '#0a1e3d' }}>
                  <div className="flex items-center gap-3 px-3 py-2.5 border-b border-white/[0.06]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 flex items-center justify-center">
                      <span className="text-[0.55rem] font-medium text-white">{testimonial.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.7rem] text-white font-medium leading-none truncate">{testimonial.name}</p>
                      <p className="text-[0.55rem] text-white/40 mt-0.5 truncate">{testimonial.instagram}</p>
                    </div>
                    <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div className="relative aspect-[9/14]">
                    {!isPlaying ? (
                      <button onClick={() => setIsPlaying(true)} className="w-full h-full relative group">
                        <img src={testimonial.thumbnail} alt={testimonial.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <div className="w-14 h-14 rounded-full border-2 border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:border-white/50 transition-colors">
                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </button>
                    ) : (
                      <iframe src={`${testimonial.videoUrl}?autoplay=1`} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`${testimonial.name} testimonial`} />
                    )}
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-[0.7rem] text-white/60 leading-relaxed line-clamp-2"><span className="text-white font-medium">{testimonial.name}</span>{' '}{testimonial.quote}</p>
                    <p className="text-[0.55rem] text-white/25 mt-1.5 uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: What they're saying */}
            <div className="text-center lg:text-left">
              <svg className="w-10 h-10 text-primary/20 mb-6 mx-auto lg:mx-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>
              <p className="text-[1.1rem] md:text-[1.3rem] text-white/60 leading-relaxed mb-8 font-light italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="text-white font-medium text-body-lg">{testimonial.name}</p>
                <p className="text-white/30 text-caption mt-1">{testimonial.role}</p>
                <p className="text-primary/40 text-caption mt-1">{testimonial.instagram}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={300}><div className="mt-16 flex justify-center"><Link to="/testimonials" className="text-caption text-primary/60 tracking-wide inline-flex items-center gap-3 hover:text-primary transition-colors"><span className="w-8 h-px bg-primary/30" />All testimonials</Link></div></ScrollReveal>
      </div>
    </section>
  );
};

/* ═══════════ 10 — CTA ═══════════ */
const CTASection = () => (
  <section className="relative py-28 lg:py-40 overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
    <div className="grain-overlay" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'rgba(15, 157, 248, 0.04)', filter: 'blur(60px)' }} />
    <div className="container-luxury relative z-10">
      <ScrollReveal duration={1.6}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">10</span>
          <h2 className="text-[1.8rem] md:text-display-sm lg:text-display text-white leading-tight mb-8">Your next story<br /><span className="text-primary">starts here.</span></h2>
          <div className="w-10 h-px bg-primary/25 mx-auto mb-10" />
          <a href={getWhatsAppLink('Hi KV Media Works! I want to start a new project.')} target="_blank" rel="noopener noreferrer" className="btn-primary">Start a project</a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HomePage;
