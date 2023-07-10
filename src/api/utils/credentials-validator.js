const { Model } = require("mongoose");
const bcrypt = require("bcrypt");

/**
 *
 * @param {Model} userModel
 * @param {String} userEmail
 */
module.exports.does_user_exist = async (userModel, userEmail) => {
  const doesExist = !!(await userModel.findOne({ email: userEmail }).exec());
  return doesExist;
};

module.exports.is_email_valid = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports.is_password_correct = async (
  hashedPassword,
  providedPassword
) => {
  return await bcrypt.compare(providedPassword, hashedPassword);
};
