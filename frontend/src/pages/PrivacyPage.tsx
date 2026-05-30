import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import { companyEmailsText } from '@/components/CompanyEmailLinks';
import { COMPANY_NAME, BRAND_NAME } from '@/content/companyContact';

const sections = [
  {
    title: 'Information we collect',
    body: 'When you submit our contact or career forms, we collect details you provide such as name, email, phone, company, and message content. We may also collect technical data (browser type, pages visited) through standard analytics tools to improve our website.',
  },
  {
    title: 'How we use your information',
    body: 'We use your information to respond to inquiries, deliver services you request, improve our website, and communicate about projects you have engaged us for. We do not sell your personal data to third parties.',
  },
  {
    title: 'Data storage & security',
    body: 'Form submissions are stored securely on our servers and cloud database providers with access limited to authorised Xenura staff. We apply reasonable technical and organisational measures to protect your data.',
  },
  {
    title: 'Third-party services',
    body: 'We may use trusted third-party tools for hosting, analytics, email, and payment processing. These providers process data according to their own privacy policies and our agreements with them.',
  },
  {
    title: 'Your rights',
    body: 'You may request access, correction, or deletion of your personal data by emailing us. We will respond within a reasonable timeframe in line with applicable law.',
  },
  {
    title: 'Contact',
    body: `For privacy-related questions, contact ${COMPANY_NAME} at ${companyEmailsText()}.`,
  },
];

const PrivacyPage = () => {
  usePageMeta(
    'Privacy Policy',
    `${BRAND_NAME} privacy policy - how we collect, use, and protect your personal information.`,
  );

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        <section style={{ background: 'var(--theme-section-1)' }}>
          <div className="container-custom py-12 sm:py-14 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold theme-text-strong mb-3">Privacy Policy</h1>
            <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
              Last updated: May 2025 · {COMPANY_NAME}
            </p>
          </div>
        </section>
        <section className="pb-16 sm:pb-20">
          <div className="container-custom max-w-3xl space-y-8">
            <p className="text-base leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
              This policy describes how {BRAND_NAME} (&quot;we&quot;, &quot;us&quot;) handles information when you visit our
              website or contact us for services.
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
    </div>
  );
};

export default PrivacyPage;
