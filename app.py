from flask import Flask, render_template, request, redirect, session, flash
import sqlite3
import hashlib
import random
import secrets
import re

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

DATABASE = "users.db"

def hash_password(password):
    salt = b"mysalt"

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        100000
    )

    return password_hash.hex()

def check_password(password, saved_hash):
    new_hash = hash_password(password)
    return new_hash == saved_hash


def create_captcha():

    first = random.randint(1, 10)
    second = random.randint(1, 10)

    session["captcha_answer"] = first + second

    return f"{first} + {second}"

@app.route("/")
def home():
    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        username = request.form["username"].strip()
        email = request.form["email"].strip()
        password = request.form["password"]
        confirm = request.form["confirm"]
        captcha_input = request.form["captcha"]

       
        if captcha_input != str(session.get("captcha_answer")):
            flash("Неверный ответ капчи")
            return redirect("/register")

        if not re.fullmatch(r"[A-Za-z0-9]{3,20}", username):
            flash("Логин должен содержать только латиницу и цифры (3–20 символов)")
            return redirect("/register")

        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
            flash("Введите корректный email")
            return redirect("/register")

        if len(password) < 6:
            flash("Пароль должен содержать минимум 6 символов")
            return redirect("/register")

        if not re.fullmatch(r"(?=.*[A-Za-z])(?=.*\d).+", password):
            flash("Пароль должен содержать буквы и цифры")
            return redirect("/register")

        if password != confirm:
            flash("Пароли не совпадают")
            return redirect("/register")

        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM users WHERE username=?", (username,))
        if cursor.fetchone():
            connection.close()
            flash("Пользователь с таким именем уже существует")
            return redirect("/register")

        cursor.execute("SELECT * FROM users WHERE email=?", (email,))
        if cursor.fetchone():
            connection.close()
            flash("Пользователь с таким email уже зарегистрирован")
            return redirect("/register")

        password_hash = hash_password(password)

        cursor.execute(
            "INSERT INTO users(username, email, password_hash) VALUES(?,?,?)",
            (username, email, password_hash)
        )

        connection.commit()
        connection.close()

        flash("Регистрация успешна! Войдите в систему.")
        return redirect("/login")

    
    captcha = create_captcha()
    return render_template("index.html", captcha=captcha)


@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        login_data = request.form["login"].strip()
        password = request.form["password"]
        captcha_input = request.form["captcha"]

        if captcha_input != str(session.get("captcha_answer")):
            flash("Неверный ответ капчи")
            return redirect("/login")

        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        cursor.execute("""
            SELECT id, username, email, password_hash, created_at
            FROM users
            WHERE username=? OR email=?
        """, (login_data, login_data))

        user = cursor.fetchone()

        connection.close()

        if user and check_password(password, user[3]):

            session["user_id"] = user[0]
            session["username"] = user[1]
            session["email"] = user[2]
            session["created_at"] = user[4]

            return redirect("/profile")

        flash("Неверный логин или пароль")
        return redirect("/login")

    captcha = create_captcha()
    return render_template("login.html", captcha=captcha)


@app.route("/profile")
def profile():

    if "user_id" not in session:
        return redirect("/login")

    return render_template("profile.html")

@app.route("/logout")
def logout():

    session.clear()

    return redirect("/login")



if __name__ == "__main__":
    app.run(debug=True)