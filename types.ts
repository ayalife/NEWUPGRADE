
export interface DomainInfo {
  name: string;
  description: string;
}

export interface Traffic {
  monthlyVisits: string;
  bounceRate: string;
  pagesPerVisit: number;
  avgVisitDuration: string;
}

export interface Geography {
  country: string;
  percentage: number;
}

export interface TrafficSources {
  direct: number;
  search: number;
  social: number;
  referral: number;
  paid: number;
}

export interface AnalyticsData {
  domainInfo: DomainInfo;
  traffic: Traffic;
  geography: Geography[];
  trafficSources: TrafficSources;
  competitors: string[];
}

export interface GroundingSource {
    web: {
        uri: string;
        title: string;
    }
}
