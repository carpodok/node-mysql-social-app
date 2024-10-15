const router = require("express").Router();

// Controllers
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/posts.controller");
const {
  getComments,
  deleteComment,
  createComment,
} = require("../controllers/comments.controller");
const verifyAuth = require("../middlewares/verifyAuth");

//Validators
const {
  getPostsValidator,
  createPostValidator,
  deletePostValidator,
} = require("../middlewares/validators/posts.validator");
const {
  createCommentValidator,
  getCommentsValidator,
  deleteCommentValidator,
} = require("../middlewares/validators/comments.validator");

// Posts
router.get("/", getPostsValidator, verifyAuth, getPosts);
router.post("/", createPostValidator, verifyAuth, createPost);
router.delete("/:postId", deletePostValidator, verifyAuth, deletePost);

// Post Comments
router.use("/:postId/comments", getCommentsValidator, verifyAuth, getComments);
router.post(
  "/:postId/comments",
  createCommentValidator,
  verifyAuth,
  createComment
);
router.delete(
  "/:postId/comments/:commentId",
  deleteCommentValidator,
  verifyAuth,
  deleteComment
);

module.exports = router;
