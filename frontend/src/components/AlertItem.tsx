import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { AlertData } from '../data/mockData';

interface AlertItemProps {
  alert: AlertData;
}

export function AlertItem({ alert }: AlertItemProps) {
  const severityConfig = {
    critical: {
      icon: AlertCircle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
  };

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor} hover:shadow-sm transition-shadow`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-gray-900 text-sm">{alert.title}</h4>
            <span className="text-xs text-gray-500">{alert.timestamp}</span>
          </div>
          <p className="text-gray-600 text-xs">{alert.message}</p>
        </div>
      </div>
    </div>
  );
}
