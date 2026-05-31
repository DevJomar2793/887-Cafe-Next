"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Share2,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-warm-black text-soft-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-coffee p-2 rounded-xl overflow-hidden">
                <Image 
                  src="/images/logo.jpg" 
                  alt="887 Cafe Logo" 
                  width={24} 
                  height={24} 
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                887
              </span>
            </Link>
            <p className="text-soft-white/60 leading-relaxed">
              Experience the finest handcrafted coffee in our cozy minimalist
              sanctuary. Bringing warmth to your daily routine since 2026.
            </p>
            <div className="flex gap-4">
              {[Globe, Share2, MessageSquare].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-soft-white/5 flex items-center justify-center hover:bg-coffee hover:text-cream transition-all"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Quick Links</h4>
            <ul className="space-y-4 text-soft-white/60">
              {["Home", "Menu", "About Us", "Contact", "Terms of Service"].map(
                (link) => {
                  const anchor =
                    link === "Home"
                      ? "#home"
                      : link === "Menu"
                        ? "#full-menu"
                        : link === "About Us"
                          ? "#about"
                          : link === "Contact"
                            ? "#contact"
                            : "#";
                  return (
                    <li key={link}>
                      <Link
                        href={anchor}
                        className="hover:text-cream transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Opening Hours</h4>
            <ul className="space-y-4 text-soft-white/60">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-cream">7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-cream">8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-cream">9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Contact Us</h4>
            <ul className="space-y-4 text-soft-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coffee mt-1" />
                <span>
                  123 Coffee Street, <br />
                  Brew City, BC 45678
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-coffee" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-coffee" />
                <span>hello@auracoffee.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-soft-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-soft-white/40">
          <p>© 2026 Aura Coffee. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-soft-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-soft-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
