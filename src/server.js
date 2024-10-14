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
app.use("/api/v1/", require("./routes/posts.route"));
app.use("/api/v1/", require("./routes/comments.route"));
app.use("/api/v1/", require("./routes/likes.route"));
app.use("/api/v1/", require("./routes/stories.route"));
app.use("/api/v1/", require("./routes/users.route"));
app.use("/api/v1/", require("./routes/relationships.route"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
