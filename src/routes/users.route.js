const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users.controller");
const verifyAuth = require("../middlewares/verifyAuth");

router.get("/users/:userId", getUser);
router.put("/users", verifyAuth, updateUser);

module.exports = router;
