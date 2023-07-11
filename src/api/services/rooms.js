const errorHandler = require("../utils/error-handler");

const mongoose = require("mongoose");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Booking = require("../models/booking");

/**
 *  Getting Rooms
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.rooms_find_all = (req, res, next) => {
  Room.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        rooms: docs.map((room) => {
          return {
            _id: room._id,
            hotelId: room.hotelId,
            name: room.name,
            isFree: room.isFree,
            price: room.price,
            description: room.description,
            requests: [
              {
                type: "GET",
                url: `http://localhost:3000/rooms/${room._id}`,
                desc: "Obtain more information about this room",
              },
              {
                type: "GET",
                url: `http://localhost:3000/hotels/${room.hotelId}`,
                desc: "Obtain more information about this hotel",
              },
            ],
          };
        }),
      });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *  Creating Room
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.rooms_create_room = (req, res, next) => {
  Hotel.findOneAndUpdate(
    { name: req.body.hotelName },
    { $inc: { numberOfRooms: 1 } }
  )
    .exec()
    .then((resultHotel) => {
      const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        hotelId: resultHotel._id,
        name: req.body.name,
        price: req.body.price,
        isFree: req.body.isFree,
        description: req.body.description,
      });
      room
        .save()
        .then((result) => {
          res.status(200).json({
            result,
            request: {
              type: "GET",
              url: `http://localhost:3000/hotels/${result.hotelId}`,
              desc: "Obtain information about this room.",
            },
          });
        })
        .catch((err) => {
          return errorHandler(res, 500, err);
        });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *  Deleting Room
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.rooms_delete_room = (req, res, next) => {
  Booking.deleteMany({ roomId: req.params.roomId })
    .exec()
    .then((count) => {
      Room.findByIdAndDelete(req.params.roomId)
        .exec()
        .then((result) => {
          console.log(result);
          Hotel.findByIdAndUpdate(result.hotelId, {
            $inc: { numberOfRooms: -1 },
          })
            .exec()
            .then((doc) => {
              res.status(200).json({
                message: "Hotel room deleted successfully.",
                request: {
                  type: "GET",
                  url: `http://localhost:3000/hotels/${doc._id}`,
                  desc: "Obtain more information about its hotel.",
                },
              });
            })
            .catch((err) => {
              return errorHandler(res, 500, err);
            });
        })
        .catch((err) => {
          return errorHandler(res, 500, err);
        });
    })
    .catch((err) => errorHandler(res, 500, err));
};
/**
 *  Get Room By Id
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.rooms_find_by_id = (req, res, next) => {
  Room.findById(req.params.roomId)
    .exec()
    .then((room) => {
      if (!room) return errorHandler(res, 500, "Room does not exist");
      res.status(200).json({
        _id: room._id,
        hotelId: room.hotelId,
        name: room.name,
        isFree: room.isFree,
        price: room.price,
        description: room.description,
        request: {
          type: "GET",
          url: `http://localhost:3000/hotels/${room.hotelId}`,
          desc: "Obtain more information about this hotel.",
        },
      });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *  Get Room By Id
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.rooms_find_by_id_with_bookings = async (req, res, next) => {
  const bookings = await Booking.find({ roomId: req.params.roomId }).exec();
  Room.findById(req.params.roomId)
    .exec()
    .then((room) => {
      if (!room) return errorHandler(res, 500, "Room does not exist");
      res.status(200).json({
        _id: room._id,
        hotelId: room.hotelId,
        name: room.name,
        isFree: room.isFree,
        price: room.price,
        description: room.description,
        count: bookings.length,
        bookings: {
          count: bookings.length,
          details: bookings.map((booking) => {
            return {
              _id: booking._id,
              request: {
                type: "GET",
                url: `http://localhost:3000/bookings/${booking._id}`,
                desc: "Obtain more information about booking.",
              },
            };
          }),
        },
        request: {
          type: "GET",
          url: `http://localhost:3000/hotels/${room.hotelId}`,
          desc: "Obtain more information about this hotel.",
        },
      });
    })
    .catch((err) => errorHandler(res, 500, err));
};
