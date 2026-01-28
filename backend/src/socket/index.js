import Alert from "../models/Alert.js";
import jwt from "jsonwebtoken";

// Safe ISO
const toIsoSafe = (ts) => {
  const d = ts instanceof Date ? ts : new Date(ts);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

const nowMinusMinutes = (min) => new Date(Date.now() - min * 60 * 1000);

// "Intelligent" alert settings
const CPU_THRESHOLD = 90;
const CPU_STREAK_REQUIRED = 3; // 3 consecutive readings
const ALERT_COOLDOWN_MS = 60_000; // 60s

const seedAlertsIfEmpty = async () => {
  const count = await Alert.countDocuments();
  if (count > 0) return;

  const seed = [
    {
      severity: "critical",
      title: "High CPU Usage Detected",
      message: "Server node-01 CPU usage exceeded 90% threshold",
      source: "System Monitor",
      acknowledged: false,
      timestamp: nowMinusMinutes(2),
    },
    {
      severity: "warning",
      title: "Memory Warning",
      message: "Memory usage at 75% on database server",
      source: "Database Monitor",
      acknowledged: false,
      timestamp: nowMinusMinutes(15),
    },
    {
      severity: "success",
      title: "Backup Completed",
      message: "Daily backup completed successfully",
      source: "Backup Service",
      acknowledged: true,
      timestamp: nowMinusMinutes(60),
    },
    {
      severity: "warning",
      title: "API Rate Limit Approaching",
      message: "External API usage at 80% of daily limit",
      source: "API Gateway",
      acknowledged: false,
      timestamp: nowMinusMinutes(120),
    },
    {
      severity: "info",
      title: "System Update Available",
      message: "New security patches available for installation",
      source: "Update Manager",
      acknowledged: true,
      timestamp: nowMinusMinutes(180),
    },
    {
      severity: "critical",
      title: "Disk Space Low",
      message: "Storage partition /var has less than 10% free space",
      source: "Storage Monitor",
      acknowledged: false,
      timestamp: nowMinusMinutes(240),
    },
  ];

  await Alert.insertMany(seed);
};

const mapAlert = (a) => ({
  id: String(a._id),
  title: a.title,
  message: a.message,
  severity: a.severity,
  source: a.source ?? "System",
  acknowledged: Boolean(a.acknowledged),
  timestamp: toIsoSafe(a.timestamp),
});

const makeLinePoint = (i) => {
  const value = 60 + Math.random() * 25;
  const d = new Date(Date.now() - (12 - i) * 2000);
  const time = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return { time, value: Number(value.toFixed(2)) };
};

const makeBarPoint = (label) => {
  const value = 10 + Math.random() * 85;
  return { label, value: Number(value.toFixed(2)) };
};

const clamp2 = (n) => Number(n.toFixed(2));

async function broadcastLatestAlerts(io) {
  const latest = await Alert.find().sort({ timestamp: -1 }).limit(20).lean();
  io.emit("alerts:update", {
    alerts: latest.map(mapAlert),
    timestamp: Date.now(),
  });
}

export function registerSocketHandlers(io) {
  io.on("connection", async (socket) => {
    console.log("Socket connected:", socket.id);

    // Auth (optional)
    const token = socket.handshake.auth?.token;
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = payload;
        console.log("Socket authed user:", payload.email);
      } catch {
        console.log("Socket token invalid (continuing as guest)");
      }
    } else {
      console.log("Socket guest connection");
    }

    // Seed + initial send
    try {
      await seedAlertsIfEmpty();
      const alerts = await Alert.find().sort({ timestamp: -1 }).limit(20).lean();

      socket.emit("alerts:update", {
        alerts: alerts.map(mapAlert),
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error("Seed alerts error:", err);
    }

    // Activity (demo)
    let activities = [
      {
        id: "a1",
        type: "update",
        title: "Dashboard started",
        description: "Real-time stream initialized",
        timestamp: "Just now",
      },
      {
        id: "a2",
        type: "system",
        title: "Socket connected",
        description: `Client ${socket.id} connected`,
        timestamp: "Just now",
      },
    ];

    // Metrics initial
    let lineChartData = Array.from({ length: 12 }, (_, i) => makeLinePoint(i));
    let barChartData = [
      makeBarPoint("node-01"),
      makeBarPoint("node-02"),
      makeBarPoint("node-03"),
      makeBarPoint("db-01"),
    ];

    let kpis = {
      responseTime: { value: 190, change: 0 },
      activeUsers: { value: 17885, change: 0 },
      revenue: { value: 190068.41, change: 0 },
    };

    socket.emit("metrics:update", {
      lineChartData,
      barChartData,
      kpis,
      timestamp: Date.now(),
    });

    socket.emit("activity:update", {
      activities,
      timestamp: Date.now(),
    });

    // Intelligent CPU alert state (per connection)
    let cpuHighStreak = 0;
    let cpuCooldownUntil = 0;

    const metricsInterval = setInterval(async () => {
      lineChartData = [...lineChartData.slice(1), makeLinePoint(11)];

      barChartData = [
        makeBarPoint("node-01"),
        makeBarPoint("node-02"),
        makeBarPoint("node-03"),
        makeBarPoint("db-01"),
      ];

      // KPI updates
      const rtDelta = (Math.random() - 0.5) * 12;
      const usersDelta = (Math.random() - 0.5) * 180;
      const revDelta = (Math.random() - 0.5) * 900;

      const prevRT = kpis.responseTime.value;
      const prevUsers = kpis.activeUsers.value;
      const prevRev = kpis.revenue.value;

      const newRT = Math.max(80, prevRT + rtDelta);
      const newUsers = Math.max(0, prevUsers + usersDelta);
      const newRev = Math.max(0, prevRev + revDelta);

      kpis = {
        responseTime: {
          value: clamp2(newRT),
          change: clamp2(((newRT - prevRT) / prevRT) * 100),
        },
        activeUsers: {
          value: Math.round(newUsers),
          change: clamp2(((newUsers - prevUsers) / prevUsers) * 100),
        },
        revenue: {
          value: clamp2(newRev),
          change: clamp2(((newRev - prevRev) / prevRev) * 100),
        },
      };

      // Emit metrics
      socket.emit("metrics:update", {
        lineChartData,
        barChartData,
        kpis,
        timestamp: Date.now(),
      });

      // --- Intelligent alert logic: node-01 CPU
      const node01 = barChartData.find((x) => x.label === "node-01");
      const cpu = node01?.value ?? 0;

      if (cpu >= CPU_THRESHOLD) cpuHighStreak += 1;
      else cpuHighStreak = 0;

      const now = Date.now();
      const canAlert = now >= cpuCooldownUntil;

      if (cpuHighStreak >= CPU_STREAK_REQUIRED && canAlert) {
        cpuCooldownUntil = now + ALERT_COOLDOWN_MS;
        cpuHighStreak = 0;

        try {
          const userEmail = socket.user?.email ? ` (${socket.user.email})` : "";
          await Alert.create({
            severity: "critical",
            title: "High CPU Usage (Streak)",
            message: `node-01 CPU stayed above ${CPU_THRESHOLD}% for ${CPU_STREAK_REQUIRED} consecutive readings. Current: ${cpu}%`,
            source: `System Monitor${userEmail}`,
            acknowledged: false,
            timestamp: new Date(),
          });

          await broadcastLatestAlerts(io);
        } catch (err) {
          console.error("create CPU alert error:", err);
        }
      }
    }, 2000);

    const activityInterval = setInterval(() => {
      const types = ["update", "system", "alert"];
      const type = types[Math.floor(Math.random() * types.length)];

      const newItem = {
        id: `act-${Date.now()}`,
        type,
        title:
          type === "alert"
            ? "Alert processed"
            : type === "system"
            ? "System heartbeat"
            : "Metrics updated",
        description:
          type === "alert"
            ? "New alert data checked"
            : type === "system"
            ? "Background services running"
            : "Charts updated with latest values",
        timestamp: "Just now",
      };

      activities = [newItem, ...activities].slice(0, 8);

      socket.emit("activity:update", {
        activities,
        timestamp: Date.now(),
      });
    }, 4000);

    // Keep alerts in sync for this socket as well (optional)
    const alertsInterval = setInterval(async () => {
      try {
        const alerts = await Alert.find().sort({ timestamp: -1 }).limit(20).lean();
        socket.emit("alerts:update", {
          alerts: alerts.map(mapAlert),
          timestamp: Date.now(),
        });
      } catch (err) {
        console.error("alertsInterval error:", err);
      }
    }, 6000);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      clearInterval(metricsInterval);
      clearInterval(activityInterval);
      clearInterval(alertsInterval);
    });
  });
}
