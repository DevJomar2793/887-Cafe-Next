"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RecentOrder } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { Filter, Eye, ChevronUp, ChevronDown } from "lucide-react";

interface RecentOrdersProps {
  orders: RecentOrder[];
  searchQuery: string;
  statusFilter: string;
}

type SortConfig = {
  key: keyof RecentOrder | null;
  direction: "asc" | "desc";
};

const RecentOrders = ({
  orders,
  searchQuery,
  statusFilter,
}: RecentOrdersProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "desc",
  });

  const handleSort = (key: keyof RecentOrder) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const processedOrders = useMemo(() => {
    // 1. Filter
    const filtered = orders.filter((order) => {
      const matchesSearch =
        (order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false) ||
        (order.id
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ??
          false);
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // 2. Sort
    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue === undefined || bValue === undefined) return 0;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [orders, searchQuery, statusFilter, sortConfig]);

  const SortIndicator = ({ column }: { column: keyof RecentOrder }) => {
    if (sortConfig.key !== column) return <div className="w-4 h-4" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} className="text-coffee" />
    ) : (
      <ChevronDown size={14} className="text-coffee" />
    );
  };

  return (
    <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-beige overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-coffee/10 p-2 rounded-lg text-coffee">
            <Filter size={20} />
          </div>
          <h3 className="text-lg font-bold text-coffee">Recent Orders</h3>
        </div>
        <button className="text-xs font-medium text-coffee hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-warm-black/60 border-b border-beige">
              {[
                { label: "Order ID", key: "id" as keyof RecentOrder },
                { label: "Customer", key: "customer" as keyof RecentOrder },
                { label: "Amount", key: "amount" as keyof RecentOrder },
                { label: "Status", key: "status" as keyof RecentOrder },
                { label: "Time", key: "time" as keyof RecentOrder },
              ].map((col) => (
                <th key={col.key} className="pb-3 font-medium">
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-1 hover:text-coffee transition-colors group"
                  >
                    {col.label}
                    <SortIndicator column={col.key} />
                  </button>
                </th>
              ))}
              <th className="pb-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige">
            <AnimatePresence mode="popLayout">
              {processedOrders.map((order) => (
                <motion.tr
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={order.id}
                  className="group hover:bg-beige/30 transition-colors"
                >
                  <td className="py-3 font-medium text-warm-black">
                    {order.id}
                  </td>
                  <td className="py-3 text-warm-black/80">{order.customer}</td>
                  <td className="py-3 font-bold text-coffee">
                    ${order.amount?.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold",
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700",
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-warm-black/60">{order.time}</td>
                  <td className="py-3 text-right">
                    <button className="p-2 text-warm-black/40 hover:text-coffee transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {processedOrders.length === 0 && (
          <div className="py-12 text-center text-warm-black/40 text-sm italic">
            No orders match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
