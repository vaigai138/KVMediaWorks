import { useEffect, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useScrollRevealProgress } from '../hooks/useScrollParallax';
import { useCountUp } from '../hooks/useCountUp';
import { About_Data, getWhatsAppLink } from '../utils/data';

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
  { year: '2025', title: '700+ Videos', description: 'Delivered 700+ videos for 65+ clients worldwide, expanding into new creative verticals.' },
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
              <a href={getWhatsAppLink('Hi KV Media Works! I would like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Start a project
              </a>
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
                  src="/web.png"
                  alt="KV Media Works"
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
                <StatItem number={700} suffix="+" label="Videos Delivered" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="bg-background">
                <StatItem number={65} suffix="+" label="Clients Worldwide" />
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

      {/* ═══════════ 05 — MEET OUR FOUNDER ═══════════ */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#031539' }}>
        <div className="section-edge-light" />
        <div className="grain-overlay" />

        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-20">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">05</span>
              <div className="w-8 h-px bg-primary/20" />
              <p className="overline-text">Meet Our Founder</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={100}>
              <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden bg-surface border border-white/[0.06] relative group">
                {/* Replace src with founder image path when ready, e.g. src="/founder.jpg" */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a1e3d] to-[#020e2b]">
                  <span className="text-[8rem] md:text-[10rem] font-bold leading-none text-white/[0.04] select-none">VV</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <h2 className="text-display-sm text-white mb-3 leading-snug">
                  Vaigai Vendhan
                </h2>
                <p className="text-primary/60 text-body-lg mb-8">Founder & Creative Director</p>

                <div className="space-y-5">
                  <p className="text-body text-white/55 leading-relaxed">
                    Vaigai Vendhan is the visionary behind KV Media Works. With a deep passion for visual storytelling and a keen eye for cinematic detail, he founded KV Media Works to bridge the gap between creative vision and professional video production.
                  </p>
                  <p className="text-body text-white/55 leading-relaxed">
                    His hands-on approach to every project ensures that each client receives personalized attention and content that truly represents their brand. From working with top creators to major brands, Vaigai brings a unique blend of technical expertise and creative instinct to the table.
                  </p>
                  <p className="text-body text-white/55 leading-relaxed">
                    Under his leadership, KV Media Works has grown from a one-person operation to a creative powerhouse delivering 700+ videos for 65+ clients worldwide, setting new standards in video editing and production.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href={About_Data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-white/[0.08] rounded-sm text-white/40 hover:text-primary hover:border-primary/30 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${About_Data.email}`}
                    className="w-10 h-10 flex items-center justify-center border border-white/[0.08] rounded-sm text-white/40 hover:text-primary hover:border-primary/30 transition-all duration-300"
                    aria-label="Email"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 06 — VALUES ═══════════ */}
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
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">06</span>
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

      {/* ═══════════ 07 — TIMELINE ═══════════ */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#020e2b' }}>
        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-20">
              <span className="text-[0.65rem] font-mono text-primary/40 tracking-widest">07</span>
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

      {/* ═══════════ 08 — CTA ═══════════ */}
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
              <span className="text-[0.65rem] font-mono text-primary/30 tracking-widest block mb-10">08</span>

              <h2 className="text-[1.8rem] md:text-display-sm lg:text-display text-white leading-tight mb-6">
                Ready to work with us?
              </h2>

              <p className="text-body-lg text-white/50 mb-10 max-w-xl mx-auto">
                Let's discuss your next project and create something exceptional together.
              </p>

              <div className="w-10 h-px bg-primary/25 mx-auto mb-10" />

              <a href={getWhatsAppLink('Hi KV Media Works! I would like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get in Touch
              </a>
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
