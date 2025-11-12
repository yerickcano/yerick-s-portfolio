'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import LanguageSelector from '../LanguageSelector';
import ThemeSelector from '../ThemeSelector';

export default function Navbar() {
  const locale = useLocale();

  return (
    <nav className="sticky top-0 z-50 glass-effect shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo - Left side */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">Yerick</h1>
            </Link>
          </div>
          
          {/* Theme and Language Selectors - Right side */}
          <div className="flex items-center space-x-3">
            <ThemeSelector />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
