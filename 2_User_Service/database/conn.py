import mysql.connector

db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="vishv"
)

print(db)

# preparing a cursor object
cursorObject = db.cursor()

# creating database
cursorObject.execute("CREATE DATABASE IF NOT EXISTS user")
cursorObject.execute("USE user")
cursorObject.execute("CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY,\
                     NAME VARCHAR(255) NOT NULL)")

