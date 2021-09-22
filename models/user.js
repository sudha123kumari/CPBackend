const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    storage: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
    pid: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", userSchema);
