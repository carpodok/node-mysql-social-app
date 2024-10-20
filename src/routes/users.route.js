const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users.controller");
const { search } = require("../controllers/search.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const {
  getUserValidator,
  updateUserValidator,
  searchUserValidator,
} = require("../middlewares/validators/users.validator");

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user details
 *     description: Retrieve the details of a user by their userId.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to get user
 */
router.get("/:userId", getUserValidator, getUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Search for users
 *     description: Search for users based on query parameters such as name or username. The user must be authenticated.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The name of the user to search for
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: false
 *         description: The username of the user to search for
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users found successfully
 *       400:
 *         description: Invalid search parameters
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Failed to perform search
 */
router.get("/", searchUserValidator, verifyAuth, search);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user details
 *     description: Update the authenticated user's details such as name, username, email, profile picture, or cover picture.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               username:
 *                 type: string
 *                 description: The user's username
 *               email:
 *                 type: string
 *                 description: The user's email
 *               profile_pic:
 *                 type: string
 *                 description: The URL of the user's profile picture
 *               cover_pic:
 *                 type: string
 *                 description: The URL of the user's cover picture
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Failed to update user
 */
router.put("/", updateUserValidator, verifyAuth, updateUser);

module.exports = router;
