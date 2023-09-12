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
cursorObject.execute("CREATE DATABASE user")
