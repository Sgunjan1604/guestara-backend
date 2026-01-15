const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  date: String,
  startTime: String,
  endTime: String
});

module.exports = mongoose.model("Booking", bookingSchema);
