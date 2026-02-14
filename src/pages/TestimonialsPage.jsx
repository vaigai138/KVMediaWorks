import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { testimonialsData } from '../utils/testimonialsData';
import { videoTestimonialsData } from '../utils/data';

const TestimonialsPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <p className="overline-text mb-6">Testimonials</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-sm md:text-display text-white max-w-3xl mb-8">
              Trusted by <span className="text-primary">brands</span> and creators
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body-lg text-white/45 max-w-2xl leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about
              working with KV Media Works.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ VIDEO TESTIMONIALS (Instagram-style) ═══════════ */}
      <section className="pb-20">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-display-sm text-white">Video Testimonials</h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-8">
            {videoTestimonialsData.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 100}>
                <InstagramVideoCard testimonial={testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TEXT TESTIMONIALS ═══════════ */}
      <section className="section-padding bg-surface/30">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-display-sm text-white">Client Stories</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 80}>
                <div className="card-luxury p-8 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-primary/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-body text-white/45 leading-relaxed flex-1 mb-8">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="pt-6 border-t border-white/[0.06]">
                    <p className="text-caption text-white font-medium">{testimonial.name}</p>
                    <p className="text-overline text-white/30 mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GIVE A REVIEW CTA ═══════════ */}
      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="overline-text mb-4">Share Your Experience</p>
              <h2 className="text-display-sm text-white mb-6">
                Worked with us? We'd love to hear from you
              </h2>
              <p className="text-body text-white/40 mb-10">
                Your feedback helps us improve and inspires us to keep pushing the boundaries of
                creative excellence.
              </p>
              <a
                href="https://g.page/r/CTTtiavkczzOEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Leave a Google Review
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════
   INSTAGRAM-STYLE VIDEO CARD
   ═══════════════════════════════════════ */

const InstagramVideoCard = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <div className="border border-white/[0.08] rounded-sm overflow-hidden" style={{ backgroundColor: '#0a1e3d' }}>
        {/* Instagram-style header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 flex items-center justify-center">
            <span className="text-[0.6rem] font-medium text-white">{testimonial.name[0]}</span>
          </div>
          <div className="flex-1">
            <p className="text-[0.75rem] text-white font-medium leading-none">{testimonial.name}</p>
            <p className="text-[0.6rem] text-white/40 mt-0.5">{testimonial.instagram}</p>
          </div>
          <svg className="w-4 h-4 text-white/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>

        {/* 9:16 Video */}
        <div className="relative aspect-[9/16]">
          {!isPlaying ? (
            <button onClick={() => setIsPlaying(true)} className="w-full h-full relative group">
              <img src={testimonial.thumbnail} alt={testimonial.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 rounded-full border-2 border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:border-white/50 transition-colors">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src={`${testimonial.videoUrl}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={`${testimonial.name} testimonial`}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3">
          <p className="text-[0.75rem] text-white/60 leading-relaxed">
            <span className="text-white font-medium">{testimonial.name}</span>{' '}
            {testimonial.quote}
          </p>
          <p className="text-[0.6rem] text-white/25 mt-2 uppercase tracking-wider">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
