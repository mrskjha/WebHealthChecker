const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "unknown",
  },
  responseTime: {
    type: Number,
    default: 0,
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
  siteHistroy: [
    {
      status: {
        type: String,
        required: true,
      },
      responseTime: {
        type: Number,
        required: true,
      },
      checkedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});


module.exports = mongoose.model("site", Schema);
