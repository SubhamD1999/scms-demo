"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { barChartData } from '../lib/data/districtData';

export default function DistrictBarChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 11, fill: '#6b7280' }} 
          axisLine={false}
          tickLine={false}
          dy={10}
        />
        <YAxis 
          tick={{ fontSize: 11, fill: '#6b7280' }} 
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          contentStyle={{ 
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '12px'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="url(#colorGradient)" 
          radius={[6, 6, 0, 0]}
          animationDuration={1000}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}