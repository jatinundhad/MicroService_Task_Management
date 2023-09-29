import mysql from "mysql2";

  var connection = mysql.createConnection({
    host: "mysqldb",
    port: 3306,
    user: "root",
    password: "vishv",
    database: "user",
  })

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


export default connection;
