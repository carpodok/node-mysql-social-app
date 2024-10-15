const { body, query, param } = require("express-validator");

const getStoriesValidator = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

const addStoryValidator = [
  body("img")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image must be a valid URL"),
];

const deleteStoryValidator = [
  param("storyId")
    .notEmpty()
    .withMessage("Story ID is required")
    .isInt()
    .withMessage("Story ID must be an integer"),
];

module.exports = {
  getStoriesValidator,
  addStoryValidator,
  deleteStoryValidator,
};
