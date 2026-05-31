"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/887bg.jpg"
          alt="Coffee Shop Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Overlay to maintain brand colors and readability */}
        <div className="absolute inset-0 bg-cream/60" />
      </div>

      {/* Background abstract shapes for extra depth */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-beige rounded-full blur-3xl opacity-50 z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-coffee/5 rounded-full blur-3xl opacity-30 z-0" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 bg-coffee/10 text-coffee rounded-full text-sm font-semibold mb-6 tracking-wide uppercase">
            Est. 2026 • Premium Roast
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-coffee leading-[1.1] mb-6">
            Fresh Coffee, <br />
            <span className="text-coffee-light italic font-normal">
              Warm Moments.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-warm-black/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the art of handcrafted brewing in our cozy minimalist
            sanctuary. Where every cup tells a story of passion and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#full-menu"
              className="group bg-coffee text-cream px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-coffee-light transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              Explore Menu
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#about"
              className="px-8 py-4 rounded-full font-bold border-2 border-coffee/20 text-coffee hover:bg-beige transition-all active:scale-95"
            >
              Our Story
            </Link>
          </div>
        </motion.div>

        {/* Floating badge remains as a nice detail */}
        {/* <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-12 right-0 md:right-12 bg-soft-white p-6 rounded-2xl shadow-xl border border-beige flex items-center gap-4 z-20"
        >
          <div className="bg-coffee/10 p-3 rounded-xl">
            <span className="text-3xl">☕</span>
          </div>
          <div>
            <p className="font-bold text-coffee">Freshly Brewed</p>
            <p className="text-xs text-warm-black/50">Every single hour</p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;
