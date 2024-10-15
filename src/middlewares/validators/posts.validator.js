const { body, query, param } = require("express-validator");

const getPostsValidator = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

const createPostValidator = [
  body("desc")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 1 })
    .withMessage("Description must be at least 1 character long"),
  body("img")
    .notEmpty()
    .withMessage("Image is required")
    .isURL()
    .withMessage("Image must be a valid URL"),
];

const deletePostValidator = [
  param("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isInt()
    .withMessage("Post ID must be an integer"),
];

module.exports = {
  getPostsValidator,
  createPostValidator,
  deletePostValidator,
};
