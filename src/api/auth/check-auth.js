const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error-handler");
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return errorHandler(res, 401, "Auth failed");
  }
};
