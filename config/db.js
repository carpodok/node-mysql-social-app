const mysql = require("mysql2");

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

dbConnection.connect((err) => {
  if (err) {
    console.log(
      "DB Connection Failed \n Error: " + JSON.stringify(err, undefined, 2)
    );
  } else {
    console.log("DB Connected Successfully");
  }
});

module.exports = dbConnection;
