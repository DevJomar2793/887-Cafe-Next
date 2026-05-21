'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-cream">
      {/* Background abstract shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-beige rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-coffee/5 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 bg-coffee/10 text-coffee rounded-full text-sm font-semibold mb-6 tracking-wide uppercase">
            Est. 2026 • Premium Roast
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-coffee leading-[1.1] mb-6">
            Fresh Coffee, <br />
            <span className="text-coffee-light italic font-normal">Warm Moments.</span>
          </h1>
          <p className="text-lg text-warm-black/70 mb-10 max-w-lg leading-relaxed">
            Experience the art of handcrafted brewing in our cozy minimalist sanctuary. 
            Where every cup tells a story of passion and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#menu" className="group bg-coffee text-cream px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-coffee-light transition-all shadow-xl hover:shadow-2xl active:scale-95">
              Explore Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#about" className="px-8 py-4 rounded-full font-bold border-2 border-coffee/20 text-coffee hover:bg-beige transition-all active:scale-95">
              Our Story
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full max-w-[600px] mx-auto"
        >
          <div className="absolute inset-0 bg-coffee/10 rounded-[3rem] -rotate-3 scale-105" />
          <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
              alt="Cozy Coffee Shop"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 bg-soft-white p-6 rounded-2xl shadow-xl border border-beige flex items-center gap-4"
          >
            <div className="bg-coffee/10 p-3 rounded-xl">
              <span className="text-3xl">☕</span>
            </div>
            <div>
              <p className="font-bold text-coffee">Freshly Brewed</p>
              <p className="text-xs text-warm-black/50">Every single hour</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
