from flask import Flask, request ,jsonify
from database.conn import cursor,db
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5000"}})

@app.route('/user/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']
    first_name = data['first_name']
    last_name = data['last_name']

    try:
        cursor.execute("""
            INSERT INTO users (username, password, email, first_name, last_name, created_at)
            VALUES (%s, %s, %s, %s, %s, NOW())
        """, (username, password, email, first_name, last_name))
        db.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except mysql.connector.Error as err:
        db.rollback()
        return jsonify({"error": f"Error: {err}"}), 500
    finally:
        cursor.close()

if __name__ == "__main__":
    app.run(debug=True, port=5002)
