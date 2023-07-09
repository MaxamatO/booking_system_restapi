const router = require("express").Router();
const { users_get_all, users_register } = require("../services/users");

router.get("/", users_get_all);
router.post("/register", users_register);

module.exports = router;
