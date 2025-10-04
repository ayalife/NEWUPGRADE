
import React from 'react';
import type { GroundingSource } from '../types';

interface SourcesProps {
  sources: GroundingSource[];
}

export const Sources: React.FC<SourcesProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-brand-secondary p-6 rounded-lg shadow-sm h-full">
      <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Data Sources</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Analytics generated with information from the following sources:
      </p>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.web.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-brand-primary dark:text-brand-accent hover:underline truncate"
            title={source.web.title}
          >
            {index + 1}. {source.web.title || source.web.uri}
          </a>
        ))}
      </div>
    </div>
  );
};
