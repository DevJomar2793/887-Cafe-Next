'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Coffee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { menuItems } from '@/lib/data';
import { showNotification } from '@/components/NotificationManager';

interface OrderContentProps {
  onClose: () => void;
}

export default function OrderContent({ onClose }: OrderContentProps) {
  const { cart, addToCart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Coffee', 'Non-Coffee', 'Pastries', 'Pasta & Noodles', 'Pica-Pica', 'Rice Meal'];
  
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showNotification('Your cart is empty!', 'warning');
      return;
    }

    // Simulate API call
    console.log('Order placed:', { customerName, notes, items: cart, total: totalPrice });
    setIsOrdered(true);
    clearCart();
    showNotification('Order placed successfully! Your brew is being prepared.', 'success');
  };

  if (isOrdered) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-4"
        >
          <div className="relative w-24 h-24 bg-coffee rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="absolute inset-0 rounded-full bg-coffee/20 animate-ping" 
            />
            <ShoppingBag className="text-cream w-12 h-12 relative z-10" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-coffee mb-4">Order Received!</h2>
          <p className="text-warm-black/60 text-lg mb-10 leading-relaxed">
            Thank you, <span className="text-coffee font-semibold">{customerName || 'friend'}</span>!<br />
            Your handcrafted brew is being prepared and will be ready for pickup soon.
          </p>
          <button
            onClick={() => {
              setIsOrdered(false);
              setCustomerName('');
              setNotes('');
            }}
            className="bg-coffee text-cream px-10 py-4 rounded-full font-bold hover:bg-coffee-light transition-all shadow-lg hover:shadow-coffee/30 active:scale-95"
          >
            Place Another Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-full p-8">
      <header className="text-center mb-8 shrink-0">
        <h1 className="text-3xl font-serif font-bold text-coffee mb-2">
          Craft Your Order
        </h1>
        <p className="text-warm-black/60 text-sm">Select your favorites and we'll have them ready for you.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 flex-1 overflow-hidden min-h-0">
        {/* Menu Section */}
        <div className="flex flex-col h-full space-y-6 overflow-hidden">
          <div className="shrink-0">
            <h2 className="text-xl font-serif font-bold text-coffee flex items-center gap-2 mb-4">
              <Coffee className="w-5 h-5" /> Our Menu
            </h2>
            
            {/* Category Selector */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-coffee text-cream shadow-sm' 
                      : 'bg-soft-white text-warm-black/60 hover:bg-beige'
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ x: 5 }}
                  className="bg-soft-white p-3 rounded-2xl border border-beige/50 shadow-sm flex gap-3 group transition-all hover:border-coffee/30 hover:shadow-md"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-coffee text-sm">{item.name}</h3>
                      <p className="text-[10px] text-warm-black/50 line-clamp-1 mb-1">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-coffee text-xs">{item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-beige text-coffee px-2 py-1 rounded-lg text-xs font-semibold hover:bg-coffee hover:text-cream transition-all active:scale-95"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="flex flex-col h-full space-y-6 overflow-hidden">
          <h2 className="text-xl font-serif font-bold text-coffee flex items-center gap-2 shrink-0">
            <ShoppingBag className="w-5 h-5" /> Your Order
          </h2>

          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center py-12 bg-soft-white rounded-2xl border border-dashed border-beige">
              <div className="flex flex-col items-center gap-3">
                <ShoppingBag className="w-12 h-12 text-warm-black/20" />
                <p className="text-warm-black/40 italic text-sm">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-beige scrollbar-track-transparent">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 bg-cream p-3 rounded-xl border border-beige/30 shadow-sm">
                    <div className="flex-1">
                      <p className="font-medium text-coffee text-xs">{item.name}</p>
                      <p className="text-[10px] text-warm-black/50">{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-soft-white rounded-lg border border-beige/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-coffee transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
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
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-beige pt-4 mt-4 space-y-4 shrink-0">
                <div className="space-y-1">
                  <div className="flex justify-between text-warm-black/60 text-xs">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-serif font-bold text-coffee">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-cream border border-beige rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-coffee/20 outline-none transition-all placeholder:text-warm-black/30"
                    />
                  </div>
                  <div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special instructions..."
                      className="w-full bg-cream border border-beige rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-coffee/20 outline-none transition-all h-16 resize-none placeholder:text-warm-black/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-coffee text-cream py-3 rounded-xl font-bold hover:bg-coffee-light transition-all shadow-md active:scale-95 text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
