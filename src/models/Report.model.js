const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    bugs: [{ type: String }],
    suggestions: [{ type: String }],
    qualityScore: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Report", reportSchema);
