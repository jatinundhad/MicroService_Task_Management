from flask import Flask

app = Flask(__name__)

@app.route('/adduser',methods=['POST'])
def addUser():
    print("creation of new user")
    return "0"
    
if __name__ == "__main__":
    app.run(debug=True,port=5001)