
import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true
    },

    url: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["up", "down", "unknown"],
      default: "unknown"
    },

    responseTime: {
      type: Number,
      default: 0
    },

    lastChecked: {
      type: Date
    },

    failureCount: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

siteSchema.index({ userId: 1, url: 1 }, { unique: true });

export default mongoose.model("Site", siteSchema);
