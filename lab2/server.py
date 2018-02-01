from flask import app, request
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/sup")
def hello2():
    return "Sup?"

firstname=""
@app.route("/signin", methods=['POST'])
def sign_in():
    global firstname
    firstname = request.json['firstname']
    return firstname

@app.route("/show")
def sign():
    global firstname
    return firstname
