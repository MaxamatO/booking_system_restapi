const router = require("express").Router();
const { bookings_get_all } = require("../services/bookings");

router.get("/", bookings_get_all);

module.exports = router;
