'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-beige/30 animate-pulse rounded-xl", className)} />
);

const DashboardSkeleton = () => {
  return (
    <div className="pt-12 pb-12 px-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-8 w-20 rounded-xl" />)}
        </div>
        <Skeleton className="h-10 w-64 rounded-2xl" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/50 p-6 rounded-3xl border border-beige h-24">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white/50 p-6 rounded-3xl border border-beige h-80">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/50 p-6 rounded-3xl border border-beige h-48">
             <Skeleton className="h-6 w-32 mb-6" />
             <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 rounded-2xl" />)}
             </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white/50 p-6 rounded-3xl border border-beige h-[450px] mb-8">
            <Skeleton className="h-6 w-32 mb-6" />
            <Skeleton className="h-full w-full" />
          </div>
          <div className="bg-white/50 p-6 rounded-3xl border border-beige h-80">
            <Skeleton className="h-6 w-32 mb-6" />
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for cn since it's used in Skeleton
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default DashboardSkeleton;
