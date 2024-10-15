const { body, param } = require("express-validator");

const getLikesValidator = [
  param("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isInt()
    .withMessage("Post ID must be an integer"),
];

const addLikeValidator = [
  body("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isInt()
    .withMessage("Post ID must be an integer"),
];

module.exports = {
  getLikesValidator,
  addLikeValidator,
};
