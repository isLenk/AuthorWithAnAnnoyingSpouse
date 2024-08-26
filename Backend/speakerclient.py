
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

import tts as speech


@app.route("/", methods=['POST'])
@cross_origin()
def speak():
  data = request.get_json()
  content = data.get('content')
  print("okey dokey")
  print(content)
  speech.say(content)
  # Process the content here
  return jsonify({'result': 'It probably loaded'})


if __name__ == "__main__":
  app.run()