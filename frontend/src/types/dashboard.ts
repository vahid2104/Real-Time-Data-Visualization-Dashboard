// Type definitions for the dashboard

export type SeverityLevel = 'info' | 'warning' | 'critical';
export type ActivityType = 'update' | 'alert' | 'system';

export interface MetricValue {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
}

export interface ChartDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

export interface WebSocketMessage {
  type: 'update' | 'alert' | 'system';
  data: any;
  timestamp: number;
}

export interface DashboardConfig {
  refreshInterval: number;
  maxDataPoints: number;
  enableAnimations: boolean;
  theme: 'light' | 'dark';
}
