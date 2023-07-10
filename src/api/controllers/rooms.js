const express = require("express");
const router = express.Router();
const {
  rooms_find_all,
  rooms_create_room,
  rooms_delete_room,
  rooms_find_by_id,
} = require("../services/rooms");
const { bookings_book_room } = require("../services/bookings");
const { checkAuth } = require("../auth/check-auth");

router.get("/", rooms_find_all);
router.post("/", checkAuth, rooms_create_room);
router.get("/:roomId", rooms_find_by_id);
router.delete("/:roomId", checkAuth, rooms_delete_room);
router.post("/:roomId/book", checkAuth, bookings_book_room);

module.exports = router;
