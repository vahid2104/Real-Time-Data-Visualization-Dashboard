interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: number) => string;
}

export function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const formatValue = (value: number) => {
    if (formatter) return formatter(value);
    return value.toFixed(2);
  };

  return (
    <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg border border-gray-700">
      {label && (
        <p className="text-gray-400 text-xs mb-2">{label}</p>
      )}
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">
            {entry.name}: {formatValue(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
