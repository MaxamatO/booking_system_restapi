const mongoose = require("mongoose");
const User = require("../models/user");
const Booking = require("../models/booking");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error-handler");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.users_get_all = (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        users: docs.map((user) => {
          return {
            _id: user._id,
            email: user.email,
            request: {
              type: "GET",
              url: `http://localhost:3000/users/${user._id}`,
              desc: "Obtain more information about bookings and account.",
            },
          };
        }),
      });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.users_register = async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hashed,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created successfully. Log in to obtain access token.",
        details: {
          _id: result._id,
          email: result.email,
        },
      });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.users_get_by_id = async (req, res, next) => {
  const userId = req.params.userId;
  const bookings = await Booking.find({ userId: userId }).exec();
  User.findById(userId)
    .exec()
    .then((result) => {
      res.status(200).json({
        _id: result._id,
        email: result.email,
        password: result.password,
        bookings: {
          count: bookings.length,
          roomsBooked: bookings.map((book) => {
            return {
              roomId: book.roomId,
              request: {
                type: "GET",
                url: `http://localhost:3000/bookings/${book._id}`,
                desc: "Obtain information about this booking.",
              },
            };
          }),
        },
      });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};
