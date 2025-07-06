from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os



# app = Flask(__name__)
app = Flask(__name__, static_folder='../static', template_folder='../templates')
CORS(app)

DATA_FILE = 'backend/data.json'

def read_count():
    """read count from JSON """
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            print("Reading data from:", os.path.abspath(DATA_FILE))
            print("current count value: ", data.get('count', 0))
            return data.get('count', 0)
    return 0

def write_count(count):
    """Write count to JSON file"""
    data = {'count': count}
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)

@app.route('/')
def index():
    """serve index.html at the root URL """
    return render_template('index.html')


@app.route('/api/count', methods=['GET'])
def get_count():
    """get current count """
    count = read_count()
    return jsonify({'count': count})

@app.route('/api/increment', methods=['POST'])
def increment_count():
    """increment count """
    current_count = read_count()
    new_count = current_count + 1
    write_count(new_count)
    return jsonify({'count': new_count})

if __name__ == '__main__':
    app.run(debug=True, port=3000, host="0.0.0.0")


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
