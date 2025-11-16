'use client';

import { Fragment } from 'react';
import { 
  Listbox, 
  ListboxButton, 
  ListboxOptions, 
  ListboxOption, 
  Transition 
} from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../hooks/useTheme';

const themeIcons = {
  light: '☀️',
  dark: '🌙',
  earth: '🌿'
} as const;

export default function ThemeSelector() {
  const { theme, changeTheme, availableThemes, mounted } = useTheme();
  const t = useTranslations('theme');

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-24 h-10 softCard rounded-md animate-pulse"></div>
    );
  }

  const currentTheme = availableThemes.find(t => t === theme) || 'light';

  return (
    <Listbox value={currentTheme} onChange={changeTheme}>
      <div className="relative w-full z-20">
        <ListboxButton className="softCard clickable relative w-full cursor-pointer rounded-md py-2 pl-3 pr-10 text-left text-sm text-primary focus:outline-none min-w-0">
          <span className="flex items-center gap-2 truncate">
            <span className="flex-shrink-0">{themeIcons[currentTheme]}</span>
            <span className="truncate">{t(currentTheme)}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute left-0 right-0 mt-2 max-h-60 w-full overflow-auto rounded-md softCard py-1 text-sm focus:outline-none z-[200]">
            {availableThemes.map((themeName) => (
              <ListboxOption
                key={themeName}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-3 pr-9 transition-colors ${
                    active ? 'bg-primary/10 text-primary' : 'text-primary hover:bg-surface/50'
                  }`
                }
                value={themeName}
              >
                {({ selected }) => (
                  <>
                    <div className="flex items-center gap-2">
                      <span>{themeIcons[themeName]}</span>
                      <span className={selected ? 'font-medium' : 'font-normal'}>
                        {t(themeName)}
                      </span>
                    </div>
                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}