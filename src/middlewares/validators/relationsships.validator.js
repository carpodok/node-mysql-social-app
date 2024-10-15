const { body, query, param } = require("express-validator");

const getRelationshipsValidator = [
  query("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

const addRelationshipsValidator = [
  body("followedUserId")
    .notEmpty()
    .withMessage("Followed User ID is required")
    .isInt()
    .withMessage("Followed User ID must be an integer"),
];

const deleteRelationshipsValidator = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
];

module.exports = {
  getRelationshipsValidator,
  addRelationshipsValidator,
  deleteRelationshipsValidator,
};
