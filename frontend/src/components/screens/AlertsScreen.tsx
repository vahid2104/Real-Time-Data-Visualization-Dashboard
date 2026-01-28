import { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Filter, Search, Bell, BellOff } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  timestamp: string;
  source: string;
  acknowledged: boolean;
}
interface AlertsScreenProps {
  searchQuery: string;
}
const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High CPU Usage Detected',
    message: 'Server node-01 CPU usage exceeded 90% threshold',
    severity: 'critical',
    timestamp: '2 minutes ago',
    source: 'System Monitor',
    acknowledged: false,
  },
  {
    id: '2',
    title: 'Memory Warning',
    message: 'Memory usage at 75% on database server',
    severity: 'warning',
    timestamp: '15 minutes ago',
    source: 'Database Monitor',
    acknowledged: false,
  },
  {
    id: '3',
    title: 'Backup Completed',
    message: 'Daily backup completed successfully',
    severity: 'success',
    timestamp: '1 hour ago',
    source: 'Backup Service',
    acknowledged: true,
  },
  {
    id: '4',
    title: 'API Rate Limit Approaching',
    message: 'External API usage at 80% of daily limit',
    severity: 'warning',
    timestamp: '2 hours ago',
    source: 'API Gateway',
    acknowledged: false,
  },
  {
    id: '5',
    title: 'System Update Available',
    message: 'New security patches available for installation',
    severity: 'info',
    timestamp: '3 hours ago',
    source: 'Update Manager',
    acknowledged: true,
  },
  {
    id: '6',
    title: 'Disk Space Low',
    message: 'Storage partition /var has less than 10% free space',
    severity: 'critical',
    timestamp: '4 hours ago',
    source: 'Storage Monitor',
    acknowledged: false,
  },
  {
    id: '7',
    title: 'SSL Certificate Expiring',
    message: 'SSL certificate for api.example.com expires in 7 days',
    severity: 'warning',
    timestamp: '5 hours ago',
    source: 'Security Monitor',
    acknowledged: false,
  },
  {
    id: '8',
    title: 'Database Connection Restored',
    message: 'Connection to primary database restored',
    severity: 'success',
    timestamp: '6 hours ago',
    source: 'Database Monitor',
    acknowledged: true,
  },
];

const severityConfig = {
  critical: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    badgeVariant: 'destructive' as const,
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    badgeVariant: 'default' as const,
  },
  info: {
    icon: Info,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    badgeVariant: 'secondary' as const,
  },
  success: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    badgeVariant: 'default' as const,
  },
};

export function AlertsScreen({ searchQuery }: AlertsScreenProps) {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const handleAcknowledge = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleDismiss = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;
  const criticalCount = alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Alerts & Notifications</h1>
        <p className="text-gray-600">Monitor and manage system alerts and notifications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Alerts</p>
              <p className="text-gray-900 text-2xl">{alerts.length}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Unacknowledged</p>
              <p className="text-gray-900 text-2xl">{unacknowledgedCount}</p>
            </div>
            <BellOff className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Critical</p>
              <p className="text-gray-900 text-2xl">{criticalCount}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Resolved</p>
              <p className="text-gray-900 text-2xl">{alerts.filter(a => a.acknowledged).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search alerts..."
              value={searchQuery}
              readOnly
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No alerts found</p>
          </Card>
        ) : (
          filteredAlerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <Card
                key={alert.id}
                className={`p-4 border-l-4 ${config.borderColor} ${alert.acknowledged ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{alert.title}</h3>
                        <p className="text-gray-600 text-sm">{alert.message}</p>
                      </div>
                      <Badge variant={config.badgeVariant} className="ml-2">
                        {alert.severity}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{alert.source}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        {!alert.acknowledged && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcknowledge(alert.id)}
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDismiss(alert.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
