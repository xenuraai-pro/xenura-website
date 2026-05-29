import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_MAP_EMBED_URL,
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_WEBSITE,
  COMPANY_WEBSITE_URL,
} from '@/content/companyContact';

export const Contact = () => {
  return (
    <section id="contact" className="relative py-12 sm:py-14 lg:py-16 section-gradient-dark">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
            bottom: '-20%',
            right: '-10%',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              Get In Touch
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            Let&apos;s Build the Future Together
          </h2>
          <p className="text-base lg:text-lg text-slate-400 leading-relaxed">
            Ready to transform your vision into reality? Our team is here to help you create
            exceptional digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3 scroll-reveal-left">
            <div className="glass-card rounded-2xl p-5 sm:p-7 lg:p-10">
              <InquiryForm variant="dark" source="contact" idPrefix="contact" showIntro={false} />
            </div>
          </div>

          <div className="lg:col-span-2 scroll-reveal-right space-y-5">
            <div className="glass-card rounded-2xl p-6 lg:p-7">
              <h3 className="text-lg font-bold text-white mb-2">Get In Touch</h3>
              <p className="text-sm text-slate-400 mb-5">
                Whether you have a specific project in mind or just want to explore possibilities,
                we&apos;re here to listen and guide you.
              </p>
              <div className="space-y-4">
                <a href={`tel:${COMPANY_PHONE.tel}`} className="flex items-center gap-3 group" id="contact-phone">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{COMPANY_PHONE.display}</div>
                    <div className="text-xs text-slate-500">Mob - speak directly with our team</div>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="flex items-center gap-3 group"
                  id="contact-email-link"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{COMPANY_EMAIL}</div>
                    <div className="text-xs text-slate-500">Get in touch for project inquiries</div>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{COMPANY_NAME}</div>
                    <address className="text-xs text-slate-500 not-italic leading-relaxed mt-0.5">
                      {COMPANY_ADDRESS.lines.slice(1).map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">9:00 AM - 7:00 PM IST</div>
                    <div className="text-xs text-slate-500">Monday to Friday</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <a
                      href={COMPANY_WEBSITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white hover:text-orange-400 transition-colors"
                    >
                      {COMPANY_WEBSITE}
                    </a>
                    <div className="text-xs text-slate-500">Digital solutions partner</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 lg:p-7">
              <h3 className="text-lg font-bold text-white mb-5">Visit Us</h3>
              <div className="overflow-hidden rounded-lg h-48 sm:h-60">
                <iframe
                  title="Xenura Labs - Attibele, Bangalore"
                  src={COMPANY_MAP_EMBED_URL}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
