'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface SalesChartProps {
  data: { date: string; amount: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-beige p-3 rounded-2xl shadow-xl">
        <p className="text-xs font-bold text-coffee mb-1">{payload[0].payload.date}</p>
        <p className="text-sm font-bold text-warm-black">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = ({ data }: SalesChartProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-beige shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-coffee/10 p-2 rounded-lg text-coffee">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-lg font-bold text-coffee">Sales Performance</h3>
        </div>
        <div className="text-xs font-medium text-warm-black/60 bg-beige/50 px-3 py-1 rounded-full">
          Daily Trend
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7B3F00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7B3F00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#A8A29E' }}
              tickFormatter={(str) => str.split('-').slice(2).join('/')} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#A8A29E' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#7B3F00" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
