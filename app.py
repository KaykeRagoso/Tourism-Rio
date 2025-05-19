from flask import Flask, jsonify
from flask_cors import CORS
from google.cloud import firestore

app = Flask(__name__)
CORS(app)  # Permite requisições do frontend

# Inicialize o Firestore (configure GOOGLE_APPLICATION_CREDENTIALS)
db = firestore.Client()

@app.route('/api/spots')
def get_spots():
    spots_ref = db.collection('spots')
    docs = spots_ref.stream()
    spots = []
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id
        # Calcula totalVisitas se existir o campo visitas
        if 'visitas' in data and isinstance(data['visitas'], list):
            data['totalVisitas'] = sum(data['visitas'])
        else:
            data['totalVisitas'] = 0
        spots.append(data)
    return jsonify(spots)

if __name__ == '__main__':
    app.run(debug=True)