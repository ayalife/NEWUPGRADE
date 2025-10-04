
import React, { useState } from 'react';

interface HeroProps {
  onProbe: (domain: string) => void;
  error: string | null;
}

export const Hero: React.FC<HeroProps> = ({ onProbe, error }) => {
  const [domainInput, setDomainInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onProbe(domainInput.trim());
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary -z-10"></div>
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
            Website Metrics Re-envisioned
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Uncover insights like those from a prominent web analytics service — with greater speed and clarity.
          </p>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="Enter a web domain (e.g. google.com)"
              className="w-full sm:w-80 flex-auto rounded-md border-0 bg-white/10 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-accent sm:text-sm sm:leading-6 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-secondary shadow-sm hover:bg-brand-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent transition-colors"
            >
              Probe
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};
