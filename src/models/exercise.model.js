const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
