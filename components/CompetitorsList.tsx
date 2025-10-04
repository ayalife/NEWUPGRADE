
import React from 'react';

interface CompetitorsListProps {
  competitors: string[];
}

export const CompetitorsList: React.FC<CompetitorsListProps> = ({ competitors }) => {
  return (
    <div className="bg-white dark:bg-brand-secondary p-6 rounded-lg shadow-sm h-full">
      <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Top Competitors</h3>
      <ul className="space-y-3">
        {competitors.map((competitor, index) => (
          <li key={index} className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-brand-accent mr-3"></span>
            <span className="text-gray-700 dark:text-gray-300">{competitor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
