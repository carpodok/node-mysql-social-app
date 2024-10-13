const router = require("express").Router();
const { getLikes, addLike } = require("../controllers/likes.controller");
const verifyAuth = require("../middlewares/verifyAuth");

router.get("/likes", verifyAuth, getLikes);
router.post("/likes", verifyAuth, addLike);

module.exports = router;
