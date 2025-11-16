import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface ContactCardProps {
  type: 'email' | 'linkedin' | 'github' | 'availability';
}

export default function ContactCard({ type }: ContactCardProps) {
  const locale = useLocale();
  const t = useTranslations('contact');

  if (type === 'email') {
    return (
      <a 
        href="mailto:yerickcanogarcia@gmail.com"
        className="softCard clickable rounded-lg p-4 mb-4 transition-all block group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
            <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-primary">{t('contactMethods.email.title')}</h4>
            <p className="text-xs text-secondary">yerickcanogarcia@gmail.com</p>
          </div>
        </div>
      </a>
    );
  }

  if (type === 'linkedin') {
    return (
      <a 
        href="https://www.linkedin.com/in/yerickcano"
        target="_blank"
        rel="noopener noreferrer"
        className="softCard clickable rounded-lg p-4 mb-4 transition-all block group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-primary">{t('contactMethods.linkedin.title')}</h4>
            <p className="text-xs text-secondary">{t('contactMethods.linkedin.description')}</p>
          </div>
        </div>
      </a>
    );
  }

  if (type === 'github') {
    return (
      <a 
        href="https://github.com/yerickcano"
        target="_blank"
        rel="noopener noreferrer"
        className="softCard clickable rounded-lg p-4 mb-4 transition-all block group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800/10 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5 text-gray-800 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-primary">{t('contactMethods.github.title')}</h4>
            <p className="text-xs text-secondary">{t('contactMethods.github.description')}</p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <Link href={`/${locale}/contact`} className="softCard clickable rounded-lg p-4 mb-4 transition-all cursor-pointer block">
      <div>
        <h4 className="text-sm font-semibold text-primary mb-2">{t('availabilitySection')}</h4>
        <p className="text-xs text-secondary mb-3">{t('availability')}</p>
        <span className="text-primary hover:text-primary-color text-xs font-medium inline-flex items-center gap-1">
          Get in touch →
        </span>
      </div>
    </Link>
  );
}

