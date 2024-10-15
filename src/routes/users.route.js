const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const {
  getUserValidator,
  updateUserValidator,
} = require("../middlewares/validators/users.validator");

router.get("/:userId", getUserValidator, getUser);
router.put("/", updateUserValidator, verifyAuth, updateUser);

module.exports = router;
