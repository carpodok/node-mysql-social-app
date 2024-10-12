require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("../config/db");

//Middlewares
app.use(express.json());

//Routes
app.use("/api/v1/", require("./routes/auth.route"));

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
