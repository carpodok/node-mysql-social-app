const router = require("express").Router();
const {
  getStories,
  addStory,
  deleteStory,
} = require("../controllers/stories.controller");

const verifyAuth = require("../middlewares/verifyAuth");

router.get("/stories", verifyAuth, getStories);
router.post("/stories", verifyAuth, addStory);
router.delete("/stories/:storyId", verifyAuth, deleteStory);

module.exports = router;
