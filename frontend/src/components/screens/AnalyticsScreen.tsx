import { TrendingUp, TrendingDown, Users, DollarSign, Activity, PieChart as PieChartIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
  { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
  { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
  { name: 'Aug', revenue: 4200, expenses: 3200, profit: 1000 },
  { name: 'Sep', revenue: 4800, expenses: 2900, profit: 1900 },
  { name: 'Oct', revenue: 5200, expenses: 3100, profit: 2100 },
  { name: 'Nov', revenue: 5800, expenses: 3400, profit: 2400 },
  { name: 'Dec', revenue: 6200, expenses: 3600, profit: 2600 },
];

const categoryData = [
  { name: 'API Calls', value: 4500, color: '#3b82f6' },
  { name: 'Storage', value: 3200, color: '#10b981' },
  { name: 'Compute', value: 2800, color: '#f59e0b' },
  { name: 'Bandwidth', value: 2100, color: '#8b5cf6' },
  { name: 'Other', value: 1400, color: '#ef4444' },
];

const userActivityData = [
  { hour: '00:00', active: 120 },
  { hour: '03:00', active: 80 },
  { hour: '06:00', active: 200 },
  { hour: '09:00', active: 850 },
  { hour: '12:00', active: 1200 },
  { hour: '15:00', active: 950 },
  { hour: '18:00', active: 600 },
  { hour: '21:00', active: 400 },
];

const regionData = [
  { region: 'North America', users: 4500, revenue: 125000 },
  { region: 'Europe', users: 3800, revenue: 98000 },
  { region: 'Asia Pacific', users: 5200, revenue: 142000 },
  { region: 'Latin America', users: 2100, revenue: 45000 },
  { region: 'Middle East', users: 1800, revenue: 52000 },
  { region: 'Africa', users: 900, revenue: 18000 },
];

export function AnalyticsScreen() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Advanced Analytics</h1>
        <p className="text-gray-600">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-gray-900 text-2xl mb-1">$480,000</div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5%</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Active Users</span>
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-gray-900 text-2xl mb-1">18,300</div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+8.2%</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Response Time</span>
            <Activity className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-gray-900 text-2xl mb-1">245ms</div>
          <div className="flex items-center gap-1 text-red-600 text-sm">
            <TrendingDown className="w-4 h-4" />
            <span>-3.1%</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Conversion Rate</span>
            <PieChartIcon className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-gray-900 text-2xl mb-1">3.42%</div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+0.8%</span>
          </div>
        </Card>
      </div>

      {/* Tabs for Different Analytics Views */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Revenue & Expenses Trend */}
            <Card className="p-6 lg:col-span-8">
              <h3 className="text-gray-900 mb-4">Revenue & Expenses Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#colorExpenses)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Category Distribution */}
            <Card className="p-6 lg:col-span-4">
              <h3 className="text-gray-900 mb-4">Resource Usage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Profit Trend */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Monthly Profit Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="profit" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          {/* User Activity by Hour */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">User Activity by Hour</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          {/* Regional Performance */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Regional Performance</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={regionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="region" type="category" stroke="#6b7280" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="users" fill="#3b82f6" name="Users" />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Regional Stats Table */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Regional Statistics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700">Region</th>
                    <th className="text-right py-3 px-4 text-gray-700">Users</th>
                    <th className="text-right py-3 px-4 text-gray-700">Revenue</th>
                    <th className="text-right py-3 px-4 text-gray-700">Avg/User</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((region, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{region.region}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{region.users.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-gray-700">${region.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-gray-700">${Math.round(region.revenue / region.users)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
