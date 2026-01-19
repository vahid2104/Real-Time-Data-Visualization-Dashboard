import { ActivityItem } from '../data/mockData';
import { Activity, AlertCircle, Server } from 'lucide-react';

interface ActivityTimelineProps {
  activities: ActivityItem[];
  loading?: boolean;
}

export function ActivityTimeline({ activities, loading = false }: ActivityTimelineProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4" />;
      case 'system':
        return <Server className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'alert':
        return 'bg-red-100 text-red-600';
      case 'system':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-gray-700" />
        <h3 className="text-gray-900">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-3">
            <div className="relative">
              <div className={`w-8 h-8 rounded-lg ${getIconColor(activity.type)} flex items-center justify-center`}>
                {getIcon(activity.type)}
              </div>
              {index !== activities.length - 1 && (
                <div className="absolute left-1/2 top-8 bottom-0 w-px bg-gray-200 -translate-x-1/2 h-6"></div>
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-gray-900 text-sm">{activity.title}</h4>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
              <p className="text-gray-600 text-xs">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-2 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors">
        View Full History
      </button>
    </div>
  );
}
