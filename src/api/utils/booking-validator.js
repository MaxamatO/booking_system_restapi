const { Model } = require("mongoose");

/**
 *
 * @param {Date} startDate
 * @param {Date} endDate
 */
module.exports.are_dates_valid = (startDate, endDate) => {
  return new Date(endDate).getTime() >= new Date(startDate).getTime();
};

/**
 *
 * @param {Model} booking
 */
module.exports.is_room_booked = async (booking, roomId) => {
  const isRoomBooked = await booking.find({ roomId: roomId }).exec();
  return isRoomBooked.length >= 1;
};
