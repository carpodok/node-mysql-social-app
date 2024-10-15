const router = require("express").Router();
const {
  getRelationships,
  addRelationships,
  deleteRelationships,
} = require("../controllers/relationships.controller");

const verifyAuth = require("../middlewares/verifyAuth");
const {
  getRelationshipsValidator,
  addRelationshipsValidator,
  deleteRelationshipsValidator,
} = require("../middlewares/validators/relationsships.validator");

/**
 * @swagger
 * /relationships:
 *   get:
 *     summary: Get relationships
 *     description: Retrieve relationships where the specified user is followed.
 *     tags: [Relationships]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the followed user
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Successfully retrieved relationships
 *       500:
 *         description: Failed to get relationships
 */
router.get("/", getRelationshipsValidator, verifyAuth, getRelationships);

/**
 * @swagger
 * /relationships:
 *   post:
 *     summary: Add a relationship
 *     description: Follow a user by adding a relationship between the authenticated user (follower) and the specified user (followed).
 *     tags: [Relationships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followedUserId:
 *                 type: string
 *                 description: ID of the user to follow
 *     responses:
 *       201:
 *         description: Successfully added relationships
 *       500:
 *         description: Failed to add relationships
 */
router.post("/", addRelationshipsValidator, verifyAuth, addRelationships);

/**
 * @swagger
 * /relationships/{userId}:
 *   delete:
 *     summary: Delete a relationship
 *     description: Unfollow a user by removing the relationship between the authenticated user (follower) and the specified user (followed).
 *     tags: [Relationships]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the followed user to unfollow
 *     responses:
 *       200:
 *         description: Successfully deleted relationships
 *       500:
 *         description: Failed to delete relationships
 */
router.delete(
  "/:userId",
  deleteRelationshipsValidator,
  verifyAuth,
  deleteRelationships
);

module.exports = router;
