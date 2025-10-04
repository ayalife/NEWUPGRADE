
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TrafficSources } from '../types';

interface TrafficSourcesChartProps {
  data: TrafficSources;
}

export const TrafficSourcesChart: React.FC<TrafficSourcesChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return (
    <div className="bg-white dark:bg-brand-secondary p-6 rounded-lg shadow-sm h-96">
      <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Traffic Sources</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis type="number" unit="%" stroke="rgb(156 163 175 / 1)" />
          <YAxis type="category" dataKey="name" width={80} stroke="rgb(156 163 175 / 1)" />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            contentStyle={{ backgroundColor: '#182848', border: 'none', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" fill="#4b6cb7" name="Percentage" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
