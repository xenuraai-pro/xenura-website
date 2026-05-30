import React from 'react';
import { FileText } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DownloadResources } from '@/components/DownloadResources';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';

const ResourcesPage: React.FC = () => {
  useScrollReveal();
  usePageMeta(
    'Resources',
    'Download Xenura company profile, services overview, AI capabilities, and case study PDFs.',
  );

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        <section className="section-gradient-1">
          <div className="container-custom py-12 sm:py-14 lg:py-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7f4adf]/20 bg-[#7f4adf]/5 mb-5">
                <FileText className="w-4 h-4 text-[#7f4adf]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7f4adf]">
                  Resources
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
                style={{ color: 'var(--theme-text-strong)' }}
              >
                Brochures &amp; company PDFs
              </h1>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                Profiles, service overviews, and capability decks you can share with your team, partners, or
                stakeholders.
              </p>
            </div>
          </div>
        </section>
        <DownloadResources variant="page" />
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
