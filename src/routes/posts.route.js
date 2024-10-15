const router = require("express").Router();
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/posts.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const {
  getPostsValidator,
  createPostValidator,
  deletePostValidator,
} = require("../middlewares/validators/posts.validator");

router.get("/posts", getPostsValidator, verifyAuth, getPosts);
router.post("/posts", createPostValidator, verifyAuth, createPost);
router.delete("/posts/:postId", deletePostValidator, verifyAuth, deletePost);

module.exports = router;
