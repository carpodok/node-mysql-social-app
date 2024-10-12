const dbConnection = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkIfUserExists = (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.query(query, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0);
    });
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const register = async (req, res) => {
  try {
    const { username, name, email, password: enteredPassword } = req.body;

    const userExists = await checkIfUserExists(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(enteredPassword);

    dbConnection.query(
      `INSERT INTO users (user_name, name, email, password) VALUES (?, ?, ?, ?)`,
      [username, name, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to register user",
            error: err.message,
          });
        }
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password: enteredPassword } = req.body;

    const ifUserExists = await checkIfUserExists(email);

    if (!ifUserExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const query = `SELECT * FROM users WHERE email = ?`;

    dbConnection.query(query, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to login",
          error: err.message,
        });
      }

      const user = result[0];
      const isPasswordValid = await bcrypt.compare(
        enteredPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );

      const { password, ...userWithoutPassword } = user;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          message: "User logged in successfully",
          token: token,
          user: userWithoutPassword,
        });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to login",
      error: err.message,
    });
  }
};
const logout = async (req, res) => {
  return res
    .clearCookie("access_token", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "User logged out successfully" });
};

module.exports = {
  login,
  register,
  logout,
};
