'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Coffee, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled
          ? 'bg-soft-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-coffee p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Coffee className="text-cream w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-coffee">
            Aura
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-warm-black/70 hover:text-coffee font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-coffee text-cream px-6 py-2.5 rounded-full font-medium hover:bg-coffee-light transition-all shadow-md hover:shadow-lg active:scale-95">
            Order Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-warm-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-soft-white border-t border-beige p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-warm-black/70 text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-coffee text-cream px-6 py-3 rounded-xl font-medium w-full mt-2">
            Order Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
