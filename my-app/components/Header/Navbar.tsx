'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SideNavigator from '../SideNavigator/SideNavigator';

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations('navbar');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <nav className="navbar fixed top-0 left-0 right-0 z-50 glass-effect shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr] xl:grid-cols-1 items-center h-28 gap-4">
            {/* Burger Button - Mobile/Tablet (Left column - minimal width) */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="xl:hidden softCard clickable rounded-lg p-3 flex-shrink-0"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileNavOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo - Centered in remaining space */}
            <div className="flex items-center justify-center min-w-0">
              <Link href={`/${locale}`} className="flex-shrink-0">
                <div className="navTitle rounded-lg px-2 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap">
                  <h1 className="text-sm sm:text-base lg:text-xl font-bold tracking-[0.15em] sm:tracking-[0.20em]">{t('name')}</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileNavOpen && (
        <>
          <div 
            className="xl:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="xl:hidden fixed top-32 left-4 z-50 w-64 max-w-[calc(100vw-2rem)]">
            <SideNavigator onLinkClick={() => setIsMobileNavOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
