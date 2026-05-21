'use client';

import React from 'react';
import { Calendar, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
}

const DashboardFilters = ({ searchQuery, setSearchQuery, dateRange, setDateRange }: DashboardFiltersProps) => {
  const ranges = [
    { id: 'today', label: 'Today' },
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      {/* Date Range Selector */}
      <div className="flex items-center gap-2 p-1 bg-white/50 backdrop-blur-md border border-beige rounded-2xl w-full md:w-auto">
        {ranges.map((range) => (
          <button
            key={range.id}
            onClick={() => setDateRange(range.id)}
            className={cn(
              "px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200",
              dateRange === range.id 
                ? "bg-coffee text-cream shadow-sm" 
                : "text-warm-black/60 hover:bg-beige/50"
            )}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-80 group">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-black/40 group-focus-within:text-coffee transition-colors" 
          size={18} 
        />
        <input 
          type="text" 
          placeholder="Search orders, customers..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-md border border-beige rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coffee/20 focus:border-coffee transition-all placeholder:text-warm-black/40"
        />
      </div>
    </div>
  );
};

export default DashboardFilters;
