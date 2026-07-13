"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { MenuItem } from "@/lib/data";
import { getLineTotal } from "@/lib/money";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const STORAGE_KEY = "887_cafe_cart";
const LEGACY_STORAGE_KEY = "aura_cart";
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedCart = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart) as CartItem[];
          if (Array.isArray(parsedCart)) setCart(parsedCart);
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        }
      }
      setIsHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isHydrated]);

  const addToCart = (item: MenuItem) => {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      return existing
        ? current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
        : [...current, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => setCart((current) => current.filter((item) => item.id !== itemId));

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((current) => current.map((item) => item.id === itemId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);
  const totalPrice = cart.reduce((total, item) => total + getLineTotal(item), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
