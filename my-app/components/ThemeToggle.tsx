'use client';

import { useTheme } from '../hooks/useTheme';
import { Button } from '@headlessui/react';

export default function ThemeToggle() {
  const { theme, changeTheme, availableThemes, mounted } = useTheme();

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          Theme:
        </span>
        <div className="flex gap-1">
          {/* Render placeholder buttons during SSR */}
          {['light', 'dark', 'purple'].map((themeName) => (
            <div
              key={themeName}
              className="px-3 py-1 text-xs rounded-md button-secondary capitalize opacity-50"
            >
              {themeName}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
        Theme:
      </span>
      <div className="flex gap-1">
        {availableThemes.map((themeName) => (
          <Button
            key={themeName}
            onClick={() => changeTheme(themeName)}
            className={`px-3 py-1 text-xs rounded-md transition-colors capitalize ${
              theme === themeName 
                ? 'button-primary' 
                : 'button-secondary'
            }`}
          >
            {themeName}
          </Button>
        ))}
      </div>
    </div>
  );
}