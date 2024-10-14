const dbConnection = require("../../config/db");
const getCurrentDate = require("../helpers/getCurrentDate");

const getComments = async (req, res) => {
  const { postId } = req.query;

  try {
    const q = `SELECT c.* ,u.id AS userId, name
    FROM comments AS c 
    JOIN users AS u ON (u.id = c.user_id)
    WHERE c.post_id = ?
    ORDER BY c.created_at DESC`;

    const values = [postId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch comments",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Comments fetched successfully",
          comments: result,
        });
      }
    });
  } catch (err) {
    return res.statur(500).json({
      success: false,
      message: "Failed to get comments",
      error: err.message,
    });
  }
};

const createComment = async (req, res) => {
  const user = req.user;

  const { desc, post_id } = req.body;

  const currDate = getCurrentDate();

  try {
    const q =
      "INSERT INTO comments (user_id, post_id, `desc`, created_at) VALUES (?, ?, ?, ?)";

    const values = [user.id, post_id, desc, currDate];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to create comment",
          error: err.message,
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Comment created successfully",
          data: {
            id: result.insertId,
            user_id: user.id,
            post_id,
            desc,
            created_at: currDate,
          },
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create comment",
      error: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const q = "DELETE FROM comments WHERE id = ?";

    const values = [commentId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to delete comment",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Comment deleted successfully",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment",
      error: err.message,
    });
  }
};

module.exports = {
  getComments,
  deleteComment,
  createComment,
};
