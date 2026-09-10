const mongoose = require("mongoose");

const urlschema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    reDirectUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [
      {
        timestamp: { type: Number },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
    },
  },
  { timestamps: true },
);

const URL = mongoose.model("url", urlschema);

module.exports = URL;
