const dbConnection = require("../../config/db");

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = "SELECT * FROM users WHERE id = ?";
    const values = [userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to get user",
          error: err.message,
        });
      } else {
        const { password, ...userWithoutPassword } = result[0];

        return res.status(200).json({
          success: true,
          message: "User fetched successfully",
          user: userWithoutPassword,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  try {
    const q = `UPDATE users SET name = ?, email = ?
    WHERE id = ?`;

    const values = [name, email, userId];

    dbConnection.query(q, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to update user",
          error: err.message,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "User updated",
          user: {
            id: userId,
            name: name,
            email: email,
          },
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
};

module.exports = { getUser, updateUser };
