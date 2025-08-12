'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations('footer');
  const navT = useTranslations('navigation');

  return (
    <footer className="bg-surface border-t border-theme">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand/Logo */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-primary">{t('brand.title')}</h3>
            <p className="text-secondary text-sm">
              {t('brand.description')}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h4 className="text-md font-medium mb-4 text-primary">{t('navigation.title')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-secondary hover:text-primary transition-colors">
                  {navT('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-secondary hover:text-primary transition-colors">
                  {navT('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`} className="text-secondary hover:text-primary transition-colors">
                  {navT('projects')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/skills`} className="text-secondary hover:text-primary transition-colors">
                  {navT('skills')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-secondary hover:text-primary transition-colors">
                  {navT('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h4 className="text-md font-medium mb-4 text-primary">{t('social.title')}</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                {t('social.github')}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                {t('social.linkedin')}
              </a>
              <a
                href="mailto:your@email.com"
                className="text-secondary hover:text-primary transition-colors"
              >
                {t('social.email')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-theme text-center">
          <p className="text-secondary text-sm">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
