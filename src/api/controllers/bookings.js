const router = require("express").Router();
const {
  bookings_get_all,
  bookings_get_by_id,
} = require("../services/bookings");

router.get("/", bookings_get_all);
router.get("/:bookingId", bookings_get_by_id);

module.exports = router;
