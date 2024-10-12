const dbConnection = require("../../config/db");
const bcrypt = require("bcryptjs");

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
    const { username, name, email, password } = req.body;

    // Check if user already exists
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert user into database
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
    const { email, password } = req.body;

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
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      return res.status(200).json({ message: "User logged in successfully" });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to login",
      error: err.message,
    });
  }
};
const logout = async (req, res) => {};

module.exports = {
  login,
  register,
  logout,
};
