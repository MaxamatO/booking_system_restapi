const router = require("express").Router();
const {
  users_get_all,
  users_register,
  users_get_by_id,
} = require("../services/users");

router.get("/", users_get_all);
router.post("/register", users_register);
router.get("/:userId", users_get_by_id);

module.exports = router;
