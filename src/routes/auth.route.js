const router = require("express").Router();

const { login, register, logout } = require("../controllers/auth.controller");
const {
  loginValidator,
  registerValidator,
} = require("../middlewares/validators/auth.validator");

router.post("/login", loginValidator, login);
router.post("/register", registerValidator, register);
router.get("/logout", logout);

module.exports = router;
