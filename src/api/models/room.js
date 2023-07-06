const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  name: String,
  isFree: { type: Boolean, default: true },
  price: Number,
  description: String,
});

/**
 * @param {import("mongoose").ObjectId} _id
 * @param {import("mongoose").ObjectId} hotelId
 * @param {String} name
 * @param {Boolean} isFree
 * @param {Number} price
 * @param {String} description
 */
module.exports = mongoose.model("Room", roomSchema);
