const dbConnection = require("../../config/db");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHandler");

const getLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const q = "SELECT * FROM likes WHERE post_id = ?";
    const values = [postId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to get likes", err);
      } else {
        return sendSuccessResponse(res, 200, "Successfully retrieved likes", {
          likes: result,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to get likes", err);
  }
};

const addLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const values = [userId, postId];

  try {
    // Check if the user has already liked the post
    const q = "SELECT * FROM likes WHERE user_id = ? AND post_id = ?";
    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to like post", err);
      }

      if (result.length > 0) {
        // User has already liked the post (dislike the post)
        const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
        dbConnection.query(q, values, (err, result) => {
          if (err) {
            return sendErrorResponse(res, 500, "Failed to dislike post", err);
          }
          return sendSuccessResponse(res, 200, "Post has been disliked.", {
            userId,
            postId,
          });
        });
      } else {
        // User hasn't liked the post yet (like the post)
        const q = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)";
        dbConnection.query(q, values, (err, result) => {
          if (err) {
            return sendErrorResponse(res, 500, "Failed to like post", err);
          }
          return sendSuccessResponse(res, 200, "Post has been liked.", {
            userId,
            postId,
          });
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to like post", err);
  }
};

module.exports = {
  getLikes,
  addLike,
};
