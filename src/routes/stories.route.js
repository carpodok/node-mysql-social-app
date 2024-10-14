const router = require("express").Router();
const {
  getStories,
  addStory,
  deleteStory,
} = require("../controllers/stories.controller");

const verifyAuth = require("../middlewares/verifyAuth");

router.get("/", verifyAuth, getStories);
router.post("/", verifyAuth, addStory);
router.delete("/:storyId", verifyAuth, deleteStory);

module.exports = router;
