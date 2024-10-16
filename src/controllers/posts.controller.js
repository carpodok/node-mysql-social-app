const dbConnection = require("../../config/db");
const getCurrentDate = require("../helpers/getCurrentDate");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHandler");

const getPosts = async (req, res) => {
  const userId = req.user.id;
  const { limit = 5, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const query = `SELECT p.*, u.id AS userId, name 
                 FROM posts AS p 
                 JOIN users AS u ON (u.id = p.user_id)
                 LEFT JOIN relationships AS r ON (p.user_id = r.followed_user_id) 
                 WHERE r.follower_user_id = ? OR p.user_id = ?
                 ORDER BY p.created_at DESC
                 LIMIT ? OFFSET ?`;

    const values = [userId, userId, parseInt(limit), parseInt(offset)];

    dbConnection.query(query, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to fetch posts", err);
      }

      return sendSuccessResponse(res, 200, "Posts fetched successfully", {
        posts: result,
      });
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to fetch posts", err);
  }
};

const createPost = async (req, res) => {
  const user = req.user;
  const { desc, img } = req.body;
  const user_id = user.id;
  const dateNow = getCurrentDate();

  try {
    const q =
      "INSERT INTO posts (`user_id`, `desc`, `img`, `created_at` ) VALUES (?, ?, ?, ?)";
    const values = [user_id, desc, img, dateNow];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to create post", err);
      }

      return sendSuccessResponse(res, 200, "Post created successfully", {
        post: {
          id: result.insertId,
          user_id,
          desc,
          img,
          created_at: dateNow,
        },
      });
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to create post", err);
  }
};

const deletePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  try {
    const q = "DELETE FROM posts WHERE id = ? AND user_id = ?";
    const values = [postId, userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to delete post", err);
      }

      return sendSuccessResponse(res, 200, "Post deleted successfully");
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to delete post", err);
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
};
