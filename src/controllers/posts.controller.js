const dbConnection = require("../../config/db");

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

const addPost = async (req, res) => {};

module.exports = {
  getPosts,
  addPost,
};
