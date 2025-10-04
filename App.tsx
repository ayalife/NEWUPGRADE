
import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { Loader } from './components/Loader';
import { fetchAnalyticsData } from './services/geminiService';
import type { AnalyticsData, GroundingSource } from './types';

const App: React.FC = () => {
  const [domain, setDomain] = useState<string>('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProbe = useCallback(async (domainToProbe: string) => {
    if (!domainToProbe) {
      setError('Please provide a domain name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalyticsData(null);
    setSources([]);
    setDomain(domainToProbe);

    try {
      const result = await fetchAnalyticsData(domainToProbe);
      if (result) {
        setAnalyticsData(result.analyticsData);
        setSources(result.sources);
      } else {
        throw new Error('Failed to parse analytics data from the response.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to fetch analytics for ${domainToProbe}. ${errorMessage}`);
      setAnalyticsData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleReset = useCallback(() => {
    setDomain('');
    setAnalyticsData(null);
    setSources([]);
    setIsLoading(false);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-brand-secondary text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      {!analyticsData && !isLoading && <Hero onProbe={handleProbe} error={error} />}
      {isLoading && <Loader domain={domain} />}
      {error && !isLoading && !analyticsData && (
        <div className="text-center py-10">
            <p className="text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-300 p-4 rounded-lg inline-block">{error}</p>
        </div>
      )}
      {analyticsData && (
        <Dashboard 
          data={analyticsData} 
          sources={sources}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default App;
