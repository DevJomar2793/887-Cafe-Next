'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Coffee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { menuItems, menuCategories } from '@/lib/data';

export default function OrderPage() {
  const { cart, addToCart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Simulate API call
    console.log('Order placed:', { customerName, notes, items: cart, total: totalPrice });
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center p-12 bg-soft-white rounded-3xl shadow-xl border border-beige/50"
        >
          <div className="w-20 h-20 bg-coffee rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-cream w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-coffee mb-4">Order Received!</h2>
          <p className="text-warm-black/60 mb-8">
            Thank you, {customerName || 'friend'}! Your handcrafted brew is being prepared and will be ready for pickup soon.
          </p>
          <button
            onClick={() => {
              setIsOrdered(false);
              setCustomerName('');
              setNotes('');
            }}
            className="bg-coffee text-cream px-8 py-3 rounded-full font-medium hover:bg-coffee-light transition-all"
          >
            Place Another Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4"
          >
            Craft Your Order
          </motion.h1>
          <p className="text-warm-black/60">Select your favorites and we&apos;ll have them ready for you.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="sticky top-24 z-30 flex flex-col gap-6 pb-6 bg-cream/80 backdrop-blur-md rounded-2xl">
              <h2 className="text-2xl font-serif font-bold text-coffee flex items-center gap-2">
                <Coffee className="w-6 h-6" /> Our Menu
              </h2>
              
              {/* Enhanced Category Selector */}
              <div className="flex flex-wrap gap-2 p-1 bg-soft-white/50 rounded-full border border-beige/50 w-fit">
                {menuCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      selectedCategory === cat 
                        ? 'text-cream' 
                        : 'text-warm-black/60 hover:text-coffee'
                    }`}
                  >
                    {selectedCategory === cat && (
                      <motion.div
                        layoutId="category-pill"
                        className="absolute inset-0 bg-coffee rounded-full -z-10 shadow-sm"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className="grid sm:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-soft-white p-4 rounded-3xl border border-beige/50 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-4 group"
                  >
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-coffee text-lg leading-tight">{item.name}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-beige text-coffee rounded-full border border-coffee/10">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-warm-black/50 line-clamp-2 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-serif font-bold text-coffee text-lg">{item.price}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-beige text-coffee px-4 py-1.5 rounded-xl text-sm font-bold hover:bg-coffee hover:text-cream transition-all active:scale-95 shadow-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-soft-white p-6 rounded-3xl border border-beige/50 shadow-lg sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-coffee mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" /> Your Order
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-warm-black/40 italic">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 bg-cream p-3 rounded-xl border border-beige/30">
                        <div className="flex-1">
                          <p className="font-medium text-coffee text-sm">{item.name}</p>
                          <p className="text-xs text-warm-black/50">{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-soft-white rounded-lg border border-beige/50">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-coffee transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-coffee transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-beige pt-4 space-y-2">
                    <div className="flex justify-between text-warm-black/60">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif font-bold text-coffee">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-4 pt-4">
                    <div>
                      <label className="block text-xs font-semibold text-warm-black/50 uppercase mb-1 ml-1">Name</label>
                      <input 
                        type="text" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-cream border border-beige rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-coffee/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-warm-black/50 uppercase mb-1 ml-1">Notes (Optional)</label>
                      <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Special instructions..."
                        className="w-full bg-cream border border-beige rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-coffee/20 outline-none transition-all h-20 resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-coffee text-cream py-3 rounded-xl font-bold hover:bg-coffee-light transition-all shadow-md active:scale-95"
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
