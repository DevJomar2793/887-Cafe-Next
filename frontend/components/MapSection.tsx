'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MapSection = () => {
  return (
    <section className="py-24 bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-6"
        >
          Find Our Cozy Spot
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-warm-black/60 max-w-2xl mx-auto mb-12"
        >
          Visit us and experience the perfect blend of rich aroma and warm ambiance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-beige"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2198909477024!2d-122.41941568468165!3d37.77492947975932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b2c2d2d2d%3A0x6d5e1f1c2d3a4b5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          ></iframe>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          href="https://maps.app.goo.gl/YourGoogleMapsLinkHere" // TODO: Replace with actual Google Maps link
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center justify-center px-8 py-4 bg-coffee text-cream rounded-full font-bold hover:bg-coffee-light transition-all shadow-lg active:scale-95"
        >
          Get Directions
        </motion.a>
      </div>
    </section>
  );
};

export default MapSection;
