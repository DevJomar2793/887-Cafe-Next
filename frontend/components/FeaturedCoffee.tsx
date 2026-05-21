'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { menuItems } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { showNotification } from '@/components/NotificationManager';

const FeaturedCoffee = () => {
  const { addToCart } = useCart();
  
  const coffeeItems = menuItems.filter(item => item.category === 'Coffee');

  return (
    <section id="menu" className="py-24 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4"
          >
            Our Featured Brews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-warm-black/60 max-w-2xl mx-auto"
          >
            Handpicked seasonal favorites crafted by our expert baristas to elevate your morning routine.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coffeeItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-cream rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-beige/50"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-soft-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-coffee">
                  {item.price}
                </div>
              </div>
              <h3 className="text-xl font-bold text-coffee mb-2 group-hover:text-coffee-light transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-warm-black/60 mb-6 line-clamp-2">
                {item.description}
              </p>
              <button 
                onClick={() => addToCart(item)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-beige text-coffee font-semibold hover:bg-coffee hover:text-cream transition-all group/btn"
              >
                <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                Add to Order
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoffee;
