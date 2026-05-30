import { COMPANY_EMAILS } from '@/content/companyContact';

type Props = {
  className?: string;
  linkClassName?: string;
  separator?: string;
  layout?: 'inline' | 'stack';
};

export function CompanyEmailLinks({
  className = '',
  linkClassName = 'hover:text-white transition-colors',
  separator = ' · ',
  layout = 'inline',
}: Props) {
  if (layout === 'stack') {
    return (
      <div className={`space-y-1 ${className}`}>
        {COMPANY_EMAILS.map((email) => (
          <a key={email} href={`mailto:${email}`} className={`block ${linkClassName}`}>
            {email}
          </a>
        ))}
      </div>
    );
  }

  return (
    <span className={className}>
      {COMPANY_EMAILS.map((email, index) => (
        <span key={email}>
          <a href={`mailto:${email}`} className={linkClassName}>
            {email}
          </a>
          {index < COMPANY_EMAILS.length - 1 ? separator : null}
        </span>
      ))}
    </span>
  );
}

export function companyEmailsText() {
  return COMPANY_EMAILS.join(' or ');
}
