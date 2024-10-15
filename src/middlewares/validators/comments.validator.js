const { body, query, param } = require("express-validator");

const getCommentsValidator = [
  param("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isInt()
    .withMessage("Post ID must be an integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

const createCommentValidator = [
  param("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isInt()
    .withMessage("Post ID must be an integer"),
  body("desc")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 1 })
    .withMessage("Description must be at least 1 character long"),
];

const deleteCommentValidator = [
  param("commentId")
    .notEmpty()
    .withMessage("Comment ID is required")
    .isInt()
    .withMessage("Comment ID must be an integer"),
];

module.exports = {
  getCommentsValidator,
  createCommentValidator,
  deleteCommentValidator,
};
