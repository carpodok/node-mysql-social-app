const { body, query, param } = require("express-validator");

const createCommentValidator = [
  body("desc")
    .notEmpty()
    .withMessage("Comment description is required")
    .isLength({ min: 1 })
    .withMessage("Comment description must be at least 1 character long"),
  body("post_id")
    .notEmpty()
    .withMessage("Post ID is required")
    .isInt()
    .withMessage("Post ID must be an integer"),
];

const getCommentsValidator = [
  query("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isInt()
    .withMessage("Post ID must be an integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

const deleteCommentValidator = [
  param("commentId")
    .notEmpty()
    .withMessage("Comment ID is required")
    .isInt()
    .withMessage("Comment ID must be an integer"),
];

module.exports = {
  createCommentValidator,
  getCommentsValidator,
  deleteCommentValidator,
};
