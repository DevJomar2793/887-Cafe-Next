"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StatCard from '@/components/dashboard/StatCard';
import TopDrinks from '@/components/dashboard/TopDrinks';
import RecentOrders from '@/components/dashboard/RecentOrders';
import SideNavbar from '@/components/dashboard/SideNavbar';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import SalesChart from '@/components/dashboard/SalesChart';
import QuickActions from '@/components/dashboard/QuickActions';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import { dashboardData } from '@/lib/dashboard-data';
import { DollarSign, TrendingUp, ShoppingBag, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7days');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulate data loading for a premium feel
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dailyTotal = dashboardData.dailySales.reduce((acc, curr) => acc + curr.amount, 0);
  const weeklyTotal = dashboardData.weeklySales.reduce((acc, curr) => acc + curr.amount, 0);
  const totalOrders = dashboardData.recentOrders.length * 250;

  if (isLoading) return <DashboardSkeleton />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-cream text-warm-black flex">
      <SideNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-400",
        isNavOpen ? "lg:ml-[300px]" : "ml-0"
      )}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pt-12 pb-12 px-6 max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-coffee p-2 rounded-xl text-cream">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-3xl font-serif font-bold text-coffee">Admin Dashboard</h1>
            </div>

            <Link href="/">
              <motion.div 
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-coffee/10 text-coffee font-medium text-sm transition-all hover:bg-coffee/5 cursor-pointer shadow-sm"
              >
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Filters Section */}
          <motion.div variants={itemVariants}>
            <DashboardFilters 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              dateRange={dateRange} 
              setDateRange={setDateRange} 
            />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <StatCard 
                variant="coffee"
                label="Daily Sales" 
                value={`$${dailyTotal.toLocaleString()}`} 
                trend="+12.5%" 
                trendUp={true} 
                icon={DollarSign} 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard 
                variant="beige"
                label="Weekly Sales" 
                value={`$${weeklyTotal.toLocaleString()}`} 
                trend="+8.2%" 
                trendUp={true} 
                icon={TrendingUp} 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard 
                label="Total Orders" 
                value={totalOrders.toLocaleString()} 
                trend="+5.4%" 
                trendUp={true} 
                icon={ShoppingBag} 
              />
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <motion.div variants={itemVariants}>
                <TopDrinks drinks={dashboardData.topDrinks} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <QuickActions />
              </motion.div>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <motion.div variants={itemVariants}>
                <SalesChart data={dashboardData.dailySales} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <RecentOrders 
                  orders={dashboardData.recentOrders} 
                  searchQuery={searchQuery}
                  statusFilter={statusFilter}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
