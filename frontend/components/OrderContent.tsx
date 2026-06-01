"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { Minus, Plus, Trash2, ShoppingBag, Coffee } from "lucide-react";
import Image from "next/image";
=======
import { Minus, Plus, Trash2, ShoppingBag, Coffee, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
>>>>>>> dev
import { menuItems } from "@/lib/data";
import { showNotification } from "@/components/NotificationManager";

export default function OrderContent() {
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Coffee");

  const categories = [
    "Coffee",
    "Non-Coffee",
    "Pastries",
    "Pasta & Noodles",
    "Pica-Pica",
    "Rice Meal",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showNotification("Your cart is empty!", "warning");
      return;
    }
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-8 bg-cream/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="relative w-28 h-28 bg-coffee rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute inset-0 rounded-full bg-coffee/30 animate-ping"
            />
            <CheckCircle2 className="text-cream w-14 h-14 relative z-10" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-coffee mb-4">
            Order Received!
          </h2>
          <p className="text-warm-black/60 text-lg mb-10 leading-relaxed">
            Thank you, <span className="text-coffee font-semibold">{customerName || "friend"}</span>!<br />
            Your handcrafted brew is being prepared with love and will be ready soon.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOrdered(false);
              setCustomerName("");
              setNotes("");
            }}
            className="bg-coffee text-cream px-10 py-4 rounded-full font-bold hover:bg-coffee-light transition-all shadow-lg hover:shadow-coffee/30"
          >
            Order Something Else
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col h-full max-h-full p-8 overflow-hidden">
      <header className="text-center mb-8 shrink-0">
        <h1 className="text-3xl font-serif font-bold text-coffee mb-2">
          Craft Your Order
        </h1>
        <p className="text-warm-black/60 text-sm">
          Select your favorites and we&apos;ll have them ready for you.
=======
    <div className="flex flex-col h-full max-h-[85vh] bg-soft-white">
      {/* Header */}
      <header className="px-8 pt-8 pb-6 text-center shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h1 className="text-3xl font-serif font-bold text-coffee">
            Craft Your Moment
          </h1>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </motion.div>
        <p className="text-warm-black/50 text-sm">
          Select from our curated menu for a perfect break.
>>>>>>> dev
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 p-8 pt-0 overflow-hidden flex-1 min-h-0">
        {/* Menu Section */}
        <div className="flex flex-col flex-1 min-w-0 space-y-6 overflow-hidden">
          <div className="shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif font-bold text-coffee flex items-center gap-2">
                <Coffee className="w-5 h-5" /> Our Menu
              </h2>
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-coffee text-cream shadow-md scale-105"
                      : "bg-white text-warm-black/60 hover:bg-beige border border-beige/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-beige scrollbar-track-transparent">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-4 rounded-3xl border border-beige/40 shadow-sm flex gap-4 group transition-all duration-300 hover:shadow-md hover:border-coffee/20"
                >
<<<<<<< HEAD
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                    <Image
=======
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                    <img
>>>>>>> dev
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="font-bold text-coffee text-base tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs text-warm-black/50 line-clamp-1 mb-1 leading-tight">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-coffee text-sm">
                        {item.price}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(item)}
                        className="bg-beige text-coffee px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-coffee hover:text-cream transition-all shadow-sm"
                      >
                        Add +
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Section (The "Receipt") */}
        <div className="flex flex-col lg:w-[380px] h-full space-y-6 overflow-hidden bg-cream/50 backdrop-blur-md rounded-3xl border border-white p-6 shadow-inner relative">
          <div className="flex items-center gap-2 shrink-0">
            <ShoppingBag className="w-5 h-5 text-coffee" />
            <h2 className="text-xl font-serif font-bold text-coffee">Your Selection</h2>
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center p-8 bg-white/60 rounded-3xl border border-dashed border-beige/60">
              <div className="flex flex-col items-center gap-4 max-w-[200px]">
                <div className="relative">
                  <ShoppingBag className="w-16 h-16 text-coffee/20" />
                  <motion.div 
                    animate={{ rotate: [0, -10, 10, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-2 -right-2 bg-coffee text-cream p-1 rounded-full"
                  >
                    <Plus className="w-3 h-3" />
                  </motion.div>
                </div>
                <div>
                  <p className="text-coffee font-serif font-bold text-sm mb-1">Your bag is empty</p>
                  <p className="text-warm-black/40 text-[11px] leading-relaxed">
                    Pick some handcrafted delights to get started!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-beige scrollbar-track-transparent">
                {cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-white/90 p-3 rounded-2xl border border-beige/50 shadow-sm group hover:border-coffee/20 transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-coffee text-xs tracking-tight">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-warm-black/40 font-medium">
                        {item.price} each
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-soft-white rounded-full border border-beige/50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-white hover:text-coffee rounded-full transition-all text-warm-black/60"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center text-[10px] font-bold text-coffee">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-white hover:text-coffee rounded-full transition-all text-warm-black/60"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-beige/50 pt-6 mt-6 space-y-6 shrink-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-warm-black/60 text-xs">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif font-bold text-coffee">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-coffee/60 uppercase tracking-wider ml-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white border border-beige rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-coffee/10 focus:border-coffee/30 outline-none transition-all placeholder:text-warm-black/20 shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-coffee/60 uppercase tracking-wider ml-1">
                      Special Requests
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any preferences? (e.g. extra hot)"
                      className="w-full bg-white border border-beige rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-coffee/10 focus:border-coffee/30 outline-none transition-all h-16 resize-none placeholder:text-warm-black/20 shadow-sm"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-coffee text-cream py-3.5 rounded-2xl font-bold hover:bg-coffee-light transition-all shadow-lg shadow-coffee/20 text-sm flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Place Order
                  </motion.button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
