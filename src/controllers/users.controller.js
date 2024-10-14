const dbConnection = require("../../config/db");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHandler");

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = "SELECT * FROM users WHERE id = ?";
    const values = [userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to get user", err);
      } else if (result.length === 0) {
        return sendErrorResponse(res, 404, "User not found");
      } else {
        const { password, ...userWithoutPassword } = result[0];
        return sendSuccessResponse(res, 200, "User fetched successfully", {
          user: userWithoutPassword,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to get user", err);
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { name, username, email } = req.body;

  try {
    const q = `UPDATE users SET name = ?, username = ?, email = ? WHERE id = ?`;
    const values = [name, username, email, userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to update user", err);
      } else {
        return sendSuccessResponse(res, 200, "User updated", {
          id: userId,
          name: name,
          username: username,
          email: email,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to update user", err);
  }
};

module.exports = { getUser, updateUser };
