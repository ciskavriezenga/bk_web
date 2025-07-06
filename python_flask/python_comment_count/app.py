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
