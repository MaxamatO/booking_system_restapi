const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: { type: mongoose.Schema.Types.Date },
  endDate: { type: mongoose.Schema.Types.Date },
  isPaid: { type: Boolean, default: false },
});

/**
 * @param {import("mongoose").ObjectId} roomId
 * @param {import("mongoose").ObjectId} userId
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Boolean} isPaid
 *
 */
module.exports = mongoose.model("Booking", bookingSchema);
