from flask import Blueprint, render_template, request, redirect, url_for
from app import db

views = Blueprint("views", __name__)

@views.route("/")
def main():
    return render_template("main.html", active_page='main')

@views.route("/")
@views.route("/<path:subpath>")
def home(subpath=None):
    if subpath is None or subpath == "":
        return redirect(url_for("views.home"))
    return render_template("main.html", active_page='main')

@views.route("/simba")
def simba():
    return render_template("simba.html", active_page='simba')

@views.route("/seasentinel")
def seasentinel():
    return render_template("seasentinel.html", active_page='seasentinel')

@views.route('/nav')
def nav():
    return render_template('nav.html')