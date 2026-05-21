'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Package, Bell, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionItemProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const ActionItem = ({ label, icon, color, onClick }: ActionItemProps) => (
  <motion.button 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border",
      "bg-white/50 backdrop-blur-md border-beige hover:border-coffee/30 hover:shadow-md"
    )}
  >
    <div className={cn("p-3 rounded-xl mb-3", color)}>
      {icon}
    </div>
    <span className="text-xs font-bold text-warm-black text-center">{label}</span>
  </motion.button>
);

const QuickActions = () => {
  const actions = [
    { 
      label: 'Export Report', 
      icon: <Download size={20} />, 
      color: 'bg-blue-100 text-blue-600',
      onClick: () => alert('Exporting daily report as PDF...')
    },
    { 
      label: 'Manage Inventory', 
      icon: <Package size={20} />, 
      color: 'bg-orange-100 text-orange-600',
      onClick: () => alert('Opening inventory management...')
    },
    { 
      label: 'Send Alert', 
      icon: <Bell size={20} />, 
      color: 'bg-purple-100 text-purple-600',
      onClick: () => alert('Opening broadcast notification panel...')
    },
    { 
      label: 'Add Product', 
      icon: <Plus size={20} />, 
      color: 'bg-green-100 text-green-600',
      onClick: () => alert('Opening add product modal...')
    },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-beige">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-coffee/10 p-2 rounded-lg text-coffee">
          <Plus size={20} />
        </div>
        <h3 className="text-lg font-bold text-coffee">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <ActionItem key={idx} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
