import sqlite3

# SQLite Database Configuration
db_name = 'database/team_service.db'

connection = sqlite3.connect(db_name,check_same_thread=False)
cursor = connection.cursor()

cursor.executescript('''
    CREATE TABLE IF NOT EXISTS teams (
        team_id VARCHAR(255) PRIMARY KEY,
        description TEXT,
        leader_id VARCHAR(255),
        creation_date DATE,
        status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active'
    );

    CREATE TABLE IF NOT EXISTS team_members (
        team_id VARCHAR(255),
        member_id VARCHAR(255),
        PRIMARY KEY (team_id, member_id),
        FOREIGN KEY (team_id) REFERENCES teams(team_id)
    );
''')

connection.commit()
