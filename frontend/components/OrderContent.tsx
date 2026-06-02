"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Coffee,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/lib/data";
import { showNotification } from "@/components/NotificationManager";

interface OrderContentProps {
  onClose: () => void;
}

export default function OrderContent({ onClose }: OrderContentProps) {
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
  const [lastOrder, setLastOrder] = useState<any[]>([]);
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
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

    const id = `887-${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toLocaleString();
    setOrderId(id);
    setOrderDate(date);
    setLastOrder(cart);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="flex flex-col items-center justify-start max-h-[90vh] p-8 bg-cream/30 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full py-8"
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
          <p className="text-warm-black/60 text-lg mb-8 leading-relaxed">
            Thank you,{" "}
            <span className="text-coffee font-semibold">
              {customerName || "friend"}
            </span>
            !<br />
            Your order is being prepared with love.
          </p>

          {/* Digital Receipt */}
          <div className="relative mx-auto max-w-sm bg-white shadow-2xl mb-12 overflow-hidden">
            {/* Receipt Header / Top Border */}
            <div className="h-2 bg-coffee w-full" />

            <div className="p-8 font-mono text-xs text-warm-black/80">
              <div className="text-center mb-6 space-y-1">
                <h3 className="text-coffee font-bold text-lg uppercase tracking-widest">
                  887 Cafe
                </h3>
                <p className="text-[10px] opacity-60">Order #{orderId}</p>
                <p className="text-[10px] opacity-60">{orderDate}</p>
              </div>

              <div className="border-t border-dashed border-beige py-4 space-y-3">
                {lastOrder.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    key={item.id}
                    className="flex justify-between items-start gap-4"
                  >
                    <div className="flex-1">
                      <span className="font-bold text-coffee">
                        {item.quantity}x
                      </span>{" "}
                      <span>{item.name}</span>
                    </div>
                    <span className="text-coffee font-bold">
                      $
                      {(
                        parseFloat(item.price.replace("$", "")) * item.quantity
                      ).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-beige mt-4 pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="opacity-60">Subtotal</span>
                  <span>
                    $
                    {lastOrder
                      .reduce(
                        (sum, item) =>
                          sum +
                          parseFloat(item.price.replace("$", "")) *
                            item.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base font-bold text-coffee">
                  <span>TOTAL</span>
                  <span>
                    $
                    {lastOrder
                      .reduce(
                        (sum, item) =>
                          sum +
                          parseFloat(item.price.replace("$", "")) *
                            item.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-center mt-8 space-y-2">
                <div className="h-px w-full bg-beige" />
                <p className="text-[10px] italic opacity-60">
                  Thank you for visiting 887 Cafe!
                </p>
                <p className="text-[10px] font-bold text-coffee uppercase">
                  Stay caffeinated!
                </p>
              </div>
            </div>

            {/* Jagged Edge Bottom */}
            <div className="relative h-4 w-full bg-white overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 10px -5px, transparent 12px, white 13px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOrdered(false);
              setCustomerName("");
              setNotes("");
              setLastOrder([]);
              setOrderId("");
              setOrderDate("");
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
    <div className="flex flex-col h-full max-h-[85vh] bg-soft-white overflow-y-auto">
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
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 p-8 pt-0 flex-1">
        {/* Menu Section */}
        <div className="flex flex-col lg:flex-1 min-w-0 space-y-6">
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

          <div className="space-y-4">
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
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.name}
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
        <div className="flex flex-col lg:w-[380px] w-full space-y-6 bg-cream/50 backdrop-blur-md rounded-3xl border border-white p-6 shadow-inner relative">
          <div className="flex items-center gap-2 shrink-0">
            <ShoppingBag className="w-5 h-5 text-coffee" />
            <h2 className="text-xl font-serif font-bold text-coffee">
              Your Selection
            </h2>
          </div>

          {cart.length === 0 ? (
            <div className="flex items-center justify-center text-center p-8 bg-white/60 rounded-3xl border border-dashed border-beige/60">
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
                  <p className="text-coffee font-serif font-bold text-sm mb-1">
                    Your bag is empty
                  </p>
                  <p className="text-warm-black/40 text-[11px] leading-relaxed">
                    Pick some handcrafted delights to get started!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="space-y-3">
                {cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-white/90 p-3 rounded-2xl border border-beige/50 shadow-sm group hover:border-coffee/20 transition-all"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-beige/50 shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-coffee text-xs tracking-tight">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-warm-black/40 font-medium">
                          {item.price} each
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-soft-white rounded-full border border-beige/50 p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-white hover:text-coffee rounded-full transition-all text-warm-black/60"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center text-[10px] font-bold text-coffee">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
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
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60 space-y-2">
                  <div className="flex justify-between text-warm-black/60 text-xs">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      ${totalPrice.toFixed(2)}
                    </span>
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
                      className="w-full bg-white border border-beige rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-coffee/20 focus:border-coffee/40 outline-none transition-all placeholder:text-warm-black/20 shadow-sm"
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
                      className="w-full bg-white border border-beige rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-coffee/20 focus:border-coffee/40 outline-none transition-all h-16 resize-none placeholder:text-warm-black/20 shadow-sm"
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
