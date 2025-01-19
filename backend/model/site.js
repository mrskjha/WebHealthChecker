const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate URLs
  },
  status: {
    type: String,
    default: "unknown",
    enum: ["up", "down", "unknown"], // Restrict to valid values
  },
  responseTime: {
    type: Number,
    default: 0,
    min: 0, // Ensure no negative values
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
  alertSent: {
    type: Boolean,
    default: false, // Track whether an alert has been sent
  },
  siteHistory: [
    {
      status: {
        type: String,
        required: true,
        enum: ["up", "down", "unknown"], // Restrict to valid values
      },
      responseTime: {
        type: Number,
        required: true,
        min: 0, // Ensure no negative values
      },
      checkedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("site", Schema);
