const dbConnection = require("../../config/db");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHandler");

const search = async (req, res) => {
  const { search } = req.query;
  const { limit = 5, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const q = `SELECT u.name, u.username 
    FROM users AS u
    WHERE u.name LIKE ? OR u.username LIKE ?
    LIMIT ? OFFSET ?`;

    const keyword = `%${search}%`;
    const values = [keyword, keyword, parseInt(limit), parseInt(offset)];
    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to search", err);
      } else {
        return sendSuccessResponse(res, 200, "Successfully searched", {
          users: result,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to search", err);
  }
};

module.exports = { search };
