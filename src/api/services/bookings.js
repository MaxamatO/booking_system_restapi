const mongoose = require("mongoose");
const Booking = require("../models/booking");
const User = require("../models/user");
const errorHandler = require("../utils/error-handler");
const {
  is_room_booked,
  are_dates_valid,
} = require("../utils/booking-validator");

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
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *  Create Bookings
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.bookings_book_room = async (req, res, next) => {
  const doesUserExist = !!(await User.findById(req.body.userId));
  if (!doesUserExist) return errorHandler(res, 500, "User does not exist.");
  const userId = req.body.userId;
  const roomId = req.params.roomId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  if (!are_dates_valid(startDate, endDate))
    return errorHandler(res, 500, "Dates are invalid.");
  const booked = new Booking({
    _id: new mongoose.Types.ObjectId(),
    roomId: roomId,
    userId: userId,
    startDate: startDate,
    endDate: endDate,
    isPaid: false,
  });
  if (await is_room_booked(Booking, roomId))
    return errorHandler(res, 500, "Room is already booked.");
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
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *  Get Booking
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.bookings_get_by_id = (req, res, next) => {
  const bookingId = req.params.bookingId;
  Booking.findById(bookingId)
    .exec()
    .then((result) => {
      res.status(200).json({
        _id: result._id,
        roomId: result.roomId,
        userId: result.userId,
        startDate: result.startDate,
        endDate: result.endDate,
        isPaid: result.isPaid,
        request: {
          type: "GET",
          url: `http://localhost:3000/rooms/${result.roomId}`,
          desc: "Obtain more infromation about this room.",
        },
      });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *  Delete Booking
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.bookings_delete_booking = (req, res, next) => {
  Booking.findByIdAndDelete(req.params.bookingId)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Deleted succesfully.",
      });
    })
    .catch((err) => errorHandler(res, 500, err));
};
