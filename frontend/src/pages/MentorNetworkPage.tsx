import React, { useState } from 'react';
import { Globe2, MapPin, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MentorNetworkMap } from '@/components/MentorNetworkMap';
import { usePageMeta } from '@/hooks/usePageMeta';
import {
  MENTOR_EXPERTISE,
  MENTOR_LOCATIONS,
  MENTOR_NETWORK_HEADLINE,
  MENTOR_NETWORK_INTRO,
  MENTOR_NETWORK_LEAD,
} from '@/content/mentorNetwork';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';

const panelClass =
  'rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm';

const MentorNetworkPage: React.FC = () => {
  useScrollReveal();
  usePageMeta(
    'Global Mentor Network',
    'Xenura mentors and advisors across 20 countries — AI, data, cloud, product engineering, and business transformation.',
  );

  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main>
        <section
          className="relative overflow-hidden section-gradient-1"
          style={{ paddingTop: 'var(--header-height)' }}
        >
          <div className="container-custom py-12 sm:py-14 lg:py-16">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-5 flex flex-col">
                <MentorNetworkMap
                  compact
                  activeCountry={activeCountry}
                  onLocationSelect={setActiveCountry}
                />
                <p className="text-xs mt-3" style={{ color: 'var(--theme-text-muted)' }}>
                  Click a pin to view mentor location · {MENTOR_LOCATIONS.length} countries
                </p>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7f4adf]/20 bg-[#7f4adf]/5 mb-4 w-fit">
                  <Globe2 className="w-4 h-4 text-[#7f4adf]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7f4adf]">
                    Global Network
                  </span>
                </div>

                <h1
                  className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight mb-3 leading-tight"
                  style={{ color: 'var(--theme-text-strong)' }}
                >
                  {MENTOR_NETWORK_HEADLINE}
                </h1>

                <p className="text-base leading-relaxed mb-3" style={{ color: 'var(--theme-text-muted)' }}>
                  {MENTOR_NETWORK_LEAD}
                </p>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  {MENTOR_NETWORK_INTRO}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-gradient-2 py-12 sm:py-14 pb-16 sm:pb-20">
          <div className="container-custom space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-[#ff6b35]" />
                <h2 className="font-bold text-xl sm:text-2xl" style={{ color: 'var(--theme-text-strong)' }}>
                  Core expertise
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {MENTOR_EXPERTISE.map((item) => (
                  <div
                    key={item}
                    className={`${panelClass} flex items-center justify-center text-center px-3 py-4 text-sm min-h-[76px]`}
                    style={{ color: 'var(--theme-text-muted)' }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-5" style={{ color: 'var(--theme-text-strong)' }}>
                All mentor locations
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {MENTOR_LOCATIONS.map((location) => {
                  const isActive = activeCountry === location.country;
                  return (
                    <button
                      key={location.country}
                      type="button"
                      onClick={() => setActiveCountry(location.country)}
                      className={`${panelClass} w-full text-left p-4 min-h-[96px] transition-all ${
                        isActive
                          ? 'border-[#7f4adf]/40 bg-[#7f4adf]/10 ring-1 ring-[#7f4adf]/20'
                          : 'hover:border-[#7f4adf]/25 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#7f4adf]/15 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-[#7f4adf]" />
                        </div>
                        <div className="min-w-0 text-left">
                          <h3
                            className="font-semibold text-sm leading-tight truncate"
                            style={{ color: 'var(--theme-text-strong)' }}
                          >
                            {location.country}
                          </h3>
                          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--theme-text-muted)' }}>
                            {location.city}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MentorNetworkPage;
