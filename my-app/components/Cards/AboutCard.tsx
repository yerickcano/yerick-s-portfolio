import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function AboutCard() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <div className="glass-effect rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-primary mb-3">{t('title')}</h3>
      <p className="text-secondary text-sm mb-4 line-clamp-3">{t('subtitle')}</p>
      <Link 
        href={`/${locale}/about`}
        className="text-primary hover:text-primary-color text-sm font-medium inline-flex items-center gap-1"
      >
        Learn more →
      </Link>
    </div>
  );
}

