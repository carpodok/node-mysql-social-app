const dbConnection = require("../../config/db");
const getCurrentDate = require("../helpers/getCurrentDate");

const getPosts = async (req, res) => {
  const user = req.user;

  const query = `SELECT p.*, u.id AS userId, name FROM posts AS p JOIN users AS u ON (u.id = p.user_id) ORDER BY p.created_at DESC`;

  dbConnection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch posts",
        error: err.message,
      });
    }
    return res.status(200).json({ posts: result });
  });
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
        return res.status(500).json({
          success: false,
          message: "Failed to create post",
          error: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Post created successfully",
          post: {
            id: result.insertId,
            user_id,
            desc,
            img,
            created_at: dateNow,
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  const user = req.user;

  const userId = user.id;
  const postId = req.params.postId;

  try {
    const q = "DELETE FROM posts WHERE id = ? AND user_id = ?";
    const values = [postId, userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete post",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Post deleted successfully",
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: err.message,
    });
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
};
