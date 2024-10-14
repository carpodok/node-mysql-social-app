const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users.controller");
const verifyAuth = require("../middlewares/verifyAuth");

router.get("/:userId", getUser);
router.put("/", verifyAuth, updateUser);

module.exports = router;
