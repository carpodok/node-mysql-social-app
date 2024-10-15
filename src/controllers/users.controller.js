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
    let fields = [];
    let values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (username) {
      fields.push("username = ?");
      values.push(username);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }
    if (profile_pic) {
      fields.push("profile_pic = ?");
      values.push(profile_pic);
    }
    if (cover_pic) {
      fields.push("cover_pic = ?");
      values.push(cover_pic);
    }

    if (fields.length === 0) {
      return sendErrorResponse(res, 400, "No fields provided for update");
    }

    let q = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(userId);

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return sendErrorResponse(res, 500, "Failed to update user", err);
      }

      const updatedFields = {};
      if (name) updatedFields.name = name;
      if (username) updatedFields.username = username;
      if (email) updatedFields.email = email;
      if (profile_pic) updatedFields.profile_pic = profile_pic;
      if (cover_pic) updatedFields.cover_pic = cover_pic;

      return sendSuccessResponse(res, 200, "User updated", {
        user: {
          id: userId,
          ...updatedFields,
        },
      });
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Failed to update user", err);
  }
};

module.exports = { getUser, updateUser };
