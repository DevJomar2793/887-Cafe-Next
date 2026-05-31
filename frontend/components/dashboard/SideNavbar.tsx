'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LogOut, Settings, LayoutDashboard, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SideNavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SideNavbar = ({ isOpen, setIsOpen }: SideNavbarProps) => {
  // Mock User Data
  const user = {
    name: 'Admin User',
    email: 'admin@auracoffee.com',
    role: 'Store Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-coffee text-cream rounded-lg shadow-lg"
      >
        <LayoutDashboard size={20} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside 
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -300,
          width: isOpen ? 300 : 0 
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-beige z-40 flex flex-col",
          !isOpen && "lg:translate-x-0 lg:w-[300px]"
        )}
        style={{ width: isOpen ? '300px' : '0px' }}
      >
        {/* User Profile Section */}
        <div className="p-6 border-b border-beige">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Image
                src={user.avatar} 
                alt="User Avatar" 
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-coffee"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-coffee truncate">{user.name}</h4>
              <p className="text-xs text-warm-black/60 truncate">{user.role}</p>
            </div>
          </div>
          <div className="bg-beige/40 p-3 rounded-2xl">
            <p className="text-[10px] uppercase tracking-wider font-bold text-coffee/60 mb-1">Account Email</p>
            <p className="text-xs font-medium text-warm-black truncate">{user.email}</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="px-2 text-[10px] uppercase tracking-wider font-bold text-warm-black/40 mb-4">
            Main Menu
          </p>
          
          {/* Dashboard Link (Active) */}
          <div className="flex items-center justify-between p-3 bg-coffee text-cream rounded-2xl cursor-pointer transition-all shadow-sm">
            <div className="flex items-center gap-3">
              <LayoutDashboard size={20} />
              <span className="text-sm font-medium">Overview</span>
            </div>
            <ChevronRight size={16} />
          </div>

          {/* Future Links Placeholder */}
          <div className="p-3 text-warm-black/40 text-sm italic text-center py-8 border-2 border-dashed border-beige rounded-2xl">
            More links coming soon...
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-beige space-y-2">
          <button className="w-full flex items-center gap-3 p-3 text-warm-black/70 hover:text-coffee hover:bg-beige/30 rounded-2xl transition-all text-sm font-medium">
            <Settings size={20} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all text-sm font-medium">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default SideNavbar;
