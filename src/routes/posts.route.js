const router = require("express").Router();
const { getPosts, createPost } = require("../controllers/posts.controller");
const verifyAuth = require("../middlewares/verifyAuth");

router.get("/posts", verifyAuth, getPosts);
router.post("/posts", verifyAuth, createPost);

module.exports = router;
