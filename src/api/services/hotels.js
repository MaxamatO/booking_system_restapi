const errorHandler = require("../utils/error-handler");

const mongoose = require("mongoose");
const Hotel = require("../models/hotel");
const Room = require("../models/room");

/**
 *  Getting Hotels
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.hotels_find_all = (req, res, next) => {
  Hotel.find()
    .select("-__v")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        hotels: docs.map((hotel) => {
          return {
            name: hotel.name,
            country: hotel.country,
            numberOfRooms: hotel.numberOfRooms,
            request: {
              type: "GET",
              url: `http://localhost:3000/hotels/${hotel._id}`,
              desc: "Obtain precise information about hotel.",
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
 *  Creating Hotels
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.hotels_create_hotel = (req, res, next) => {
  const hotel = new Hotel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    country: req.body.country,
  });
  Hotel.find({ name: req.body.name })
    .exec()
    .then((hotels) => {
      if (hotels.length >= 1) return errorHandler(res, 409, "Hotel exists");
      hotel
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            createdHotel: {
              _id: result._id,
              name: result.name,
              country: result.country,
              request: {
                type: "GET",
                url: `http://localhost:3000/hotels/${result._id}`,
                desc: "Obtain precise information about hotel.",
              },
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
 *  Getting Hotel by it's ID
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.hotels_find_by_id = (req, res, next) => {
  Hotel.findById(req.params.hotelId)
    .select("-__v")
    .exec()
    .then(async (hotel) => {
      if (!hotel) return errorHandler(res, 500, "Hotel does not exist");
      const roomsOfThisHotel = await Room.find({ hotelId: hotel._id }).exec();
      res.status(200).json({
        _id: hotel._id,
        name: hotel.name,
        country: hotel.country,
        numberOfRooms: hotel.numberOfRooms,
        rooms: roomsOfThisHotel.map((room) => {
          return {
            _id: room._id,
            name: room.name,
            isFree: room.isFree,
            price: room.price,
            description: room.description,
          };
        }),
        request: {
          type: "POST",
          url: "http://localhost:3000/rooms",
          desc: "Create a room for this hotel.",
        },
      });
    })
    .catch((err) => {
      return errorHandler(res, 500, err);
    });
};

/**
 *  Deleting Hotel by it's ID
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
module.exports.hotels_delete_hotel = (req, res, next) => {
  Room.deleteMany({ hotelId: req.params.hotelId })
    .exec()
    .then((docs) => {
      Hotel.deleteOne({ _id: req.params.hotelId })
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "Hotel removed with all its rooms.",
            request: {
              type: "GET",
              url: "http://localhost:3000/hotels",
              desc: "Obtain information about all hotels.",
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
