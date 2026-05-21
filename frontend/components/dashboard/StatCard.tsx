'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  variant?: 'default' | 'coffee' | 'beige';
}

const StatCard = ({ label, value, trend, trendUp, icon: Icon, variant = 'default' }: StatCardProps) => {
  const variants = {
    default: "from-white/80 to-white/40 text-warm-black",
    coffee: "from-coffee/90 to-coffee/70 text-cream",
    beige: "from-beige/90 to-beige/70 text-coffee",
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "relative overflow-hidden p-6 rounded-3xl shadow-sm border border-white/20 backdrop-blur-md transition-all duration-300",
        "bg-gradient-to-br",
        variants[variant]
      )}
    >
      {/* Subtle decorative circle */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className={cn(
          "p-3 rounded-2xl transition-colors duration-300",
          variant === 'default' ? "bg-coffee/10 text-coffee" : "bg-white/20 text-white"
        )}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <p className={cn(
            "text-xs font-semibold uppercase tracking-wider mb-1",
            variant === 'default' ? "text-warm-black/60" : "text-cream/70"
          )}>{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
              trendUp ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600",
              variant === 'coffee' && "text-green-200 bg-green-400/20"
            )}>
              {trend}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
