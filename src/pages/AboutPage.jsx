import { useEffect, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useScrollRevealProgress } from '../hooks/useScrollParallax';
import { useCountUp } from '../hooks/useCountUp';
import { About_Data } from '../utils/data';

/* ═══════════════════════════════════════════════════════════
   ABOUT PAGE — CINEMATIC DESIGN PATTERNS
   Section numbering · Ambient effects · Scroll reveal
   Animated stats · Grain overlays · Hover states
   ═══════════════════════════════════════════════════════════ */

const values = [
  {
    title: 'Cinematic Excellence',
    description: 'Every frame is treated with the precision and artistry of cinema. We don\'t just edit videos — we craft visual experiences.',
  },
  {
    title: 'Client Partnership',
    description: 'We work as an extension of your team, understanding your vision deeply and delivering content that exceeds expectations.',
  },
  {
    title: 'Creative Innovation',
    description: 'Pushing boundaries with every project. We stay ahead of trends while maintaining timeless production quality.',
  },
  {
    title: 'Timely Delivery',
    description: 'Deadlines are sacred. We combine efficiency with quality to ensure your content is delivered when you need it.',
  },
];

const milestones = [
  { year: '2024', title: 'Founded', description: 'KV Media Works was established with a vision to redefine video production standards.' },
  { year: '2024', title: '50+ Projects', description: 'Reached our first major milestone — 50 projects delivered across multiple industries.' },
  { year: '2025', title: '100+ Projects', description: 'Crossed 100 projects with a growing roster of repeat clients and brand partnerships.' },
  { year: '2025', title: 'Expanding', description: 'Building a larger team and expanding into new creative verticals and markets.' },
];

/* ═══════════════════════════════════════
   SCROLL PROGRESS BAR (reused pattern)
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
   ANIMATED STAT ITEM
   ═══════════════════════════════════════ */

const StatItem = ({ number, suffix, label }) => {
  const { ref, count } = useCountUp(number, 2200);

  return (
    <div ref={ref} className="text-center p-12">
      <div className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-semibold leading-none tracking-tight text-white">
        {count}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/50 mt-4">{label}</p>
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN ABOUT PAGE
   ═══════════════════════════════════════ */

const AboutPage = () => {
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
              <p className="overline-text">About Us</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-[2.2rem] md:text-display lg:text-display-lg text-white max-w-4xl leading-tight mb-8">
              Where creativity meets <span className="text-primary">precision</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-body-lg text-white/55 max-w-2xl leading-relaxed mb-10">
              {About_Data.AboutPara1}
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
      </section>

      {/* ═══════════ 02 — PHILOSOPHY ═══════════ */}
      <PhilosophySection />

      {/* ═══════════ 03 — STORY ═══════════ */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#031539' }}>
        <div className="section-edge-light" />

        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-16">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">03</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">Our Story</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={100}>
              <div className="aspect-[4/3] rounded-sm overflow-hidden bg-surface border border-white/[0.06] relative group">
                <img
                  src="/video-editing.png"
                  alt="KV Media Works — video editing studio workspace"
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <h2 className="text-display-sm text-white mb-8 leading-snug">
                  Built on passion for <span className="text-primary/80">visual storytelling</span>
                </h2>
                <div className="space-y-5">
                  <p className="text-body text-white/55 leading-relaxed">
                    KV Media Works is a creative powerhouse in video editing, offering an array of services from short-form social media clips to full-length cinematic projects. We blend precision with creativity to bring every idea to life.
                  </p>
                  <p className="text-body text-white/55 leading-relaxed">
                    Led by our founder, our team is driven to exceed client expectations by delivering high-quality, innovative results that set new standards in the world of video editing. We're passionate about pushing the boundaries of what's possible, ensuring that every project not only meets but surpasses the vision behind it.
                  </p>
                  <p className="text-body text-white/55 leading-relaxed">
                    Our founder's expertise and hands-on approach have fostered a culture of excellence and creativity, inspiring each team member to strive for perfection.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 04 — STATS ═══════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        <div className="section-edge-light" />

        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-16">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">04</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">In Numbers</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-sm overflow-hidden">
            <ScrollReveal delay={0}>
              <div className="bg-background">
                <StatItem number={100} suffix="+" label="Projects Completed" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="bg-background">
                <StatItem number={15} suffix="+" label="Clients Served" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-background">
                <StatItem number={3} suffix="+" label="Years of Experience" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 05 — VALUES ═══════════ */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#041633' }}>
        <div className="section-edge-light" />
        <div className="grain-overlay" />

        {/* Ambient orb */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="ambient-orb ambient-orb-2 top-1/4 -right-32" />
        </div>

        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-20">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">05</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">Our Values</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-16 max-w-xl">
              What drives us
              <br />
              <span className="text-primary/80">every single day.</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-background p-10 md:p-12 h-full group hover:bg-surface/30 transition-colors duration-300">
                  <span className="text-[0.65rem] font-mono text-primary/30 mb-6 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-heading text-white mb-4 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                  <p className="text-body text-white/50 leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 06 — TIMELINE ═══════════ */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-20">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">06</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">Our Journey</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-[1.6rem] md:text-display-sm text-white leading-snug mb-16 max-w-xl">
              Key milestones
              <br />
              <span className="text-white/40">along the way.</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl space-y-0">
            {milestones.map((milestone, index) => (
              <ScrollReveal key={index} delay={index * 120}>
                <div className="flex gap-8 pb-12 relative group">
                  {/* Timeline line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-[23px] top-12 bottom-0 w-px bg-white/[0.06]" />
                  )}
                  {/* Dot */}
                  <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-surface flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  {/* Content */}
                  <div className="pt-2">
                    <span className="text-[0.65rem] font-mono text-primary/50 block mb-2">{milestone.year}</span>
                    <h3 className="text-subheading text-white mb-2 group-hover:text-primary transition-colors duration-300">{milestone.title}</h3>
                    <p className="text-body text-white/50">{milestone.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 07 — CTA ═══════════ */}
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
              <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">07</span>

              <h2 className="text-[1.8rem] md:text-display-sm lg:text-display text-white leading-tight mb-6">
                Ready to work with us?
              </h2>

              <p className="text-body-lg text-white/50 mb-10 max-w-xl mx-auto">
                Let's discuss your next project and create something exceptional together.
              </p>

              <div className="w-10 h-px bg-primary/25 mx-auto mb-10" />

              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════
   02 — PHILOSOPHY
   Ref-based scroll reveal — zero React re-renders
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
          We don't just edit footage.
          <br />
          <span className="text-primary/80 font-normal">We shape narratives.</span>
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
