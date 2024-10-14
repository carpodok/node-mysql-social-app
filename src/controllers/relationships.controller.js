const dbConnection = require("../../config/db");

const getRelationships = async (req, res) => {
  const userId = req.query.userId;

  try {
    const q = "SELECT * FROM relationships WHERE followed_user_id = ?";
    const values = [userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to get relationships",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Successfully retrieved relationships",
          data: result,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get relationships",
      error: err.message,
    });
  }
};
const addRelationships = async (req, res) => {
  const followerUserId = req.user.id;
  const followedUserId = req.body.followedUserId;

  try {
    const q =
      "INSERT INTO relationships (follower_user_id, followed_user_id) VALUES (?, ?)";

    const values = [followerUserId, followedUserId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to add relationships",
          error: err.message,
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Successfully added relationships",
          data: {
            id: result.insertId,
            follower_user_id: followerUserId,
            followed_user_id: followedUserId,
          },
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add relationships",
      error: err.message,
    });
  }
};
const deleteRelationships = async (req, res) => {
  const followedUserId = req.params.userId;
  const followerUserId = req.user.id;

  try {
    const q =
      "DELETE FROM relationships WHERE followed_user_id = ? AND follower_user_id = ?";
    const values = [followedUserId, followerUserId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete relationships",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Successfully deleted relationships",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete relationships",
      error: err.message,
    });
  }
};

module.exports = {
  getRelationships,
  addRelationships,
  deleteRelationships,
};
