"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import ShareModal from "@/components/ShareModal";

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function Navbar() {
  const { lang, toggle, tr } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" onClick={closeMenu}>
          <span className="w-8 h-8 rounded-lg bg-cr-red flex items-center justify-center text-white text-xs font-bold tracking-tight group-hover:scale-105 transition-transform duration-200 shadow-md shadow-cr-red/30">
            YC
          </span>
          <span className="font-semibold text-gray-900 text-sm hidden sm:block">
            Yerick Cano
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {tr.nav.links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-cr-red rounded-lg hover:bg-cr-red/5 transition-all duration-200"
            >
              {label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="ml-2 px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-500 hover:text-cr-red hover:border-cr-red/40 hover:bg-cr-red/5 transition-all duration-200"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          {/* Share button */}
          <button
            onClick={() => setShareOpen(true)}
            className="ml-1 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-500 hover:text-cr-red hover:border-cr-red/40 hover:bg-cr-red/5 transition-all duration-200"
            aria-label="Share site"
          >
            <ShareIcon />
            Share
          </button>
        </nav>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-200 text-gray-500 hover:text-cr-red hover:border-cr-red/40 transition-all duration-200"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-lg text-gray-600 hover:text-cr-red hover:bg-cr-red/5 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-5 pb-4 pt-1 border-t border-white/60">
          {tr.nav.links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="block py-3 text-sm font-medium text-gray-700 hover:text-cr-red border-b border-white/50 last:border-0 transition-colors"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { closeMenu(); setShareOpen(true); }}
            className="flex items-center gap-2 py-3 text-sm font-medium text-gray-700 hover:text-cr-red transition-colors"
          >
            <ShareIcon />
            Share
          </button>
        </div>
      )}

      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
    </header>
  );
}
