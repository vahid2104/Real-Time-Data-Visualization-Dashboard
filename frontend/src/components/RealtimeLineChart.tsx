import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../data/mockData';
import { Activity } from 'lucide-react';

interface RealtimeLineChartProps {
  data: DataPoint[];
  title: string;
  isConnected?: boolean;
  loading?: boolean;
}

export function RealtimeLineChart({
  data,
  title,
  isConnected = true,
  loading = false,
}: RealtimeLineChartProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-gray-900">{title}</h3>

          {/* Always show badge (Live/Offline) */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
              isConnected ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}
            ></div>
            {isConnected ? 'Live' : 'Offline'}
          </div>
        </div>

        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="time" stroke="#6B7280" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} tickLine={false} domain={[60, 85]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            fill="url(#colorValue)"
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Real-time data stream</span>
        <span>Updates every 2s</span>
      </div>
    </div>
  );
}
