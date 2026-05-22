'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Coffee, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Modal from '@/components/Modal';
import OrderContent from '@/components/OrderContent';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'menu', 'about', 'testimonials', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Watch our guest says', href: '#testimonials' },
    { name: 'Location', href: '#contact' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled
          ? 'bg-soft-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="bg-coffee p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Coffee className="text-cream w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-coffee">
            Aura
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-coffee" : "text-warm-black/60 hover:text-coffee"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-yellow-400/80 rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
          <div className="ml-4">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="bg-coffee text-cream px-6 py-2.5 rounded-full font-medium hover:bg-coffee-light transition-all shadow-md hover:shadow-lg active:scale-95 relative"
            >
              Order Now
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-beige text-coffee text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-coffee shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-soft-white border-t border-beige p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors py-2 px-4 rounded-xl",
                    isActive ? "bg-beige text-coffee" : "text-warm-black/70"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setIsOrderModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="bg-coffee text-cream px-6 py-3 rounded-xl font-medium w-full mt-2 relative flex items-center justify-center gap-2"
            >
              Order Now
              {totalItems > 0 && (
                <span className="bg-beige text-coffee text-xs font-bold px-2 py-0.5 rounded-full border border-coffee/20">
                  {totalItems} items
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
        <OrderContent onClose={() => setIsOrderModalOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;
