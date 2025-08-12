'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import LanguageSelector from '../LanguageSelector';
import ThemeSelector from '../ThemeSelector';

const navigation = [
  { name: 'Home', href: '' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-surface shadow-lg sticky top-0 z-50 border-b border-theme" ref={menuRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Logo - Left side */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">Yerick</h1>
            </Link>
          </div>
          
          {/* Navigation - Center (hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-center space-x-8">
            {navigation.map((item) => {
              const href = `/${locale}${item.href}`;
              return (
                <Link
                  key={item.name}
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === href
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:text-primary-color hover:bg-surface'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          {/* Theme and Language Selectors - Right side (hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-end space-x-3">
            <ThemeSelector />
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-secondary hover:text-primary-color focus:outline-none focus:text-primary-color"
              aria-label="toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                </svg>
              ) : (
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zM4 11h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zM4 17h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface border-t border-theme">
              {navigation.map((item) => {
                const href = `/${locale}${item.href}`;
                return (
                  <Link
                    key={item.name}
                    href={href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      pathname === href
                        ? 'bg-primary text-white'
                        : 'text-secondary hover:text-primary-color hover:bg-surface'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Theme and Language Selectors - Mobile */}
              <div className="px-3 py-4 border-t border-theme">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary">Theme:</span>
                    <ThemeSelector />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary">Language:</span>
                    <LanguageSelector />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
