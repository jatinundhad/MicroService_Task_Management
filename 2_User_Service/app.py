from flask import Flask, request
import database.conn

app = Flask(__name__)
cursorObject = database.conn.cursorObject

@app.route('/adduser', methods=['POST'])
def addUser():
    data = request.get_json()

    if 'id' in data and 'name' in data:
        user_id = data['id']
        user_name = data['name']

        # Use parameterized queries to prevent SQL injection
        query = "INSERT INTO USERS (id, name) VALUES (%s, %s)"
        values = (user_id, user_name)

        try:
            cursorObject.execute(query, values)
            database.conn.db.commit()
            print("Creation of a new user")
            return "User created successfully"
        except Exception as e:
            print("Error creating user:", e)
            database.conn.db.rollback()
            return "Error creating user", 500
    else:
        return "Invalid JSON data", 400

if __name__ == "__main__":
    app.run(debug=True, port=5001)
