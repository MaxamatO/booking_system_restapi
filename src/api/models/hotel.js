const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  country: String,
  numberOfRooms: { type: Number, default: 0 },
});
/**
 * @param {import("mongoose").ObjectId} _id
 * @param {String} name
 * @param {String} country
 * @param {Number} numberOfRooms
 */
module.exports = mongoose.model("Hotel", hotelSchema);
