from flask import Flask, request, jsonify
from database.conn import cursor,connection as conn
import requests
import json
import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Welcome to the Team Service!'


@app.before_request
def log_request_info():
    print(f"\033[0;32m{request.method} \033[0;34m{request.url[21:]}",end="")

@app.after_request
def log_response_info(response):
    print(f"\033[0;32m {response.status_code}")
    return response


@app.route('/create_team', methods=['POST'])
def create_team():
    try:
        team_data = request.json
        cursor.execute('SELECT COUNT(*) FROM teams WHERE team_id = ?', (team_data['team_id'],))
        count = cursor.fetchone()[0]
        if count > 0:
            return jsonify({'error': 'Team already exists'}), 400
        
        #check that leader is exists in the table
        r=requests.get('http://localhost:5000/auth/search/'+team_data['leader_id'])
        if(r.status_code!=200):
            return jsonify({'error': 'leader not exists'}) , 400
        
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
        
        #check member exists in the table
        r=requests.get('http://localhost:5000/auth/search/'+member_id)
        if(r.status_code!=200):
            return jsonify({'error': 'Team Member not exists'}) , 400
       
        # Insert the new member into the members table
        cursor.execute(
            'INSERT INTO team_members (team_id, member_id) VALUES (?, ?)', (team_id, member_id))
        conn.commit()

        return jsonify({'message': 'Member added to the team successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/get_teams',methods=['GET'])
def get_teams():
    try:
        cursor.execute('SELECT * FROM TEAMS')
        row_headers=[x[0] for x in cursor.description]
        data=cursor.fetchall()
        teams=[]
        for team in data:
            teams.append(dict(zip(row_headers,team)))
        print(json.dumps(teams))
        return jsonify({'teams ' : teams}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}) , 500

@app.route('/checkValidity',methods=['POST'])
def check_lead():
    team_id = request.json["team_id"]
    assigner = request.json["assigner"]
    assignee = request.json["assignee"]
    
    try:
        cursor.execute('SELECT COUNT(*) FROM TEAMS A INNER JOIN TEAM_MEMBERS B ON A.TEAM_ID=B.TEAM_ID WHERE A.TEAM_ID=? AND STATUS="active" AND LEADER_ID=? AND MEMBER_ID=?', (team_id, assigner, assignee))
        count = cursor.fetchone()[0]
        
        if count < 1:
            return jsonify({'error': 'NO Previllige to assign Task'}), 401
        return jsonify({'success': True}),200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}) , 500
    
@app.route('/test',methods=['GET'])
def test():
    r=requests.get('http://localhost:5003/')
    print(r)
    return "r",200
    

if __name__ == '__main__':
    print("Listening on 5002")
    app.run(debug=True, port=5002)
