import { AlertData } from '../data/mockData';
import { AlertItem } from './AlertItem';
import { Bell } from 'lucide-react';

interface AlertsPanelProps {
  alerts: AlertData[];
  loading?: boolean;
}

export function AlertsPanel({ alerts, loading = false }: AlertsPanelProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-700" />
          <h3 className="text-gray-900">Active Alerts</h3>
        </div>
        <span className="px-2.5 py-1 bg-red-100 text-red-600 rounded-full text-xs">
          {alerts.filter(a => a.severity === 'critical').length} Critical
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {alerts.map(alert => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors">
        View All Alerts
      </button>
    </div>
  );
}
