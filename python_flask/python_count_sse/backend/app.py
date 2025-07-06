from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
# required for Server-Sent Events (SSE)
from flask import Response
from queue import Queue


# app = Flask(__name__)
app = Flask(__name__, static_folder='../static', template_folder='../templates')
CORS(app)

DATA_FILE = 'data.json'
clients = []

def read_count():
    """read count from JSON """
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            return data.get('count', 0)
    return 0

def write_count(count):
    """Write count to JSON file"""
    data = {'count': count}
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)

    # update clients
    notify_clients(count)

def notify_clients(count):
    for q in clients:
        q.put(count)

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


@app.route('/api/stream')
def stream():
    def event_stream(q):
        while True:
            result = q.get()
            yield f'data: {result}\n\n'

    q = Queue()
    clients.append(q)
    return Response(event_stream(q), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
