"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-cr-red rounded-lg hover:bg-cr-red/5 transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-cr-red hover:bg-cr-red/5 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-5 pb-4 pt-1 border-t border-white/60">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="block py-3 text-sm font-medium text-gray-700 hover:text-cr-red border-b border-white/50 last:border-0 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
