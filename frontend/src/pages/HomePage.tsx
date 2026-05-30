import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import OurClients from '@/components/OurClients';
import Services from '@/components/Services';
import FeatureGrid from '@/components/FeatureGrid';
import Innovation from '@/components/Innovation';
import TestimonialMarquee from '@/components/TestimonialMarquee';
import Blog from '@/components/Blog';
import DownloadResources from '@/components/DownloadResources';
import FaqXenuraPremium from '@/components/FaqXenuraPremium';
import { Contact } from '@/components/Contact';
import SearchShowcase from '@/components/SearchShowcase';
import { Footer } from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import PageLoader from '@/components/PageLoader';
import { prefetchPopupPromo } from '@/lib/promoCache';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';

const GlowDivider = () => <div className="glow-line" />;

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  useScrollReveal();

  const handleLoadComplete = () => { setIsLoading(false); setShowContent(true); };

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isLoading]);

  useEffect(() => {
    if (!showContent) return;
    void prefetchPopupPromo();
    const timer = window.setTimeout(() => setShowLeadModal(true), 700);
    return () => window.clearTimeout(timer);
  }, [showContent]);

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      {isLoading && <PageLoader onLoadComplete={handleLoadComplete} />}
      {showContent && (
        <div className="animate-fade-in">
          <LeadCaptureModal open={showLeadModal} onClose={() => setShowLeadModal(false)} />
          <Navigation />
          <main>
            <Hero />
            <GlowDivider />
            <About />
            <GlowDivider />
            <OurClients />
            <GlowDivider />
            <Services />
            <GlowDivider />
            <FeatureGrid />
            <GlowDivider />
            <Innovation />
            <GlowDivider />
            <TestimonialMarquee />
            <GlowDivider />
            <Blog />
            <GlowDivider />
            <DownloadResources />
            <GlowDivider />
            <FaqXenuraPremium />
            <GlowDivider />
            <Contact />
            <GlowDivider />
            <SearchShowcase />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default HomePage;
