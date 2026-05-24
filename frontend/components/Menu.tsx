"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, menuCategories } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";
import { showNotification } from "@/components/NotificationManager";

const Menu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4"
          >
            Our Full Menu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-warm-black/60 max-w-2xl mx-auto mb-12"
          >
            From artisanal brews to savory meals, explore our complete selection
            of handcrafted delights.
          </motion.p>

          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-3 p-2 bg-soft-white/50 rounded-full border border-beige/50 w-fit mx-auto backdrop-blur-sm">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === cat
                    ? "text-cream"
                    : "text-warm-black/60 hover:text-coffee"
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="category-pill"
                    className="absolute inset-0 bg-coffee rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-cream rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-beige/50 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 4}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-soft-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-coffee">
                    {item.price}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-coffee group-hover:text-coffee-light transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-sm text-warm-black/60 mb-6 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                {/* <button 
                  onClick={() => {
                    addToCart(item);
                    showNotification(`Added ${item.name} to your order!`);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-beige text-coffee font-semibold hover:bg-coffee hover:text-cream transition-all group/btn"
                >
                  <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                  Add to Order
                </button> */}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
