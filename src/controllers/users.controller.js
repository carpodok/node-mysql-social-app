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
  const { name, username, email, profile_pic, cover_pic } = req.body;

  try {
    let q = `UPDATE users SET `;
    let values = [];

    if (name) {
      q += `name = ?, `;
      values.push(name);
    }
    if (username) {
      q += `username = ?, `;
      values.push(username);
    }
    if (email) {
      q += `email = ?, `;
      values.push(email);
    }
    if (profile_pic) {
      q += `profile_pic = ?, `;
      values.push(profile_pic);
    }
    if (cover_pic) {
      q += `cover_pic = ?, `;
      values.push(cover_pic);
    }

    // Remove the last comma and space from the query string
    q = q.slice(0, -2);

    q += ` WHERE id = ?`;
    values.push(userId);

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to update user", err);
      } else {
        return sendSuccessResponse(res, 200, "User updated", {
          id: userId,
          name: name || undefined,
          username: username || undefined,
          email: email || undefined,
        });
      }
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to update user", err);
  }
};

module.exports = { getUser, updateUser };
