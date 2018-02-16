import sqlite3
from flask import g
import sys

DATABASE = "database.db"

def connect_db():
    g.db = sqlite3.connect(DATABASE)


def close_db():
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()


def insert_user(email, password, firstname, familyname, gender, city, country):

    try:
        cur = g.db.execute("insert into user values(?,?,?,?,?,?,?)", [email, password, firstname, familyname, gender, city, country])
        g.db.commit()
        return True
    except:
        print sys.exc_info()[0]
        print sys.exc_info()[1]
        print sys.exc_info()[2]
        return False


def get_user(email):
    result = []
    cursor = g.db.execute("select * from user where email = ? ", [email])
    rows = cursor.fetchall()
    cursor.close()
    for i in range(len(rows)):
        result.append({'email':rows[i][0],'password':rows[i][1], 'firstname':rows[i][2], 'familyname':rows[i][3], 'gender':rows[i][4], 'city':rows[i][5], 'country':rows[i][6]})

    return result

def change_password(email, password):
    try:
        cursor = g.db.execute("update user set password = ? where email = ?", [password, email])
        g.db.commit()
        return True
    except:
        return False


def store_message(toemail, fromemail, message):
    try:
        cur = g.db.execute("insert into messages values(?,?,?)", [toemail, fromemail, message])
        g.db.commit()
        return True
    except:
        print sys.exc_info()[0]
        print sys.exc_info()[1]
        print sys.exc_info()[2]
        return False


def get_messages(email):
    result= []
    cursor = g.db.execute("select * from messages where toemail = ? ", [email])
    rows = cursor.fetchall()
    cursor.close()
    for i in range(len(rows)):
        result.append({'writer':rows[i][1], 'content':rows[i][2]})
    return result

def save_token(email, token):
    try:
        cur = g.db.execute("insert into tokens values(?,?)", [email, token])
        g.db.commit()
        return True
    except:
        return False

def get_email_by_token(token):
    cursor = g.db.execute("select * from tokens where token = ? ", [token])
    rows = cursor.fetchall()
    cursor.close()
    if len(rows) == 0:
        return False
    else:
        return rows[0][0]

def delete_token(token):
    cur = g.db.execute("select * from tokens where token = ?", [token])
    rows = cur.fetchall()
    cur.close()
    if len(rows) == 0:
        return False
    else:
        cur = g.db.execute("delete from tokens where token = ?", [token])
        g.db.commit()
        return True

def update_token(email, token):
    g.db.execute("update tokens set token = ? where email = ?", [token, email])
    g.db.commit()
    return



def is_logged_in(email):
    cursor = g.db.execute("select * from tokens where email = ? ", [email])
    rows = cursor.fetchall()
    cursor.close()
    if len(rows) != 0:
        return True
    else:
        return False