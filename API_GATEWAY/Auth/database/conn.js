import mysql from "mysql";

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user",
});

export default conn;
