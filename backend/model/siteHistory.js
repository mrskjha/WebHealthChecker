import mongoose from "mongoose";

const monitorHistorySchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      index: true
    },

    status: {
      type: String,
      enum: ["up", "down"],
      required: true
    },

    responseTime: {
      type: Number
    },

    checkedAt: {
      type: Date,
      default: Date.now
    }
  }
);

export default mongoose.model("MonitorHistory", monitorHistorySchema);
