const router = require("express").Router();
const {
  bookings_get_all,
  bookings_get_by_id,
  bookings_delete_booking,
} = require("../services/bookings");
const { checkAuth } = require("../auth/check-auth");

router.get("/", checkAuth, bookings_get_all);
router.get("/:bookingId", checkAuth, bookings_get_by_id);
router.delete("/:bookingId", checkAuth, bookings_delete_booking);

module.exports = router;
