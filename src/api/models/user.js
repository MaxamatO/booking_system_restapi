const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
});

/**
 * @param {String} email
 * @param {string} password
 */
module.exports = mongoose.model("User", userSchema);
