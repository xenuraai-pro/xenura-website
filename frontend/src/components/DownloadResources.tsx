import { Download, FileText } from 'lucide-react';
import { DOWNLOAD_RESOURCES } from '@/content/downloadResources';

type Props = {
  variant?: 'section' | 'page';
};

export function DownloadResources({ variant = 'section' }: Props) {
  const isPage = variant === 'page';

  return (
    <section
      id="downloads"
      className={
        isPage
          ? 'section-gradient-2 pb-16 sm:pb-20 pt-10 sm:pt-12'
          : 'relative py-12 sm:py-14 lg:py-16 section-gradient-2 overflow-hidden'
      }
    >
      <div className="container-custom">
        {!isPage && (
          <div className="mb-8 sm:mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7f4adf]/20 bg-[#7f4adf]/5 mb-4">
              <FileText className="w-3.5 h-3.5 text-[#7f4adf]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7f4adf]">
                Resources
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-3"
              style={{ color: 'var(--theme-text-strong)' }}
            >
              Brochures &amp; company PDFs
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
              Profiles, service overviews, and capability decks — ready to share with your team.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {DOWNLOAD_RESOURCES.map((resource) => (
            <article
              key={resource.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 flex flex-col h-full hover:border-[#7f4adf]/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#7f4adf]/15 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-[#7f4adf]" />
              </div>
              <p className="text-[11px] uppercase tracking-wide text-[#ff6b35] font-semibold mb-1.5">
                {resource.category}
              </p>
              <h3 className="font-bold text-base mb-2" style={{ color: 'var(--theme-text-strong)' }}>
                {resource.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--theme-text-muted)' }}>
                {resource.description}
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--theme-text-muted)' }}>
                PDF · {resource.fileSize}
              </p>
              <a
                href={resource.url}
                download={resource.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#7f4adf] hover:bg-[#6d3ec9] text-white text-sm font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                Get PDF
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DownloadResources;
