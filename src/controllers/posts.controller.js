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
          post: result[0],
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: err,
    });
  }
};

module.exports = {
  getPosts,
  createPost,
};
