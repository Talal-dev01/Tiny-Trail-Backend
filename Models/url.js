const mongoose = require("mongoose");

//DATABASE SCHEMA -v2- CLIENT'S IP ADDRESS CAN ALSO BE SAVED IN DB

const URLschema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: String } }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

//DATABASE MODEL

const URL = mongoose.model("url", URLschema);

module.exports = URL;
