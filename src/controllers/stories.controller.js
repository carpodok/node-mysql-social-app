const dbConnection = require("../../config/db");
const getCurrentDate = require("../helpers/getCurrentDate");

const getStories = async (req, res) => {
  const userId = res.user.id;

  try {
    const q = `SELECT s.* FROM stroies AS s
    JOIN users AS u ON (u.id = s.user_id)
    LEFT JOIN releationships AS r ON (r.followed_user_id = s.user_id AND r.follower_user_id = ?)
    LIMIT 5;`;

    const values = [userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to get stories",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Successfully retrieved stories",
          stories: result,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get stories",
      error: err.message,
    });
  }
};

const addStory = async (req, res) => {
  const userId = req.user.id;
  const { img } = req.body;
  const currDate = getCurrentDate();

  try {
    const q = "INSERT INTO stories (img, created_at, user_id) VALUES (?, ?, ?)";
    const values = [img, currDate, userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to add story",
          error: err.message,
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Successfully added story",
          data: {
            id: result.insertId,
            img,
            created_at: currDate,
            user_id: userId,
          },
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add story",
      error: err.message,
    });
  }
};

const deleteStory = async (req, res) => {
  const userId = req.user.id;
  const { storyId } = req.params;

  try {
    const q = `DELETE FROM stroies
    WHERE id = ? AND user_id = ?`;
    const values = [storyId, userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete story",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Successfully deleted story",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete story",
      error: err.message,
    });
  }
};

module.exports = {
  getStories,
  addStory,
  deleteStory,
};
