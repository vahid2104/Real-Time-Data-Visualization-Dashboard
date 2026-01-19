import { useEffect, useMemo, useState } from "react";
import { DollarSign, TrendingUp, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { toast } from "sonner";

import { KPIStatCard } from "../KPIStatCard";
import { RealtimeLineChart } from "../RealtimeLineChart";
import { RealtimeBarChart } from "../RealtimeBarChart";
import { AlertsPanel } from "../AlertsPanel";
import { ActivityTimeline } from "../ActivityTimeline";
import { DashboardHeader } from "../DashboardHeader";

import { useWebSocket } from "../../hooks/useWebSocket";
import { generateInitialLineData, generateInitialBarData, mockActivities } from "../../data/mockData";

export function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("24h");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { isConnected, metrics, alerts, activities } = useWebSocket();

  const lineData = useMemo(() => {
    return metrics?.lineChartData?.length ? metrics.lineChartData : generateInitialLineData();
  }, [metrics]);

  const barData = useMemo(() => {
    return metrics?.barChartData?.length ? metrics.barChartData : generateInitialBarData();
  }, [metrics]);

  const kpis = useMemo(() => {
    const revenue = metrics?.kpis?.revenue?.value ?? 190068.41;
    const revenueChange = metrics?.kpis?.revenue?.change ?? 0;

    const values = lineData.map((d) => d.value);
    const maxValue = values.length ? Math.max(...values) : 0;
    const minValue = values.length ? Math.min(...values) : 0;

    return {
      currentValue: revenue,
      change24h: revenueChange,
      maxValue,
      minValue,
    };
  }, [metrics, lineData]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    toast.success("Dashboard refreshed successfully!");
    setTimeout(() => setLoading(false), 800);
  };

  const handleExport = () => {
    toast.success("Exporting dashboard data...");
    console.log("Exporting dashboard data...");
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    toast.info(`Time range changed to: ${range}`);
    console.log("Time range changed to:", range);
  };

  const handleFiltersChange = (filters: string[]) => {
    setActiveFilters(filters);
    if (filters.length > 0) toast.info(`${filters.length} filter(s) applied`);
    console.log("Active filters:", filters);
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Real-Time Analytics Dashboard"
        subtitle="Monitor your systems and metrics in real-time"
        onRefresh={handleRefresh}
        onExport={handleExport}
        onTimeRangeChange={handleTimeRangeChange}
        onFiltersChange={handleFiltersChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStatCard
          title="Current Value"
          value={kpis.currentValue}
          change={kpis.change24h}
          icon={DollarSign}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          loading={loading}
        />

        <KPIStatCard
          title="24h Change"
          value={`${kpis.change24h >= 0 ? "+" : ""}${kpis.change24h.toFixed(2)}%`}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          loading={loading}
        />

        <KPIStatCard
          title="Max Value"
          value={kpis.maxValue}
          icon={ArrowUpCircle}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          loading={loading}
        />

        <KPIStatCard
          title="Min Value"
          value={kpis.minValue}
          icon={ArrowDownCircle}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RealtimeLineChart
            data={lineData}
            title="Real-Time Market Data"
            isConnected={isConnected}
            loading={loading}
          />
        </div>

        <div className="lg:col-span-4">
          <AlertsPanel alerts={alerts} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RealtimeBarChart data={barData} title="Server CPU Usage" loading={loading} />
        </div>

        <div className="lg:col-span-4">
          <ActivityTimeline
            activities={activities?.length ? activities : mockActivities}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
