from flask import request
from flask import Flask
import database_helper
import json
import random


app = Flask(__name__)
app.debug = True


@app.before_request
def before_request():
    database_helper.connect_db()

@app.teardown_request
def teardown_request(exception):
    database_helper.close_db()

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/sup")
def hello2():
    return "Sup?"


@app.route("/signin", methods=['POST'])
def sign_in():
    email = request.json['email']
    password = request.json['password']
    user = database_helper.get_user(email)

    if len(user) == 0:
        return json.dumps({'success':False, 'message':"User not found", 'data':""})
    elif password != user[0]['password']:
        return json.dumps({'success':False, 'message':"Wrong password", 'data':""})
    else:
        token = generate_token()
        res = database_helper.save_token(email, token)
        if res:
            return json.dumps({'success':True, 'message':"You successfully signed in", 'data':token})
        else:
            return json.dumps({'success':False, 'message':"Sign in was unsuccessful", 'data':""})


@app.route("/signup", methods=['POST'])
def sign_up():

    email = request.json['email']
    password = request.json['password']
    firstname = request.json['firstname']
    familyname = request.json['familyname']
    gender = request.json['gender']
    city = request.json['city']
    country = request.json['country']

    if len(email) == 0 or len(firstname) == 0 or len(familyname) == 0 or len(gender) == 0 or len(city) == 0 or len(country) == 0 or len(password) == 0:
        return json.dumps({'success':False, 'message':"No field can be left empty", 'data':""})
    elif len(password) < 8:
        return json.dumps({'success':False, 'message':"Password must be at least 8 characters long", 'data':""})

    result = database_helper.insert_user(email, password, firstname, familyname, gender, city, country)
    if result == True:
        return json.dumps({'success':True, 'message':"You successfully signed up", 'data':""})
    else:
        return json.dumps({'success':False, 'message':"Sign up failed", 'data':""})


@app.route("/signout", methods=['POST'])
def sign_out():
    token = request.json['token']
    res = database_helper.delete_token(token)
    if res:
        return json.dumps({'success':True, 'message':"You successfully signed out", 'data':""})
    else:
        return json.dumps({'success':False, 'message':"Your are not signed in", 'data':""})



@app.route("/changepassword", methods=['POST'])
def change_password():
    token = request.json['token']
    oldpassword = request.json['oldpassword']
    newpassword = request.json['newpassword']

    try:
        email = database_helper.get_email_by_token(token)
    except:
        return json.dumps({'success':False, 'message':"Token does not exist", 'data':""})

    user = database_helper.get_user(email)
    if user[0]['password'] == oldpassword:
        result = database_helper.change_password(email, newpassword)
        return json.dumps({'success':result, 'message':"", 'data':""})
    else:
        return json.dumps({'success':False, 'message':"Old passwords do not match", 'data':""})


@app.route("/getuserdatabytoken", methods=['POST'])
def get_user_data_by_token():
    token = request.json['token']
    try:
        email = database_helper.get_email_by_token(token)
    except:
        return json.dumps({'success':False, 'message':"Token does not exist", 'data':""})

    user = database_helper.get_user(email)
    if len(user) != 0:

        user = user[0]
        del user['password']
        return json.dumps({'success':True, 'message':"", 'data':user})
    else:
        return json.dumps({'success':False, 'message':"User does not exist", 'data':""})


@app.route("/getuserdatabyemail", methods=['POST'])
def get_user_data_by_email():
    email = request.json['email']
    user = database_helper.get_user(email)
    if len(user) != 0:
        user = user[0]
        del user['password']
        return json.dumps({'success':True, 'message':"You successfully found a user", 'data':user})
    else:
        return json.dumps({'success':False, 'message':"The user does not exist", 'data':""})





@app.route("/getusermessagesbytoken", methods=['POST'])
def get_user_messages_by_token():
    token = request.json['token']
    try:
        email = database_helper.get_email_by_token(token)
    except:
        return json.dumps({'success':False, 'message':"Token does not exist", 'data':""})

    messages = database_helper.get_messages(email)
    return json.dumps({'success':True, 'message':"", 'data':messages})





@app.route("/getusermessagesbyemail", methods=['POST'])
def get_user_messages_by_email():
    token = request.json['token']
    toemail = request.json['email']
    try:
        fromemail = database_helper.get_email_by_token(token)
    except:
        return json.dumps({'success':False, 'message':"Token does not exist", 'data':""})

    user = database_helper.get_user(toemail)
    if len(user) == 0:
        return json.dumps({'success':False, 'message':"Recipient does not exist", 'data':""})

    messages = database_helper.get_messages(toemail)
    return json.dumps({'success':True, 'message':"", 'data':messages})


@app.route("/postmessage", methods=['POST'])
def post_message():
    token = request.json['token']
    toemail = request.json['email']
    message = request.json['message']

    user = database_helper.get_user(toemail)
    if len(user) == 0:
        return json.dumps({'success':False, 'message':"Recipient does not exist", 'data':""})

    try:
        fromemail = database_helper.get_email_by_token(token)
    except:
        return json.dumps({'success':False, 'message':"Token does not exist", 'data':""})


    result = database_helper.store_message(toemail, fromemail, message)
    if result:
        return json.dumps({'success':result, 'message':"You succesfully posted a message", 'data':message})
    else:
        return json.dumps({'success':result, 'message':"Your message was not posted", 'data':""})




def generate_token():
    TOKEN_LENGTH = 20
    TOKEN_STRING = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ"
    token = ""

    for i in range(0, TOKEN_LENGTH):
        token += TOKEN_STRING[random.randint(0, len(TOKEN_STRING)-1)]

    return token

app.run()
