import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { About_Data } from '../utils/data';
import { servicesData } from '../utils/servicesData';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `*New Project Inquiry*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service Needed:* ${formData.service}

*Message:*
${formData.message}`;

    const whatsappUrl = `https://wa.me/${About_Data.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-background min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-luxury relative z-10">
          <ScrollReveal>
            <p className="overline-text mb-6">Contact</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-sm md:text-display text-white max-w-3xl mb-8">
              Let's <span className="text-primary">create</span> together
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-body-lg text-white/45 max-w-2xl leading-relaxed">
              Ready to bring your vision to life? Tell us about your project and we'll get back to you promptly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ CONTACT FORM + INFO ═══════════ */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-caption text-white/40 block mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input-luxury"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-caption text-white/40 block mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="input-luxury"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-caption text-white/40 block mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="input-luxury"
                      />
                    </div>
                    <div>
                      <label className="text-caption text-white/40 block mb-2">What service do you need?</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="input-luxury appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled>Select a service</option>
                        {servicesData.map((service) => (
                          <option key={service.id} value={service.title} className="bg-surface text-white">
                            {service.title}
                          </option>
                        ))}
                        <option value="Other" className="bg-surface text-white">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-caption text-white/40 block mb-2">Project Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={6}
                      className="input-luxury resize-none"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full md:w-auto">
                    Send via WhatsApp
                  </button>
                </form>
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={150}>
                <div className="space-y-10">
                  <div>
                    <h3 className="text-overline uppercase tracking-[0.12em] text-white/30 mb-4">
                      Email
                    </h3>
                    <a
                      href={`mailto:${About_Data.email}`}
                      className="text-body-lg text-white/60 transition-colors duration-300"
                    >
                      {About_Data.email}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-overline uppercase tracking-[0.12em] text-white/30 mb-4">
                      WhatsApp
                    </h3>
                    <a
                      href={`https://wa.me/${About_Data.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-lg text-white/60 transition-colors duration-300"
                    >
                      {About_Data.whatsapp}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-overline uppercase tracking-[0.12em] text-white/30 mb-4">
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/kv_mediaworks/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-lg text-white/60 transition-colors duration-300"
                    >
                      {About_Data.instagram}
                    </a>
                  </div>

                  <div className="divider" />

                  <div>
                    <h3 className="text-overline uppercase tracking-[0.12em] text-white/30 mb-4">
                      Response Time
                    </h3>
                    <p className="text-body text-white/40">
                      We typically respond within 2-4 hours during business hours. For urgent requests, please reach out via WhatsApp.
                    </p>
                  </div>

                  <div className="card-luxury p-8">
                    <p className="text-caption text-white/30 mb-3">Prefer a quick chat?</p>
                    <a
                      href={`https://wa.me/${About_Data.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi KV Media Works! I would like to discuss a project.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-center"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
