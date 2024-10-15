const router = require("express").Router();
const {
  getStories,
  addStory,
  deleteStory,
} = require("../controllers/stories.controller");

const verifyAuth = require("../middlewares/verifyAuth");
const {
  getStoriesValidator,
  addStoryValidator,
  deleteStoryValidator,
} = require("../middlewares/validators/stories.validator");

router.get("/", getStoriesValidator, verifyAuth, getStories);
router.post("/", addStoryValidator, verifyAuth, addStory);
router.delete("/:storyId", deleteStoryValidator, verifyAuth, deleteStory);

module.exports = router;
