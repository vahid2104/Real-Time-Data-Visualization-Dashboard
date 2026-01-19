import { Router } from "express";

const router = Router();

function formatTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function generateInitialLineData() {
  const now = new Date();
  const data = [];

  for (let i = 20; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 3000);
    data.push({ time: formatTime(t), value: 65 + Math.random() * 15 });
  }

  return data;
}

function generateInitialBarData() {
  return [
    { time: "Server 1", value: 45 + Math.random() * 20, category: "cpu" },
    { time: "Server 2", value: 55 + Math.random() * 20, category: "cpu" },
    { time: "Server 3", value: 35 + Math.random() * 20, category: "cpu" },
    { time: "Server 4", value: 50 + Math.random() * 20, category: "cpu" },
    { time: "Server 5", value: 40 + Math.random() * 20, category: "cpu" },
    { time: "Server 6", value: 60 + Math.random() * 20, category: "cpu" },
  ];
}

router.get("/", (req, res) => {
  res.json({
    lineChartData: generateInitialLineData(),
    barChartData: generateInitialBarData(),
    kpis: {
      responseTime: { value: Math.round(randomBetween(180, 320)), change: randomBetween(-5, 8) },
      activeUsers: { value: Math.round(randomBetween(12000, 22000)), change: randomBetween(1, 12) },
      revenue: { value: Number(randomBetween(120000, 520000).toFixed(2)), change: randomBetween(1, 15) },
    },
  });
});

export default router;
