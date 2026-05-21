'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  const highlights = [
    'Ethically sourced organic beans',
    'Expertly roasted in small batches',
    'Handcrafted by certified baristas',
    'Cozy community-focused atmosphere',
  ];

  return (
    <section id="about" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070&auto=format&fit=crop"
                alt="Barista pouring coffee"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-coffee/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-coffee/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-12 w-24 h-24 border-4 border-beige rounded-full hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-coffee-light font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-6 leading-tight">
              Crafting Exceptional <br />
              Coffee Experiences
            </h2>
            <p className="text-lg text-warm-black/70 mb-8 leading-relaxed">
              Founded in 2026, Aura Coffee began with a simple mission: to create a space 
              where quality coffee meets a peaceful environment. We believe that the perfect 
              cup of coffee is more than just a drink—it&apos;s a moment of clarity and warmth 
              in your busy day.
            </p>
            
            <div className="space-y-4 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-coffee w-5 h-5 flex-shrink-0" />
                  <span className="text-warm-black/80 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-coffee text-cream rounded-full font-bold hover:bg-coffee-light transition-all shadow-lg active:scale-95">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
