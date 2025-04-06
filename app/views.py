from flask import Blueprint, render_template, request, redirect, url_for
from app import db

views = Blueprint("views", __name__)

@views.route('/nav')
def nav():
    return render_template('nav.html')

@views.route('/footer')
def footer():
    return render_template('footer.html')

@views.route('/sponsors')
def sponsors():
    return render_template('sponsors.html', active_page='sponsors')

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

@views.route("/science")
def science():
    return render_template("science.html", active_page='science')


@views.route("/singo")
def singo():
    return render_template("singo.html", active_page='singo')

@views.route("/business")
def business():
    return render_template("business.html", active_page='business')

@views.route("/stardust")
def stardust():
    return render_template("stardust.html", active_page='stardust')

@views.route("/stellar")
def stellar():
    return render_template("stellar.html", active_page='stellar')

@views.route("/form")
def form():
    return render_template("form.html", active_page='form')

from flask import Blueprint, send_from_directory, current_app

main = Blueprint('main', __name__)

@main.route('/robots.txt')
def robots():
    return send_from_directory(current_app.static_folder, 'robots.txt')