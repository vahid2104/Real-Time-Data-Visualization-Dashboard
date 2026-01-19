interface StatsSummaryProps {
  stats: {
    label: string;
    value: string | number;
    change?: number;
  }[];
}

export function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg border border-gray-200 flex items-center justify-between">
      {stats.map((stat, index) => (
        <div key={index} className="flex-1">
          <p className="text-gray-600 text-xs mb-1">{stat.label}</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-900">{stat.value}</span>
            {stat.change !== undefined && (
              <span className={`text-xs ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </span>
            )}
          </div>
          {index < stats.length - 1 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200"></div>
          )}
        </div>
      ))}
    </div>
  );
}
