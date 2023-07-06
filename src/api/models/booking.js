const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: { type: mongoose.Schema.Types.Date },
  endDate: { type: mongoose.Schema.Types.Date },
  isPaid: { type: Boolean, default: false },
});

module.exports = mongoose.model("Booking", bookingSchema);
