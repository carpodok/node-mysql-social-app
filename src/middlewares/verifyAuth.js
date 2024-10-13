const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) return res.status(401).json({ message: "Access Denied" });

  const token = header.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "JWT Varification Failed",
      error: err,
      token,
    });
  }
};
