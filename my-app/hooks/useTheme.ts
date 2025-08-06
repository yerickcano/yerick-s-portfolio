'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'purple';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light'); // Default for server
  const [mounted, setMounted] = useState(false); // Track if we're in browser

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // This only runs in the browser after hydration
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    setMounted(true); // Mark as mounted
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Apply theme changes (only works after mounting)
  const changeTheme = (newTheme: Theme) => {
    if (!mounted) return; // Prevent errors during SSR
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    if (!mounted) return; // Prevent errors during SSR
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  // Get available themes
  const availableThemes: Theme[] = ['light', 'dark', 'purple'];

  return {
    theme,
    changeTheme,
    toggleTheme,
    availableThemes,
    mounted, // Expose mounted state for conditional rendering
  };
};