const router = require("express").Router();
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/posts.controller");
const verifyAuth = require("../middlewares/verifyAuth");

router.get("/posts", verifyAuth, getPosts);
router.post("/posts", verifyAuth, createPost);
router.delete("/posts/:postId", verifyAuth, deletePost);

module.exports = router;
