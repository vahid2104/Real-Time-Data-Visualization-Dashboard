import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DataPoint } from '../data/mockData';
import { Server } from 'lucide-react';

interface RealtimeBarChartProps {
  data: DataPoint[];
  title: string;
  loading?: boolean;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6366F1'];

export function RealtimeBarChart({ data, title, loading = false }: RealtimeBarChartProps) {
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
        </div>
        <Server className="w-5 h-5 text-gray-400" />
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            tick={{ fontSize: 12 }}
            tickLine={false}
            domain={[0, 100]}
            label={{ value: 'CPU Usage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'CPU Usage']}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={300}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {data.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <span className="text-sm text-gray-600">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
