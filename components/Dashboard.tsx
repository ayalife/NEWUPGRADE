
import React from 'react';
import type { AnalyticsData, GroundingSource } from '../types';
import { MetricCard } from './MetricCard';
import { TrafficSourcesChart } from './TrafficSourcesChart';
import { GeographyChart } from './GeographyChart';
import { CompetitorsList } from './CompetitorsList';
import { Sources } from './Sources';
import { ArrowLeftIcon, BarChartIcon, GlobeIcon, UsersIcon } from './icons';

interface DashboardProps {
  data: AnalyticsData;
  sources: GroundingSource[];
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, sources, onReset }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="mb-8">
        <button 
          onClick={onReset} 
          className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          New Analysis
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display">{data.domainInfo.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{data.domainInfo.description}</p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Monthly Visits" value={data.traffic.monthlyVisits} icon={<UsersIcon />} />
        <MetricCard title="Bounce Rate" value={data.traffic.bounceRate} icon={<BarChartIcon />} />
        <MetricCard title="Pages / Visit" value={String(data.traffic.pagesPerVisit)} />
        <MetricCard title="Avg. Visit Duration" value={data.traffic.avgVisitDuration} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <TrafficSourcesChart data={data.trafficSources} />
        </div>
        <div>
            <GeographyChart data={data.geography} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
            <CompetitorsList competitors={data.competitors} />
        </div>
        <div className="lg:col-span-2">
            <Sources sources={sources} />
        </div>
      </div>

    </div>
  );
};
