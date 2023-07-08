const mongoose = require("mongoose");
const Booking = require("../models/booking");
const errorHandler = require("../utils/error-handler");

/**
 *  Getting Bookings
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.bookings_get_all = (req, res, next) => {
  Booking.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        bookings: docs.map((result) => {
          return {
            _id: result._id,
            userId: result.userId,
            roomId: result.roomId,
            startDate: result.startDate,
            endDate: result.endDate,
            isPaid: result.isPaid,
          };
        }),
      });
    })
    .catch((err) => errorHandler(res, 500, err));
};

/**
 *  Create Bookings
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.bookings_book_room = (req, res, next) => {
  const userId = req.body.userId;
  const roomId = req.params.roomId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const booked = new Booking({
    _id: new mongoose.Types.ObjectId(),
    roomId: roomId,
    userId: userId,
    startDate: startDate,
    endDate: endDate,
    isPaid: false,
  });
  booked.startDate instanceof Date;
  booked.endDate instanceof Date;
  booked
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Hotel room has been booked successfully.",
        details: {
          roomId: result.roomId,
          userId: result.userId,
          startDate: result.startDate,
          endDate: result.endDate,
        },
      });
    })
    .catch((err) => errorHandler(res, 500, err));
};
