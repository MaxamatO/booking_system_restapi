const express = require("express");
const {
  hotels_find_all,
  hotels_create_hotel,
  hotels_find_by_id,
  hotels_delete_hotel,
} = require("../services/hotels");
const router = express.Router();

router.get("/", hotels_find_all);
router.post("/", hotels_create_hotel);
router.get("/:hotelId", hotels_find_by_id);
router.delete("/:hotelId", hotels_delete_hotel);

module.exports = router;
