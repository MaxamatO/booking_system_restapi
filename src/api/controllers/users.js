const router = require("express").Router();
const {
  users_get_all,
  users_register,
  users_get_by_id,
  users_login,
} = require("../services/users");
const { checkAuth } = require("../auth/check-auth");

router.get("/", checkAuth, users_get_all);
router.post("/register", users_register);
router.get("/:userId", checkAuth, users_get_by_id);
router.post("/login", users_login);

module.exports = router;
