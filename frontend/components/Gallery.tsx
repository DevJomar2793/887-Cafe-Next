'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Modal from '@/components/Modal';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop',
    alt: 'Coffee cup on table',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop',
    alt: 'Coffee beans',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2073&auto=format&fit=crop',
    alt: 'Barista working',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    alt: 'Shop interior',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2070&auto=format&fit=crop',
    alt: 'Coffee art',
    span: 'md:col-span-2 md:row-span-1',
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4"
            >
              Moments at Aura
            </motion.h2>
            <p className="text-warm-black/60 max-w-lg">
              A glimpse into our sanctuary where coffee meets community and creativity.
            </p>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="px-6 py-3 border border-coffee/20 rounded-full text-coffee font-semibold hover:bg-beige transition-colors"
          >
            Follow our Instagram
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
              className={cn(
                "relative overflow-hidden rounded-3xl group shadow-sm cursor-pointer",
                img.span
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-coffee/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-soft-white/90 backdrop-blur-sm p-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-coffee font-bold">View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
          <div className="relative w-full h-auto flex flex-col items-center">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image 
                src={selectedImage?.src || ''} 
                alt={selectedImage?.alt || 'Gallery image'} 
                fill 
                sizes="100vw"
                className="object-contain bg-soft-white"
              />
            </div>
            {selectedImage && (
              <p className="mt-4 text-center text-coffee font-medium italic">
                {selectedImage.alt}
              </p>
            )}
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Gallery;
