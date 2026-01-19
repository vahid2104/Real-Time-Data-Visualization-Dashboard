// Mock data for the dashboard

export interface DataPoint {
  time: string;
  value: number;
  category?: string;
}

export interface AlertData {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'update' | 'alert' | 'system';
}

export const generateInitialLineData = (): DataPoint[] => {
  const now = new Date();
  const data: DataPoint[] = [];
  
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      value: 65 + Math.random() * 15,
    });
  }
  
  return data;
};

export const generateInitialBarData = (): DataPoint[] => {
  return [
    { time: 'Server 1', value: 45 + Math.random() * 20, category: 'cpu' },
    { time: 'Server 2', value: 55 + Math.random() * 20, category: 'cpu' },
    { time: 'Server 3', value: 35 + Math.random() * 20, category: 'cpu' },
    { time: 'Server 4', value: 50 + Math.random() * 20, category: 'cpu' },
    { time: 'Server 5', value: 40 + Math.random() * 20, category: 'cpu' },
    { time: 'Server 6', value: 60 + Math.random() * 20, category: 'cpu' },
  ];
};

export const mockAlerts: AlertData[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'High CPU Usage Detected',
    message: 'Server 3 CPU usage exceeded 90% threshold',
    timestamp: new Date(Date.now() - 5 * 60000).toLocaleTimeString(),
  },
  {
    id: '2',
    severity: 'warning',
    title: 'Network Latency Spike',
    message: 'Average latency increased by 45ms',
    timestamp: new Date(Date.now() - 12 * 60000).toLocaleTimeString(),
  },
  {
    id: '3',
    severity: 'info',
    title: 'System Update Available',
    message: 'Version 2.4.1 is ready to install',
    timestamp: new Date(Date.now() - 25 * 60000).toLocaleTimeString(),
  },
  {
    id: '4',
    severity: 'warning',
    title: 'Memory Usage High',
    message: 'Database server using 85% of available RAM',
    timestamp: new Date(Date.now() - 35 * 60000).toLocaleTimeString(),
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    title: 'Data sync completed',
    description: 'Successfully synced 2,453 records',
    timestamp: '2 min ago',
    type: 'update',
  },
  {
    id: '2',
    title: 'Alert threshold updated',
    description: 'CPU threshold changed from 80% to 90%',
    timestamp: '15 min ago',
    type: 'system',
  },
  {
    id: '3',
    title: 'Critical alert resolved',
    description: 'Server 5 returned to normal operation',
    timestamp: '32 min ago',
    type: 'alert',
  },
  {
    id: '4',
    title: 'New dashboard widget added',
    description: 'Network traffic monitor widget deployed',
    timestamp: '1 hour ago',
    type: 'update',
  },
  {
    id: '5',
    title: 'Backup completed',
    description: 'Database backup finished successfully',
    timestamp: '2 hours ago',
    type: 'system',
  },
];
