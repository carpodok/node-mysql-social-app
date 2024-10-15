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

/**
 * @swagger
 * /stories:
 *   get:
 *     summary: Get stories
 *     description: Retrieve all stories of the authenticated user or the users they follow.
 *     tags: [Stories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of stories per page
 *     responses:
 *       200:
 *         description: Successfully retrieved stories
 *       500:
 *         description: Failed to get stories
 */
router.get("/", getStoriesValidator, verifyAuth, getStories);

/**
 * @swagger
 * /stories:
 *   post:
 *     summary: Add a new story
 *     description: Create a new story by the authenticated user.
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 description: Image URL for the story
 *     responses:
 *       201:
 *         description: Successfully added story
 *       500:
 *         description: Failed to add story
 */
router.post("/", addStoryValidator, verifyAuth, addStory);

/**
 * @swagger
 * /stories/{storyId}:
 *   delete:
 *     summary: Delete a story
 *     description: Delete a story created by the authenticated user.
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: storyId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the story to delete
 *     responses:
 *       200:
 *         description: Successfully deleted story
 *       500:
 *         description: Failed to delete story
 */
router.delete("/:storyId", deleteStoryValidator, verifyAuth, deleteStory);

module.exports = router;
