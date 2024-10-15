const router = require("express").Router();
const {
  getComments,
  deleteComment,
  createComment,
} = require("../controllers/comments.controlelr");
const verifyAuth = require("../middlewares/verifyAuth");
const {
  createCommentValidator,
  getCommentsValidator,
  deleteCommentValidator,
} = require("../middlewares/validators/comments.validator");

router.get("/comments", getCommentsValidator, verifyAuth, getComments);
router.post("/comments", createCommentValidator, verifyAuth, createComment);
router.delete(
  "/comments/:commentId",
  deleteCommentValidator,
  verifyAuth,
  deleteComment
);

module.exports = router;
