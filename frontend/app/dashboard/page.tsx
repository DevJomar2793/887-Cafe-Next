"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import RecentOrders from "@/components/dashboard/RecentOrders";
import SideNavbar from "@/components/dashboard/SideNavbar";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import { RecentOrder } from "@/lib/dashboard-data";
import { fetchRecentOrders } from "@/lib/api";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("7days");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<RecentOrder[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedOrders = await fetchRecentOrders();

        const mappedOrders = fetchedOrders.map((order: any) => ({
          id: order.order_number || order.id.toString(),
          customer: order.customer_name,
          amount: order.total_amount,
          status: order.status,
          time: order.order_time,
        }));
        setOrders(mappedOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-cream text-warm-black flex">
      <SideNavbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

      <main
        className={cn(
          "flex-1 transition-all duration-400",
          isNavOpen ? "lg:ml-[300px]" : "ml-0",
        )}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pt-12 pb-12 px-6 max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="bg-coffee p-2 rounded-xl text-cream">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-3xl font-serif font-bold text-coffee">
                Admin Dashboard
              </h1>
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

          {/* Recent Orders Section */}
          <motion.div variants={itemVariants} className="mt-8">
            <RecentOrders
              orders={orders}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
            />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
