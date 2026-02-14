import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { testimonialsData, videoTestimonial } from '../utils/testimonialsData';
import { About_Data } from '../utils/data';

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

      {/* ═══════════ VIDEO TESTIMONIAL ═══════════ */}
      <section className="pb-20">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="card-luxury p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-video rounded-sm overflow-hidden bg-surface border border-white/[0.04]">
                  <iframe
                    src={videoTestimonial.videoUrl}
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                    title="Video Testimonial"
                  />
                </div>
                <div>
                  <svg className="w-10 h-10 text-primary/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                  </svg>
                  <p className="text-body-lg text-white/50 leading-relaxed mb-8 italic">
                    "{videoTestimonial.quote}"
                  </p>
                  <div>
                    <p className="text-subheading text-white">{videoTestimonial.name}</p>
                    <p className="text-caption text-white/30 mt-1">{videoTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
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
                href={`https://wa.me/${About_Data.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi KV Media Works! I would like to share my experience working with you.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Give a Review
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
