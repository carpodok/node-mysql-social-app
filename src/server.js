require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("../config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api/v1/", require("./routes/auth.route"));

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
