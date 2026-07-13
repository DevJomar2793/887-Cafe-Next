'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { TopDrink } from '@/lib/dashboard-data';

interface TopDrinksProps {
  drinks: TopDrink[];
}

const TopDrinks = ({ drinks }: TopDrinksProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-beige flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-coffee/10 p-2 rounded-lg text-coffee">
            <Coffee size={20} />
          </div>
          <h3 className="text-lg font-bold text-coffee">Most Ordered</h3>
        </div>
        <button className="text-xs font-medium text-coffee hover:underline">Analyze</button>
      </div>
      
      <div className="space-y-6">
        {drinks.map((drink, index) => (
          <motion.div 
            key={drink.name} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2 group"
          >
            <div className="flex justify-between text-sm font-medium">
              <span className="text-warm-black group-hover:text-coffee transition-colors duration-300">{drink.name}</span>
              <span className="text-coffee font-bold">{drink.orders} <span className="text-[10px] text-warm-black/60">orders</span></span>
            </div>
            <div className="h-3 bg-beige/50 rounded-full overflow-hidden p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${drink.percentage}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-coffee-light to-coffee shadow-sm"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopDrinks;
