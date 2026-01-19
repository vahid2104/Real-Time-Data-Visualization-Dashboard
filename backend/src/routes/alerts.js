import express from "express";
import { Alert } from "../models/Alert.js";

const router = express.Router();

// GET /api/alerts?limit=10
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "10", 10), 100);
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(limit);
    res.json({ ok: true, alerts });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Failed to fetch alerts" });
  }
});

// POST /api/alerts
router.post("/", async (req, res) => {
  try {
    const { title, description, severity, source } = req.body;

    const alert = await Alert.create({
      title,
      description,
      severity,
      source,
    });

    // If socket is attached, emit
    const io = req.app.get("io");
    if (io) io.emit("alert:new", alert);

    res.status(201).json({ ok: true, alert });
  } catch (err) {
    res.status(400).json({ ok: false, error: "Failed to create alert" });
  }
});

// PATCH /api/alerts/:id/ack
router.patch("/:id/ack", async (req, res) => {
  try {
    const updated = await Alert.findByIdAndUpdate(
      req.params.id,
      { acknowledged: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ ok: false, error: "Not found" });

    const io = req.app.get("io");
    if (io) io.emit("alert:updated", updated);

    res.json({ ok: true, alert: updated });
  } catch (err) {
    res.status(400).json({ ok: false, error: "Failed to acknowledge" });
  }
});

export default router;
