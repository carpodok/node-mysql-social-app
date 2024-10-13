const router = require("express").Router();
const { getPosts } = require("../controllers/posts.controller");
const verifyAuth = require("../middlewares/verifyAuth");

router.get("/posts", verifyAuth, getPosts);

module.exports = router;
