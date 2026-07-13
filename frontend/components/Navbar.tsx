"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our story", href: "#about" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-soft-white/95 shadow-sm backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="#home" className="flex items-center gap-3" aria-label="887 Cafe home">
          <Image
            src="/images/logo.jpg"
            alt=""
            width={46}
            height={46}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-soft-white"
          />
          <span className="text-lg font-black tracking-[0.14em] text-coffee">887 CAFE</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-coffee/70 transition-colors hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="relative inline-flex min-h-11 items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange/20 transition hover:bg-orange-dark"
          >
            <ShoppingBag size={17} aria-hidden="true" />
            Order now
            {itemCount > 0 && (
              <span className="flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-[11px] text-orange">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-white text-coffee shadow-sm md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t bg-soft-white px-5 pb-6 pt-3 shadow-xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-12 items-center border-b text-base font-bold text-coffee"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-6 font-extrabold text-white"
              >
                <ShoppingBag size={18} aria-hidden="true" />
                Order now {itemCount > 0 ? `(${itemCount})` : ""}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
