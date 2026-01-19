import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    severity: {
      type: String,
      enum: ["info", "warning", "critical", "success"],
      default: "info",
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: "System" },
    acknowledged: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Alert", AlertSchema);
