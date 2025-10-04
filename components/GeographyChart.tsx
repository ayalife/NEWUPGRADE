
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Geography } from '../types';

interface GeographyChartProps {
  data: Geography[];
}

const COLORS = ['#4b6cb7', '#182848', '#00d4ff', '#5a8fb4', '#3c5a7d'];

export const GeographyChart: React.FC<GeographyChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage).slice(0, 5);
  
  return (
    <div className="bg-white dark:bg-brand-secondary p-6 rounded-lg shadow-sm h-96">
      <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Top 5 Countries</h3>
       <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 30 }}>
          <Pie
            data={sortedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="percentage"
            nameKey="country"
            // FIX: The `percent` property can be undefined. Use nullish coalescing to avoid an error during arithmetic operations.
            label={({ name, percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: '#182848', border: 'none', borderRadius: '0.5rem' }}
             itemStyle={{color: '#fff'}}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
