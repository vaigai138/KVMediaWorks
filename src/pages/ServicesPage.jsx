import { useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useScrollRevealProgress } from '../hooks/useScrollParallax';
import { servicesData } from '../utils/servicesData';

/* ═══════════════════════════════════════════════════════════
   SERVICES PAGE — PRODUCTION-LEVEL LUXURY
   Section numbering · Ambient effects · Scroll reveal
   Hover glow cards · Editorial process · Grain overlays
   ═══════════════════════════════════════════════════════════ */

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
   SERVICE ICON SET
   ═══════════════════════════════════════ */

const ServiceIcon = ({ name }) => {
  const icons = {
    film: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.5 2.625c0-.621-.504-1.125-1.125-1.125" />
      </svg>
    ),
    palette: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
    layers: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    smartphone: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    briefcase: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    megaphone: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    share: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    music: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    mic: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    heart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    'book-open': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    clapperboard: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-8.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h17.25m0 0c.621 0 1.125.504 1.125 1.125M12 19.5v-1.125" />
      </svg>
    ),
  };
  return icons[name] || icons.film;
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
        <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">02</span>
        <p className="text-[1.4rem] md:text-[2rem] lg:text-[2.5rem] font-light leading-[1.3] tracking-tight text-white/70">
          Not just editing.
          <br />
          <span className="text-primary/80 font-normal">Engineering attention.</span>
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   PROCESS STEPS
   ═══════════════════════════════════════ */

const processSteps = [
  { id: '01', title: 'Brief', description: 'We dive into your vision — understanding your brand, audience, and goals to create a clear creative direction.' },
  { id: '02', title: 'Plan', description: 'We create a structured timeline, shot list, and creative direction aligned perfectly with your brand.' },
  { id: '03', title: 'Create', description: 'Our editors and motion designers craft your content with precision cuts, color grading, and cinematic quality.' },
  { id: '04', title: 'Deliver', description: 'Final review, revisions, and delivery in all required formats — optimized for every platform your content lives on.' },
];

/* ═══════════════════════════════════════
   MAIN SERVICES PAGE
   ═══════════════════════════════════════ */

const ServicesPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020e2b' }}>
      <ScrollProgressBar />

      {/* ═══════════ 01 — HERO ═══════════ */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(15, 157, 248, 0.06) 0%, transparent 60%)' }} />
        <div className="grain-overlay" />

        {/* Ambient orb */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="ambient-orb ambient-orb-1 -top-48 right-1/4" />
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
              <p className="overline-text">Services</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-[2.2rem] md:text-display lg:text-display-lg text-white max-w-4xl leading-tight mb-8">
              End-to-end video <span className="text-primary">production</span> services
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-body-lg text-white/55 max-w-2xl leading-relaxed mb-10">
              From concept to final delivery, we provide comprehensive video production and
              post-production services designed to elevate your brand and captivate your audience.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex items-center gap-6">
              <Link to="/contact" className="btn-primary">
                Start a project
              </Link>
              <Link to="/portfolio" className="text-caption text-white/40 tracking-wide inline-flex items-center gap-3 hover:text-primary/60 transition-colors">
                <span className="w-8 h-px bg-white/[0.08]" />
                View our work
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020e2b] to-transparent z-10" />
      </section>

      {/* ═══════════ 02 — PHILOSOPHY ═══════════ */}
      <PhilosophySection />

      {/* ═══════════ 03 — SERVICES ═══════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#031539' }}>
        <div className="section-edge-light" />
        <div className="grain-overlay" />

        {/* Ambient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="ambient-orb ambient-orb-2 top-[15%] -right-32" />
          <div className="ambient-orb ambient-orb-3 top-[65%] -left-32" />
        </div>

        <div className="container-luxury relative z-10 py-24 lg:py-32">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-16">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">03</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">The Craft</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-20 max-w-2xl">
              Precision meets creativity.
              <br />
              <span className="text-white/40">Every format. Every platform.</span>
            </h2>
          </ScrollReveal>

          {/* Services grid — 2 cols for luxury breathing room */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-sm overflow-hidden">
            {servicesData.map((service, index) => (
              <ScrollReveal key={service.id} delay={Math.min(index * 60, 400)}>
                <div className="bg-[#031539] p-8 md:p-10 lg:p-12 h-full group hover:bg-[#041a42] transition-colors duration-500">
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-[0.6rem] font-mono text-primary/30 tracking-widest">
                      {service.id}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center text-primary/40 border border-white/[0.06] rounded-sm
                      group-hover:text-primary/70 group-hover:border-primary/20 transition-all duration-300">
                      <ServiceIcon name={service.icon} />
                    </div>
                  </div>
                  <h3 className="text-[1.1rem] md:text-heading text-white font-medium tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-body text-white/45 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 04 — PROCESS ═══════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        <div className="section-edge-light" />
        <div className="grain-overlay" />

        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-20">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">04</span>
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.id} delay={index * 150} duration={1.4}>
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
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-white/[0.06]" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
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
                Have a project
                <br />
                <span className="text-primary">in mind?</span>
              </h2>

              <p className="text-body-lg text-white/50 mb-10 max-w-xl mx-auto">
                Tell us about your project and we'll craft the perfect solution for your brand.
              </p>

              <div className="w-10 h-px bg-primary/25 mx-auto mb-10" />

              <Link to="/contact" className="btn-primary">
                Start a Project
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
