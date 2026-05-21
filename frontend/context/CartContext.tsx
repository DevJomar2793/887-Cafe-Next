'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Drink } from '@/lib/data';

interface CartItem extends Drink {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (drink: Drink) => void;
  removeFromCart: (drinkId: number) => void;
  updateQuantity: (drinkId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('aura_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (drink: Drink) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === drink.id);
      if (existing) {
        return prev.map((item) =>
          item.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...drink, quantity: 1 }];
    });
  };

  const removeFromCart = (drinkId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== drinkId));
  };

  const updateQuantity = (drinkId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(drinkId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === drinkId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
