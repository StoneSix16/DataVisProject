from flask import Flask, render_template, request, jsonify, redirect
from core import returnWordCnt

import os

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 100*1024*1024

@app.route("/getwordcnt",  methods=['GET'])
def getWordCnt():
    return jsonify( returnWordCnt() )

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10086))
    app.run(host='0.0.0.0', port=port)