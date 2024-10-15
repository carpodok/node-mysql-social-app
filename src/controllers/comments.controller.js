const dbConnection = require("../../config/db");
const getCurrentDate = require("../helpers/getCurrentDate");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHandler");

const getComments = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { postId } = req.params;

  const offset = (page - 1) * limit;

  try {
    const q = `SELECT c.*, u.id AS userId, name
    FROM comments AS c 
    JOIN users AS u ON (u.id = c.user_id)
    WHERE c.post_id = ?
    ORDER BY c.created_at DESC
    LIMIT ? OFFSET ?`;

    const values = [postId, parseInt(limit), parseInt(offset)];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to fetch comments", err);
      } else {
        return sendSuccessResponse(res, 200, "Comments fetched successfully", {
          comments: result,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to get comments", err);
  }
};

const createComment = async (req, res) => {
  const user = req.user;
  const { desc } = req.body;
  const currDate = getCurrentDate();
  const { postId } = req.params;

  try {
    const q =
      "INSERT INTO comments (user_id, post_id, `desc`, created_at) VALUES (?, ?, ?, ?)";

    const values = [user.id, parseInt(postId), desc, currDate];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to create comment", err);
      } else {
        return sendSuccessResponse(res, 201, "Comment created successfully", {
          comment: {
            id: result.insertId,
            user_id: user.id,
            post_id: postId,
            desc,
            created_at: currDate,
          },
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to create comment", err);
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const q = "DELETE FROM comments WHERE id = ?";
    const values = [commentId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to delete comment", err);
      } else {
        return sendSuccessResponse(res, 200, "Comment deleted successfully");
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to delete comment", err);
  }
};

module.exports = {
  getComments,
  deleteComment,
  createComment,
};
