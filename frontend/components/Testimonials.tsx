'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Freelance Designer',
    content: 'The atmosphere here is unmatched. It is my go-to spot for deep work and the oat milk latte is simply the best in the city.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Coffee Enthusiast',
    content: 'You can really taste the quality of the beans. The baristas are incredibly knowledgeable and the aesthetic is just perfect.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Local Resident',
    content: 'Aura Coffee has become my morning ritual. Warm service, peaceful vibes, and consistently great coffee every single time.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-soft-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-coffee/5 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4"
          >
            What Our Guests Say
          </motion.h2>
          <div className="w-20 h-1 bg-coffee/20 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-cream/40 backdrop-blur-sm p-8 rounded-3xl border border-beige/50 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-6 right-8 text-coffee/10 w-12 h-12" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-coffee text-coffee" />
                ))}
              </div>
              <p className="text-warm-black/70 mb-8 leading-relaxed italic">
                &quot;{t.content}&quot;
              </p>
              <div>
                <p className="font-bold text-coffee">{t.name}</p>
                <p className="text-sm text-warm-black/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
