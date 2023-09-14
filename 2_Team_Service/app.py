from flask import Flask, request, jsonify
from database.conn import cursor,connection as conn

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Welcome to the Team Service!'


@app.route('/create_team', methods=['POST'])
def create_team():
    try:
        team_data = request.json
        
        # Check if the team already exists
        cursor.execute('SELECT COUNT(*) FROM teams WHERE team_id = ?', (team_data['team_id'],))
        count = cursor.fetchone()[0]
        if count > 0:
            return jsonify({'error': 'Team already exists'}), 400
        
        # Insert the new team into the teams table
        cursor.execute(
            'INSERT INTO teams (team_id, description, leader_id, creation_date, status) VALUES (?, ?, ?, ?, ?)',
            (team_data['team_id'], team_data['description'], team_data['leader_id'], team_data['creation_date'], team_data['status']))
        conn.commit()
        
        return jsonify({'message': 'Team created successfully'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/add_member', methods=['POST'])
def add_member_to_team():
    try:
        team_id = request.json['team_id']
        member_id = request.json['member_id']
       
        # Insert the new member into the members table
        cursor.execute(
            'INSERT INTO team_members (team_id, member_id) VALUES (?, ?)', (team_id, member_id))
        conn.commit()

        return jsonify({'message': 'Member added to the team successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5002)
