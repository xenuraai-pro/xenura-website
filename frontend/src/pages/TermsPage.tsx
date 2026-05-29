import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';
import { usePageMeta } from '@/hooks/usePageMeta';
import { COMPANY_EMAIL, COMPANY_NAME, COMPANY_WEBSITE, BRAND_NAME } from '@/content/companyContact';

const sections = [
  {
    title: 'Use of website',
    body: `Content on ${COMPANY_WEBSITE} is for general information about our services. You may not copy, scrape, or misuse site materials without written permission.`,
  },
  {
    title: 'Services & proposals',
    body: 'Project scope, timelines, fees, and deliverables are defined in separate proposals or statements of work signed by both parties. Website content does not constitute a binding contract.',
  },
  {
    title: 'Intellectual property',
    body: 'Upon full payment, clients receive rights to agreed deliverables as specified in the project contract. Xenura retains rights to pre-existing tools, frameworks, and general know-how.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the fullest extent permitted by law, Xenura is not liable for indirect or consequential damages arising from use of this website or services, beyond fees paid for the specific engagement in question.',
  },
  {
    title: 'Governing law',
    body: 'These terms are governed by the laws of India. Disputes shall be subject to the courts of Karnataka, India, unless otherwise agreed in writing.',
  },
  {
    title: 'Contact',
    body: `Questions about these terms: ${COMPANY_EMAIL} (${COMPANY_NAME}).`,
  },
];

const TermsPage = () => {
  usePageMeta(
    'Terms of Service',
    `Terms of service for using ${BRAND_NAME} website (${COMPANY_WEBSITE}) and engaging our digital services.`,
  );

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        <section style={{ background: 'var(--theme-section-1)' }}>
          <div className="container-custom py-12 sm:py-14 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold theme-text-strong mb-3">Terms of Service</h1>
            <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
              Last updated: May 2025 · {COMPANY_NAME}
            </p>
          </div>
        </section>
        <section className="pb-16 sm:pb-20">
          <div className="container-custom max-w-3xl space-y-8">
            <p className="text-base leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
              By using {COMPANY_WEBSITE} you agree to these terms. If you do not agree, please do not use the site.
            </p>
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-bold theme-text-strong mb-2">{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppChatbot />
    </div>
  );
};

export default TermsPage;
