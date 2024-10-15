const router = require("express").Router();

// Controllers
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/posts.controller");
const {
  getComments,
  deleteComment,
  createComment,
} = require("../controllers/comments.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const { getLikes, addLike } = require("../controllers/likes.controller");

// Validators
const {
  getPostsValidator,
  createPostValidator,
  deletePostValidator,
} = require("../middlewares/validators/posts.validator");
const {
  createCommentValidator,
  getCommentsValidator,
  deleteCommentValidator,
} = require("../middlewares/validators/comments.validator");
const {
  getLikesValidator,
  addLikeValidator,
} = require("../middlewares/validators/likes.validator");

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Fetches a list of posts with pagination. Returns posts from the authenticated user or followed users.
 *     tags: [Posts]
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
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 *       500:
 *         description: Failed to fetch posts
 */
router.get("/", getPostsValidator, verifyAuth, getPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post by the authenticated user.
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Failed to create post
 */
router.post("/", createPostValidator, verifyAuth, createPost);

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post
 *     description: Deletes a post created by the authenticated user.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       500:
 *         description: Failed to delete post
 */
router.delete("/:postId", deletePostValidator, verifyAuth, deletePost);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Get comments for a post
 *     description: Fetches a list of comments for a specific post.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of comments per page
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *       500:
 *         description: Failed to fetch comments
 */
router.get("/:postId/comments", getCommentsValidator, verifyAuth, getComments);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Add a comment to a post
 *     description: Adds a comment to a specific post.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       500:
 *         description: Failed to add comment
 */
router.post(
  "/:postId/comments",
  createCommentValidator,
  verifyAuth,
  createComment
);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment from a specific post.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       500:
 *         description: Failed to delete comment
 */
router.delete(
  "/:postId/comments/:commentId",
  deleteCommentValidator,
  verifyAuth,
  deleteComment
);

/**
 * @swagger
 * /posts/{postId}/likes:
 *   get:
 *     summary: Get likes for a post
 *     description: Fetches all likes for a specific post.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Likes fetched successfully
 *       500:
 *         description: Failed to fetch likes
 */
router.get("/:postId/likes", getLikesValidator, verifyAuth, getLikes);

/**
 * @swagger
 * /posts/{postId}/likes:
 *   post:
 *     summary: Like or dislike a post
 *     description: Like or dislike a post. If the post is already liked, it will be disliked.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post liked/disliked successfully
 *       500:
 *         description: Failed to like/dislike post
 */
router.post("/:postId/likes", addLikeValidator, verifyAuth, addLike);

module.exports = router;
