"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { pieChartData } from '../lib/data/districtData';

export default function DistrictPieChart() {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <PieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={140}
          paddingAngle={3}
          dataKey="value"
          animationDuration={1000}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '12px'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={96}
          iconType="circle"
          formatter={(value) => <span className="text-sm text-gray-600 ml-2">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}