import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { DataPoint, AlertData, ActivityItem } from "../data/mockData";

type MetricsPayload = {
  lineChartData: DataPoint[];
  barChartData: DataPoint[];
  kpis: {
    responseTime: { value: number; change: number };
    activeUsers: { value: number; change: number };
    revenue: { value: number; change: number };
  };
  timestamp: number;
};

type AlertsPayload = { alerts: AlertData[]; timestamp: number };
type ActivityPayload = { activities: ActivityItem[]; timestamp: number };

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export function useWebSocket() {
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [metrics, setMetrics] = useState<MetricsPayload | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || "";

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      auth: token ? { token } : {},
    });

    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("metrics:update", (payload: MetricsPayload) => setMetrics(payload));
    socket.on("alerts:update", (payload: AlertsPayload) => setAlerts(payload.alerts));
    socket.on("activity:update", (payload: ActivityPayload) => setActivities(payload.activities));

    return () => {
      socket.off();
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return { isConnected, metrics, alerts, activities };
}
