const dbConnection = require("../../config/db");

const getLikes = async (req, res) => {
  const { postId } = req.query;

  try {
    const q = "SELECT * FROM likes WHERE post_id = ?";
    const values = [postId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to get likes",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Successfully retrieved likes",
          likes: result,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get likes",
      error: err.message,
    });
  }
};
const addLike = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;
  const values = [userId, postId];

  try {
    // Check if the user has already liked the post
    const q = "SELECT * FROM likes WHERE user_id = ? AND post_id = ?";
    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to like post",
          error: err.message,
        });
      }

      if (result.length > 0) {
        // User has already liked the post (dislike the post)
        const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
        dbConnection.query(q, values, (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to dislike post",
              error: err.message,
            });
          }
          return res.status(200).json({
            success: true,
            message: "Post has been disliked.",
            data: {
              userId: userId,
              postId: postId,
            },
          });
        });
      } else {
        // User hasn't liked the post yet (like the post)
        const q = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)";
        dbConnection.query(q, values, (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to like post",
              error: err.message,
            });
          }
          return res.status(200).json({
            success: true,
            message: "Post has been liked.",
            data: {
              userId: userId,
              postId: postId,
            },
          });
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to like post",
      error: err.message,
    });
  }
};

module.exports = {
  getLikes,
  addLike,
};
