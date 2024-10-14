const dbConnection = require("../../config/db");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHandler");

const getRelationships = async (req, res) => {
  const userId = req.query.userId;

  try {
    const q = "SELECT * FROM relationships WHERE followed_user_id = ?";
    const values = [userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to get relationships", err);
      } else {
        return sendSuccessResponse(
          res,
          200,
          "Successfully retrieved relationships",
          {
            data: result,
          }
        );
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to get relationships", err);
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
        return sendErrorResponse(res, 500, "Failed to add relationships", err);
      } else {
        return sendSuccessResponse(
          res,
          201,
          "Successfully added relationships",
          {
            id: result.insertId,
            follower_user_id: followerUserId,
            followed_user_id: followedUserId,
          }
        );
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to add relationships", err);
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
        return sendErrorResponse(
          res,
          500,
          "Failed to delete relationships",
          err
        );
      } else {
        return sendSuccessResponse(
          res,
          200,
          "Successfully deleted relationships"
        );
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to delete relationships", err);
  }
};

module.exports = {
  getRelationships,
  addRelationships,
  deleteRelationships,
};
