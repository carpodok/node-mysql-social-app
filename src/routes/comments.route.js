const router = require("express").Router();
const {
  getComments,
  deleteComment,
  createComment,
} = require("../controllers/comments.controlelr");
const verifyAuth = require("../middlewares/verifyAuth");

router.get("/comments", verifyAuth, getComments);
router.post("/comments", verifyAuth, createComment);
router.delete("/comments/:commentId", verifyAuth, deleteComment);

module.exports = router;
