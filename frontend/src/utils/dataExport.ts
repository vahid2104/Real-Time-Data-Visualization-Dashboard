// Utility functions for exporting dashboard data

import { DataPoint, AlertData, ActivityItem } from '../data/mockData';

export interface ExportData {
  timestamp: string;
  lineChartData: DataPoint[];
  barChartData: DataPoint[];
  alerts: AlertData[];
  activities: ActivityItem[];
  kpiMetrics: {
    currentValue: number;
    change24h: number;
    maxValue: number;
    minValue: number;
  };
}

export const exportToJSON = (data: ExportData): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dashboard-export-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (data: DataPoint[], filename: string): void => {
  const headers = Object.keys(data[0] || {}).join(',');
  const rows = data.map(item => Object.values(item).join(',')).join('\n');
  const csv = `${headers}\n${rows}`;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printDashboard = (): void => {
  window.print();
};

export const shareData = async (data: ExportData): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Dashboard Data',
        text: 'Real-time dashboard metrics',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    console.log('Web Share API not supported');
  }
};
