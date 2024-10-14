const dbConnection = require("../../config/db");
const getCurrentDate = require("../helpers/getCurrentDate");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHandler");

const getStories = async (req, res) => {
  const userId = req.user.id;

  try {
    const q = `SELECT s.* FROM stories AS s
    JOIN users AS u ON (u.id = s.user_id)
    LEFT JOIN relationships AS r ON (r.followed_user_id = s.user_id AND r.follower_user_id = ?)
    LIMIT 5;`;

    const values = [userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to get stories", err);
      } else {
        return sendSuccessResponse(res, 200, "Successfully retrieved stories", {
          stories: result,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to get stories", err);
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
        return sendErrorResponse(res, 500, "Failed to add story", err);
      } else {
        return sendSuccessResponse(res, 201, "Successfully added story", {
          id: result.insertId,
          img,
          created_at: currDate,
          user_id: userId,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to add story", err);
  }
};

const deleteStory = async (req, res) => {
  const userId = req.user.id;
  const { storyId } = req.params;

  try {
    const q = `DELETE FROM stories WHERE id = ? AND user_id = ?`;
    const values = [storyId, userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to delete story", err);
      } else {
        return sendSuccessResponse(res, 200, "Successfully deleted story");
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to delete story", err);
  }
};

module.exports = {
  getStories,
  addStory,
  deleteStory,
};
