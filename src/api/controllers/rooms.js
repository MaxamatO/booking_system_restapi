const express = require("express");
const router = express.Router();
const {
  rooms_find_all,
  rooms_create_room,
  rooms_delete_room,
  rooms_find_by_id,
} = require("../services/rooms");
const { bookings_book_room } = require("../services/bookings");
router.get("/", rooms_find_all);
router.post("/", rooms_create_room);
router.get("/:roomId", rooms_find_by_id);
router.delete("/:roomId", rooms_delete_room);
router.post("/:roomId/book", bookings_book_room);

module.exports = router;
