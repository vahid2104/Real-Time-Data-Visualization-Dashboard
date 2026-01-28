import { useEffect, useMemo, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { toast } from "sonner";

import { KPIStatCard } from "../KPIStatCard";
import { RealtimeLineChart } from "../RealtimeLineChart";
import { RealtimeBarChart } from "../RealtimeBarChart";
import { AlertsPanel } from "../AlertsPanel";
import { ActivityTimeline } from "../ActivityTimeline";
import { DashboardHeader } from "../DashboardHeader";

import { useWebSocket } from "../../hooks/useWebSocket";
import {
  generateInitialLineData,
  generateInitialBarData,
  mockAlerts,
  mockActivities,
} from "../../data/mockData";

function parseTimeLabelToDate(label: string): Date | null {
  // label "11:18:40 AM" kimidir (sənin mock datada belədir)
  const now = new Date();
  const d = new Date(`${now.toDateString()} ${label}`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function withinRange(date: Date, range: string) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const hour = 60 * 60 * 1000;

  if (range === "1h") return diffMs <= 1 * hour;
  if (range === "24h") return diffMs <= 24 * hour;
  if (range === "7d") return diffMs <= 7 * 24 * hour;
  if (range === "30d") return diffMs <= 30 * 24 * hour;
  return true;
}

export function DashboardScreen({ searchQuery }: { searchQuery: string }) {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("24h");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  // filter keys nümunə: "severity:critical", "category:cpu"
  const hasFilter = (key: string) => activeFilters.includes(key);

  const { isConnected, metrics, alerts, activities } = useWebSocket();

  const lineData = useMemo(() => {
    const base = metrics?.lineChartData?.length
      ? metrics.lineChartData
      : generateInitialLineData();

    const q = searchQuery.trim().toLowerCase();

    // timeRange filter (lineData time string-dir)
    const timeFiltered = base.filter((p) => {
      const d = parseTimeLabelToDate(p.time);
      if (!d) return true;
      return withinRange(d, timeRange);
    });

    // search (label/time/value üstündə)
    if (!q) return timeFiltered;

    return timeFiltered.filter((p) => {
      const hay = `${p.time} ${p.value}`.toLowerCase();
      return hay.includes(q);
    });
  }, [metrics, searchQuery, timeRange]);

  const barData = useMemo(() => {
    const base = metrics?.barChartData?.length
      ? metrics.barChartData
      : generateInitialBarData();

    const q = searchQuery.trim().toLowerCase();

    // category filter (məs: cpu)
    const categoryFiltered = base.filter((p) => {
      const categoryOk = hasFilter("category:cpu")
        ? p.category === "cpu"
        : true;
      return categoryOk;
    });

    if (!q) return categoryFiltered;

    return categoryFiltered.filter((p) => {
      const hay = `${p.time} ${p.value} ${p.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [metrics, searchQuery, activeFilters]);

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
  const filteredAlerts = useMemo(() => {
    const base = alerts?.length ? alerts : mockAlerts;
    const q = searchQuery.trim().toLowerCase();

    const severityFiltered = base.filter((a: any) => {
      if (hasFilter("severity:critical")) return a.severity === "critical";
      if (hasFilter("severity:warning")) return a.severity === "warning";
      if (hasFilter("severity:info")) return a.severity === "info";
      return true;
    });

    if (!q) return severityFiltered;

    return severityFiltered.filter((a: any) => {
      const hay =
        `${a.title ?? ""} ${a.message ?? ""} ${a.severity ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [alerts, searchQuery, activeFilters]);

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
          <AlertsPanel alerts={filteredAlerts as any} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RealtimeBarChart
            data={barData}
            title="Server CPU Usage"
            loading={loading}
          />
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
