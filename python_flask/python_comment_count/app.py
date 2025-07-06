from flask import Flask, request, jsonify, render_template
import json, os

app = Flask(__name__)

DATA_FILE = "data.json"
data = {"count": 0, "comments": []}

# Init from file if exists
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r") as f:
        data = json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def get_data():
    print("/data get request retrieved")
    return jsonify(data)

@app.route("/comment", methods=["POST"])
def post_comment():
    print("/comment post request retrieved")

    comment = request.json.get("comment", "")

    print("content: ", comment)

    data["comments"].append(comment)
    data["count"] += 1
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)
    return "", 204

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)


"""
Flask defaults to host="127.0.0.1", which means:
    It only listens on the loopback interface.
    Only the machine itself (in this case, your NAS) can access it.
    Requests from other devices (like your laptop using http://192.168.1.67:3000) are ignored.


With
    app.run(debug=True, port=3000, host="0.0.0.0")

You're telling Flask to:
    Bind the server to all available network interfaces.
    Accept incoming connections from any IP (your local network included).
    Allow access from other devices, like your Mac using http://192.168.1.67:3000.
"""
