'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Coffee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { drinks } from '@/lib/data';
import { showNotification } from '@/components/NotificationManager';

interface OrderContentProps {
  onClose: () => void;
}

export default function OrderContent({ onClose }: OrderContentProps) {
  const { cart, addToCart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

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
      <div className="text-center py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
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
    <div className="space-y-8">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-coffee mb-2">
          Craft Your Order
        </h1>
        <p className="text-warm-black/60 text-sm">Select your favorites and we'll have them ready for you.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Menu Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-coffee flex items-center gap-2">
            <Coffee className="w-5 h-5" /> Our Menu
          </h2>
          <div className="grid gap-4 max-h-[40vh] overflow-y-auto pr-2">
            {drinks.map((drink) => (
              <motion.div 
                key={drink.id}
                whileHover={{ x: 5 }}
                className="bg-soft-white p-3 rounded-2xl border border-beige/50 shadow-sm flex gap-3"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={drink.image} alt={drink.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-coffee text-sm">{drink.name}</h3>
                    <p className="text-[10px] text-warm-black/50 line-clamp-1 mb-1">{drink.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-coffee text-xs">{drink.price}</span>
                    <button 
                      onClick={() => addToCart(drink)}
                      className="bg-beige text-coffee px-2 py-1 rounded-lg text-xs font-semibold hover:bg-coffee hover:text-cream transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-coffee flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Order
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-12 bg-soft-white rounded-2xl border border-dashed border-beige">
              <p className="text-warm-black/40 italic text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 bg-cream p-2 rounded-xl border border-beige/30">
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

              <div className="border-t border-beige pt-3 space-y-1">
                <div className="flex justify-between text-warm-black/60 text-xs">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-serif font-bold text-coffee">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-3 pt-2">
                <div>
                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-cream border border-beige rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-coffee/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special instructions..."
                    className="w-full bg-cream border border-beige rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-coffee/20 outline-none transition-all h-16 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-coffee text-cream py-3 rounded-xl font-bold hover:bg-coffee-light transition-all shadow-md active:scale-95 text-sm"
                >
                  Place Order
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
