import { Alert } from "../models/Alert.js";

const pad2 = (n) => String(n).padStart(2, "0");

const formatTime = (d) => {
  const h = d.getHours();
  const m = pad2(d.getMinutes());
  const s = pad2(d.getSeconds());
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m}:${s} ${suffix}`;
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export function startSimulation(io) {
  let lineValue = 70 + Math.random() * 10;

  let activities = [
    { id: "a1", title: "System started", type: "system", timestamp: "Just now" },
  ];

  const interval = setInterval(async () => {
    const now = new Date();

    // ----- Metrics (line chart) -----
    lineValue += (Math.random() - 0.5) * 3;
    lineValue = clamp(lineValue, 60, 85);

    const linePoint = { time: formatTime(now), value: Number(lineValue.toFixed(2)) };

    // ----- Metrics (bar chart) -----
    const barChartData = Array.from({ length: 6 }).map((_, i) => ({
      time: `Server ${i + 1}`,
      value: Number((30 + Math.random() * 60).toFixed(2)),
      category: "cpu",
    }));

    // ----- KPIs -----
    const responseTimeValue = Math.round(150 + Math.random() * 120);
    const responseTimeChange = Number(((Math.random() - 0.5) * 6).toFixed(2));

    const activeUsersValue = Math.round(15000 + Math.random() * 6000);
    const activeUsersChange = Number(((Math.random() - 0.5) * 12).toFixed(2));

    const revenueValue = Number((150000 + Math.random() * 120000).toFixed(2));
    const revenueChange = Number(((Math.random() - 0.2) * 8).toFixed(2));

    io.emit("metrics:update", {
      lineChartData: [linePoint],
      barChartData,
      kpis: {
        responseTime: { value: responseTimeValue, change: responseTimeChange },
        activeUsers: { value: activeUsersValue, change: activeUsersChange },
        revenue: { value: revenueValue, change: revenueChange },
      },
      timestamp: Date.now(),
    });

    // ----- Activities (sometimes) -----
    if (Math.random() < 0.35) {
      const types = ["update", "alert", "system"];
      const type = types[Math.floor(Math.random() * types.length)];

      const item = {
        id: `act_${Date.now()}`,
        title:
          type === "update"
            ? "Config updated"
            : type === "alert"
            ? "Alert processed"
            : "Background job ran",
        type,
        timestamp: "Just now",
      };

      activities = [item, ...activities].slice(0, 15);
      io.emit("activity:update", { activities, timestamp: Date.now() });
    }

    // ----- Alerts (sometimes) -> MongoDB + emit -----
    if (Math.random() < 0.25) {
      const severities = ["info", "warning", "critical"];
      const severity = severities[Math.floor(Math.random() * severities.length)];

      const alertDoc = await Alert.create({
        title:
          severity === "critical"
            ? "Critical CPU spike"
            : severity === "warning"
            ? "High memory usage"
            : "New deployment detected",
        message:
          severity === "critical"
            ? "CPU exceeded threshold on one or more servers."
            : severity === "warning"
            ? "Memory usage is above normal range."
            : "A new version was deployed successfully.",
        severity,
        isRead: false,
        timestamp: new Date(),
      });

      const alert = {
        id: String(alertDoc._id),
        title: alertDoc.title,
        message: alertDoc.message,
        severity: alertDoc.severity,
        timestamp: alertDoc.timestamp.toISOString(),
        isRead: alertDoc.isRead,
      };

      io.emit("alerts:update", { alerts: [alert], timestamp: Date.now() });
    }
  }, 2000);

  return () => clearInterval(interval);
}
