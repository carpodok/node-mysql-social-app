const router = require("express").Router();
const { getLikes, addLike } = require("../controllers/likes.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const {
  getLikesValidator,
  addLikeValidator,
} = require("../middlewares/validators/likes.validator");

router.get("/likes", getLikesValidator, verifyAuth, getLikes);
router.post("/likes", addLikeValidator, verifyAuth, addLike);

module.exports = router;
