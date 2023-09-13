import mysql.connector

db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="vishv",
  database="user"
)


# preparing a cursor object
cursor = db.cursor()

# creating database
# cursor.execute("CREATE DATABASE IF NOT EXISTS USER")
# cursor.execute("USE user")
# cursor.execute("""CREATE TABLE IF NOT EXISTS USERS (
#   id INT NOT NULL AUTO_INCREMENT,
#   username VARCHAR(255) NOT NULL UNIQUE,
#   password VARCHAR(255) NOT NULL,
#   email VARCHAR(255) NOT NULL UNIQUE,
#   first_name VARCHAR(255) NOT NULL,
#   last_name VARCHAR(255) NOT NULL,
#   created_at DATETIME NOT NULL,
#   PRIMARY KEY (id)
# );""")
