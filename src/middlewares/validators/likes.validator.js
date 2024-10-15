const { body, query } = require("express-validator");

const getLikesValidator = [
  query("postId")
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
