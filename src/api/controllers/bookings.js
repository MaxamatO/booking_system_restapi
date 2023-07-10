const router = require("express").Router();
const {
  bookings_get_all,
  bookings_get_by_id,
} = require("../services/bookings");
const { checkAuth } = require("../auth/check-auth");

router.get("/", checkAuth, bookings_get_all);
router.get("/:bookingId", checkAuth, bookings_get_by_id);

module.exports = router;
