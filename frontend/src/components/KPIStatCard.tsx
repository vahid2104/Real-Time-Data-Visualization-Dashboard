import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPIStatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  loading?: boolean;
}

export function KPIStatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor,
  iconBgColor,
  loading = false 
}: KPIStatCardProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg animate-pulse`}></div>
        </div>
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm">{title}</span>
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      
      <div className="mb-2">
        <span className="text-gray-900 text-3xl">
          {typeof value === 'number' ? value.toFixed(2) : value}
        </span>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
          <span className="text-gray-500 text-sm ml-1">vs 24h ago</span>
        </div>
      )}
    </div>
  );
}
