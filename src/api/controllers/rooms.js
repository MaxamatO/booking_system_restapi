const express = require("express");
const router = express.Router();
const {
  rooms_find_all,
  rooms_create_room,
  rooms_delete_room,
  rooms_find_by_id,
} = require("../services/rooms");

router.get("/", rooms_find_all);
router.post("/", rooms_create_room);
router.get("/:roomId", rooms_find_by_id);
router.delete("/:roomId", rooms_delete_room);

module.exports = router;
